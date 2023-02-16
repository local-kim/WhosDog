import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
os.environ['KMP_DUPLICATE_LIB_OK']='True'
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.applications.inception_v3 import InceptionV3
from glob import glob
import random
import tensorflow as tf
from tensorflow.keras import applications, layers, losses, optimizers, metrics, Model, backend
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
from sklearn.model_selection import train_test_split
import pickle

batch_size = 64
IMG_SIZE = 224
IMG_SHAPE = (IMG_SIZE, IMG_SIZE, 3)
N_BREEDS = 89  # stanford_dogs_copy
# N_BREEDS = 120 # stanford_dogs
PATH = 'dataset/stanford_dogs_modified/train'

# Create Training Dataset
train_ds = tf.keras.preprocessing.image_dataset_from_directory(
  PATH,
  validation_split=0.2,
  subset="training",
  seed=123,
  image_size=(IMG_SIZE, IMG_SIZE),
  batch_size=batch_size)

# Create Validation Dataset
val_ds = tf.keras.preprocessing.image_dataset_from_directory(
  PATH,
  validation_split=0.2,
  subset="validation",
  seed=123,
  image_size=(IMG_SIZE, IMG_SIZE),
  batch_size=batch_size)


# Save class names
class_names = train_ds.class_names
with open('resources/class_names.pickle', 'wb') as f:
    pickle.dump(class_names, f, pickle.HIGHEST_PROTOCOL)


for image_batch, labels_batch in train_ds:
  break

# Configure the dataset for performance
AUTOTUNE = tf.data.experimental.AUTOTUNE
train_ds = train_ds.cache().shuffle(1000).prefetch(buffer_size=AUTOTUNE)
val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)

# Data augmentation
data_augmentation = keras.Sequential(
  [
    layers.experimental.preprocessing.RandomFlip("horizontal",input_shape=IMG_SHAPE),
    layers.experimental.preprocessing.RandomRotation(0.1),
    layers.experimental.preprocessing.RandomZoom(0.1),
  ]
)

# Create breed classification model
base_model = tf.keras.applications.MobileNetV2(input_shape = IMG_SHAPE, include_top=False, weights='imagenet')

base_model.trainable = False

model = tf.keras.Sequential([
  data_augmentation,
  layers.experimental.preprocessing.Rescaling(1./255, input_shape=IMG_SHAPE),
  base_model,
  tf.keras.layers.GlobalAveragePooling2D(),
  tf.keras.layers.Dense(N_BREEDS, activation='softmax')
])

# Compile and train model
model.compile(optimizer=tf.keras.optimizers.Adamax(0.0001),
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy', 'top_k_categorical_accuracy'])

epochs = 30
history = model.fit(
  train_ds,
  validation_data=val_ds,
  epochs=epochs
)

# Save breed classification model
model.save('../saved_model/breed_classification')
