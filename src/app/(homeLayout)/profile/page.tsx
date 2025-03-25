"use client";
import React from "react";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaLinkedin } from "react-icons/fa6";
import Image from "next/image";

// import { Github, Linkedin, Twitter } from "lucide-react";
const Profile = () => {
  interface ProfileProps {
    id: number;
    name: string;
    role: string;
    imageUrl: string;
    fbUrl: string;
    linkedinUrl: string;
  }

  const userProfile: ProfileProps[] = [
    {
      id: 1,
      name: "Rakib ",
      role: "User",

      imageUrl: "https://i.ibb.co.com/BndR15C/IMG-9824.jpg",
      linkedinUrl:"https://www.linkedin.com/in/rakib-rkb",
      fbUrl: " https://www.facebook.com/profile.php?id=100007789877647",
    },
  ];
  // const profile = userProfile[0];

  return (
    <div className="">
      <div className="w-11/12 mx-auto h-screen ">
        <div className="flex justify-center items-center mt-10">
          {userProfile.map((profile, index) => (
            <Card
              key={index}
              className="w-full max-w-xl rounded-2xl shadow-lg  bg-amber-50 p-4"
            >
              <div>
                <Image
                  src={profile?.imageUrl}
                  alt="cover"
                  width={150}
                  height={150}
                  className=" rounded-full mr-4"
                />
              </div>

              <CardHeader className="flex flex-col i">
                <Avatar className="w-24 h-24 object-cover">
                  <AvatarImage
                    className="object-cover"
                    src={profile?.imageUrl}
                    alt={profile?.name}
                  />
                  <AvatarFallback>{profile?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-3 text-xl font-semibold">
                  {profile?.name}
                </CardTitle>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {profile?.role}
      <div className="w-11/12 mx-auto ">
        <div>
          {userProfile.map((profile, index) => (
            <Card
              key={index}
              className="w-full max-w-sm rounded-2xl shadow-lg  p-4"
            >
              <CardHeader className="flex flex-col items-center">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.imageUrl} alt={profile.name} />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-3 text-xl font-semibold">
                  {profile.name}
                </CardTitle>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                </p>
              </CardHeader>
              <CardContent className="flex justify-center gap-4 mt-4">
                {profile.linkedinUrl && (
                  <Button variant="ghost" size="icon" asChild>
                    <a href={profile.linkedinUrl} target="_blank">
                      <FaLinkedin className="w-5 h-5 text-blue-600" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
