import { cookies } from "next/headers"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/general/AppSidebar"
import { Navbar } from "@/components/general/Navbar"
import { dashboardTeacherMenu } from "@/constants/dashboardMenu"


export default async function Dashboard({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  

  return (
    <SidebarProvider defaultOpen={defaultOpen} >
      <AppSidebar Option={dashboardTeacherMenu} />
      <main  className="flex flex-col w-full h-screen overflow-y-hidden ">
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  )
}