import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
const SocialLogin = () => {
    const handleSocialLogin = async(providerName: string) => {
        const result = await signIn(providerName
            , {redirect:false}
        )
        console.log(result)
    }
    return (
        <div className="flex justify-center border-1 rounded-full">
            <p  onClick={() => handleSocialLogin("google")} ><FcGoogle size={35}/></p>
            <p  onClick={() => handleSocialLogin("facebook")} ><FcGoogle size={35}/></p>
        </div>
    );
};

export default SocialLogin;