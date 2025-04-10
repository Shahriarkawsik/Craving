
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

import Image from "next/image";
import Link from "next/link";

interface FoodDetailsModalProps {
  food: {
    foodName: string;
    description: string;
    price: number;
    category: string;
    image: string;
    is_available: boolean;
    created_at: string;
  };
}

export default function OrderDetailsModal({ food }: FoodDetailsModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-green-500 text-white px-3 py-1 rounded-md transition hover:bg-green-600">
          Details
        </button>
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
            <Link href="/cart"><Button type="button" variant="default">Add to Cart</Button></Link>
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
