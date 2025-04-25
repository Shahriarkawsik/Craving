"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { Button } from "@/components/ui/button";
import {  IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRegUserCircle } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Navbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { data: session, status } = useSession();

  const [navBg, setNavBg] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const handleOpenNave = () => setShowNav(true);
  const handleCloseNave = () => setShowNav(false);

  const openNav = showNav ? "translate-x-0" : "translate-x-[100%]";

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 100) {
        setNavBg(true);
      }

      if (window.scrollY < 100) {
        setNavBg(false);
      }
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    toast.success("Logout Successfully!");
    router.push("/");
  };
  
  return (
    <header className="">
      {/* desktop menu */}
      <section className={`${navBg ? 'bg-white  text-black shadow-xl transition-all ease' : 'text-white'} h-[10vh] flex items-center fixed z-[999] w-full`}>
        <nav className="flex justify-between items-center w-11/12 mx-auto px-4 md:px-8">
          {/* left logo  */}
          <div className=" px-4 py-0.5 rounded-xs">
            <Link href="/" className="text-2xl md:text-3xl font-semibold">
              <Image src={logo} alt="logo" width={50} height={50} />
            </Link>
          </div>

          {/* center content */}
          <div className="hidden lg:flex items-center justify-center space-x-5">
           
            <Link href="/allFood" className={`${pathName === "/allFood" ? "font-bold border-b-2 border-orange-600" : "font-semibold"}`}>All Food</Link>
            <Link href="/aboutUs" className={`${pathName === "/aboutUs" ? "font-bold border-b-2 border-orange-600" : "font-semibold"}`}>About Us</Link>
            <Link href="/contactUs" className={`${pathName === "/contactUs" ? "font-bold border-b-2 border-orange-600" : "font-semibold"}`}>Contact Us</Link>
            {session && (
              <Link href="/profile" className={`${pathName === "/profile" ? "font-bold border-b-2 border-orange-600" : "font-semibold"}`}>Profile</Link>
            )}

            {(session?.user?.role === "Admin" ||
              session?.user?.role === "Rider" ||
              session?.user?.role === "Owner") && (
              <Link
                href={`
                  ${session?.user?.role === "Admin" 
                  ? "/dashboard/admin/statistics" 
                  : session?.user?.role === "Rider" 
                  ? "/dashboard/riders" 
                  : session?.user?.role === "Owner"
                  ? "/dashboard/resturantOwner" : ''}`}
                className={`${
                  pathName === "/dashboard"
                    ? "font-bold border-b-2 border-orange-600"
                    : "font-semibold"
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* right content */}
          <div className="flex items-center gap-3">
            {session && (
              <div className=" cursor-pointer p-0.5 hover:bg-amber-500 rounded-full">
                <Avatar>
                  <AvatarImage src={session?.user?.image as string | undefined} />
                  <AvatarFallback className="text-2xl text-black">
                    <FaRegUserCircle />
                  </AvatarFallback>
                </Avatar>
              </div>
            )}

            <div className="hidden lg:flex">
              {status == "authenticated" ? (
                <button className="hover:bg-amber-600 font-semibold bg-amber-500 text-white cursor-pointer  py-1 px-4 rounded-4xl"
                  // variant="destructive"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <div className="flex gap-2">
                  <Link href="/signIn">
                    <Button className="hover:bg-amber-600 font-semibold bg-amber-500 text-white  cursor-pointer py-1 px-4 rounded-4xl">
                      SignIn
                    </Button>
                  </Link>
                  {/* <Link href="/register">
                    <Button className="hover:bg-amber-600 font-semibold bg-amber-500 text-white  py-1 px-4 rounded-4xl">
                      SignUp
                    </Button>
                  </Link> */}
                </div>
              )}
            </div>

            <div className="flex space-x-5">
              {/* <IoIosNotificationsOutline className="p-0.5 cursor-pointer hover:bg-amber-500 rounded-full" size={30} /> */}
              <Link 
               className={`${pathName === "/cart" ? " bg-amber-500" : "font-semibold"} w-fit p-0.5 cursor-pointer hover:bg-amber-500 rounded-full`}
               
               href={"/cart"}>
                <CiHeart size={27} />
              </Link>
              <button onClick={handleOpenNave} className="lg:hidden">
                <GiHamburgerMenu size={20} />
              </button>
            </div>
          </div>
        </nav>
      </section>

      {/* mobile menu */}
      <div>
        {/* overlay */}
        <div
          className={`${openNav} fixed inset-0 transform transition-all duration-500 z-[1000] bg-black opacity-0`}
        ></div>

        {/* sidebar menu */}
        <div
          className={`${openNav} right-0 fixed text-white flex justify-center flex-col h-full w-[80%] sm:w-[60%] bg-gray-600 space-y-6 z-[1006] transform transition-all duration-500`}
        >
          <div className="flex flex-col justify-center space-y-5 text-white p-8 mt-10">
            <Link onClick={handleCloseNave} href="/" className={`${pathName === "/" ? "font-bold border-b-2 border-orange-600" : "font-semibold"} w-fit`}>Home</Link>
            <Link onClick={handleCloseNave} href="/allFood" className={`${pathName === "/allFood" ? "font-bold border-b-2 border-orange-600" : "font-semibold"} w-fit`}>All Food</Link>
            <Link onClick={handleCloseNave} href="/aboutUs" className={`${pathName === "/aboutUs" ? "font-bold border-b-2 border-orange-600" : "font-semibold"} w-fit`}>About Us</Link>
            <Link onClick={handleCloseNave} href="/contactUs" className={`${pathName === "/contactUs" ? "font-bold border-b-2 border-orange-600" : "font-semibold"} w-fit`}>Contact Us</Link>
            {session && (
              <Link onClick={handleCloseNave} href="/profile" className={`${pathName === "/profile" ? "font-bold border-b-2 border-orange-600" : "font-semibold"} w-fit`}>Profile</Link>
            )}

            {(session?.user?.role === "Admin" ||
              session?.user?.role === "Rider" ||
              session?.user?.role === "Owner") && (
              <Link
                onClick={handleCloseNave}
                href="/dashboard"
                className={`${
                  pathName === "/dashboard"
                    ? "font-bold border-b-2 border-orange-600"
                    : "font-semibold"
                } w-fit`}
              >
                Dashboard
              </Link>
            )}
          </div>

          <button 
           onClick={handleCloseNave}  
            className="absolute top-8 right-8">
            <IoMdClose className="size-6 text-white cursor-pointer" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
