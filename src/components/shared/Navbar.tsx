
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

const Navbar = () => {
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
                  <NavigationMenuLink href="/">Home</NavigationMenuLink>
                  <NavigationMenuLink href="/aboutUs">
                    About Us
                  </NavigationMenuLink>
                  <NavigationMenuLink href="/contactUs">
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
              <Button variant="destructive">Logout</Button>
            </div>
            <div><IoIosNotificationsOutline size={30}/></div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
