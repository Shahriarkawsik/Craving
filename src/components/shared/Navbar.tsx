"use client"
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, } from "@/components/ui/avatar";
import { IoIosNotificationsOutline } from "react-icons/io";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname()
  return (
    <div>
      <header className=" shadow-md py-4">
        <nav className="flex justify-between items-center w-11/12 mx-auto px-4 md:px-8">
          {/* logo  */}
          <div>
            <Link href="/" className="text-2xl md:text-3xl font-semibold">
              Craving
            </Link>
          </div>
          {/* desktop menu  */}
          <div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem className="flex items-center space-x-4">
                  <NavigationMenuLink href="/" className={`${pathName === '/' ? 'font-bold border-b-2 border-pink-500' : 'font-semibold'}`}>Home</NavigationMenuLink>
                  <NavigationMenuLink href="/aboutUs" className={`${pathName === '/aboutUs' ? 'font-bold border-b-2 border-pink-500' : 'font-semibold'}`}>
                    About Us
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/contactUs" className={`${pathName === '/contactUs' ? 'font-bold border-b-2 border-pink-500' : 'font-semibold'}`}>
                    Contact Us
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
            <div>
              <Button variant="destructive">Login</Button>
              {/* <Button variant="destructive">Logout</Button> */}
            </div>
            <div><IoIosNotificationsOutline size={30}/></div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
