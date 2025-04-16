"use client";
import { addToCart, FeaturedFoodType } from '@/app/action/auth/allApi';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import { toast } from 'react-toastify';

interface Props {
    food: FeaturedFoodType;
};

interface CartFood extends FeaturedFoodType {
    user_email: string | undefined;
    created_at: Date;
}

const FoodCard = ({ food }: Props) => {
    const { data } = useSession();
    const router = useRouter();

    const cartFood: CartFood = { ...food, user_email: data?.user?.email, created_at: new Date() };

    // handle add to cart 
    const handleAddToCart = () => {
        if (data?.user.email) {
            addToCart(cartFood);
            toast.success("Food added in the cart.");
        }else{
            router.push("/signIn");
        }
    };

    return (
        <div className="rounded-lg shadow-2xl space-y-5">
            {/* image content */}
            <div className="relative h-[300px] overflow-hidden rounded-t-lg cursor-pointer group">
                <Image
                    src={food.image}
                    alt={food.foodName}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover rounded-t-lg"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity duration-300">
                    <p className="text-white text-lg font-semibold">Click To See Details</p>
                </div>
            </div>

            {/* text content */}
            <div className="mx-5 mb-5">
                <div className="flex justify-between items-center ">
                    <h1 className=" text-md lg:text-xl font-bold">
                        {food.foodName}
                    </h1>
                    <p className="flex justify-center gap-1 items-center ">
                        {" "}
                        <span className="text-orange-400">
                            <FaStar />
                        </span>{" "}
                        {food.rating} <span className=" text-sm">({food.reviewCount}+)</span>
                    </p>
                </div>

                <div className="mt-3 mx-auto size">
                    <p className="flex items-center justify-end text-md text-black font-bold">{food.price} BDT</p>
                </div>

                {/* buttons */}
                <div className="mt-3 flex items-center justify-between gap-2">
                    <button onClick={handleAddToCart} className='text-white bg-orange-500 hover:bg-orange-600 flex items-center justify-center space-x-2 py-2 px-4 rounded-sm shadow-md transition-colors duration-300 cursor-pointer'>
                        <FaShoppingCart size={20} />
                        <span className="ml-1">Add to Cart</span>
                    </button>

                    <Link href={`/cart`}><button className='text-orange-950 hover:text-white transition-all border border-orange-400 hover:bg-orange-500 flex items-center justify-center space-x-2 py-2 px-4 rounded-sm shadow-md duration-300 cursor-pointer'>
                        Order Now
                    </button></Link>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;