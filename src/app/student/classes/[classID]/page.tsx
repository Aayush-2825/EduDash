import { BreadcrumbResponsive } from "@/components/general/BreadcrumResponsive";
import { ClassHeader } from "@/components/classes/ClassHeader"
import { StubjectList } from "@/components/classes/StubjectList"
import { getBreadcrumbLabels } from "@/lib/breadcrums";

export default async function StudentSubject({
  params,
}: {
  params: Promise<{ classID: string }>
}) {
  const paramObj = await params
  const { classID } = paramObj
  const labels = await getBreadcrumbLabels(paramObj)
  const breadcrumbItems = [
    { href: "/student", label: "Dashboard" },
    { href: "/student/classes", label: "Classes" },
    { label: labels.classID },
     // current page
  ];
  return(
    <div>
    <ClassHeader label="Subjects" headerFor='subject' classID={classID} isStudent={true}/>
    <BreadcrumbResponsive items={breadcrumbItems} />
    <StubjectList classID={classID} isStudent={true}/>
    </div>
  )
}