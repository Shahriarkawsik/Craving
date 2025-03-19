'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';


type Provider = 'google';

const SocialLogin: React.FC = () => {
    const router = useRouter()
    const {data:session, status} = useSession()
    const handleSocial = async (providerName: Provider): Promise<void> => {
        console.log(providerName);
        toast('Waiting');

        signIn(providerName);
    };

    useEffect(() => {
        if(session?.user){
            router.push('/')
            toast.success('Successfully Loge In')
        }
    }, [session?.user])

    return (
        <button onClick={() => handleSocial('google')} className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-100">
            <FcGoogle className="text-xl mr-2" /> Sign in with Google
        </button>
    );
};

export default SocialLogin;
