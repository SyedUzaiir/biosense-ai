import tensorflow as tf
import cv2
import numpy as np
from health_logic import get_health_insight

# Load trained CNN model
model = tf.keras.models.load_model("model.h5")

# Emotion labels (must match training order)
labels = ["angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"]

# Load Haar Cascade for face detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

# Open webcam
cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)

print("Press 'C' to capture photo and predict emotion")
print("Press 'Q' to quit")

while True:
    ret, frame = cap.read()

    if not ret:
        print("Failed to capture frame")
        break

    # Convert frame to grayscale for face detection
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detect faces
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    for (x, y, w, h) in faces:

        # IMPORTANT FIX: Use COLOR image instead of grayscale
        face = frame[y:y+h, x:x+w]

        # Resize to match model input
        face_resized = cv2.resize(face, (48, 48))

        # Normalize
        face_resized = face_resized / 255.0

        # Expand dimensions for model
        face_resized = np.expand_dims(face_resized, axis=0)

        # Predict emotion
        pred = model.predict(face_resized)

        emotion = labels[np.argmax(pred)]

        # Get health interpretation
        health = get_health_insight(emotion)

        # Display results on screen
        cv2.putText(frame, f"Emotion: {emotion}",
                    (x, y - 20),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.9, (0, 255, 0), 2)

        cv2.putText(frame, f"Health: {health}",
                    (x, y + h + 30),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.8, (0, 0, 255), 2)

        # Draw face rectangle
        cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)

    # Show webcam feed
    cv2.imshow("Webcam Emotion & Health Detection", frame)

    key = cv2.waitKey(1)

    # Capture image
    if key == ord('c'):
        cv2.imwrite("captured.jpg", frame)
        print("Image captured and saved as captured.jpg")

    # Quit
    if key == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
