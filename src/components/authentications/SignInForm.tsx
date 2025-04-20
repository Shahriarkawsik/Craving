"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import SocialLogin from "@/components/shared/SocialLogin";
import Link from "next/link";
import Lottie from "lottie-react";
import loginLottie from "@/assets/login.json";
import { FaArrowLeft } from "react-icons/fa6";
import LoadingSpinner from "./loadingSpinner/LoadingSpinner";

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
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
    finally{
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-100">
      <div className="w-11/12 mx-auto">
        <div>
          <Link
            className="flex hover:font-semibold items-center gap-2 text-lg pt-6"
            href="/"
          >
            <FaArrowLeft className="mt-1"/> Back To Home
          </Link>
        </div>

        <div className="lg:flex items-center justify-center min-h-screen ">
          <div className="lg:w-1/2">
          <Lottie animationData={loginLottie} loop={true} />
        </div>
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
                  <Link
                    href="/forgot-password"
                    className="text-sm text-green-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="mt-6 text-center">
                <Button
                    variant="outline"
                    type="submit"
                    disabled={loading}
                    className="w-full p-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    {loading ? <LoadingSpinner></LoadingSpinner> : "Sign In"}
                  </Button>
                </div>
                <SocialLogin></SocialLogin>
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
      </div>
    </div>
  );
};

export default SignInForm;
