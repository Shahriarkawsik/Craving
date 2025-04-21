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
import { MdManageAccounts, MdWorkHistory } from "react-icons/md";
import { LuListChecks } from "react-icons/lu";
import { CiViewList } from "react-icons/ci";
import { FaMoneyCheckDollar, FaUserTie } from "react-icons/fa6";
import { IoFastFoodSharp } from "react-icons/io5";
import { BiFoodMenu } from "react-icons/bi";
import { FaHouseDamage } from "react-icons/fa";
import { VscListUnordered } from "react-icons/vsc";

export function AppSidebar() {
  const pathName = usePathname();
  const { data: session } = useSession();
  return (
    <Sidebar className="">
      <SidebarContent className="bg-amber-100">
        <SidebarGroup className="mt-2 mb-10 ">
          <SidebarGroupLabel className="text-center border-2  py-7 flex justify-center">
            <Link href="/" className=" pb-2 ">
              <Image
                className="mx-auto "
                src={logo}
                alt="logo"
                width={60}
                height={60}
              />
            </Link>
            {/* <small className="text-xl font-semibold bg-green-500 text-white px-2  rounded-xl mb-2">
            {role}
            </small> */}
          </SidebarGroupLabel>
          <div className=" mt-5 p-5 border-2  rounded-2xl ">
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
                      All Restaurant
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

            {/* restaurant owner's dashboard */}
            {session?.user?.role === "Owner" && (
              <SidebarGroupContent >
                <SidebarMenu>
                  <Link href="/dashboard/resturantOwner">
                    <SidebarMenuItem
                      className={`${
                        pathName === "/dashboard/resturantOwner"
                          ? " font-semibold shadow-md shadow-gray-300"
                          : "font-normal"
                      } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
                    > 
                   
                      
                      <div className="flex items-center   gap-2">
                        <FaUserTie className="text-2xl" /> Restaurant Profile
                      </div>
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
                       <div className="flex items-center   gap-2">
                        <IoFastFoodSharp className="text-2xl" /> Add Food
                      </div>
                      
                    </SidebarMenuItem>
                  </Link>
                  <Link href="/dashboard/resturantOwner/addDonation">
                    <SidebarMenuItem
                      className={`${
                        pathName === "/dashboard/resturantOwner/addDonation"
                          ? " font-semibold shadow-md shadow-gray-300"
                          : "font-normal"
                      } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
                    >
                       <div className="flex items-center   gap-2">
                        <FaMoneyCheckDollar className="text-2xl" />    Add Donation
                      </div>
                   
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
                        <div className="flex items-center   gap-2">
                        <BiFoodMenu className="text-2xl" />    All Food Item
                      </div>
                      
                    </SidebarMenuItem>
                  </Link>
                  <Link href="/dashboard/resturantOwner/updateResturant">
                    <SidebarMenuItem
                      className={`${
                        pathName === "/dashboard/resturantOwner/addResturant"
                          ? " font-semibold shadow-md shadow-gray-300"
                          : "font-normal"
                      } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
                    > 
                     <div className="flex items-center   gap-2">
                        <FaHouseDamage className="text-2xl" />   Update Restaurant
                      </div>
                     
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
                     <div className="flex items-center   gap-2">
                        <VscListUnordered className="text-2xl" />    Order History
                      </div>
                    
                    </SidebarMenuItem>
                  </Link>
                </SidebarMenu>
              </SidebarGroupContent>
            )}

            {/* riders dashboard */}
            {session?.user?.role === "Rider" && (
              <SidebarGroupContent className="">
                <SidebarMenu  >
                  <Link href="/dashboard/riders">
                    <SidebarMenuItem
                      className={`${
                        pathName === "/dashboard/riders"
                          ? " font-semibold shadow-md shadow-gray-300"
                          : "font-normal"
                      } py-2  px-5   bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
                    >
                      <div className="flex items-center   gap-2">
                        <MdManageAccounts className="text-2xl" /> Rider Profile
                      </div>
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
                      <div className="flex items-center   gap-2">
                        <CiViewList className="text-2xl" />
                        Available Orders
                      </div>
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
                      <div className="flex items-center   gap-2">
                        <LuListChecks className="text-2xl" /> My Orders
                      </div>
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
                      <div className="flex items-center   gap-2">
                        <MdWorkHistory className="text-2xl" /> Orders History
                      </div>
                    </SidebarMenuItem>
                  </Link>
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
export default AppSidebar;
