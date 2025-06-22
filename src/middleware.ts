import authConfig from "./auth.config";
import NextAuth, { NextAuthRequest } from "next-auth";
import {
  getDefaultLoginRedirect,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";

declare module "next-auth" {
  interface User {
    role?: string;
  }
}

const { auth } = NextAuth(authConfig);

export default auth((req: NextAuthRequest) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;
  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  // ✅ Skip API route middleware
  if (isApiRoute) return;

  // ✅ Already logged in and visiting /auth/*? Redirect to dashboard
  if (isAuthRoute && isLoggedIn) {
    const role = req.auth?.user?.role || "student"; // default fallback
    return Response.redirect(
      new URL(getDefaultLoginRedirect(role), nextUrl)
    );
  }

  // ✅ Not logged in and trying to visit a protected route? Redirect to login
  if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  // ✅ Everything else is allowed
  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and static assets
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};
