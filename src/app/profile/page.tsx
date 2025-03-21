
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
      imageUrl: " https://i.ibb.co.com/BndR15C/IMG-9824.jpg",
      linkedinUrl: " https://www.linkedin.com/in/rakib-rkb",
      fbUrl: " https://www.facebook.com/profile.php?id=100007789877647",
    },
   
  ];
  // const profile = userProfile[0];

  return (
    <div className="">
      <div className="w-11/12 mx-auto ">
        <div>
          {userProfile.map((profile) => (
            // eslint-disable-next-line react/jsx-key
            <Card className="w-full max-w-sm rounded-2xl shadow-lg bg-white dark:bg-gray-900 p-4">
              <CardHeader className="flex flex-col items-center">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.imageUrl} alt={profile.name} />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-3 text-xl font-semibold">
                  {profile.name}
                </CardTitle>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {profile.role}
                </p>
              </CardHeader>
              <CardContent className="flex justify-center gap-4 mt-4">
                {profile.linkedinUrl && (
                  <Button variant="ghost" size="icon" asChild>
                    <a href={profile.linkedinUrl} target="_blank">
                      {/* <Linkedin className="w-5 h-5 text-blue-600 dark:text-blue-400" /> */}
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
