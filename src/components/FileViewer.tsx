"use client";

import { CldVideoPlayer } from "next-cloudinary";
import Image from "next/image";

interface FileViewerProps {
  title: string;
  publicId: string;
  fileUrl: string;
}

export const FileViewer = ({ title, publicId, fileUrl }: FileViewerProps) => {
  const isVideo = fileUrl.match(/\.(mp4|mov|avi|m3u8)$/);
  const isImage = fileUrl.match(/\.(jpg|jpeg|png|webp)$/);
  const isPdf = fileUrl.match(/\.(pdf)$/);

  if (isVideo) {
    return (
      <div className="w-full max-w-4xl aspect-video mx-auto">
        <CldVideoPlayer
          src={publicId}
          width="1280"
          height="720"
          sourceTypes={["hls"]}
          transformation={{
            streaming_profile: "hd", // your custom profile
          }}
          autoPlay={false}
          controls
        />
      </div>
    );
  }

  if (isImage) {
    return (
      <Image
        src={fileUrl}
        alt={title}
        className="max-h-[70vh] w-full object-contain rounded-lg shadow"
      />
    );
  }

  if (isPdf) {
    return (
      <iframe
        src={fileUrl}
        title={title}
        className="w-full h-[70vh] rounded-lg border"
      />
    );
  }

  return <p className="text-red-500">Unsupported file type</p>;
};
