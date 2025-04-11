
import { addToCart } from "@/app/action/auth/allApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";

interface FoodDetailsModalProps {
  food: {
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
    user_email: string
  };
  children: React.ReactNode;
}

export default function OrderDetailsModal({ food, children }: FoodDetailsModalProps) {

  const data = useSession();
  
    const cartFood = { ...food, user_email: data.data?.user?.email, created_at: new Date(food.created_at) }


  const handleClick = () => {
    addToCart(cartFood);
    toast.success("Added to cart")
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{food.foodName}</DialogTitle>
          <DialogDescription>{food.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Image
            src={food.image}
            alt={food.foodName}
            width={250}
            height={250}
            className="w-full h-40 object-cover rounded-lg"
          />
          <p><strong>Category:</strong> {food.category}</p>
          <p><strong>Price:</strong> ${food.price}</p>
          <p><strong>Availability:</strong> {food.is_available ? "Available" : "Out of stock"}</p>
          <p><strong>Added On:</strong> {new Date(food.created_at).toLocaleDateString()}</p>
        </div>

        <DialogFooter className="sm:justify-start flex items-center gap-2">
          <Button onClick={handleClick} type="button" variant="default">Add to Cart</Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
