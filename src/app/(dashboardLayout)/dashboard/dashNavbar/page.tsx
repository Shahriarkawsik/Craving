"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React from "react";
import { MdOutlineLogout } from "react-icons/md";
import { toast } from "react-toastify";

const DashNavbar = () => {
  const router = useRouter()
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    toast.success("Logout Successfully!");
    router.push("/");
  };
  
  return (
    <div className="flex shadow-lg rounded-2xl border-2 bg-amber-100 items-center p-2 md:p-3 justify-between">
      <div className="flex gap-2 ">
        {session?.user?.image && (
          <Image
            src={session?.user?.image }
            alt="customer"
            width={150}
            height={150}
            className="w-12 h-12 rounded-full mr-4"
          />
        )}
        <div>
          <h3 className="font-semibold">{session?.user?.name}</h3>
         <div className="flex items-center gap-2">
         <p>{session?.user?.email}</p>
          <p className="text-green-700 inline-block px-2 text-[12px] rounded-2xl bg-green-200">
            {session?.user?.role}
          </p>
         </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={handleLogout} variant="outline">
          Logout{" "}
          <span>
            <MdOutlineLogout />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default DashNavbar;
