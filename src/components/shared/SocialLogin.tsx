"use client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import LoadingSpinner from "../authentications/loadingSpinner/LoadingSpinner";
const SocialLogin = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSocialLogin = async (providerName: string) => {
    setLoading(true)
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
    finally {
      setLoading(false)
    }
  };
  return (
    <div className="flex justify-center border-1 rounded-full">
      <p onClick={() => handleSocialLogin("google")}>
        {loading ? <LoadingSpinner></LoadingSpinner> : <FcGoogle size={35} />}
      </p>
    </div>
  );
};

export default SocialLogin;
