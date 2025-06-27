import { Role } from "@prisma/client";
import {type DefaultSession} from "next-auth";

export type ExtendUser = DefaultSession['user'] & {
    id: string;
    role : Role
}

declare module "next-auth"{
    interface Session{
        user : ExtendUser
    }
}