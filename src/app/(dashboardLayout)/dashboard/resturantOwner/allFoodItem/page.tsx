"use client";

import { deleteFood, getAllFoodsData } from "@/app/action/auth/allApi";
import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


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
  const [loadingId, setLoadingId] = useState<string | null>(null); // লোডিং state
  const email = "mhbabu2002@gmail.com";

  const fetchData = async () => {
    
    try {
      const data = await getAllFoodsData(email);
      setFoodData(data);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteFood = async (id: string): Promise<void> => {
    try {
      setLoadingId(id); // যেই item delete হচ্ছে তার id সেট করলাম
      const result = await deleteFood({ id });
      if (result.deletedCount > 0) {
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting food item:", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    

    <div className="w-11/12 mx-auto overflow-x-auto">
  <Table className="min-w-[700px] border border-gray-300 rounded-lg">
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader className="bg-gray-100">
      <TableRow>
        <TableHead className="w-[10%] text-center">s/n</TableHead>
        <TableHead className="w-[15%] text-left">Image</TableHead>
        <TableHead className="w-[20%] text-left">Name</TableHead>
        <TableHead className="w-[15%] text-left">Category</TableHead>
        <TableHead className="w-[15%] text-left">Price</TableHead>
        <TableHead className="w-[25%] text-left">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {foodData.map((food, index) => (
        <TableRow key={food.foodName} className="border-t">
          <TableCell className="text-center font-medium">{index + 1}</TableCell>
          <TableCell className=" text-center">
            <Image
              src={food.image}
              width={50}
              height={50}
              alt="Food Image"
              className="w-12 h-12 object-cover rounded-md"
            />
          </TableCell>
          <TableCell className=" text-left">{food.foodName}</TableCell>
          <TableCell className=" text-left">{food.category}</TableCell>
          <TableCell className=" text-left">${food.price}</TableCell>
          <TableCell className=" flex gap-2 justify-left items-center">
            <button className="bg-blue-500 text-white px-3 py-1 rounded-md transition hover:bg-blue-600">
              Edit
            </button>
            <button
              onClick={() => handleDeleteFood(food._id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md flex items-center justify-center transition hover:bg-red-600"
              disabled={loadingId === food._id}
            >
              {loadingId === food._id ? (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
              ) : (
                "Delete"
              )}
            </button>
            <button className="bg-green-500 text-white px-3 py-1 rounded-md transition hover:bg-green-600">
              Details
            </button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>


    // <div className="w-11/12 mx-auto mt-6 overflow-x-auto">
    //   <table className="w-full border-collapse border border-gray-300 min-w-[600px]">
    //     <thead>
    //       <tr className="bg-gray-200">
    //         <th className="border p-2">Serial</th>
    //         <th className="border p-2">Food Image</th>
    //         <th className="border p-2">Food Name</th>
    //         <th className="border p-2">Category</th>
    //         <th className="border p-2">Price</th>
    //         <th className="border p-2">Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {foodData.map((food, index) => (
    //         <tr key={food._id} className="text-center border">
    //           <td className="border p-2">{index + 1}</td>
    //           <td className="border p-2">
    //             <Image
    //               src={food.image}
    //               alt={food.foodName}
    //               width={100}
    //               height={100}
    //               className="w-16 h-16 object-cover mx-auto"
    //             />
    //           </td>
    //           <td className="border p-2">{food.foodName}</td>
    //           <td className="border p-2">{food.category}</td>
    //           <td className="border p-2">${food.price}</td>
    //           <td className="border p-2 flex flex-col md:flex-row gap-2 justify-center">
    //             <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
    //             <button
    //               onClick={() => handleDeleteFood(food._id)}
    //               className="bg-red-500 text-white px-3 py-1 rounded flex items-center justify-center"
    //               disabled={loadingId === food._id} // লোডিং চলাকালীন disable
    //             >
    //               {loadingId === food._id ? (
    //                 <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
    //               ) : (
    //                 "Delete"
    //               )}
    //             </button>
    //             <button className="bg-green-500 text-white px-3 py-1 rounded">Details</button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
}
