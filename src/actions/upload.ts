"use server";

import { v2 as cloudinary } from "cloudinary";
import { db } from "@/lib/db";
import { UploadSchema } from "@/schemas";
import { auth } from "@/auth";
import * as z from "zod";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const UploadAction = async (
  values: z.infer<typeof UploadSchema>,
  classID: string,
  subjectID: string
) => {
  const validated = UploadSchema.safeParse(values);
  if (!validated.success) {
    return { error: validated.error.errors.map((e) => e.message).join(", ") };
  }

  const session = await auth();
  const userId = session?.user.id;
  if (!userId) return { error: "Unauthorized" };

  const { name, file, type } = validated.data;
  const publicId = `${subjectID}-${classID}-${name.trim().replace(/\s+/g, "-")}`;

  try {
    let upload: import("cloudinary").UploadApiResponse;


    if (type === "VIDEO") {
      upload = await cloudinary.uploader.upload_large(file, {
        public_id: publicId,
        resource_type: "video",
        folder: "edu/videos",
        eager: [
          {
            streaming_profile: "hd",
            format: "m3u8",
          },
        ],
        eager_async: true,
      }) as import("cloudinary").UploadApiResponse;
    } else {
      upload = await cloudinary.uploader.upload(file, {
        public_id: publicId,
        resource_type: type === "IMAGE" ? "image" : "raw",
        folder: `edu/${type.toLowerCase()}s`,
      });
    }


    await db.file.create({
      data: {
        title: name,
        fileUrl: upload.secure_url,
        fileType: type,
        subjectId: subjectID,
        teacherId: userId,
        publicId: upload.public_id,
      },
    });

    return { success: "File uploaded!" };
  } catch (error: any) {
    console.error("Upload failed:", error.message);
    return { error: "Upload failed: " + error.message };
  }
};
