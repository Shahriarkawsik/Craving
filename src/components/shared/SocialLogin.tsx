"use-client"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
const SocialLogin = () => {
    const router = useRouter()
    const handleSocialLogin = async(providerName: string) => {
       try {
        await signIn(providerName, { redirect: false, callbackUrl: "/" });
        router.push('/')
       } catch (error) {
        console.log(error)
       }
    }
    return (
        <div className="flex justify-center border-1 rounded-full">
            <p  onClick={() => handleSocialLogin("google")} ><FcGoogle size={35}/></p>
        </div>
    );
};

export default SocialLogin;


