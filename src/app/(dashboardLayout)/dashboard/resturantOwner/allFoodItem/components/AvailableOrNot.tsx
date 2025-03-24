import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { foodAvailableOrNot } from "@/app/action/auth/allApi";
import { toast } from "react-toastify";

interface AvailableOrNotProps {
  food: {
    foodName: string,
    is_available: boolean,
    _id: string;
  };
}

interface ApiResponse {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: null | string;
  upsertedCount: number;
  matchedCount: number;
}

export default function AvailableOrNot({ food }: AvailableOrNotProps): JSX.Element {
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  console.log(isAvailable);

  useEffect(() => {
    setIsAvailable(food.is_available);
  }, [food.is_available]);

  const handleToggle = async (id: string) => {
    console.log(id);
    const newAvailability = !isAvailable;
    setIsAvailable(newAvailability);
    const result: ApiResponse = await foodAvailableOrNot({ isAvailable: newAvailability, id });
    if(result.modifiedCount > 0){
      console.log(result)
      toast.success(`${food.foodName} is available now`)
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch id="availability-toggle" checked={isAvailable} onCheckedChange={() => handleToggle(food._id)} />
      <Label htmlFor="availability-toggle">
        {isAvailable ? "Available" : "Not Available"}
      </Label>
    </div>
  );
}