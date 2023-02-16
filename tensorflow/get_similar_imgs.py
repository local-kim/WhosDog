import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
os.environ['KMP_DUPLICATE_LIB_OK']='True'
import os.path
import glob
import sys
import pickle
import tensorflow as tf
import numpy as np
from annoy import AnnoyIndex
import matplotlib.image as mpimg

MODEL = 'inceptionV3_6'
BREED_MODEL = 'breed_classification'
DIMS = 1024
N_TOP = 2

CRAWLING_PATH = 'client/public/Images/Crawling/'  # path of crawling image folder
PATH = "C:/Users/user/WhosDog/"
INPUT_PATH = PATH + sys.argv[1]    # argument from routes/search.js

# Load inceptionV3 model
model = tf.keras.models.load_model('saved_model/' + MODEL)
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=["accuracy"])

t = AnnoyIndex(DIMS, metric='euclidean')

file_index_to_file_name = {}


def preprocess_image(path):
    img = tf.io.read_file(path)
    img = tf.io.decode_jpeg(img, channels=3)
    img = tf.image.resize_with_pad(img, 224, 224)
    img  = tf.image.convert_image_dtype(img, tf.float32)[tf.newaxis, ...]

    return img


# Load breed classification model
breed_model = tf.keras.models.load_model('saved_model/' + BREED_MODEL)
breed_model.compile(optimizer=tf.keras.optimizers.Adamax(0.0001),
                loss='sparse_categorical_crossentropy',
                metrics=['accuracy', 'top_k_categorical_accuracy'])

# Calculate feature vector & Predict breed
img = preprocess_image(INPUT_PATH)
pred = breed_model(img)
top_components = tf.reshape(tf.math.top_k(pred, k=N_TOP).indices, shape=[-1])

# Load file class names
with open('tensorflow/resources/class_names.pickle', 'rb') as f:
    class_names = pickle.load(f)

top_matches = []
for label in top_components:
    # print(class_names[label]) # name of top N_TOP breed
    top_matches.append(class_names[label])


# Find similar breed img
similar_breed_img = []
for file_index, file_name in enumerate(glob.glob(CRAWLING_PATH + '*.jpg')):
    img = preprocess_image(file_name)
    pred = breed_model(img)

    crawling_top_components = tf.reshape(tf.math.top_k(pred, k=N_TOP).indices,shape=[-1])

    for x in top_components:
        if x in crawling_top_components :
            similar_breed_img.append(file_name)
            break


def build_annoy_index(trees):
    for file_index, file_name in enumerate(similar_breed_img):
        # Calculate feature vector
        img = preprocess_image(file_name)
        feature_vector = np.squeeze(model(img))
        t.add_item(file_index, feature_vector)

        file_index_to_file_name[file_index] = file_name.split('\\')[-1]

    t.build(trees)


def find_similar_imgs(n_nearest_neighbors):
    # Calculate feature vector
    img = preprocess_image(INPUT_PATH)
    v = np.squeeze(model(img))

    nearest_neighbors = t.get_nns_by_vector(v, n_nearest_neighbors, search_k=-1, include_distances=True)

    return nearest_neighbors


def get_img_list(len):
    n_nns = 100

    (nns, distance_list) = find_similar_imgs(n_nns)

    for i, file_index in enumerate(nns[:len]):
        print(file_index_to_file_name[file_index], end=',')


if __name__ == '__main__':
    build_annoy_index(1)
    get_img_list(50)