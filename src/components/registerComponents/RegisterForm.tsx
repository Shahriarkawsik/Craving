'use client';
// import { signIn } from "next-auth/react";
// import registerUser from '@/app/action/registerUser';
import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import SocialLogin from "./SocialLogin";
import { FormEvent } from "react";
import registerUser from "@/app/actions/auth/registerUser";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// ✅ ইউজার রেজিস্ট্রেশনের ডাটা টাইপের জন্য ইন্টারফেস
interface RegisterData {
    name: string;
    email: string;
    password: string;
}


const RegisterForm: React.FC = () => {
    const router = useRouter();
    const {data: session, status} = useSession()
    console.log(session)
    
    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget; // ✅ এখন TypeScript জানবে এটি একটি ফর্ম এলিমেন্ট
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        const userData: RegisterData = { name, email, password };
        console.log(userData)
        toast('Creating ...');

        try {
            const result: { insertedId?: string } | 'Already Have an Account' | null = await registerUser(userData);

            if (result && typeof result === 'object' && 'insertedId' in result) {
                await signIn('credentials', { email, password, redirect: false });
                router.push('/')
                toast.success('Account Created Successfully!');
                console.log(result);
            } else if (result === 'Already Have an Account') {
                toast.error('Already Registered');
            } else {
                toast.error('Registration failed. Please try again later.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleRegister} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your name"
                    required
                />
            </div>
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
            <button type="submit" className="w-full p-3 text-white bg-green-600 rounded-lg hover:bg-green-700">Register</button>
        </form>
    );
};

export default RegisterForm;
