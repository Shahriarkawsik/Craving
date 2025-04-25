"use client";
import { TiDelete } from "react-icons/ti";
import React, { useEffect, useState } from "react";
import { addToOrder, deleteCartItem, deleteOrderCartByEmail, getOrderCartByEmail } from "@/app/action/auth/allApi";
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
import Banner from "@/components/shared/Banner";
import bannerImage from "@/assets/bannerImg/aboutBanner1.jpg";

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
  const [address, setAddress] = useState<string>("");
  //   const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchCartItems = async () => {
      if (session?.user?.email) {
        try {
          const items = await getOrderCartByEmail(session.user.email);
          setCartItems(items);
          //   setLoading(false);
        } catch (error) {
          console.error("🚨 Error fetching cart items:", error);
        }
      }
    };
    fetchCartItems();
  }, [session]);
  const handleDeleteCartItem = async (id: string): Promise<void> => {
    console.log(id);
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
          const response: DeleteResponse = await deleteCartItem({ id });

          if (response.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            // fetchCartItems();
            const result = cartItems.filter((item) => item._id !== id);
            setCartItems(result);
          }
        } catch (error) {
          console.error("Error deleting food item:", error);
        }
      }
    });
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  // order collection data for payment
  const placedOrder: object = {
    userEmail: session?.user?.email,
    totalAmount: totalAmount,
    restaurantEmail: cartItems[0]?.owner_email,
    status: "Pending",
    date: new Date(),
    paymentStatus: "Pending",
    deliveryAddress: address,
    orderItems: cartItems
  }



  const initiatePayment = async () => {
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount,
        }),
      });

      const data = await res.json(); // Ensure backend responds with JSON

      if (data?.url) {
        // cart item saved in order collection
        await addToOrder([placedOrder]);

        window.location.href = data.url;

        if (!session?.user?.email) {
          throw new Error("User email not found in session.");
        }
        // delete the cart items after payment
        await deleteOrderCartByEmail(session.user.email);

      } else {
        console.error("No URL received from payment gateway.");
      }
    } catch (err) {
      console.error("Payment initiation error:", err);
    }
  };
  return (
    <div>
      <Banner image={bannerImage.src} title={`Your Cart`} subtitle={`See your added items.`} />

      {/* Responsive layout: mobile = column, desktop = grid */}
      <div className="w-11/12 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 my-10">
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
                  <TableCell>{item.price.toFixed(2)}</TableCell>
                  <TableCell className="flex flex-col md:flex-row gap-2 mt-2">
                    {/* TODO: Delete order Food */}
                    <button
                      onClick={() => handleDeleteCartItem(item._id)}
                      className="text-black text-2xl px-3 py-1 rounded-md cursor-pointer"
                    >
                      <TiDelete />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* 🧾 Total Amount Section */}
        <div className="col-span-1 md:col-span-4 bg-gray-50 p-4 rounded-md shadow-sm flex flex-col justify-center">
          {/* delivery address */}
          <form>
            <input placeholder="Enter your address" onChange={(e) => setAddress(e.target.value)} className="input input-bordered w-full max-w-sm p-2 border-2 rounded-md border-orange-300 mb-5" type="text" />
          </form>

          {/* total amount to pay */}
          <h3 className="text-lg md:text-xl font-semibold mb-2">
            Total Amount
          </h3>
          <p className="text-2xl font-bold text-green-600">
            BDT{totalAmount.toFixed(2)}
          </p>
          <button
            onClick={initiatePayment}
            className="btn bg-orange-600 cursor-pointer text-white mt-4 py-2 rounded"
          >
            Proceed to payment
          </button>
        </div>
      </div>
    </div>
  );
}

