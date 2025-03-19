'use client'
import React, { FormEvent } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
// import SocialLogin from './SocialLogin';

const LoginForm: React.FC = () => {
    const router = useRouter();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;

        toast('Submitting ...');
        console.log({ email, password })
        try {
            const result = await signIn('credentials', { email, password, redirect: false });
            if (result?.ok) {
                router.push('/');
                toast.success('Login Success');
            } else {
                toast.error('Invalid email or password.');
            }
        } catch (error) {
            toast.error('Login Failed');

        }
    };

    return (
        <div>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="flex justify-between items-center">
                    <a href="#" className="text-sm text-green-600 hover:underline">Forgot password?</a>
                </div>
                <button type="submit" className="w-full p-3 text-white bg-green-600 rounded-lg hover:bg-green-700">Login</button>
            </form>

        </div>
    );
};

export default LoginForm;
