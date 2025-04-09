import { getFoodDetails } from "@/app/action/auth/allApi";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";

// Define the interface for the food prop
interface Food {
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

interface FoodCardProps {
  food: Food; // Define the type of the food prop
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {

  // dynamic food details
  const handleClick = async (id: string) => {
    const foodDetailsData = await getFoodDetails(id);

    console.log(foodDetailsData); // ✅ log the fresh data
  };





  return (
    <div onClick={() => handleClick(food._id)}>
      <div className=" rounded-lg shadow-2xl ">
        <div className="rounded-lg rounded-b-none  relative overflow-hidden inline-block">
          {/* <Image
                    src={foodImg}
                    alt=" burger"
                    className="rounded-lg rounded-b-none  transition-transform duration-300 ease-in-out transform hover:scale-109 "
                  /> */}
          <p className="text-xl absolute top-3 right-3   ">
            <MdFavoriteBorder className=" p-1 rounded-full  w-8 h-8  hover:border-1 hover:bg-gray-300 bg-white " />
          </p>
        </div>
        <div className="space-y-2 mx-2 mb-1 p-2">
          <div className="flex justify-between items-center ">
            <h1 className=" text-md lg:text-lg font-semibold">
              {food.foodName}
            </h1>
            <p className="flex justify-center gap-1 items-center ">
              {" "}
              <span className="text-orange-400">
                <FaStar />
              </span>{" "}
              4.5 <span className=" text-sm">(200+)</span>
            </p>
          </div>
          <strong>${food.price}</strong>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
