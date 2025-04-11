"use client"
import RegisterForm from "@/components/authentications/RegisterForm";
import Lottie from "lottie-react";
import Link from "next/link";
import { Suspense } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import registerLottie from "@/assets/register.json"

const Register = () => {
  
  return (
  <div className="bg-gray-100">
    <div className="w-11/12 mx-auto">
    <div>
  <Link 
  className="flex hover:font-semibold items-center gap-2 text-lg pt-6" href="/" >
   <FaArrowLeft /> Back To Home 
   </Link>
  </div>
    <div className="lg:flex items-center justify-center min-h-screen ">

      <div className="lg:w-1/2">
      <Lottie animationData={registerLottie} loop={true} />
      </div>
<div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
  <h3 className="text-2xl font-bold text-center text-gray-800">
    Sign Up
  </h3>
  <div>
    <Suspense fallback={<div>Loading...</div>}>
    <RegisterForm />
    </Suspense>
  </div>
  <div className="relative flex items-center justify-center my-4">
    <div className="w-full h-px bg-gray-300"></div>
    <span className="absolute bg-white px-4 text-gray-500">or</span>
  </div>
  <p className="text-center text-gray-600 text-sm">
    Already have an account?{" "}
    <Link href="/signIn" className="text-green-600 hover:underline">
      Sign In
    </Link>
  </p>
</div>
</div>
    </div>
  </div>
  );
};

export default Register;