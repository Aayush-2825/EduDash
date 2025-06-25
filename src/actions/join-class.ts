"use server";
import { db } from "@/lib/db";
import { JoinClassSchema } from "@/schemas";
import * as z from "zod";
import { auth } from "@/auth";

export const JoinClass = async (values: z.infer<typeof JoinClassSchema>) => {
  const validatedFields = JoinClassSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors.map((err) => err.message).join(", "),
      success: "",
    };
  }

  const session = await auth();
  const userId = session?.user.id;
  if (!userId) return { error: "Unauthorized", success: "" };

  const { classID } = validatedFields.data;

  try {
    // 1. Check if class exists and has subjects
    const foundClass = await db.class.findUnique({
      where: { code: classID },
      include: { subjects: true },
    });

    if (!foundClass) return { error: "Class not found", success: "" };
    // if (foundClass.subjects.length === 0) {
    //   return { error: "This class has no subjects and can't be joined", success: "" };
    // }

    // 2. Check if student is already in this class
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        studentClasses: {
          where: { code: classID },
        },
      },
    });

    if (user?.studentClasses.length) {
      return { error: "You are already enrolled in this class", success: "" };
    }

    // 3. Enroll student
    await db.user.update({
      where: { id: userId },
      data: {
        studentClasses: {
          connect: { code: classID },
        },
      },
    });

    return { success: "Enrolled in class successfully!", error: "" };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong. Try again.", success: "" };
  }
};
