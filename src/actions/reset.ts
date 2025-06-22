"use server"

import * as z from "zod"

import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/tokens"

export const reset = async(values:z.infer<typeof ResetSchema>) =>{
    const validation = ResetSchema.safeParse(values);
    
      if (!validation.success) {
        return {
          error: validation.error.errors.map((err) => err.message).join(", "),
          success: "",
        };
      }

    const {email} =validation.data

    const existingUser = getUserByEmail(email);

    if(!existingUser){
        return {error:"Email not found"}
    }

    const passwordResetToken = await generatePasswordResetToken(email)

    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    )


    return {success:"Reset email sent"}
}