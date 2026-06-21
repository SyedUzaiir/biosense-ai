"use client";

import { useEffect, useRef, useState } from "react";
import { predictImage } from "@/lib/api";

export default function WebcamPredict() {

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [emotion, setEmotion] = useState("Waiting...");
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    startWebcam();
  }, []);

  const startWebcam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const captureAndPredict = async () => {

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx?.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg");

    const result = await predictImage(imageData);

    setEmotion(result.emotion);
    setConfidence(result.confidence);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      captureAndPredict();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-xl font-bold mb-4">Live Emotion Detection</h2>

      <video
        ref={videoRef}
        autoPlay
        className="border rounded mb-4"
      />

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <h3 className="text-lg">
        Emotion: <b>{emotion}</b>
      </h3>

      <h3 className="text-lg">
        Confidence: <b>{confidence}%</b>
      </h3>

    </div>
  );
}
