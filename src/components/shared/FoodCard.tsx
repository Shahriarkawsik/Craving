"use client";
import { addToCart, FoodDetails } from '@/app/action/auth/allApi';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import { toast } from 'react-toastify';

interface Props {
    food: FoodDetails;
};

export interface CartFood extends FoodDetails {
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
        } else {
            router.push("/signIn");
        }
    };

    return (
        <div className="rounded-lg shadow-2xl space-y-5">
            {/* image content */}
            <Link href={`/allFood/${food.food_id}`}>
                <div className="relative h-[200px] overflow-hidden rounded-t-lg cursor-pointer group">
                    <Image
                        src={food.image}
                        alt={food.foodName}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover rounded-t-lg"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity duration-300">
                        <p className="text-white text-lg font-semibold">Click To See Details</p>
                    </div>
                </div>
            </Link>

            {/* text content */}
            <div className="mx-5 mb-5">
                <div className="flex justify-between items-center mt-3">
                    <h1 className="text-md lg:text-lg font-semibold">
                        {food.foodName}  
                    </h1>
                   
                </div>

                <div className="mt-3 flex justify-between items-center ">
                <p className="flex justify-center gap-1 items-center ">
                        <span className="text-orange-400">
                            <FaStar />
                        </span>
                        {food.rating.toFixed(1)} <span className=" text-sm">({food.reviewCount})</span>
                    </p>
                    <p className="flex items-center justify-end text-md text-black font-bold">{food.price} BDT</p>
                    
                </div>

                {/* buttons */}
                <div className="mt-3 flex items-center justify-between gap-2">
                    <button disabled={!food.is_available} onClick={handleAddToCart} className={`${food.is_available ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'} text-white bg-orange-500 hover:bg-orange-600 flex items-center justify-center space-x-1 py-2 px-2 sm:px-4 rounded-sm shadow-md transition-colors duration-300`}>
                        <FaShoppingCart size={20} />
                       
                    </button>

                    <Link href={`/cart`}><button className='text-orange-950 hover:text-white transition-all border border-orange-400 hover:bg-orange-500 flex items-center justify-center space-x-2 py-2 px-4 rounded-sm shadow-md duration-300 cursor-pointer'>
                       
                        <span className="ml-1">{food.is_available ? 'Order Now' : 'Out of Stock'}</span>
                    </button></Link>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;