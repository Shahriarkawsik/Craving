"use client";
import {
  CommonPayload,
  deleteRestaurant,
  getRestaurant,
} from "@/app/action/auth/allApi";
import Spinner from "@/components/shared/Spinner";
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
import Swal from "sweetalert2";

const AllResturant = () => {
  const [restaurants, setRestaurants] = useState<CommonPayload[]>([]);
  //   console.log(restaurants);
  useEffect(() => {
    const fetchAllRestaurants = async () => {
      try {
        const response = await getRestaurant();
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

  /* Handle Details */
  const handleRiderDetails = async (id: string): Promise<void> => {
    try {
      console.log(id);
    } catch {}
  };
  /* Handle Delete Restaurant */
  const handleDeleteRestaurant = async (id: string): Promise<void> => {
    try {
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
          await deleteRestaurant(id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          setRestaurants((prev) => prev.filter((owner) => owner._id !== id));
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: `Error ${error}`,
      });
    }
  };
  return (
    <section className="w-11/12 mx-auto ">
      {!restaurants || restaurants.length === 0 ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Spinner />
        </div>
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
              {/* <TableHead>Owner Identification</TableHead> */}
              <TableHead className="text-right"></TableHead>
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

                <TableCell className="text-right space-x-4">
                  <button
                    onClick={() => handleRiderDetails(restaurant._id as string)}
                    className="px-3 py-1 hover:bg-green-50 rounded-lg text-green-400 font-bold text-xl border"
                  >
                    Details
                  </button>
                  <button
                    className="px-3 py-1 hover:bg-red-50 rounded-lg text-red-400 font-bold text-xl border"
                    onClick={() =>
                      handleDeleteRestaurant(restaurant._id as string)
                    }
                  >
                    Delete
                  </button>
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
