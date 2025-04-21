"use client";
import {  useState } from "react";
import bannerImage from "../../../assets/bannerImg/dish-banner-001.jpg";
import { FoodDetails, getAllFoods } from "@/app/action/auth/allApi";
import { Search } from "lucide-react";
import { debounce } from "lodash";
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSearchParams } from "next/navigation";
import FoodCard from "@/components/shared/FoodCard";
import Banner from "@/components/shared/Banner";


export default function AllFoodsPage() {
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get("category") || "";
  const [foods, setFoods] = useState<FoodDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [foodCategory, setFoodCategory] = useState<string>(queryCategory)
  const [foodSort, setFoodSort] = useState<string>('')

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (query = "", category = queryCategory, sort = ""): Promise<void> => {
    try {
      setIsLoading(true);
      const data = await getAllFoods(query, category, sort);
      setFoods(data);
    } catch (error) {
      console.error("Error fetching food data:", error);
    } finally {
      setIsLoading(false);
    }
  };


  // Debounced Search Query Update
  const handleSearch = debounce((query: string) => {
    setSearchQuery(query);
    fetchData(query, foodCategory, foodSort); // ✅ এখন search করলে category ও থাকবে
  }, 500);

  const handleCategory = debounce((category: string) => {
    setFoodCategory(category);
    fetchData(searchQuery, category, foodSort); // ✅ এখন category চেঞ্জ করলে searchQuery ও থাকবে
  }, 500);


  const handleSort = debounce((sort: string) => {
    // console.log(sort)
    setFoodSort(sort);
    fetchData(searchQuery, foodCategory, sort); // ✅ এখন category চেঞ্জ করলে searchQuery ও থাকবে
  }, 500);

  return (
    <div>
      {/* banner section */}
      <Banner image={bannerImage.src} title={`Welcome to Our Food World`} subtitle={`Explore a variety of mouth-watering dishes from around the world. From appetizers to desserts, discover meals that suit every taste and occasion.`} />

      {/* All Food Section */}
      <div className="text-center my-10">
        <h1 className="text-2xl mt-3 lg:text-4xl text-orange-600 uppercase border-t-2 border-b-2 border-orange-300 p-4 inline-block">
          Choose Your Favorite Dish
        </h1>
      </div>

      {/* Category Filter */}
      <div className="w-11/12 mx-auto">


        {/* Search Input */}
        <div className="md:flex justify-between items-center space-y-3.5">
          <div className="w-full md:w-[200px]">
            <Select onValueChange={(value) => handleCategory(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Food Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="All Food">All Food</SelectItem>
                  <SelectItem value="Fast Food">Fast Food</SelectItem>
                  <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="Organic Food">Organic Food</SelectItem>
                  <SelectItem value="Bakery">Bakery</SelectItem>
                  <SelectItem value="Chinese">Chinese</SelectItem>
                  <SelectItem value="Desert">Desert</SelectItem>
                  <SelectItem value="Sea Food">Sea Food</SelectItem>
                  <SelectItem value="Salad">Salad</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

          </div>



          <div className="relative w-[200px] md:w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search food..."
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 w-full pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sort */}
          <div>
            <Select onValueChange={(value) => handleSort(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort By Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Ascending">Ascending</SelectItem>
                  <SelectItem value="Descending">Descending</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

          </div>
        </div>

        {/* Show Loading */}
        {isLoading ? (
          <p className="text-center text-blue-500 text-lg font-semibold">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10 my-10">
            {foods.length > 0 ? (
              foods?.map((food) => <FoodCard key={food.food_id} food={food} />)
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
