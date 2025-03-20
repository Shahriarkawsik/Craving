import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/">Home</Link>
              </SidebarMenuItem>
              <SidebarGroupLabel>Admin</SidebarGroupLabel>
              <SidebarMenuItem>
                <Link href="/dashboard/admin/allResturant">All Resturants</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/admin/allRiders">All Riders</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/admin/statistics">statistics</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/admin/applications">Applications</Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/admin/reviewApplication">
                  Review Applications
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
export default AppSidebar;
