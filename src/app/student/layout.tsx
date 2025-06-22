import { cookies } from "next/headers"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/general/AppSidebar"
import { Navbar } from "@/components/general/Navbar"
import { dashboardStudentMenu } from "@/constants/dashboardMenu"

export default async function Dashboard({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  

  return (
    <SidebarProvider defaultOpen={defaultOpen} >
      <AppSidebar Option={dashboardStudentMenu} />
      <main  className="flex flex-col w-full h-screen overflow-hidden">
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  )
}