import Image from "next/image";

import React from "react";
import { MdOutlineLogout } from "react-icons/md";

const DashNavbar = () => {
  return (
    <div className="flex shadow-lg items-center p-2 md:p-4 justify-between">
      <div className="flex gap-2 ">
        <Image
          src="https://i.ibb.co.com/5xtrS8JD/rakib.jpg"
          alt="customer"
          width={150}
          height={150}
          className="w-12 h-12 rounded-full mr-4"
        />
       <div>
       <h3 className="font-semibold " >AL Mahmud Rakib</h3>
       <p>rakib@gmail.com</p>
       <p className="text-green-200 inline-block px-3 text-sm rounded-2xl bg-green-700">Admin</p>
       </div>

      </div>

      <div className="flex items-center gap-2 py-2  px-5  bg-base-50 shadow-gray-300 hover:font-semibold shadow-md " >Logout <span><MdOutlineLogout /></span> </div>
    </div>
  );
};

export default DashNavbar;
