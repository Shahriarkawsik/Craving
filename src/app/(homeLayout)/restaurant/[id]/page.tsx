'use client';
import React, { JSX, useEffect, useState } from 'react';
import { getFoodByRestaurantId } from '@/app/action/auth/allApi';
import { useParams } from 'next/navigation';
import Image from 'next/image';
// import { FaStar } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';

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
          // console.log('Fetched foods:', result);
          setFoods(result as FoodItem[]);
        }
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };

    fetchFoods();
  }, [id]);


  return (
    <div className='w-11/12 lg:w-9/12 mx-auto py-8 sm:py-12'>
      <div className="">
        <h1 className="text-2xl font-bold mb-6">Restaurant Menu</h1>
        {foods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((food) => (
              <div
                key={food._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={food.image}
                  alt={food.foodName}
                  width={350}
                  height={200}
                  className="object-cover w-full h-48"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{food.foodName}</h3>
                  <p className="text-sm text-gray-500 mt-2">{food.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, index) => (
                        <FaStar key={index} className={`mr-1 ${5 >= index + 1 ? "text-yellow-500" : "text-gray-300"}`} />
                      ))}
                      <span className="ml-2 text-sm">{5}</span>
                    </div>
                    <span className="font-semibold text-lg">${food.price}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    {/* <Link href={`${categoryName}/${food._id}`} className="text-orange-700 hover:text-orange-800 text-sm">
                      View Details
                    </Link> */}
                    <button
                      className={`text-white bg-orange-400 hover:bg-orange-500 flex items-center justify-center space-x-2 py-2 px-4 rounded-sm shadow-md transition-colors duration-300 ${!food.is_available ? 'cursor-not-allowed bg-gray-400 hover:bg-gray-400' : 'cursor-pointer'
                        }`}
                      disabled={!food.is_available}
                    >
                      <FaShoppingCart size={20} />
                      <span>{food.is_available ? 'Add to Cart' : 'Out of Stock'}</span>
                    </button>
                  </div>
                </div>
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
