"use client";
import { useParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import categoryBannerImage from "../../../../assets/bannerImg/aboutBanner1.jpg";
import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { getAllFoods } from "@/app/action/auth/allApi";

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

const Page: FC = () => {
    const params = useParams(); // For dynamic routes like `[categoryName]`
    const categoryName = decodeURIComponent(params.categoryName as string);

    // food data
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (query = "", category = categoryName, sort = ""): Promise<void> => {
        try {
            setIsLoading(true);
            const data = await getAllFoods(query, category, sort) as FoodItem[];
            setFoodItems(data);
        } catch (error) {
            console.error("Error fetching food data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    console.log(foodItems);
    return (
        <div>
            {/* banner section */}
            <section
                className="flex justify-center items-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${categoryBannerImage.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "350px",
                    width: "100%",
                }}
            >
                {/* this is a banner */}
                <div className="w-3xl mx-auto text-center z-50">
                    <h2 className="text-2xl md:text-4xl font-bold text-white">{categoryName}</h2>
                    <p className="mt-2 text-white">
                        Good food, good mood - fuel your day with flavors that make every bite unforgettable!
                    </p>
                </div>
            </section>

            <section className="w-11/12 mx-auto">
                {/* path track */}
                <div className="mt-5">
                    <ul className="flex items-center justify-start font-medium">
                        <li className="hover:text-orange-600 mr-1">
                            <Link href={"/"}>{"Home > "}</Link>
                        </li>
                        <li className="text-orange-600">{categoryName}</li>
                    </ul>
                </div>

                {/* food card */}
                {!isLoading ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-5">
                    {foodItems.map((food) => (
                        <div
                            key={food._id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <Image
                                src={food.image}
                                alt={food.foodName}
                                width={350}
                                height={200}
                                className="object-cover w-full h-48"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{food.foodName}</h3>
                                <p className="text-sm text-gray-500 mt-2">{food.description}</p>
                                <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center text-yellow-500">
                                        {[...Array(5)].map((_, index) => (
                                            <FaStar key={index} className={`mr-1 ${5 >= index + 1 ? "text-yellow-500" : "text-gray-300"}`} />
                                        ))}
                                        <span className="ml-2 text-sm">{5}</span>
                                    </div>
                                    <span className="font-semibold text-lg">${food.price}</span>
                                </div>
                                <div className="flex justify-between items-center mt-3">
                                    <Link href={`${categoryName}/${food._id}`} className="text-orange-700 hover:text-orange-800 text-sm">
                                        View Details
                                    </Link>
                                    <button
                                        className={`text-white bg-orange-400 hover:bg-orange-500 flex items-center justify-center space-x-2 py-2 px-4 rounded-sm shadow-md transition-colors duration-300 ${!food.is_available ? 'cursor-not-allowed bg-gray-400 hover:bg-gray-400' : 'cursor-pointer'
                                            }`}
                                        disabled={!food.is_available}
                                    >
                                        <FaShoppingCart size={20} />
                                        <span>{food.is_available ? 'Add to Cart' : 'Out of Stock'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>: <div className="w-full h-full flex items-center justify-center">Loading...</div>}
            </section>
        </div>
    );
};

export default Page;
