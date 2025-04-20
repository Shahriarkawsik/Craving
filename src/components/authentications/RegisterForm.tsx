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
import Lottie from "lottie-react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import registerLottie from "@/assets/register.json";
import SocialLogin from "../shared/SocialLogin";
import { useState } from "react";
import LoadingSpinner from "./loadingSpinner/LoadingSpinner";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  // const [error, setError] = useState<string | null>(null)

  // const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.*\d).{6,}$/;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    // const image = (form.elements.namedItem("image") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const userData = {
      name,
      // image,
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
      });
      toast.error("Already have an account", {
        position: "top-center",
        autoClose: 1000,
      });
    } finally {
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
            <FaArrowLeft className="mt-1" /> Back To Home
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
                    disabled={loading}
                    className="w-full p-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    {loading ? <LoadingSpinner></LoadingSpinner> : "Sign Up"}
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

export default RegisterForm;
