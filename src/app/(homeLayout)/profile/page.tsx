"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaLinkedin } from "react-icons/fa6";

// Define TypeScript interface for user profile
interface ProfileProps {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  fbUrl: string;
  linkedinUrl: string;
}

// User profile data
const userProfile: ProfileProps[] = [
  {
    id: 1,
    name: "Rakib",
    role: "User",
    imageUrl: "https://i.ibb.co.com/BndR15C/IMG-9824.jpg",
    linkedinUrl: "https://www.linkedin.com/in/rakib-rkb",
    fbUrl: "https://www.facebook.com/profile.php?id=100007789877647",
  },
];

const Profile: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {userProfile.map((profile) => (
        <Card key={profile.id} className="w-full max-w-sm rounded-2xl shadow-lg p-6 bg-white">
          <CardHeader className="flex flex-col items-center">
            {/* Profile Image */}
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile.imageUrl} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <CardTitle className="mt-3 text-xl font-semibold">
              {profile.name}
            </CardTitle>
            <p className="text-gray-500 text-sm">{profile.role}</p>
          </CardHeader>

          {/* Profile Links */}
          <CardContent className="flex justify-center gap-4 mt-4">
            {profile.linkedinUrl && (
              <Button variant="ghost" size="icon" asChild>
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="w-5 h-5 text-blue-600" />
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Profile;
