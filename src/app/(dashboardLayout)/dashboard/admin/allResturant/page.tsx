"use client";
import {CommonPayload,  getRestaurant, updateRestaurantStatus} from "@/app/action/auth/allApi";
import Spinner from "@/components/shared/Spinner";
import { Switch } from "@/components/ui/switch";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AllResturant = () => {
  const [restaurants, setRestaurants] = useState<CommonPayload[]>([]);
  const [isLoading, setIsLoading] = useState(false);  
  //   console.log(restaurants);

  useEffect(() => {
    const fetchAllRestaurants = async () => {
      try {
        setIsLoading(true);
        const response = await getRestaurant();
        if (Array.isArray(response)) {
          setRestaurants(response);
        } else {
          setRestaurants([]);
        }
      } catch (error) {
        console.error("Error fetching rider applications:", error);
        setRestaurants([]); // ensure it's always an array
      } finally{
        setIsLoading(false);
      }
    };
    fetchAllRestaurants();
  }, []);

  if(isLoading){
    return <div className="w-full min-h-screen flex items-center justify-center">
      <Spinner />;
    </div>
  }

  // handle block and unblock
    const handleToggleRestaurantStatus = async (e: boolean, id: string, indx: number) => {
      const status: string = e ? 'Blocked' : 'Active';
  
      // update ui
      setRestaurants(prev =>
        prev.map((restaurant, i) =>
          i === indx ? { ...restaurant, restaurantStatus: status } : restaurant
        )
      );
  
      const result = await updateRestaurantStatus(id, status);
      
      if(result.acknowledged){
        if(e){
          toast.success('Restaurant is Blocked!');
        }else{
          toast.success('Restaurant is Unblocked!');
        }
      }else{
        toast.error('Something went wrong!');
      }
    }

  return (
    <div className="space-y-5">
          <section>
            <h1 className="uppercase text-2xl">All Restaurant</h1>
          </section>
    
          <section className="overflow-auto w-full bg-white">
            <table className="table w-full border-collapse border border-gray-300">
              {/* Table Head */}
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-4 whitespace-nowrap w-[10%]">SL NO</th>
                  <th className="p-4 text-left w-[20%]">Restaurant</th>
                  <th className="p-4 text-left w-[25%]">Restaurant Information</th>
                  <th className="p-4 text-left w-[25%]">Owner Infromation</th>
                  <th className="p-4 w-[20%]">Actions</th>
                </tr>
              </thead>
    
              {/* table body */}
              <tbody>
                {restaurants.length > 0 ? restaurants.map((restaurant, indx) => (
                  <tr key={restaurant._id} className="border-b border-gray-300 text-center even:bg-gray-100">
                    <td className='font-semibold px-4'>{indx + 1}</td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10">
                          <Image
                            src={restaurant.restaurantLogo!}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                            alt="Image"
                          />
                        </div>
                        <div>
                          <h1 className="font-medium whitespace-nowrap capitalize">{restaurant.restaurantName}</h1>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-left">
                      <p className="whitespace-nowrap">Email: {restaurant.restaurantEmail}</p>
                      <p className="whitespace-nowrap">Number: {restaurant.restaurantNumber}</p>
                    </td>

                    <td className="p-4 text-left">
                      <p className="whitespace-nowrap">Name: {restaurant.restaurantOwnerName}</p>
                      <p className="whitespace-nowrap">Email: {restaurant.restaurantOwnerEmail}</p>
                    </td>

                    <td className='p-4 whitespace-nowrap'>
                      Unblock <div className="mx-2 inline-block">
                        <Switch onCheckedChange={(e) => handleToggleRestaurantStatus(e, restaurant._id!, indx)} checked={restaurant.restaurantStatus !== 'Active'} id="airplane-mode" className="data-[state=checked]:bg-amber-500 transition-colors cursor-pointer" />
                      </div> Block
                    </td>
                  </tr>
                )) : <tr><td colSpan={6} className='text-xl py-5 font-medium text-center text-red-400'>Restaurant is not found!</td></tr>}
              </tbody>
    
            </table>
          </section>
        </div>
  );
};

export default AllResturant;
