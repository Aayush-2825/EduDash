import { auth } from "@/auth"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export async function AppSidebar({Option}: {Option: {name: string, url: string, icon: React.ElementType}[]}) {

  const user = await auth()
   // This should be replaced with actual user data, e.g., from context or props
  
  return (
    

    <Sidebar collapsible="icon" >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{user?.user.name}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Option.map((options) => (
                <SidebarMenuItem key={options.name}>
                  <SidebarMenuButton asChild>
                    <a href={options.url}>
                      <options.icon />
                      <span>{options.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}