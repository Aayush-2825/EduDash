import { getSubjectsByClassId } from "@/data/subject";
import { SubjectCard } from "./SubjectCard";

export const StubjectList = async({classID,isStudent}:{classID:string,isStudent:boolean}) => {
  const subjects = await getSubjectsByClassId(classID);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {subjects.map((item) => (
        <SubjectCard data={item} key={item.id} classID={classID} isStudent={isStudent} />
      ))}
    </div>
  );
};
