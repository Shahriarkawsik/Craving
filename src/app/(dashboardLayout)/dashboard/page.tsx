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
import { BiFoodMenu, BiSolidFile } from "react-icons/bi";
import { FaHouseDamage } from "react-icons/fa";
import { VscListUnordered } from "react-icons/vsc";
import { GoGraph } from "react-icons/go";
import { FaHotel } from "react-icons/fa";
import { IoIosBicycle } from "react-icons/io";


export function AppSidebar() {
  const pathName = usePathname();
  const { data: session } = useSession();
  return (
    <Sidebar className="">
      <SidebarContent className="bg-white">
        <SidebarGroup className="my-4">

          {/* logo */}
          <SidebarGroupLabel className="text-center border-2 py-9 flex justify-center">
            <Link href="/" className="pb-2 ">
              <Image
                className="mx-auto "
                src={logo}
                alt="logo"
                width={60}
                height={60}
              />
            </Link>
          </SidebarGroupLabel>

          {/* role base routing */}
          <div className="p-5">
            {/* all admin dashboard */}
            {session?.user?.role === "Admin" && (
              <SidebarGroupContent className="mt-2">
                <SidebarMenu className="">

                  {/* statistics */}
                  <Link href="/dashboard/admin/statistics">
                    <SidebarMenuItem
                      className={`${pathName === "/dashboard/admin/statistics"
                        ? "bg-amber-400 text-white shadow-md font-medium"
                        : "font-normal"
                        } py-2 px-5 hover:text-white hover:bg-amber-400 hover:shadow-gray-300 rounded-sm flex items-center justify-start gap-2`}
                    >
                      <GoGraph className="text-2xl font-medium" />
                      <span>Statistics</span>
                    </SidebarMenuItem>
                  </Link>

                  <Link href="/dashboard/admin/allResturant">
                    <SidebarMenuItem
                      className={`${pathName === "/dashboard/admin/allResturant"
                        ? "bg-amber-400 text-white shadow-md font-medium"
                        : "font-normal"
                        } py-2 px-5 hover:text-white hover:bg-amber-400 hover:shadow-gray-300 rounded-sm flex items-center justify-start gap-2`}
                    >
                      <FaHotel className="text-2xl font-medium" />
                      <span>All Restaurant</span>
                    </SidebarMenuItem>
                  </Link>

                  <Link href="/dashboard/admin/allRiders">
                    <SidebarMenuItem
                      className={`${pathName === "/dashboard/admin/allRiders"
                        ? "bg-amber-400 text-white shadow-md font-medium"
                        : "font-normal"
                        } py-2 px-5 hover:text-white hover:bg-amber-400 hover:shadow-gray-300 rounded-sm flex items-center justify-start gap-2`}
                    >
                      <IoIosBicycle className="text-2xl font-medium" />
                      <span>All Riders</span>
                    </SidebarMenuItem>
                  </Link>


                  <Link href="/dashboard/admin/applications">
                    <SidebarMenuItem
                      className={`${pathName === "/dashboard/admin/applications"
                        ? "bg-amber-400 text-white shadow-md font-medium"
                        : "font-normal"
                        } py-2 px-5 hover:text-white hover:bg-amber-400 hover:shadow-gray-300 rounded-sm flex items-center justify-start gap-2`}
                    >
                      <BiSolidFile className="text-2xl font-medium" />
                      <span>Applications</span>
                    </SidebarMenuItem>
                  </Link>
                  {/* <Link href="/dashboard/admin/reviewApplication">
                    <SidebarMenuItem
                      className={`${
                        pathName === "/dashboard/admin/reviewApplication"
                          ? " font-semibold text-orange-600 shadow-md shadow-gray-300"
                          : "font-normal"
                      } py-2  px-5  hover:text-orange-600  bg-base-50 hover:shadow-gray-300 hover:shadow-md  `}
                    >
                      Review Applications
                    </SidebarMenuItem>
                  </Link> */}
                </SidebarMenu>
              </SidebarGroupContent>
            )}

            {/* restaurant owner's dashboard */}
            {session?.user?.role === "Owner" && (
              <SidebarGroupContent >
                <SidebarMenu>
                  <Link href="/dashboard/resturantOwner">
                    <SidebarMenuItem
                      className={`${pathName === "/dashboard/resturantOwner"
                        ? "bg-amber-400 text-white shadow-md font-medium"
                        : "font-normal"
                        } py-2 px-5 hover:text-white hover:bg-amber-400 hover:shadow-gray-300 rounded-sm flex items-center justify-start gap-2`}
                    >
                      <FaUserTie className="text-2xl font-medium" />
                      <span>Restaurant Profile</span>
                    </SidebarMenuItem>
                  </Link>
                  <Link href="/dashboard/resturantOwner/addFood">
                    <SidebarMenuItem
                      className={`${pathName === "/dashboard/resturantOwner/addFood"
                        ? "bg-amber-400 text-white shadow-md font-medium"
                        : "font-normal"
                        } py-2 px-5 hover:text-white hover:bg-amber-400 hover:shadow-gray-300 rounded-sm flex items-center justify-start gap-2`}
                    >
                      <IoFastFoodSharp className="text-2xl font-medium" />
                      <span>Add Food</span>
                    </SidebarMenuItem>
                  </Link>
                  <Link href="/dashboard/resturantOwner/addDonation">
                    <SidebarMenuItem
                      className={`${pathName === "/dashboard/resturantOwner/addDonation"
                        ? "bg-amber-400 text-white shadow-md font-medium"
                        : "font-normal"
                        } py-2 px-5 hover:text-white hover:bg-amber-400 hover:shadow-gray-300 rounded-sm flex items-center justify-start gap-2`}
                    >
                      <FaMoneyCheckDollar className="text-2xl font-medium" />
                      <span>Add Donation</span>
                    </SidebarMenuItem>
                  </Link>
                  <Link href="/dashboard/resturantOwner/allFoodItem">
                    <SidebarMenuItem
                      className={`${pathName === "/dashboard/resturantOwner/allFoodItem"
                        ? "bg-amber-400 text-white shadow-md font-medium"
                        : "font-normal"
                        } py-2 px-5 hover:text-white hover:bg-amber-400 hover:shadow-gray-300 rounded-sm flex items-center justify-start gap-2`}
                    >
                      <BiFoodMenu className="text-2xl font-medium" />
                      <span>All Food Item</span>
                    </SidebarMenuItem>
                  </Link>
                  <Link href="/dashboard/resturantOwner/updateResturant">
                    <SidebarMenuItem
                      className={`${pathName === "/dashboard/resturantOwner/updateResturant"
                        ? "bg-amber-400 text-white shadow-md font-medium"
                        : "font-normal"
                        } py-2 px-5 hover:text-white hover:bg-amber-400 hover:shadow-gray-300 rounded-sm flex items-center justify-start gap-2`}
                    >
                      <FaHouseDamage className="text-2xl font-medium" />
                      <span>Update Restaurant</span>
                    </SidebarMenuItem>
                  </Link>

                  <Link href="/dashboard/resturantOwner/orderHistory">
                    <SidebarMenuItem
                      className={`${pathName === "/dashboard/resturantOwner/orderHistory"
                        ? "bg-amber-400 text-white shadow-md font-medium"
                        : "font-normal"
                        } py-2 px-5 hover:text-white hover:bg-amber-400 hover:shadow-gray-300 rounded-sm flex items-center justify-start gap-2`}
                    >
                      <VscListUnordered className="text-2xl font-medium" />
                      <span>Order History</span>
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
                      className={`${pathName === "/dashboard/riders"
                        ? "bg-amber-400 text-white shadow-md font-medium"
                        : "font-normal"
                        } py-2 px-5 hover:text-white hover:bg-amber-400 hover:shadow-gray-300 rounded-sm flex items-center justify-start gap-2`}
                    >
                      <MdManageAccounts className="text-2xl font-medium" />
                      <span>Rider Profile</span>
                    </SidebarMenuItem>
                  </Link>
                  <Link href="/dashboard/riders/availableOrders">
                    <SidebarMenuItem
                      className={`${pathName === "/dashboard/riders/availableOrders"
                        ? "bg-amber-400 text-white shadow-md font-medium"
                        : "font-normal"
                        } py-2 px-5 hover:text-white hover:bg-amber-400 hover:shadow-gray-300 rounded-sm flex items-center justify-start gap-2`}
                    >
                      <CiViewList className="text-2xl font-medium" />
                      <span>Available Orders</span>
                    </SidebarMenuItem>
                  </Link>
                  <Link href="/dashboard/riders/myOrders">
                    <SidebarMenuItem
                      className={`${pathName === "/dashboard/riders/myOrders"
                        ? "bg-amber-400 text-white shadow-md font-medium"
                        : "font-normal"
                        } py-2 px-5 hover:text-white hover:bg-amber-400 hover:shadow-gray-300 rounded-sm flex items-center justify-start gap-2`}
                    >
                      <LuListChecks className="text-2xl font-medium" />
                      <span>My Orders</span>
                    </SidebarMenuItem>
                  </Link>
                  <Link href="/dashboard/riders/orderHistory">
                    <SidebarMenuItem
                      className={`${pathName === "/dashboard/riders/orderHistory"
                        ? "bg-amber-400 text-white shadow-md font-medium"
                        : "font-normal"
                        } py-2 px-5 hover:text-white hover:bg-amber-400 hover:shadow-gray-300 rounded-sm flex items-center justify-start gap-2`}
                    >
                      <MdWorkHistory className="text-2xl font-medium" />
                      <span>Orders History</span>
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
