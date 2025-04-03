"use client";

import { deleteFood, FoodItem, getAllFoodsData } from "@/app/action/auth/allApi";
import { useEffect, useState } from "react";
import Image from "next/image";
<<<<<<< HEAD
=======

// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
>>>>>>> 60db2602f75572870e1a511bb50e6c9f4561d57d
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import Swal from "sweetalert2";
import FoodDetailsModal from "./components/FoodDetailsModal";
import AvailableOrNot from "./components/AvailableOrNot";

// interface CommonPayload {
//   _id: string;
//   id: string;
//   restaurant_id: string;
//   foodName: string;
//   description: string;
//   price: number;
//   category: string;
//   image: string;
//   is_available: boolean;
//   created_at: string;
//   owner_email: string;
// }

// Delete API response 
interface DeleteResponse {
  deletedCount: number;
}

export default function AllFoodItems() {
  const [foodData, setFoodData] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const email = "mhbabu2002@gmail.com";

  const fetchData = async (): Promise<void> => {
    try {
      const data = await getAllFoodsData(email) as FoodItem[];
      setFoodData(data);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteFood = async (id: string): Promise<void> => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
<<<<<<< HEAD
          setLoading(id);
          const response: DeleteResponse = await deleteFood({ id, isAvailable: false });

          if (response.deletedCount > 0) {
=======
          setLoading(id); // যেই item delete হচ্ছে তার id সেট করলাম
          const result = await deleteFood({
            id,
            isAvailable: false,
          });
          if (result.deletedCount > 0) {
>>>>>>> 60db2602f75572870e1a511bb50e6c9f4561d57d
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            fetchData();
          }
        } catch (error) {
          console.error("Error deleting food item:", error);
        } finally {
          setLoading(null);
        }
      }
    });
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
            <TableHead className="w-[25%] text-left">
              Available or Not
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {foodData.map((food, index) => (
<<<<<<< HEAD
            <TableRow key={food._id} className="border-t">
              <TableCell className="text-center font-medium">{index + 1}</TableCell>
              <TableCell className="text-center">
=======
            <TableRow key={food.foodName} className="border-t">
              <TableCell className="text-center font-medium">
                {index + 1}
              </TableCell>
              <TableCell className=" text-center">
>>>>>>> 60db2602f75572870e1a511bb50e6c9f4561d57d
                <Image
                  src={food.image}
                  width={50}
                  height={50}
                  alt="Food Image"
                  className="w-12 h-12 object-cover rounded-md"
                />
              </TableCell>
              <TableCell className="text-left">{food.foodName}</TableCell>
              <TableCell className="text-left">{food.category}</TableCell>
              <TableCell className="text-left">${food.price}</TableCell>
              <TableCell className="flex gap-2 justify-left items-center">
                <Link href={`/dashboard/resturantOwner/updateFood/${food._id}`}>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md transition hover:bg-blue-600">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteFood(food._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md flex items-center justify-center transition hover:bg-red-600"
                  disabled={loading === food._id}
                >
                  {loading === food._id ? (
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                  ) : (
                    "Delete"
                  )}
                </button>
<<<<<<< HEAD
                <div>
=======
                <div className="">
>>>>>>> 60db2602f75572870e1a511bb50e6c9f4561d57d
                  <FoodDetailsModal food={food} />
                </div>
              </TableCell>
              <TableCell>
                <AvailableOrNot food={food} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
