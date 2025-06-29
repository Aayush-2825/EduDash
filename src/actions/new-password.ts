"use server"

import * as z from'zod'
import { NewPasswordSchema } from '@/schemas'
import {  getPasswordResetTokenByToken } from '@/data/password-reset-token'
import { getUserByEmail } from '@/data/user'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'

export const newPassword = async(
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null
) => {
    if(!token){
        return {error:"Token does not exists!"}
    }

    const validateFields  = NewPasswordSchema.safeParse(values);

    if(!validateFields.success) {
        return {error:"Invalid Fields"}
    }

    const {password} = validateFields.data

    const existingToken = await getPasswordResetTokenByToken(token)

    if(!existingToken) return {error:"Invalid Token!"}

    const hasExpired = new Date(existingToken.expires) <new Date()

    if(hasExpired) return {error:'Token expired'}

    const existingUser = await getUserByEmail(existingToken.email)
    
    if(!existingUser) return {error:"Email does not exist"}

    const hashPassword = await bcrypt.hash(password,10)

    await db.user.update({
        where:{id:existingUser.id},
        data:{password: hashPassword}
    })

    await db.passwordResetToken.delete({
       where: {id: existingToken.id}
    })

    return {success:'Password Updated!'}
}