"use client";
import { TiDelete } from "react-icons/ti";
import React, { useEffect, useState } from "react";
import { deleteCartItem, getOrderCartByEmail } from "@/app/action/auth/allApi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Swal from "sweetalert2";

interface CartItem {
    _id: string;
    restaurant_id: string;
    foodName: string;
    description: string;
    price: number;
    category: string;
    image: string;
    is_available: boolean;
    created_at: Date | null;
    owner_email: string | null;
    user_email: string;
}
interface DeleteResponse {
    deletedCount: number;
  }

export default function CartPage() {
    const { data: session } = useSession();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<string | null>(null);

    const fetchCartItems = async () => {
        if (session?.user?.email) {
            try {
                const items = await getOrderCartByEmail(session.user.email);
                setCartItems(items);
            } catch (error) {
                console.error("🚨 Error fetching cart items:", error);
            }
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, [session]);

    const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);


    const handleDeleteCartItem = async (id: string): Promise<void> => {
        console.log(id)
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
              setLoading(id);
              const response: DeleteResponse = await deleteCartItem({id});
    
              if (response.deletedCount > 0) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
                fetchCartItems();
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
        <div className="w-11/12 max-w-screen-xl mx-auto mt-12">
            <h2 className="text-xl md:text-2xl font-bold mb-4">🛍️ Your Cart</h2>

            {/* Responsive layout: mobile = column, desktop = grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
                {/* 🧾 Table Section */}
                <div className="col-span-1 md:col-span-8 overflow-x-auto bg-white rounded-md shadow-md p-2">
                    <Table className="min-w-[700px]">
                        <TableCaption>Your selected food items</TableCaption>
                        <TableHeader className="bg-gray-100">
                            <TableRow>
                                <TableHead className="text-center">S/N</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cartItems.map((item, index) => (
                                <TableRow key={item._id}>
                                    <TableCell className="text-center">{index + 1}</TableCell>
                                    <TableCell>
                                        <Image
                                            src={item.image}
                                            width={50}
                                            height={50}
                                            alt="Food Image"
                                            className="w-12 h-12 object-cover rounded-md"
                                        />
                                    </TableCell>
                                    <TableCell>{item.foodName}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>${item.price.toFixed(2)}</TableCell>
                                    <TableCell className="flex flex-col md:flex-row gap-2 mt-2">
                                        <button
                                            onClick={() => handleDeleteCartItem(item._id)}
                                            className=" text-black text-2xl rounded-md cursor-pointer  px-3 py-1 flex items-center justify-center transition "
                                            disabled={loading === item._id}
                                        >
                                            {loading === item._id ? (
                                                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                                            ) : (
                                                <TiDelete />
                                            )}
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* 🧾 Total Amount Section */}
                <div className="col-span-1 md:col-span-4 bg-gray-50 p-4 rounded-md shadow-sm flex flex-col justify-center">
                    <h3 className="text-lg md:text-xl font-semibold mb-2">Total Amount</h3>
                    <p className="text-2xl font-bold text-green-600">${totalAmount.toFixed(2)}</p>
                    <button className="btn bg-blue-600 cursor-pointer text-white mt-4 py-2 rounded">Proceed to payment</button>
                </div>
            </div>
        </div>
    );
}
