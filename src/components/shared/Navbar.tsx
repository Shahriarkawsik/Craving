"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo.png";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IoIosNotificationsOutline } from "react-icons/io";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const pathName = usePathname();
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <header className=" shadow-md py-4">
      <nav className="flex justify-between items-center w-11/12 mx-auto px-4 md:px-8">
        {/* logo  */}
        <div>
          <Link href="/" className="text-2xl md:text-3xl font-semibold">
            <Image src={logo} alt="logo" width={50} height={50} />
          </Link>
        </div>
        {/* desktop menu  */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="flex items-center space-x-4">
                <NavigationMenuLink
                  href="/"
                  className={`${
                    pathName === "/"
                      ? "font-bold border-b-2 border-orange-600"
                      : "font-semibold"
                  }`}
                >
                  Home
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/aboutUs"
                  className={`${
                    pathName === "/aboutUs"
                      ? "font-bold border-b-2 border-orange-600"
                      : "font-semibold"
                  }`}
                >
                  About Us
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/contactUs"
                  className={`${
                    pathName === "/contactUs"
                      ? "font-bold border-b-2 border-orange-600"
                      : "font-semibold"
                  }`}
                >
                  Contact Us
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/profile"
                  className={`${
                    pathName === "/profile"
                      ? "font-bold border-b-2 border-orange-600"
                      : "font-semibold"
                  }`}
                >
                  Profile
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="/dashboard"
                  className={`${
                    pathName === "/dashboard"
                      ? "font-bold border-b-2 border-orange-600"
                      : "font-semibold"
                  }`}
                >
                  Dashboard
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <Avatar>
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="hidden md:flex">
           
            {/* <Button variant="destructive">Logout</Button> */}

            {status == "authenticated" ? (
              <Button className="hover:bg-amber-600 bg-amber-500 text-white font-semibold py-2 px-4 rounded-4xl" variant="destructive" onClick={() => signOut()}>
                Logout
              </Button>
            ) : (
              <>
                <Link href="/signIn">
                  <Button className="hover:bg-amber-600 bg-amber-500 text-white font-semibold py-2 px-4 rounded-4xl" >SignIn</Button>
                </Link>
                <Link href="/register">
                  <Button className="hover:bg-amber-600 bg-amber-500 text-white font-semibold py-2 px-4 rounded-4xl" >SignUp</Button>
                </Link>
              </>
            )}
          </div>
          <div>
            <IoIosNotificationsOutline size={25} />
          </div>
          {/* responsive mobile and tablet  */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <GiHamburgerMenu size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href="/"
                    className={`${
                      pathName === "/"
                        ? "font-bold border-b-2 border-orange-600"
                        : "font-semibold"
                    }`}
                  >
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/aboutUs"
                    className={`${
                      pathName === "/aboutUs"
                        ? "font-bold border-b-2 border-orange-600"
                        : "font-semibold"
                    }`}
                  >
                    About Us
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/contactUs"
                    className={`${
                      pathName === "/contactUs"
                        ? "font-bold border-b-2 border-orange-600"
                        : "font-semibold"
                    }`}
                  >
                    Contact Us
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/login"
                    className={`${
                      pathName === "/login"
                        ? "font-bold border-b-2 border-orange-600"
                        : "font-semibold"
                    }`}
                  >
                    Login
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
