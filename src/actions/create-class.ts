"use server";

import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { CreateClassSchema } from "@/schemas";
import * as z from "zod";
import { auth } from "@/auth"; // adjust based on your NextAuth integration

export const createClass = async (
  values: z.infer<typeof CreateClassSchema>
) => {
  const validated = CreateClassSchema.safeParse(values);
  if (!validated.success) {
    return {
      error: validated.error.errors.map((e) => e.message).join(", "),
    };
  }

  const session = await auth();
  const user = session?.user;

  if (!user || user.role !== "TEACHER") {
    return { error: "Only teachers can create classes." };
  }

  const code = uuidv4().split("-")[0]; // short code

  try {
    const createdClass = await db.class.create({
      data: {
        name: values.name,
        description: values.description,
        code,
        teachers: {
          create: {
            teacherId: user.id,
          },
        },
      },
    });

    return { success: `Class "${createdClass.name}" created with code ${code}` };
  } catch (error) {
    return { error: "Failed to create class." };
  }
};
