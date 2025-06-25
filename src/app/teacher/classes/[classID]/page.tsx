import { BreadcrumbResponsive } from "@/components/general/BreadcrumResponsive";
import { ClassHeader } from "@/components/classes/ClassHeader"
import { StubjectList } from "@/components/classes/StubjectList"
import { getBreadcrumbLabels } from "@/lib/breadcrums";

export default async function Page({
  params,
}: {
  params: Promise<{ classID: string }>
}) {
  const paramObj = await params
  const { classID } = paramObj
  const labels = await getBreadcrumbLabels(paramObj)
  const breadcrumbItems = [
    { href: "/teacher", label: "Teacher" },
    { href: "/teacher/classes", label: "Classes" },
    { label: labels.classID },
     // current page
  ];
  return(
    <div>
    <ClassHeader label="Subjects" headerFor='subject' classID={classID} isStudent={false}/>
    <BreadcrumbResponsive items={breadcrumbItems} />
    <StubjectList classID={classID} isStudent={false}/>
    </div>
  )
}