"use client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
const SocialLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSocialLogin = async (providerName: string) => {
    try {
      const response = await signIn(providerName, {
        redirect: false,
        callbackUrl,
      });
      if(response?.url){
        router.push(response.url);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center border-1 rounded-full">
      <p onClick={() => handleSocialLogin("google")}>
        <FcGoogle size={35} />
      </p>
    </div>
  );
};

export default SocialLogin;
