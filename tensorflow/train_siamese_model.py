import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
os.environ['KMP_DUPLICATE_LIB_OK']='True'
import numpy as np
from glob import glob
import random
import tensorflow as tf
from tensorflow.keras import applications, layers, losses, optimizers, metrics, Model, backend
from tensorflow.keras.applications.inception_v3 import InceptionV3

IMG_SIZE = 224
IMG_SHAPE = (IMG_SIZE, IMG_SIZE, 3)
MODEL = 'inceptionV3_6'


class DistanceLayer(layers.Layer):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def call(self, anchor, positive, negative):
        ap_distance = tf.reduce_sum(tf.square(anchor - positive), -1)
        an_distance = tf.reduce_sum(tf.square(anchor - negative), -1)
        return (ap_distance, an_distance)


def get_siamese_model(model):
    # Define the tensors for the input images
    anchor_input = layers.Input(name="Anchor", shape=IMG_SHAPE)
    positive_input = layers.Input(name="Positive", shape=IMG_SHAPE)
    negative_input = layers.Input(name="Negative", shape=IMG_SHAPE)

    # Add a customized layer to compute the absolute difference between the encodings
    distances = DistanceLayer()(
        model(tf.keras.applications.inception_v3.preprocess_input(anchor_input)),
        model(tf.keras.applications.inception_v3.preprocess_input(positive_input)),
        model(tf.keras.applications.inception_v3.preprocess_input(negative_input)),
    )
    
    # Connect the inputs with the outputs
    siamese_net = Model(inputs=[anchor_input, positive_input, negative_input], outputs=distances, name='SiameseNet')
    
    # return the model
    return siamese_net


class SiameseModel(Model):
    def __init__(self, siamese_network, margin=0.5):
        super(SiameseModel, self).__init__()
        self.siamese_network = siamese_network
        self.margin = margin
        self.loss_tracker = metrics.Mean(name="loss")

    def call(self, inputs):
        return self.siamese_network(inputs)

    def train_step(self, data): # model.fit
        with tf.GradientTape() as tape:
            loss = self._compute_loss(data)

        gradients = tape.gradient(loss, self.siamese_network.trainable_weights)

        self.optimizer.apply_gradients(
            zip(gradients, self.siamese_network.trainable_weights)
        )

        self.loss_tracker.update_state(loss)
        return {"loss": self.loss_tracker.result()}

    def test_step(self, data):  # model.evaluate
        loss = self._compute_loss(data)

        self.loss_tracker.update_state(loss)
        return {"loss": self.loss_tracker.result()}

    def _compute_loss(self, data):
        ap_distance, an_distance = self.siamese_network(data)

        loss = ap_distance - an_distance
        loss = tf.maximum(loss + self.margin, 0.0)
        return loss

    @property
    def metrics(self):
        return [self.loss_tracker]


base_model = tf.keras.models.load_model('../saved_model/' + MODEL)
model = get_siamese_model(base_model)
siamese_model = SiameseModel(model)

siamese_model.compile(optimizer=optimizers.Adam(0.00005))


# Preprocess dataset
PATH = 'dataset/stanford_dogs_modified/train'

classes = os.listdir(PATH)
image_list = glob(PATH + '/*/*')
random.shuffle(image_list)
label_list = [classes.index(name.split('\\')[-2]) for name in image_list]


def parse_image(image_list):
    image = tf.io.read_file(image_list) # 이미지 파일 읽기
    image = tf.image.decode_jpeg(image, channels=3) # JPEG-encoded -> uint8 tensor (RGB format)
    # image = tf.image.resize(image, [IMG_SIZE, IMG_SIZE]) # 이미지 사이즈 변경
    return image


filenames_ds = tf.data.Dataset.from_tensor_slices(image_list)
images_ds = filenames_ds.map(parse_image, num_parallel_calls=tf.data.experimental.AUTOTUNE) # 병렬처리
labels_ds = tf.data.Dataset.from_tensor_slices(label_list)

ds = tf.data.Dataset.zip((images_ds, labels_ds)) # 이미지, 라벨 병합
ds = ds.batch(2048)


def create_batch(batch_size=256):
    x_anchors = np.zeros((batch_size, 224, 224, 3))
    x_positives = np.zeros((batch_size, 224, 224, 3))
    x_negatives = np.zeros((batch_size, 224, 224, 3))
    
    for i in range(0, batch_size):
        random_index = random.randint(0, image_batch.shape[0] - 1)
        x_anchor = image_batch[random_index]    # anchor image
        y = label_batch[random_index].numpy()   # anchor label
        
        indices_for_pos = np.squeeze(np.where(label_batch.numpy() == y))    # positive labels
        indices_for_neg = np.squeeze(np.where(label_batch.numpy() != y))    # negative labels

        x_positive = image_batch[indices_for_pos[random.randint(0, len(indices_for_pos) - 1)]]
        x_negative = image_batch[indices_for_neg[random.randint(0, len(indices_for_neg) - 1)]]

        x_anchors[i] = x_anchor
        x_positives[i] = x_positive
        x_negatives[i] = x_negative
        
    return [x_anchors, x_positives, x_negatives]


def data_generator(batch_size=256):
    while True:
        x = create_batch(batch_size)
        yield x


for image_batch, label_batch in ds.take(5):
   pass

batch_size = 16
epochs = 100
steps_per_epoch = int(image_batch.shape[0]/batch_size)  # 2048/64=32

history = siamese_model.fit(
    data_generator(batch_size),
    steps_per_epoch=steps_per_epoch,
    epochs=epochs, verbose=1
)

# Save inceptionV3 model
base_model.save('../saved_model/' + MODEL)