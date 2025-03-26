"use client";
import React, { useEffect, useState } from "react";
import allFoodBannerImage from "../../../assets/bannerImg/dish-banner-001.jpg";
import { getAllFoods } from "@/app/action/auth/allApi";
import FoodCard from "./components/FoodCard";
import { Search } from "lucide-react";
import { debounce } from "lodash";

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

export default function AllFoodsPage() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // ✅ Loading state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (query = ""): Promise<void> => {
    try {
      setIsLoading(true); // ✅ Loading শুরু
      const data = await getAllFoods(query) as FoodItem[]; // Backend থেকে ডাটা আনছে
      setFoods(data);
    } catch (error) {
      console.error("Error fetching food data:", error);
    } finally {
      setIsLoading(false); // ✅ Data আসার পর Loading বন্ধ
    }
  };

  // Debounced Search Query Update
  const handleSearch = debounce((query: string) => {
    setSearchQuery(query);
    fetchData(query);
  }, 500); // 500ms Delay (Debounce)

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
        <div className="w-3xl mx-auto text-center z-50">
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            Welcome to Our Food World
          </h2>
          <p className="mt-2 text-white">
            Explore a variety of mouth-watering dishes from around the world.
            From appetizers to desserts, discover meals that suit every taste
            and occasion.
          </p>
        </div>
      </div>

      {/* All Food Section */}
      <div className="text-center my-10">
        <h1 className="text-2xl mt-3 lg:text-4xl text-orange-600 uppercase border-t-2 border-b-2 border-orange-300 p-4 inline-block">
          Choose Your Favorite Dish
        </h1>
      </div>

      <div className="w-11/12 mx-auto">
        {/* Search Input */}
        <div className="relative w-full max-w-sm mb-6 mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search food..."
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 w-full pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Show Loading */}
        {isLoading ? (
          <p className="text-center text-blue-500 text-lg font-semibold">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
            {foods.length > 0 ? (
              foods.map((food) => <FoodCard key={food._id} food={food} />)
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No matching food found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
