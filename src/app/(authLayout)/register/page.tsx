
import RegisterForm from "@/components/authentications/RegisterForm";
import Link from "next/link";
import { Suspense } from "react";
const Register = () => {
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
  );
};

export default Register;