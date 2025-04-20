"use client";
import RegisterForm from "@/components/authentications/RegisterForm";
import { Suspense } from "react";

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
