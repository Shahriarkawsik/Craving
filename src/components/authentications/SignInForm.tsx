"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import SocialLogin from "@/components/shared/SocialLogin";


const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const response = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });
      if (response?.ok) {
        router.push(callbackUrl);
        form.reset();
      } else {
        alert("Authentication failed");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <div>
        <label className="text-gray-700">Password</label>
        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          required
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="flex justify-between items-center">
        <a href="#" className="text-sm text-green-600 hover:underline">
          Forgot password?
        </a>
      </div>
      <div className="mt-6 text-center">
        <Button
          variant="outline"
          type="submit"
          className="w-full p-3 text-white bg-green-600 rounded-lg hover:bg-green-700 hover::text-white transition duration-300"
        >
          Sign In
        </Button>
      </div>
      <SocialLogin></SocialLogin>
    </form>
  );
};

export default SignInForm;
