// app/watch/[fileId]/page.tsx
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
// import { CldVideoPlayer } from "next-cloudinary";
import Image from "next/image";
import { CloudinaryVideoPlayer } from "@/components/CloudinaryVideoPlayer";

interface Props {
  params: { fileId: string };
}

export default async function WatchPage({ params }: Props) {
  const paramObj = await params;
  const file = await db.file.findUnique({
    where: { id: paramObj.fileId },
    include: { teacher: true },
  });

  if (!file) return notFound();

  const { title, fileUrl, createdAt, teacher, fileType, publicId } = file;

  const renderMedia = () => {
    switch (fileType) {
      case "VIDEO":
        return (
          <div className="w-full max-w-4xl ">
            <CloudinaryVideoPlayer publicId={publicId}/>
          </div>
        );

      case "IMAGE":
        return (
          <div className="max-w-4xl mx-auto">
            <Image
              src={fileUrl}
              alt={title}
              width={800}
              height={600}
              className="rounded shadow"
              unoptimized
            />
          </div>
        );

      case "NOTE":
        return (
          <iframe
            src={fileUrl}
            className="w-full h-[80vh] border rounded shadow"
            title={title}
          />
        );

      default:
        return <p className="text-red-500">Unsupported file type</p>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div>{renderMedia()}</div>

      <div className="mt-6">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Uploaded by <strong>{teacher?.name || "Unknown"}</strong> on{" "}
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
