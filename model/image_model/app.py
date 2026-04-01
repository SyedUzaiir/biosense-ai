from flask import Flask, jsonify
from flask_cors import CORS
from generate_graphs import generate_graphs
from generate_report import generate_report
from flask import request
import cv2
import numpy as np
from fer.fer import FER
import base64

app = Flask(__name__)
CORS(app)
@app.route("/")
def home():
    return "Mental Health AI Backend is Running Successfully!"

@app.route("/graphs")
def graphs():
    generate_graphs()
    return jsonify({"message": "Graphs generated successfully"})

@app.route("/report")
def report():
    result = generate_report()
    return jsonify(result)
@app.route("/predict_frame", methods=["POST"])
def predict_frame():

    try:
        data = request.json["image"]

        img_bytes = base64.b64decode(data.split(",")[1])
        np_img = np.frombuffer(img_bytes, np.uint8)
        frame = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

        emotions = detector.detect_emotions(frame)

        if emotions:
            emotion_data = emotions[0]["emotions"]
            emotion = max(emotion_data, key=emotion_data.get)

            log = pd.DataFrame({
                "time": [pd.Timestamp.now()],
                "emotion": [emotion]
            })

            log.to_csv("emotions_log.csv", mode="a", header=False, index=False)

            return jsonify({
                "emotion": emotion,
                "confidence": round(emotion_data[emotion] * 100, 2)
            })

        return jsonify({"emotion": "No Face", "confidence": 0})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
