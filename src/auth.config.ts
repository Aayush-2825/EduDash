import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import type { NextAuthConfig } from "next-auth";
import { getUserByEmail, getUserById } from "./data/user";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

const config: NextAuthConfig = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        const validated = LoginSchema.safeParse(credentials);
        if (validated.success) {
          const { email, password } = validated.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) throw new Error("Invalid credentials");
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (isPasswordValid) return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (existingUser) {
        token.role = existingUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
};

export default config;
