"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
  const validation = LoginSchema.safeParse(values);

  if (!validation.success) {
    return {
      error: validation.error.errors.map((err) => err.message).join(", "),
      success: "",
    };
  }

  const { email, password } = validation.data;

  const existingUser = await getUserByEmail(email)

  if(!existingUser || !existingUser.email || !existingUser.password){
    return {error: "Invalid Credentials"}
  }

  if(!existingUser.emailVerified){
    const verificationToken = await generateVerificationToken(existingUser.email)
    await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token
  )
    return {success:"Confirmation Email Sent!"}
  }

  

  try {
    await signIn("credentials", {
      email,
      password,
    //   redirectTo: "/", 
    });
  } catch (error) {
    if(error instanceof AuthError){
        switch(error.type){
            case "CredentialsSignin":
                return {error:"Invalid Credentials"}
            default:
                return{error:"Something Went Wrong"}
        }
    }
    throw error;
  }
};
