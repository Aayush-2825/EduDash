"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { FaFilePdf, FaFileAlt, FaImage, FaVideo } from "react-icons/fa";

type Teacher = {
  name: string | null;
  image?: string | null;
};

type File = {
  id: string;
  title: string;
  fileUrl: string;
  createdAt: string;
  teacher: Teacher;
};

type FileListProps = {
  files: File[];
};

const getFileType = (url: string): "Video" | "Image" | "PDF" | "Other" => {
  if (url.match(/\.(mp4|mov|avi)$/i)) return "Video";
  if (url.match(/\.(jpg|jpeg|png|webp)$/i)) return "Image";
  if (url.match(/\.pdf$/i) || url.includes("application/pdf")) return "PDF";
  return "Other";
};

const getIcon = (type: string): React.JSX.Element => {
  switch (type) {
    case "Video":
      return <FaVideo className="text-4xl text-blue-500" />;
    case "Image":
      return <FaImage className="text-4xl text-green-500" />;
    case "PDF":
      return <FaFilePdf className="text-4xl text-red-500" />;
    default:
      return <FaFileAlt className="text-4xl text-gray-500" />;
  }
};

const ThumbnailImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [error, setError] = useState(false);
  if (error) {
    return <FaVideo className="text-4xl text-blue-500" />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      className="object-cover"
      onError={() => setError(true)}
    />
  );
};

export const FileList: React.FC<FileListProps> = ({ files }) => {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const sortedFiles = useMemo(() => {
    return [...files].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [files, sortOrder]);

  const filesToShow = useMemo(() => sortedFiles.slice(0, visibleCount), [sortedFiles, visibleCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 10, sortedFiles.length));
        }
      },
      { threshold: 0.1 }
    );
    const ref = loaderRef.current;
    if (ref) observer.observe(ref);
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [sortedFiles.length]);

  return (
    <div className="p-4 max-h-[80vh] overflow-y-auto">
      {/* Sort Dropdown */}
      <div className="mb-6 flex justify-end">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
          className="px-4 py-2 w-full sm:w-auto rounded-md border text-sm dark:bg-gray-800 dark:text-white bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">Sort: Newest First</option>
          <option value="oldest">Sort: Oldest First</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {filesToShow.map((file) => {
          const type = getFileType(file.fileUrl);
          const isImage = type === "Image";
          const isVideo = type === "Video";
          const thumbnailUrl =
            isVideo && file.fileUrl.includes("res.cloudinary.com")
              ? file.fileUrl.replace(/\.(mp4|mov|avi)$/i, ".jpg").replace("/upload/", "/upload/so_1/")
              : "";

          const cardContent = (
            <>
              <div className="relative aspect-video w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {isImage ? (
                  <Image
                    src={file.fileUrl}
                    alt={file.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : isVideo && thumbnailUrl ? (
                  <ThumbnailImage src={thumbnailUrl} alt={file.title} />
                ) : (
                  getIcon(type)
                )}
              </div>
              <div className="p-3 space-y-1">
                <h3 className="text-sm font-medium text-gray-800 dark:text-white line-clamp-2">
                  {file.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {file.teacher?.name || "Unknown"}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-400 dark:text-gray-500">
                  <span>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }).format(new Date(file.createdAt))}
                  </span>
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 text-[10px] font-medium">
                    {type}
                  </span>
                </div>
              </div>
            </>
          );

          // 📄 Open PDF in Google Viewer (browser tab)
          if (type === "PDF" || type== 'Other') {
            const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(file.fileUrl)}&embedded=true`;

            return (
              <a
                key={file.id}
                href={viewerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl overflow-hidden border bg-white dark:bg-gray-900 shadow hover:shadow-lg transition-all duration-300"
              >
                {cardContent}
              </a>
            );
          }

          // 🎬 Video/Image open in internal player route
          return (
            <Link
              key={file.id}
              href={`/watch/${file.id}`}
              className="group rounded-xl overflow-hidden border bg-white dark:bg-gray-900 shadow hover:shadow-lg transition-all duration-300"
            >
              {cardContent}
            </Link>
          );
        })}
      </div>

      {/* Loader Placeholder */}
      <div ref={loaderRef} className="py-6 text-center text-gray-400 text-sm">
        {visibleCount < sortedFiles.length ? "Loading more..." : "No more files"}
      </div>
    </div>
  );
};
