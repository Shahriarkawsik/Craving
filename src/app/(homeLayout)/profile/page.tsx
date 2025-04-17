"use client";

import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { updateUser } from "@/app/action/auth/allApi";
import Banner from "@/components/shared/Banner";
import bannerImage from "@/assets/bannerImg/aboutBanner1.jpg";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Profile = () => {
  const { data: session, status, update } = useSession();
  const [isEditable, setIsEditable] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const image = (form.elements.namedItem("image") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const address = (form.elements.namedItem("address") as HTMLInputElement).value;

    const userData = {
      name,
      image,
      phone: Number(phone),
      email,
      address,
      role: "User",
      status: "Active",
    };

    try {
      await updateUser(userData);
      await update();
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setIsEditable(false);
    }
  };


  return (
    <div>
      {/* Banner section */}
      <Banner image={bannerImage.src} title="Your Profile" subtitle="" />

      {status === 'loading' ? <p className="text-center my-10">Profile is Loading...</p> : (
        <>
          {/* edit button */}
          <div className="relative">
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || "Profile Image"}
                width={200}
                height={200}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-md ring-4 ring-white p-2 bg-white"
              />
            )}
          </div>

          {/* form data */}
          <div className="relative w-full mx-auto mt-28 mb-8 border-2 border-slate-200 max-w-lg p-8 space-y-6 bg-white shadow-lg rounded-2xl">

            {/* Edit button */}
            {!isEditable && <div className="absolute top-4 right-4">
              <button onClick={() => setIsEditable(true)} className="size-10 bg-slate-200 hover:bg-slate-300 transition-colors duration-200 cursor-pointer rounded-full flex items-center justify-center p-2">
                <FaRegEdit className="text-3xl text-black text-center" />
              </button>
            </div>}

            {/* form title */}
            <h3 className="text-2xl font-bold text-center text-gray-800 uppercase">
              {isEditable ? 'Update Profile' : 'Profile Details'}
            </h3>

            {/* form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-700">Name</label>
                <Input
                  type="text"
                  name="name"
                  readOnly={!isEditable}
                  defaultValue={session?.user?.name}
                  placeholder="Enter your name"
                  className={`w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
              {isEditable && <div>
                <label className="text-gray-700">Image</label>
                <Input
                  type="text"
                  name="image"
                  defaultValue={session?.user?.image as string}
                  placeholder="Enter your Image"
                  className={`w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>}

              <div>
                <label className="text-gray-700">Email</label>
                <Input
                  type="email"
                  name="email"
                  defaultValue={session?.user?.email as string}
                  readOnly={true}
                  placeholder="Enter your email"
                  className={`w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>

              <div className="w-full mb-3">
                <label className="text-gray-700">Phone</label>
                {/* <p className="text-xs text-red-500 mb-2 italic">{error}</p> */}
                <Input
                  type="text"
                  name="phone"
                  readOnly={!isEditable}
                  defaultValue={(session?.user?.phone) || '01725-xxxxxx'}
                  placeholder="Enter your phone number"
                  required
                  className={`w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>
              <div className="w-full mb-3">
                <label className="text-gray-700">Address</label>
                {/* <p className="text-xs text-red-500 mb-2 italic">{error}</p> */}
                <Textarea
                  name="address"
                  readOnly={!isEditable}
                  defaultValue={session?.user?.address as string}
                  placeholder="Enter your address"
                  required
                  className={`w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
              </div>

              <div className="mt-6 text-center">
                {isEditable && <Button
                  variant="outline"
                  type="submit"
                  className="w-full p-3 text-white bg-green-600 rounded-lg hover:bg-green-700 hover:text-white cursor-pointer transition duration-300"
                >
                  Update Profile
                </Button>}
              </div>
            </form>
          </div>
        </>
      )}

    </div >
  );
};

export default Profile;
