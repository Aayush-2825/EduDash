import { ClassHeader } from "./ClassHeader";
import { ClassCard } from "./ClassCard";
import { getStudentClasses, getTeacherClasses } from "@/data/class";
import { auth } from "@/auth";

export default async function ClassDashboard({
  isStudent,
}: {
  isStudent: boolean;
}) {
  const user = await auth();
  if (!user) return <div>Unauthorized</div>;

  const email = user.user.email || "";
  const role = user.user.role;

  type ClassType = Awaited<ReturnType<typeof getStudentClasses>>;

  let classes: ClassType = [];

  if (isStudent && role === "STUDENT") {
    classes = await getStudentClasses(email);
  } else if (!isStudent && role === "TEACHER") {
    classes = await getTeacherClasses(email);
  } else {
    return <div>Unauthorized</div>; // prevent role mismatch
  }

  if (isStudent) {
    classes = await getStudentClasses(user?.user.email || "");
  } else {
    classes = await getTeacherClasses(user?.user.email || "");
  }
  return (
    <main>
      <ClassHeader
        label="Your Classes"
        headerFor="class"
        isStudent={isStudent}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ">
        {classes.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No classes available.
          </p>
        ) : (
          classes.map((item) => (
            <ClassCard data={item} key={item.id} isStudent={isStudent} />
          ))
        )}
      </div>
    </main>
  );
}
