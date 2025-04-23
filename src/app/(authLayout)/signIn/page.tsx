"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import SignInForm with SSR turned off
const SignInForm = dynamic(() => import("@/components/authentications/SignInForm"), {
  ssr: false,
});

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
