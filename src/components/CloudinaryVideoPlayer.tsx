'use client';

import { useEffect, useRef, useState } from 'react';

interface CloudinaryVideoPlayerProps {
  publicId: string;
  width?: string | number;
  height?: string | number;
}

export const CloudinaryVideoPlayer = ({
  publicId,
  width = '100%',
  height = 'auto',
}: CloudinaryVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if ((window as any).cloudinary?.videoPlayer && videoRef.current) {
        const cld = (window as any).cloudinary;

        const player = cld.videoPlayer(videoRef.current, {
          cloud_name: 'dp3wjl511', // Your Cloud Name
          secure: true,
          controls: true,
        //   transformation: {
        //     streaming_profile: 'auto',
        //   },
        });

        player.source(publicId);
        setIsPlayerReady(true);
        clearInterval(interval);
      }
    }, 100);

    const timeout = setTimeout(() => clearInterval(interval), 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [publicId]);

  return (
    <div className="w-full  rounded-xl overflow-hidden shadow-lg">
      <video
        ref={videoRef}
        playsInline
        muted
        className="cld-video-player cld-fluid"
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
        }}
      />
      {!isPlayerReady && (
        <p className="text-sm text-gray-500 mt-2 animate-pulse">Loading video player...</p>
      )}
    </div>
  );
};
