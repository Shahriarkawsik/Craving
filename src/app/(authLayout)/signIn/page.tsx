"use client";
import SignInForm from "@/components/authentications/SignInForm";
// import Lottie from "lottie-react";
import Link from "next/link";
// import loginLottie from "@/assets/login.json";

import { Suspense } from "react";
import { FaArrowLeft } from "react-icons/fa6";

const SignIn = () => {
  return (
    <div className="bg-gray-100">
      <div className="w-11/12 mx-auto">
        <div>
          <Link
            className="flex hover:font-semibold items-center gap-2 text-lg pt-6"
            href="/"
          >
            <FaArrowLeft /> Back To Home
          </Link>
        </div>

        <div className="lg:flex items-center justify-center min-h-screen ">
          {/* <div className="lg:w-1/2">
            <Lottie animationData={loginLottie} loop={true} />
          </div> */}
          <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Login to Craving
            </h2>
            <div>
              <Suspense fallback={<div>Loading...</div>}>
                <SignInForm />
              </Suspense>
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

export default SignIn;
