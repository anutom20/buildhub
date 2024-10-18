import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [Google],
} satisfies NextAuthConfig;
