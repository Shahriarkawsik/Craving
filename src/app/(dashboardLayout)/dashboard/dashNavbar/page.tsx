"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

import React from "react";
import { MdOutlineLogout } from "react-icons/md";

const DashNavbar = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex shadow-lg items-center p-2 md:p-4 justify-between">
      <div className="flex gap-2 ">
        {session?.user?.image && (
          <Image
            src={session?.user?.image as string}
            alt="customer"
            width={150}
            height={150}
            className="w-12 h-12 rounded-full mr-4"
          />
        )}
        <div>
          <h3 className="font-semibold">{session?.user?.name}</h3>
          <p>{session?.user?.email}</p>
          <p className="text-green-200 inline-block px-3 text-sm rounded-2xl bg-green-700">
            {session?.user?.role}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={() => signOut()} variant="outline">
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
