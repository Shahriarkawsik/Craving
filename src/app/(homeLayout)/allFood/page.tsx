"use client";
import React from 'react'
import allFoodBannerImage from "../../../assets/bannerImg/dish-banner-001.jpg";

import { getAllFoods, } from "@/app/action/auth/allApi";
import { useEffect, useState } from "react";

// import Swal from "sweetalert2";
import FoodCard from './components/FoodCard';

interface FoodItem {
    _id: string;
    restaurant_id: string;
    foodName: string;
    description: string;
    price: number;
    category: string;
    image: string;
    is_available: boolean;
    created_at: string;
    owner_email: string;
}

// Delete API response 


export default function AllFoodsPage() {
    const [foods, setFoods] = useState<FoodItem[]>([]);
    //   const [loading, setLoading] = useState<string | null>(null);

    const fetchData = async (): Promise<void> => {
        try {
            const data = await getAllFoods() as FoodItem[];
            setFoods(data);
            console.log(data)
        } catch (error) {
            console.error("Error fetching food data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div>
            <div
                className="flex justify-center items-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${allFoodBannerImage.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "350px",
                    width: "100%",
                }}
            >
                {/* All Food Route banner  */}

                <div className="w-3xl mx-auto text-center z-50">
                    <h2 className="text-2xl md:text-4xl font-bold text-white">
                        Welcome to Our Food World
                    </h2>
                    <p className="mt-2 text-white">
                        Explore a variety of mouth-watering dishes from around the world. From appetizers to desserts, discover meals that suit every taste and occasion.
                    </p>
                </div>
            </div>

            {/* All Food Section */}
            <div className="text-center my-10 ">
                <h1 className=" text-2xl  mt-3 lg:text-4xl  text-orange-600  uppercase border-t-2 border-b-2 border-orange-300 p-4 inline-block">
                    Choose Your Favorite Dish
                </h1>
            </div>

            <div className='w-11/12 mx-auto'>
                <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {
                        foods.map(food => <FoodCard key={food._id} food={food}></FoodCard>)
                    }
                </div>
            </div>
        </div>
    );
}





// export default function page() {
//     return (
//         <div>
//             <div
//                 className="flex justify-center items-center"
//                 style={{
//                     backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${allFoodBannerImage.src})`,
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                     backgroundRepeat: "no-repeat",
//                     height: "350px",
//                     width: "100%",
//                 }}
//             >
//                 {/* All Food Route banner  */}

//                 <div className="w-3xl mx-auto text-center z-50">
//                     <h2 className="text-2xl md:text-4xl font-bold text-white">
//                         Welcome to Our Food World
//                     </h2>
//                     <p className="mt-2 text-white">
//                         Explore a variety of mouth-watering dishes from around the world. From appetizers to desserts, discover meals that suit every taste and occasion.
//                     </p>
//                 </div>
//             </div>

//             {/* All Food Section */}
//             <div className="text-center my-10 ">
//                 <h1 className=" text-2xl  mt-3 lg:text-4xl  text-orange-600  uppercase border-t-2 border-b-2 border-orange-300 p-4 inline-block">
//                     Choose Your Favorite Dish
//                 </h1>
//             </div>

//             <div className='w-11/12 mx-auto'>
//                 <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 border-2">
//                     {/* <img src={image} alt={name} className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" /> */}
//                     <div className="p-6">
//                         <h3 className="text-2xl font-semibold text-gray-800 mb-2">name</h3>
//                         <p className="text-sm text-gray-600 mb-4">description</p>
//                         <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
//                             View More
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
