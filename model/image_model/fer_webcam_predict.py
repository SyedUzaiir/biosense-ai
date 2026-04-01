import cv2
from fer.fer import FER
import csv
from datetime import datetime

detector = FER(mtcnn=True)

cap = cv2.VideoCapture(0)

print("Press Q to quit")

# create csv if not exists
with open("emotions_log.csv", "a", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["time", "emotion"])

while True:
    ret, frame = cap.read()

    if not ret:
        break

    emotions = detector.detect_emotions(frame)

    if emotions:
        emotion_data = emotions[0]["emotions"]
        emotion = max(emotion_data, key=emotion_data.get)

        # LOG TO CSV
        with open("emotions_log.csv", "a", newline="") as f:
            writer = csv.writer(f)
            writer.writerow([datetime.now(), emotion])

        cv2.putText(frame, f"Emotion: {emotion}",
                    (20, 50),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    1, (0, 255, 0), 2)

    cv2.imshow("FER Emotion Detection", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
