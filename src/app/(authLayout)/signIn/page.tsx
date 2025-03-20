"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import SocialLogin from "@/components/shared/SocialLogin";
const SignIn = () => {
  const router = useRouter();
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
        router.push("/");
        form.reset();
      } else {
        alert("Authentication failed");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login to Craving
        </h2>

        <div>
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
            {/* <SocialLogin></SocialLogin> */}
          </form>
        </div>
        <div className="relative flex items-center justify-center my-4">
          <div className="w-full h-px bg-gray-300"></div>
          <span className="absolute bg-white px-4 text-gray-500">or</span>
        </div>
        <p className="text-center text-gray-600 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-green-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
