import { db } from "@/lib/db";

export const getSubjectsByClassId = async (classId: string) => {
  try {
    const classWithSubjects = await db.class.findUnique({
      where: { id: classId }, // "id" is the actual field name in your Class model
      include: {
        subjects: true, // This will fetch all related subjects
      },
    });

    return classWithSubjects?.subjects || [];
  } catch (error) {
    console.error("Failed to fetch subjects:", error);
    return [];
  }
};
