// app/data/class.ts
import { db } from "@/lib/db";

export const getTeacherClasses = async (email: string) => {
  const teacher = await db.user.findUnique({
    where: { email },
    include: {
      teacherClasses: {
        include: {
          class: true,
        },
      },
    },
  });

  return teacher?.teacherClasses.map((tc) => tc.class) || [];
};

export const getStudentClasses = async (email: string) => {
  const student = await db.user.findUnique({
    where: { email },
    include: {
      studentClasses: true, // this includes all Class records
    },
  });

  return student?.studentClasses || [];
};
