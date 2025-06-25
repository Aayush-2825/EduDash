import { getBreadcrumbLabels } from "@/lib/breadcrums";
import { BreadcrumbResponsive } from "@/components/general/BreadcrumResponsive";
import { ClassHeader } from "@/components/classes/ClassHeader";
import { getFilesBySubjectID } from "@/data/files";
import { FileList } from "@/components/classes/FileList";


export default async function StudentSubjectPage({
  params,
}: {
  params: Promise<{ classID: string , subjectID: string  }>
} ) {
  const paramObj = await params
  const {classID , subjectID} = paramObj
  const labels = await getBreadcrumbLabels(paramObj)
  const filesRaw = await getFilesBySubjectID(subjectID)
  const files = filesRaw.map((file: any) => ({
    ...file,
    createdAt: file.createdAt instanceof Date ? file.createdAt.toISOString() : file.createdAt,
  }));

  const breadcrumbItems = [
    { href: "/student", label: "Dashboard" },
    { href: "/student/classes", label: "Classes" },
    { href: `/student/classes/${(await params).classID}`, label: labels.classID },
    { label: labels.subjectID }, // current page
  ];

  return (
    <div>
      <ClassHeader headerFor='lecture' classID={classID} subjectID={subjectID}  label="Files" isStudent={true}/>
      <BreadcrumbResponsive items={breadcrumbItems} />
      {/* Page Content */}
      <FileList  files={files}/>
    </div>
  );
}
