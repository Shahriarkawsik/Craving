"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
const SignIn = () => {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const response = await signIn("credentials", { email, password, callbackUrl:'/', redirect:false });
      if(response?.ok) {
        router.push('/')
        form.reset()
      }else{
        alert('Authentication failed')
      }

    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="w-6/12 mx-auto">
      <h3 className="text-center mb-5 text-2xl md:text-3xl font-semibold">
        sign in your account
      </h3>
      <div className="px-5 lg:px-8 py-6">
        <form onSubmit={handleSubmit}>
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
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" type="submit">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
