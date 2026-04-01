import tensorflow as tf
import cv2
import numpy as np
from health_logic import get_health_insight

# Load trained model
model = tf.keras.models.load_model("model.h5")

labels = ["angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"]

# Read test image
img = cv2.imread("image.png")   # Make sure this file exists in same folder

if img is None:
    print("ERROR: Image path incorrect.")
    exit()

# Preprocess image
img = cv2.resize(img, (48,48))
img = img / 255.0
img = np.expand_dims(img, axis=0)

# Prediction
pred = model.predict(img)
emotion = labels[np.argmax(pred)]

confidence = np.max(pred) * 100

# Convert emotion to mental health result
health_insight = get_health_insight(emotion)

print("Detected Emotion:", emotion)
print("Confidence:", round(confidence, 2), "%")
print("Mental Health Assessment:", health_insight)
