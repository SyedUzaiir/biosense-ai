"use client";

import { useState, useRef } from 'react';
import { Camera, Upload, X, Check, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function EmotionCapture({ onImageSet }: { onImageSet: (file: File | null) => void }) {
  const [mode, setMode] = useState<'idle' | 'camera'>('idle');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    setMode('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access the camera. Please allow permissions or upload a file instead.");
      setMode('idle');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    setMode('idle');
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImagePreview(dataUrl);
        
        // Convert dataUrl to File object
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
            onImageSet(file);
          }
        }, 'image/jpeg');
      }
      stopCamera();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageSet(file);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    onImageSet(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-blue-500" />
        Emotion Analysis Input
      </h3>
      
      <AnimatePresence mode="wait">
        {imagePreview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative rounded-xl overflow-hidden bg-slate-100 aspect-video flex-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePreview} alt="Captured Emotion" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
              <div className="flex gap-2 w-full">
                <button
                  type="button"
                  className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
                  onClick={clearImage}
                >
                  <X className="w-4 h-4" /> Retake
                </button>
                <div className="flex-1 bg-green-500/80 backdrop-blur-md text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" /> Ready
                </div>
              </div>
            </div>
          </motion.div>
        ) : mode === 'camera' ? (
          <motion.div
            key="camera"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover transform scale-x-[-1]" 
              />
              <button
                type="button"
                onClick={stopCamera}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <button
              type="button"
              onClick={capturePhoto}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition shadow-md"
            >
              <Camera className="w-5 h-5" /> Capture Photo
            </button>
            <canvas ref={canvasRef} className="hidden" />
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 gap-4"
          >
            <button
              type="button"
              onClick={startCamera}
              className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition text-slate-500 group"
            >
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full group-hover:scale-110 transition">
                <Camera className="w-6 h-6" />
              </div>
              <span className="font-medium text-sm">Use Webcam</span>
            </button>

            <label className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition text-slate-500 cursor-pointer group">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full group-hover:scale-110 transition">
                <Upload className="w-6 h-6" />
              </div>
              <span className="font-medium text-sm">Upload File</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </motion.div>
        )}
      </AnimatePresence>
      <p className="text-xs text-slate-400 mt-4 text-center">
        Your image is processed temporarily for emotion analysis and is not stored permanently.
      </p>
    </div>
  );
}
