import { db } from "@/lib/db";

export const getBreadcrumbLabels = async (params: Record<string, string>) => {
  const labels: Record<string, string> = {};

  // Convert IDs to readable labels
  if (params.classID) {
    const classData = await db.class.findUnique({
      where: { id: params.classID },
      select: { name: true },
    });
    labels.classID = classData?.name || "Class";
  }

  if (params.subjectID) {
    const subjectData = await db.subject.findUnique({
      where: { id: params.subjectID },
      select: { name: true },
    });
    labels.subjectID = subjectData?.name || "Subject";
  }

  // Add more (e.g. testId, studentId) as needed

  return labels;
};
