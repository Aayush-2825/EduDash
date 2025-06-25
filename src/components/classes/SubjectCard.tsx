import Link from "next/link";
import { FaRegFolderOpen } from "react-icons/fa";
import { Card } from "@/components/ui/card"; // Update if your path is different

interface SubjectCardProps {
  data: {
    id: string;
    name: string;
  };
  classID: string;
  isStudent: boolean
}

export const SubjectCard = ({ data, classID,isStudent }: SubjectCardProps) => {
  return (
    <div className="w-full">
      <Link href={`/${(isStudent)?"student":"teacher"}/classes/${classID}/subject/${data.id}`} passHref>
        <Card
          className="group p-5 h-full rounded-xl shadow hover:shadow-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 bg-white dark:bg-gray-900 transition duration-200 ease-in-out cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-full text-blue-600 dark:text-white group-hover:scale-110 transition-transform duration-200">
              <FaRegFolderOpen className="text-3xl" />
            </div>
            <span className="text-base font-semibold text-gray-900 dark:text-white truncate w-full">
              {data.name}
            </span>
          </div>
        </Card>
      </Link>
    </div>
  );
};
