"use client";

import { updateUser } from "@/app/action/auth/allApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { FormEvent } from "react";
import { toast } from "react-toastify";
const EditProfile = () => {
  const { data: session } = useSession();
  console.log(session, "this is session update profile");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const image = (form.elements.namedItem("image") as HTMLInputElement).value;
    // const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const address = (form.elements.namedItem("address") as HTMLInputElement)
      .value;

    const userData = {
      name,
      image,
      phone,
      address,
      role: "User",
      status: "Active",
      update_at: new Date(),
    };

    console.log(userData);

    // if (!passwordRegex.test(password)) {
    //   toast.error("Register failed");
    //   setError("Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number.");
    //   return;
    // }

    try {
      await updateUser(userData);
      toast.success("User update is successfully", {
        position: "top-center",
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="bg-gray-100 ">
      <div className="w-11/12 mx-auto ">
        <div className="flex items-center justify-center min-h-screen ">
          <div className="w-full max-w-md p-8 space-y-6 my-4 bg-white shadow-lg rounded-2xl">
            <h3 className="text-2xl font-bold text-center text-gray-800">
              UPDATE PROFILE
            </h3>
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-gray-700">Name</label>
                  <Input
                    type="text"
                    name="name"
                    defaultValue={session?.user?.name}
                    placeholder="Enter your name"
                    className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="text-gray-700">Image</label>
                  <Input
                    type="text"
                    name="image"
                    defaultValue={session?.user?.image as string}
                    placeholder="Enter your Image"
                    className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* <div>
                  <label className="text-gray-700">Email</label>
                  <Input
                    type="email"
                    name="email"
                    defaultValue={session?.user?.email as string}
                    placeholder="Enter your email"
                    className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div> */}

                <div className="w-full mb-3">
                  <label className="text-gray-700">Phone</label>
                  {/* <p className="text-xs text-red-500 mb-2 italic">{error}</p> */}
                  <Input
                    type="number"
                    name="phone"
                    defaultValue={session?.user?.phone as number}
                    placeholder="Enter your phone number"
                    required
                    className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="w-full mb-3">
                  <label className="text-gray-700">Address</label>
                  {/* <p className="text-xs text-red-500 mb-2 italic">{error}</p> */}
                  <Textarea
                    name="address"
                    defaultValue={session?.user?.address as string}
                    placeholder="Enter your address"
                    required
                    className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    type="submit"
                    className="w-full p-3 text-white bg-green-600 rounded-lg hover:bg-green-700 hover::text-white transition duration-300"
                  >
                    Update Profile
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
