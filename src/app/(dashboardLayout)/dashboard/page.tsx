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
  const role = "Admin";
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          {/* all admin dashboard */}
          <SidebarGroupLabel><small className="text-xl font-semibold bg-green-500 text-white px-3 rounded-xl">{role}</small></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
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
          {/* resturant owner's dashboard  */}
          <SidebarGroupContent>
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
          </SidebarGroupContent>
          {/* riders dashboard  */}
          <SidebarGroupContent>
             <SidebarMenuItem>
              <Link href="/dashboard/riders/availableOrders">
                Available Orders
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard/riders/myOrders">My Orders</Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard/riders/orderHistory">Orders History</Link>
            </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
export default AppSidebar;


 