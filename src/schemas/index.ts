import * as z from 'zod';


export const LoginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
})

export const RegisterSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    name: z.string().min(1, { message: 'Name is required' }),
})


export const ResetSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
})

export const NewPasswordSchema = z.object({
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' })
})

export const CreateClassSchema = z.object({
  name: z.string().min(3, "Class name must be at least 3 characters"),
  description: z.string().optional(),
 });

export const AddSubjectSchema = z.object({
  name: z.string().min(3, "Class name must be at least 3 characters"),

 });

export const UploadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  file: z.any(), // Accept any file type (binary)
  type: z.enum(["IMAGE", "VIDEO", "NOTE"]),
}); 

export const JoinClassSchema = z.object({
  classID: z.string().min(6,'ID should be valid')
})

 