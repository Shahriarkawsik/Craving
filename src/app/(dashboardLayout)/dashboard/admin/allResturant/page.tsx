"use client";
import { CommonPayload, getAllResturant } from "@/app/action/auth/allApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useEffect, useState } from "react";

const AllResturant = () => {
  const [restaurants, setRestaurants] = useState<CommonPayload[]>([]);
  //   console.log(restaurants);
  useEffect(() => {
    const fetchAllRestaurants = async () => {
      try {
        const response = await getAllResturant();
        if (Array.isArray(response)) {
          setRestaurants(response);
        } else {
          setRestaurants([]);
        }
      } catch (error) {
        console.error("Error fetching rider applications:", error);
        setRestaurants([]); // ensure it's always an array
      }
    };
    fetchAllRestaurants();
  }, []);
  return (
    <section className="w-11/12 mx-auto ">
      {!restaurants || restaurants.length === 0 ? (
        <p className="text-center text-2xl text-red-500">No restaurant found</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead className="w-[100px]"></TableHead>
              <TableHead className="font-semibold">Restaurant Name</TableHead>
              <TableHead>Restaurant Email</TableHead>
              <TableHead className="font-semibold">
                Restaurant Address
              </TableHead>
              <TableHead className="font-semibold">
                Restaurant Owner Name
              </TableHead>
              <TableHead>Restaurant Owner Email</TableHead>
              <TableHead>Restaurant Number</TableHead>
              <TableHead className="text-right">Owner Identification</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {restaurants.map((restaurant) => (
              <TableRow key={restaurant._id}>
                <TableCell>
                  <Image
                    src={restaurant.restaurantLogo as string}
                    alt={restaurant.restaurantName as string}
                    width={100}
                    height={100}
                    className="rounded-full w-16 h-16"
                  />
                </TableCell>
                <TableCell className="font-semibold">
                  {restaurant.restaurantName}
                </TableCell>
                <TableCell>{restaurant.restaurantEmail}</TableCell>
                <TableCell className="font-semibold">
                  {restaurant.restaurantAddress}
                </TableCell>
                <TableCell className="font-semibold">
                  {restaurant.restaurantOwnerName}
                </TableCell>
                <TableCell>{restaurant.restaurantOwnerEmail}</TableCell>
                <TableCell>{restaurant.restaurantNumber}</TableCell>
                <TableCell className="text-right">
                  {restaurant.ownerIdentification}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
};

export default AllResturant;
