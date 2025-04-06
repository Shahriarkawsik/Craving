"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaLinkedin } from "react-icons/fa6";
import { useSession } from "next-auth/react";

// Define TypeScript interface for user session?.user?
// interface ProfileProps {
//   id: number;
//   name: string;
//   role: string;
//   image: string;
//   fbUrl: string;
//   linkedinUrl: string;
// }

// User session?.user? data
// const userProfile: ProfileProps[] = [
//   {
//     id: 1,
//     name: "Rakib",
//     role: "User",
//     imageUrl: "https://i.ibb.co.com/BndR15C/IMG-9824.jpg",
//     linkedinUrl: "https://www.linkedin.com/in/rakib-rkb",
//     fbUrl: "https://www.facebook.com/session?.user?.php?id=100007789877647",
//   },
// ];

// {user: {…}, expires: '2025-05-06T05:35:00.917Z'}
// expires
// : 
// "2025-05-06T05:35:00.917Z"
// user
// : 
// address
// : 
// "Not provided"
// created_at
// : 
// "2025-04-05T05:26:04.787Z"
// email
// : 
// "admin@gmail.com"
// id
// : 
// "67f0beec9a1658ffa63e9c37"
// image
// : 
// "https://i.ibb.co.com/5xKLHQhF/global-admin-icon-color-outline-vector.jpg"
// name
// : 
// "Admin"
// phone
// : 
// 0
// role
// : 
// "Admin"
// status
// : 
// "Active"


const Profile: React.FC = () => {

  const {data:session}=useSession()
  console.log(session, "jfkjghjkfdhjkffgjk");
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
   
        <Card key={session?.user?.id} className="w-full max-w-lg rounded-2xl border-0 shadow-lg pt-0 bg-white">
          <CardHeader className="flex flex-col rounded-t-2xl bg-amber-300 p-14 items-center">
            {/* Profile Image */}
            <Avatar className="w-32 h-32">
              <AvatarImage src={session?.user?.image as string} alt={session?.user?.name} />
              <AvatarFallback>{session?.user?.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <CardTitle className="mt-3 text-xl font-semibold">
              {session?.user?.name}
            </CardTitle>
            <p className="text-gray-500 text-sm">{session?.user?.role}</p>
            
          </CardHeader>
    
          {/* Profile  */}
          <CardContent className=" m-4">
          hf jkhh
          </CardContent>
        </Card>
    
    </div>
  );
};

export default Profile;
