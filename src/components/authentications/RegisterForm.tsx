"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/app/action/auth/allApi";
import { FormEvent } from "react";
import { toast } from "react-toastify";
// import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";

const RegisterForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  // const [error, setError] = useState<string | null>(null)

  // const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.*\d).{6,}$/;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const image = (form.elements.namedItem("image") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const userData = {
      name,
      image,
      email,
      password,
      role: "User",
      status: "Active",
      phone: 0,
      address: "Not provided",
      created_at: new Date(),
    };

    // if (!passwordRegex.test(password)) {
    //   toast.error("Register failed");
    //   setError("Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number.");
    //   return;
    // }

    try {
      await registerUser(userData);
      toast.success("User register is successfully", {
        position: "top-center",
        autoClose: 1000,
      });

      if (email && password) {
        const loginResponse = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (loginResponse?.ok) {
          router.push(callbackUrl);
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        
      })
      toast.error("Already have an account", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-gray-700">Name</label>
        <Input
          type="text"
          name="name"
          placeholder="Enter your name"
          required
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label className="text-gray-700">Image</label>
        <Input
          type="text"
          name="image"
          placeholder="Enter your Image"
          required
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="text-gray-700">Email</label>
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="w-full mb-3">
        <label className="text-gray-700">Password</label>
        {/* <p className="text-xs text-red-500 mb-2 italic">{error}</p> */}
        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
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
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
