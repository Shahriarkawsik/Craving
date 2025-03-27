"use client";
import { useParams } from "next/navigation";
import { FC } from "react";
import categoryBannerImage from "../../../../assets/bannerImg/aboutBanner1.jpg";
import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import foodImage from "../../../../assets/bannerImg/dish-banner-001.jpg";
import { FaShoppingCart } from "react-icons/fa";

interface FoodItem {
    id: number;
    restaurant_id: number;
    foodName: string;
    description: string;
    price: number;
    foodImage: string;
    is_available: boolean;
    rating: number;
}

const Page: FC = () => {
    const params = useParams(); // For dynamic routes like `[categoryName]`
    const categoryName = decodeURIComponent(params.categoryName as string);

    // food data
    const foodItems: FoodItem[] = [
        {
            id: 1,
            restaurant_id: 101,
            foodName: "Cheeseburger",
            description: "A delicious cheeseburger with fresh lettuce, tomatoes, and melted cheese.",
            price: 5.99,
            foodImage: "../../../../assets/bannerImg/dish-banner-001.jpg",
            is_available: true,
            rating: 4.5
        },
        {
            id: 2,
            restaurant_id: 102,
            foodName: "Margherita Pizza",
            description: "A classic Margherita pizza with fresh basil, mozzarella, and tomato sauce.",
            price: 7.99,
            foodImage: "../../../../assets/bannerImg/dish-banner-001.jpg",
            is_available: true,
            rating: 4.7
        },
        {
            id: 3,
            restaurant_id: 103,
            foodName: "Vegetable Salad",
            description: "A healthy and refreshing salad with a variety of fresh vegetables.",
            price: 4.49,
            foodImage: "../../../../assets/bannerImg/dish-banner-001.jpg",
            is_available: false,
            rating: 4.2
        },
        {
            id: 4,
            restaurant_id: 104,
            foodName: "Chicken Sandwich",
            description: "A crispy chicken sandwich with a savory sauce and pickles.",
            price: 6.99,
            foodImage: "../../../../assets/bannerImg/dish-banner-001.jpg",
            is_available: true,
            rating: 4.6
        },
        {
            id: 5,
            restaurant_id: 105,
            foodName: "Spaghetti Bolognese",
            description: "A classic spaghetti dish with rich, flavorful Bolognese sauce.",
            price: 8.49,
            foodImage: "../../../../assets/bannerImg/dish-banner-001.jpg",
            is_available: true,
            rating: 4.8
        },
        {
            id: 6,
            restaurant_id: 106,
            foodName: "Grilled Salmon",
            description: "Tender grilled salmon served with a side of vegetables.",
            price: 12.99,
            foodImage: "../../../../assets/bannerImg/dish-banner-001.jpg",
            is_available: true,
            rating: 4.7
        },
        {
            id: 7,
            restaurant_id: 107,
            foodName: "Cheese Nachos",
            description: "Crispy nachos topped with melted cheese and jalapeños.",
            price: 4.99,
            foodImage: "../../../../assets/bannerImg/dish-banner-001.jpg",
            is_available: false,
            rating: 4.3
        },
        {
            id: 8,
            restaurant_id: 108,
            foodName: "Beef Tacos",
            description: "Soft tacos filled with seasoned beef, lettuce, and salsa.",
            price: 5.49,
            foodImage: "../../../../assets/bannerImg/dish-banner-001.jpg",
            is_available: true,
            rating: 4.4
        },
        {
            id: 9,
            restaurant_id: 109,
            foodName: "Vegetable Stir Fry",
            description: "A healthy stir fry with a variety of fresh vegetables and soy sauce.",
            price: 7.29,
            foodImage: "../../../../assets/bannerImg/dish-banner-001.jpg",
            is_available: true,
            rating: 4.1
        },
        {
            id: 10,
            restaurant_id: 110,
            foodName: "Chocolate Cake",
            description: "A rich and moist chocolate cake topped with creamy frosting.",
            price: 3.99,
            foodImage: "../../../../assets/bannerImg/dish-banner-001.jpg",
            is_available: true,
            rating: 4.9
        }
    ];

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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-5">
                    {foodItems.map((food) => (
                        <div
                            key={food.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <Image
                                src={foodImage}
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
                                            <FaStar key={index} className={`mr-1 ${food.rating >= index + 1 ? "text-yellow-500" : "text-gray-300"}`} />
                                        ))}
                                        <span className="ml-2 text-sm">{food.rating}</span>
                                    </div>
                                    <span className="font-semibold text-lg">${food.price}</span>
                                </div>
                                <div className="flex justify-between items-center mt-3">
                                    <Link href={`/${categoryName}/${food.id}`} className="text-orange-700 hover:text-orange-800 text-sm">
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
                </div>
            </section>
        </div>
    );
};

export default Page;
