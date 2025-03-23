"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser } from "../../action/auth/allApi";
import { FormEvent } from "react";
import { toast } from "react-toastify";
// import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

const Register = () => {
  const router = useRouter();
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
      await registerUser({ name, email, password });
      toast.success("User register is successfully", {
        position: "top-center",
        autoClose: 1000,
      });
      // form.reset();
      // router.push("/");

      if (email && password) {
        const loginResponse = await signIn("credentials", {
          name,
          email,
          password,
          redirect: false,
        });

        if (loginResponse?.ok) {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Already have an account", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <h3 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h3>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-700" htmlFor="name">
                Name
              </label>
              <Input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="text-gray-700" htmlFor="name">
                Image
              </label>
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

// try {
//   const result: { insertedId?: string } | 'Already Have an Account' | null = await registerUser(userData);

//   if (result && typeof result === 'object' && 'insertedId' in result) {
//       await signIn('credentials', { email, password, redirect: false });
//       router.push('/')
//       toast.success('Account Created Successfully!');
//       console.log(result);
//   } else if (result === 'Already Have an Account') {
//       toast.error('Already Registered');
//   } else {
//       toast.error('Registration failed. Please try again later.');
//   }
// } catch (error) {
//   console.error(error);
// }
// };
