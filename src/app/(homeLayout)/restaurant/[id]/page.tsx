'use client';
import React, { JSX, useEffect, useState } from 'react';
import { getFoodByRestaurantId } from '@/app/action/auth/allApi';
import { useParams } from 'next/navigation';
import Image from 'next/image';
// import { FaStar } from 'react-icons/fa6';
import { MdFavoriteBorder } from 'react-icons/md';

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


  console.log()



  return (
    <div className='w-11/12 lg:w-9/12 mx-auto py-8 sm:py-12'>
      <div className="">
        <h1 className="text-2xl font-bold mb-6">Restaurant Menu</h1>
        {foods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              foods.map((food) => <div key={food._id} className=" rounded-lg shadow-2xl ">
                <div className="rounded-lg rounded-b-none relative overflow-hidden">
                  <figure className='w-full h-52'>
                    <Image
                      src={food?.image}
                      alt=" burger"
                      className="rounded-lg rounded-b-none  transition-transform duration-300 ease-in-out transform hover:scale-109 w-full h-full"
                      width={100}
                      height={100}
                    />
                  </figure>
                  <p className="text-xl absolute top-3 right-3   ">
                    <MdFavoriteBorder className=" p-1 rounded-full  w-8 h-8  hover:border-1 hover:bg-gray-300 bg-white " />
                  </p>
                </div>
                <div className="space-y-2 mx-2 mb-1 p-2">
                  <div className="flex justify-between items-center ">
                    <h1 className=" text-md lg:text-lg font-semibold">{food.foodName}</h1>

                  </div>
                  <strong>${food.price}</strong>
                </div>
              </div>)
            }
          </div>
        ) : (
          <p>No foods found for this restaurant.</p>
        )}
      </div>
    </div>
  );
}
