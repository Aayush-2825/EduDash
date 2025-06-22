// app/student/page.tsx
import { redirect } from "next/navigation";

export default function StudentPage() {
  redirect("/teacher/dashboard");
}
