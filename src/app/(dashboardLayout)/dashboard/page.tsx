"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png";

export function AppSidebar() {
  const pathName = usePathname();
  // const role = "Admin";
  return (
    <Sidebar className="">
      <SidebarContent>
        <SidebarGroup className="mt-2 mb-10">
          <SidebarGroupLabel className="text-center border-b-2  py-7 flex justify-center">
            <Link href="/" className=" pb-2 ">
              <Image
                className="mx-auto "
                src={logo}
                alt="logo"
                width={70}
                height={70}
              />
            </Link>
            {/* <small className="text-xl font-semibold bg-green-500 text-white px-2  rounded-xl mb-2">
            {role}
            </small> */}
          </SidebarGroupLabel>
          {/* all admin dashboard */}
          <SidebarGroupContent className="mt-2">
            <SidebarMenu className="">
              <SidebarMenuItem
                className={`${
                  pathName === "/dashboard/admin/allResturant"
                    ? " font-semibold shadow-md shadow-gray-300"
                    : "font-normal"
                } py-2  px-5  bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
              >
                <Link href="/dashboard/admin/allResturant">All Resturant</Link>
              </SidebarMenuItem>

              <SidebarMenuItem
                className={`${
                  pathName === "/dashboard/admin/allRiders"
                    ? " font-semibold shadow-md shadow-gray-300"
                    : "font-normal"
                } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
              >
                <Link href="/dashboard/admin/allRiders">All Riders</Link>
              </SidebarMenuItem>

              <SidebarMenuItem
                className={`${
                  pathName === "/dashboard/admin/statistics"
                    ? " font-semibold shadow-md shadow-gray-300"
                    : "font-normal"
                } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
              >
                <Link href="/dashboard/admin/statistics">Statistics</Link>
              </SidebarMenuItem>
              <SidebarMenuItem
                className={`${
                  pathName === "/dashboard/admin/applications"
                    ? " font-semibold shadow-md shadow-gray-300"
                    : "font-normal"
                } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
              >
                <Link href="/dashboard/admin/applications">Applications</Link>
              </SidebarMenuItem>
              
              <SidebarMenuItem   className={`${
                  pathName === "/dashboard/admin/reviewApplication"
                    ? " font-semibold shadow-md shadow-gray-300"
                    : "font-normal"
                } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}>
                <Link
                  href="/dashboard/admin/reviewApplication"
             
                >
                  Review Applications
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>

          {/* resturant owner's dashboard */}
          <SidebarGroupContent className="my-10">
            <SidebarMenu>
              <SidebarMenuItem   className={`${
                  pathName === "/dashboard/resturantOwner/addFood"
                    ? " font-semibold shadow-md shadow-gray-300"
                    : "font-normal"
                } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}>
                <Link
                  href="/dashboard/resturantOwner/addFood"
                 
                >
                  Add Food
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem   className={`${
                  pathName === "/dashboard/resturantOwner/allFoodItem"
                    ? " font-semibold shadow-md shadow-gray-300"
                    : "font-normal"
                } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}>
                <Link
                  href="/dashboard/resturantOwner/allFoodItem"
                  
                >
                  All Food Item
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem   className={`${
                  pathName === "/dashboard/resturantOwner/addResturant"
                    ? " font-semibold shadow-md shadow-gray-300"
                    : "font-normal"
                } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}>
                <Link
                  href="/dashboard/resturantOwner/addResturant"
                 
                >
                  Add Resturant
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem   className={`${
                  pathName === "/dashboard/resturantOwner/statistics"
                    ? " font-semibold shadow-md shadow-gray-300"
                    : "font-normal"
                } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}>
                <Link
                  href="/dashboard/resturantOwner/statistics"
                  
                >
                  Statistics
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem   className={`${
                  pathName === "/dashboard/resturantOwner/orderHistory"
                    ? " font-semibold shadow-md shadow-gray-300"
                    : "font-normal"
                } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}>
                <Link
                  href="/dashboard/resturantOwner/orderHistory"
                 
                >
                  Order History
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>

          {/* riders dashboard */}
          <SidebarGroupContent className="">
            <SidebarMenu>
              <SidebarMenuItem   className={`${
                  pathName ==="/dashboard/riders/availableOrders"
                    ? " font-semibold shadow-md shadow-gray-300"
                    : "font-normal"
                } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}>
                <Link
                  href="/dashboard/riders/availableOrders"
                 
                >
                  Available Orders
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem   className={`${
                  pathName === "/dashboard/riders/myOrders"
                    ? " font-semibold shadow-md shadow-gray-300"
                    : "font-normal"
                } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}>
                <Link
                  href="/dashboard/riders/myOrders"
                  
                >
                  My Orders
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem   className={`${
                  pathName === "/dashboard/riders/orderHistory"
                    ? " font-semibold shadow-md shadow-gray-300"
                    : "font-normal"
                } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}>
                <Link
                  href="/dashboard/riders/orderHistory"
                
                >
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
