"use client";
import { useEffect, useRef } from "react";

export default function TestWebcam() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        alert("Camera error: " + err);
      }
    }

    start();
  }, []);

  return (
    <div>
      <h2>Webcam Test</h2>
      <video ref={videoRef} autoPlay width="400" height="300" />
    </div>
  );
}
