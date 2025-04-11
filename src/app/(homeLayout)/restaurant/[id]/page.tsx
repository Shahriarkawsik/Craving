'use client';
import React, { JSX, useEffect, useState } from 'react';
import { getFoodByRestaurantId } from '@/app/action/auth/allApi';
import { useParams } from 'next/navigation';

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
}

export default function Page(): JSX.Element {
  const params = useParams();
  const id = params?.id as string; // ✅ Correct way to extract param

  const [foods, setFoods] = useState<FoodItem[]>([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        if (id) {
          const result = await getFoodByRestaurantId({ id });
          console.log('Fetched foods:', result);
          setFoods(result as FoodItem[]);
        }
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };

    fetchFoods();
  }, [id]);

  return (
    <div>
      <div className="w-11/12 lg:w-9/12 mx-auto py-8 sm:py-12">
        <h1 className="text-2xl font-bold mb-6">Restaurant Menu</h1>
        {foods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((food) => (
              <div key={food._id} className="border rounded-xl p-4 shadow hover:shadow-md transition">
                {/* Uncomment the image line below if you want to show food images */}
                {/* <img src={food.image} alt={food.foodName} className="w-full h-48 object-cover rounded-md mb-4" /> */}
                <h2 className="text-xl font-semibold">{food.foodName}</h2>
                <p className="text-gray-600">{food.description}</p>
                <p className="text-sm mt-1 text-gray-500">Category: {food.category}</p>
                <p className="mt-2 font-bold">${food.price.toFixed(2)}</p>
                <p className={`mt-1 text-sm ${food.is_available ? 'text-green-600' : 'text-red-500'}`}>
                  {food.is_available ? 'Available' : 'Not Available'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No foods found for this restaurant.</p>
        )}
      </div>
    </div>
  );
}
