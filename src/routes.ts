export const publicRoutes = ["/","/auth/new-verification"];

export const authRoutes = ["/auth/login", "/auth/register", "/auth/error","/auth/reset","/auth/new-password"];

export const apiAuthPrefix = "/api/auth";

export const getDefaultLoginRedirect = (role?: string) => {
  switch (role) {
    case "STUDENT":
      return "/student/dashboard";
    case "TEACHER":
      return "/teacher/dashboard";
    case "ADMIN":
      return "/admin/dashboard";
    default:
      return "/";
  }
};
