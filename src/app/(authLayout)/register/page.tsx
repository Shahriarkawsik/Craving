"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser } from "../../action/auth/allApi";
import { FormEvent } from "react";
import { toast } from 'react-toastify';
// import { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter()
  // const [error, setError] = useState<string | null>(null)

  // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

      // if (!passwordRegex.test(password)) {
      //   toast.error("Register failed");
      //   setError("Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number.");
      //   return;
      // }

    try {
      await registerUser({name, email, password});
      toast.success("User register is successfully", {
        position: "top-center",
        autoClose:1000,
      })
      form.reset()
      router.push('/')
    } catch (error) {
      console.log(error)
      toast.error("User register is failed", {
        position: "top-center",
        autoClose:1000,
      })
    }
  };

  return (
    <div className="w-6/12 mx-auto">
      <h3 className="text-center mb-5 text-2xl md:text-3xl font-semibold">
        Sign Up
      </h3>
      <div className="px-5 lg:px-8 py-6">
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-3">
            <label className="text-gray-700" htmlFor="name">
              Name
            </label>
            <Input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="w-full mb-3">
            <label className="text-gray-700">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
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
            />
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" type="submit">
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
