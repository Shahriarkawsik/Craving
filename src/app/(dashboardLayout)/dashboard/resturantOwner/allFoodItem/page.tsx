"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import { getAllFoodsData } from "@/app/action/auth/allApi";
import { useEffect, useState } from "react";
import Image from "next/image";


interface FoodItem {
  _id: string;
  id: string;
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

export default function AllFoodItems() {
  const [foodData, setFoodData] = useState<FoodItem[]>([]);
  const email = "mhbabu2002@gmail.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllFoodsData(email);
        setFoodData(data);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(foodData)
  return (
    <div className="w-11/12 mx-auto mt-6 overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 min-w-[600px]">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Serial</th>
            <th className="border p-2">Food Image</th>
            <th className="border p-2">Food Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {foodData.map((food, index) => (
            <tr key={food._id} className="text-center border">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <Image src={food.image} alt={food.foodName} width={100} height={100}className="w-16 h-16 object-cover mx-auto" />
              </td>
              <td className="border p-2">{food.foodName}</td>
              <td className="border p-2">{food.category}</td>
              <td className="border p-2">${food.price}</td>
              <td className="border p-2 flex flex-col md:flex-row gap-2 justify-center">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                <button className="bg-green-500 text-white px-3 py-1 rounded">Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
