// /actions/register.ts
"use server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { ALLOWED_TEACHER_EMAILS } from "@/constants/teacher";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const RegisterAction = async (
  values: z.infer<typeof RegisterSchema>
) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors.map((err) => err.message).join(", "),
      success: "",
    };
  }

  const { email, password, name } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already registered" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // 👇 Automatically assign role based on email
  const role = ALLOWED_TEACHER_EMAILS.includes(email) ? "TEACHER" : "STUDENT";

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role,
    },
  });

  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token
  )

  return { success: "Confirmation email sent!", error: "" };
};
