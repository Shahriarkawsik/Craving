
import React from 'react';

import Link from 'next/link';
import LoginForm from '@/components/loginComponents/LoginForm';
import SocialLogin from '@/components/shared/SocialLogin';

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login to Craving</h2>

        <LoginForm />

        <div className="relative flex items-center justify-center my-4">
          <div className="w-full h-px bg-gray-300"></div>
          <span className="absolute bg-white px-4 text-gray-500">or</span>
        </div>

        <SocialLogin />
        
        <p className="text-center text-gray-600 text-sm">Don&apos;t have an account? <Link href="/register" className="text-green-600 hover:underline">Sign up</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;

