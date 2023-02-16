import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
os.environ['KMP_DUPLICATE_LIB_OK']='True'
import tensorflow as tf
from tensorflow.keras.applications.inception_v3 import InceptionV3

IMG_SIZE = 224
IMG_SHAPE = (IMG_SIZE, IMG_SIZE, 3)
MODEL = 'inceptionV3_6'


def cnn_model():
    base_model = InceptionV3(input_shape = IMG_SHAPE, include_top = False, weights = 'imagenet')

    for layer in base_model.layers:
        layer.trainable = False

    X = tf.keras.layers.Flatten()(base_model.output)
    X = tf.keras.layers.Dense(512, activation="relu")(X)
    X = tf.keras.layers.BatchNormalization()(X)
    X = tf.keras.layers.Dense(256, activation="relu")(X)
    X = tf.keras.layers.BatchNormalization()(X)
    output = tf.keras.layers.Dense(256)(X)

    model = tf.keras.Model(base_model.input, output, name='InceptionV3')

    return model


# Create & Save model
model = cnn_model()
model.save('../saved_model/' + MODEL)