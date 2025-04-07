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
import { useSession } from "next-auth/react";

export function AppSidebar() {
  const pathName = usePathname();
  const { data: session } = useSession();
  console.log(session);
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
          {session?.user?.role === "Admin" && (
            <SidebarGroupContent className="mt-2">
              <SidebarMenu className="">
                <Link href="/dashboard/admin/allResturant">
                  <SidebarMenuItem
                    className={`${
                      pathName === "/dashboard/admin/allResturant"
                        ? " font-semibold shadow-md shadow-gray-300"
                        : "font-normal"
                    } py-2  px-5  bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
                  >
                    All Resturant
                  </SidebarMenuItem>
                </Link>

                <Link href="/dashboard/admin/allRiders">
                  <SidebarMenuItem
                    className={`${
                      pathName === "/dashboard/admin/allRiders"
                        ? " font-semibold shadow-md shadow-gray-300"
                        : "font-normal"
                    } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
                  >
                    All Riders
                  </SidebarMenuItem>
                </Link>

                <Link href="/dashboard/admin/statistics">
                  <SidebarMenuItem
                    className={`${
                      pathName === "/dashboard/admin/statistics"
                        ? " font-semibold shadow-md shadow-gray-300"
                        : "font-normal"
                    } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
                  >
                    Statistics
                  </SidebarMenuItem>
                </Link>
                <Link href="/dashboard/admin/applications">
                  <SidebarMenuItem
                    className={`${
                      pathName === "/dashboard/admin/applications"
                        ? " font-semibold shadow-md shadow-gray-300"
                        : "font-normal"
                    } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
                  >
                    Applications
                  </SidebarMenuItem>
                </Link>
                <Link href="/dashboard/admin/reviewApplication">
                  <SidebarMenuItem
                    className={`${
                      pathName === "/dashboard/admin/reviewApplication"
                        ? " font-semibold shadow-md shadow-gray-300"
                        : "font-normal"
                    } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
                  >
                    Review Applications
                  </SidebarMenuItem>
                </Link>
              </SidebarMenu>
            </SidebarGroupContent>
          )}

          {/* resturant owner's dashboard */}
          {session?.user?.role === "ResturantOwner" && (
            <SidebarGroupContent className="my-10">
              <SidebarMenu>
                <Link href="/dashboard/resturantOwner">
                  <SidebarMenuItem
                    className={`${
                      pathName === "/dashboard/resturantOwner"
                        ? " font-semibold shadow-md shadow-gray-300"
                        : "font-normal"
                    } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
                  >
                    Restaurant Profile
                  </SidebarMenuItem>
                </Link>
                <Link href="/dashboard/resturantOwner/addFood">
                  <SidebarMenuItem
                    className={`${
                      pathName === "/dashboard/resturantOwner/addFood"
                        ? " font-semibold shadow-md shadow-gray-300"
                        : "font-normal"
                    } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
                  >
                    Add Food
                  </SidebarMenuItem>
                </Link>
                <Link href="/dashboard/resturantOwner/allFoodItem">
                  <SidebarMenuItem
                    className={`${
                      pathName === "/dashboard/resturantOwner/allFoodItem"
                        ? " font-semibold shadow-md shadow-gray-300"
                        : "font-normal"
                    } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
                  >
                    All Food Item
                  </SidebarMenuItem>
                </Link>
                <Link href="/dashboard/resturantOwner/addResturant">
                  <SidebarMenuItem
                    className={`${
                      pathName === "/dashboard/resturantOwner/addResturant"
                        ? " font-semibold shadow-md shadow-gray-300"
                        : "font-normal"
                    } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
                  >
                    Add Resturant
                  </SidebarMenuItem>
                </Link>

                <Link href="/dashboard/resturantOwner/orderHistory">
                  <SidebarMenuItem
                    className={`${
                      pathName === "/dashboard/resturantOwner/orderHistory"
                        ? " font-semibold shadow-md shadow-gray-300"
                        : "font-normal"
                    } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
                  >
                    Order History
                  </SidebarMenuItem>
                </Link>
              </SidebarMenu>
            </SidebarGroupContent>
          )}

          {/* riders dashboard */}
          {session?.user?.role === "Rider" && (
            <SidebarGroupContent className="">
              <SidebarMenu>
                <Link href="/dashboard/riders">
                  <SidebarMenuItem
                    className={`${
                      pathName === "/dashboard/riders"
                        ? " font-semibold shadow-md shadow-gray-300"
                        : "font-normal"
                    } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
                  >
                    Riders Profile
                  </SidebarMenuItem>
                </Link>
                <Link href="/dashboard/riders/availableOrders">
                  <SidebarMenuItem
                    className={`${
                      pathName === "/dashboard/riders/availableOrders"
                        ? " font-semibold shadow-md shadow-gray-300"
                        : "font-normal"
                    } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
                  >
                    Available Orders
                  </SidebarMenuItem>
                </Link>
                <Link href="/dashboard/riders/myOrders">
                  <SidebarMenuItem
                    className={`${
                      pathName === "/dashboard/riders/myOrders"
                        ? " font-semibold shadow-md shadow-gray-300"
                        : "font-normal"
                    } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
                  >
                    My Orders
                  </SidebarMenuItem>
                </Link>
                <Link href="/dashboard/riders/orderHistory">
                  <SidebarMenuItem
                    className={`${
                      pathName === "/dashboard/riders/orderHistory"
                        ? " font-semibold shadow-md shadow-gray-300"
                        : "font-normal"
                    } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
                  >
                    Orders History
                  </SidebarMenuItem>
                </Link>
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
export default AppSidebar;
