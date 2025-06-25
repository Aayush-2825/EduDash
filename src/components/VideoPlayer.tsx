"use client"
import { useEffect, useRef } from 'react';

// Extend the Window interface to include cloudinary
declare global {
  interface Window {
    cloudinary: any;
  }
}

const VideoPlayer: React.FC = () => {
  const cloudinaryRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (cloudinaryRef.current) return;

    cloudinaryRef.current = window.cloudinary;
    cloudinaryRef.current.videoPlayer(videoRef.current, {
      cloud_name: 'colbycloud-examples'
    });
  }, []);

  return (
    <video
      ref={videoRef}
    />
  );
};

export default VideoPlayer;