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
              {/* all admin dashboard */}
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
              {/* resturant owner's dashboard  */}
              <SidebarMenuItem>
                <Link href="/dashboard/resturantOwner/addFoodItem">
                  Add Food Item
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/resturantOwner/allFoodItem">
                  All Food Item
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/resturantOwner/addResturant">
                  Add Resturant
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/resturantOwner/statistics">
                  Statistics
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/resturantOwner/orderHistory">
                  Order History
                </Link>
              </SidebarMenuItem>
              {/* riders dashboard  */}
              <SidebarMenuItem>
                <Link href="/dashboard/riders/availableOrders">
                  Available Orders
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/riders/myOrders">
                  My Orders
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/riders/orderHistory">
                  Orders History
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
