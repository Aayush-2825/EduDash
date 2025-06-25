import Link from "next/link";
import { FaRegFolderOpen } from "react-icons/fa";
import { Card } from "@/components/ui/card"; // adjust path if needed

export const ClassCard = ({ data,isStudent }: { data: { id: string; name: string },isStudent:boolean }) => {
  return (
    <div>
      <Link href={`/${(isStudent)?'student':'teacher'}/classes/${data.id}`}>
        <Card className="group p-4 rounded-2xl shadow-md hover:shadow-xl border hover:border-blue-500 transition duration-200 cursor-pointer bg-white dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-full text-blue-600 dark:text-white group-hover:scale-110 transition-transform duration-200">
              <FaRegFolderOpen className="text-3xl" />
            </div>
            <span className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-100 truncate w-full">
              {data.name}
            </span>
          </div>
        </Card>
      </Link>
    </div>
  );
};
