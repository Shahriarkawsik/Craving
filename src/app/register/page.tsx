// import RegisterForm from '@/components/RegisterForm'
import React from 'react'
import RegisterForm from './components/RegisterForm'
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
export default function register() {

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
                <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
                <RegisterForm />
                <div className="relative flex items-center justify-center my-4">
                    <div className="w-full h-px bg-gray-300"></div>
                    <span className="absolute bg-white px-4 text-gray-500">or</span>
                </div>
                <button className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-100">
                    <FcGoogle className="text-xl mr-2" /> Sign in with Google
                </button>
                <p className="text-center text-gray-600 text-sm">Already have an account? <Link href="/login" className="text-green-600 hover:underline">Login</Link></p>
            </div>
        </div>
    )
}
