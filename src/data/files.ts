// src/data/file.ts
import { db } from "@/lib/db";

export const getFilesBySubjectID = async (subjectID: string) => {
  const files = await db.file.findMany({
    where: { subjectId: subjectID },
    include: {
      teacher: true,
    }
  });

  return files;
};
