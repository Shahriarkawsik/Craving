"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import RegisterForm with SSR disabled
const RegisterForm = dynamic(() => import("@/components/authentications/RegisterForm"), {
  ssr: false,
});

const Register = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
};

export default Register;

