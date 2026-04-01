from cnn_model import build_cnn
from preprocessing import get_data_generators
import os

BASE_DIR = os.path.dirname(__file__)
DATASET_PATH = os.path.join(BASE_DIR, "datasets/train")

train_gen, val_gen = get_data_generators(DATASET_PATH)

model = build_cnn(input_shape=(48,48,3), num_classes=train_gen.num_classes)

history = model.fit(
    train_gen,
    validation_data=val_gen,
    epochs=25
)

model.save("model.h5")
print("Model saved as model.h5")
