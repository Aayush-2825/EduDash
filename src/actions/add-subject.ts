"use server";

import { db } from "@/lib/db";
import { AddSubjectSchema } from "@/schemas";
import * as z from "zod";
import { auth } from "@/auth";

export const AddSubject = async (
  values: z.infer<typeof AddSubjectSchema>,
  classId: string
) => {
  const validated = AddSubjectSchema.safeParse(values);
  if (!validated.success) {
    return {
      error: validated.error.errors.map((e) => e.message).join(", "),
    };
  }

  const session = await auth();
  const user = session?.user;

  if (!user || user.role !== "TEACHER") {
    return { error: "Only teachers can create subjects." };
  }

  try {
    // Ensure the teacher owns or is assigned to this class
    const teacherOwnsClass = await db.teacherClass.findFirst({
      where: {
        teacher: { email: user.email! },
        classId: classId,
      },
    });

    if (!teacherOwnsClass) {
      return { error: "Unauthorized to add subject to this class." };
    }

    const createdSubject = await db.subject.create({
      data: {
        name: values.name,
        classId: classId,
      },
    });

    return {
      success: `Subject "${createdSubject.name}" added successfully.`,
    };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create subject." };
  }
};
