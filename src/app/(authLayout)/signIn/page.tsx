"use client";
import SignInForm from "@/components/authentications/SignInForm";

import { Suspense } from "react"

const SignIn = () => {
  return (
    <div>
    <Suspense fallback={<div>Loading...</div>}>
      <SignInForm />
    </Suspense>
  </div>
  );
};

export default SignIn;
