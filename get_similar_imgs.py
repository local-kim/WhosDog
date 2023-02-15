import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
os.environ['KMP_DUPLICATE_LIB_OK']='True'
import tensorflow as tf
import numpy as np
import time
import glob
import sys
import os.path
from annoy import AnnoyIndex
import pickle
import matplotlib.pyplot as plt
import matplotlib.image as mpimg

PATH = "C:/Users/L-108/Desktop/web/react-node/"
INPUT_PATH = PATH + sys.argv[1]    # argument from test.js
#INPUT_PATH = "C:/Users/L-108/Desktop/web/react-node/client/public/Images/Search/1627281563962_dog1.jpg"


def preprocess_image(path):
    img = tf.io.read_file(path)
    img = tf.io.decode_jpeg(img, channels=3)
    img = tf.image.resize_with_pad(img, 224, 224)
    img  = tf.image.convert_image_dtype(img, tf.float32)[tf.newaxis, ...]

    return img


def find_similar_imgs(n_nearest_neighbors):
    dims = 256
    # n_nearest_neighbors = 20

    # LOAD inceptionV3 MODEL
    model = tf.keras.models.load_model(PATH + 'saved_model/inceptionV3/')
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=["accuracy"])

    # CALCULATE FEATURE VECTOR
    img = preprocess_image(INPUT_PATH)
    v = np.squeeze(model(img))

    # LOAD ANNOY INDEX
    t = AnnoyIndex(dims, metric='angular')
    t.load(PATH + 'annoy_index.ann')

    nearest_neighbors = t.get_nns_by_vector(v, n_nearest_neighbors, search_k=-1, include_distances=True)

    return nearest_neighbors


def get_img_list(len):
    n_nns = 100
    # LOAD FILE INFO LIST
    with open(PATH + 'file_index_to_file_name.pickle', 'rb') as f:
        file_index_to_file_name = pickle.load(f)

    (nns, distance_list) = find_similar_imgs(n_nns)

    # img_dir = os.path.join(PATH + 'dataset')

    near_img_name = []

    for i, file_index in enumerate(nns[:len]):
        near_img_name.append(file_index_to_file_name[file_index])
        print(file_index_to_file_name[file_index], end=',')

    # print(near_img_name)


if __name__ == '__main__':
    get_img_list(3)


# # SHOW TOP 20 SIMILAR IMAGES
# nrows = 2
# ncols = 10

# pic_index = 0

# fig = plt.gcf()
# fig.set_size_inches(ncols * 4, nrows * 4)

# pic_index += 20
# next_img_pix = [os.path.join(img_dir, fname) for fname in near_img_name[pic_index-20:pic_index]]

# plt.rc('font', size=12)
# for i, IMG_PATH in enumerate(next_img_pix):
#     sp = plt.subplot(nrows, ncols, i + 1)
#     sp.axis('Off')

#     img = mpimg.imread(IMG_PATH)
#     plt.imshow(img)
#     plt.text(0.5, 0.5, round(distance_list[i], 4))

# plt.show()