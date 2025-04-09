"use client";
import {
  CommonPayload,
  deleteRider,
  getAllRider,
} from "@/app/action/auth/allApi";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Swal from "sweetalert2";
const AllRiders = () => {
  const [riders, setRiders] = useState<CommonPayload[]>([]);
  // console.log(riders);
  useEffect(() => {
    const fetchAllRiders = async () => {
      try {
        const response = await getAllRider();
        if (Array.isArray(response)) {
          setRiders(response);
        } else {
          setRiders([]);
        }
      } catch (error) {
        console.error("Error fetching rider applications:", error);
        setRiders([]); // ensure it's always an array
      }
    };
    fetchAllRiders();
  }, []);

  /* Handle Details */
  const handleRiderDetails = async (id: string): Promise<void> => {
    try {
      console.log(id);
    } catch {}
  };

  /* Handle Delete */
  const handleRiderDelete = async (riderId: string): Promise<void> => {
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
          await deleteRider(riderId);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          setRiders((prev) => prev.filter((rider) => rider._id !== riderId));
        }
      });
    } catch (error) {
      console.error("Error deleting rider:", error);
      Swal.fire({
        icon: "error",
        text: `Error deleting rider ${error}`,
        title: "Error",
      });
    }
  };
  return (
    <section className="w-11/12 mx-auto ">
      {!riders || riders.length === 0 ? (
        <p className="text-center text-2xl text-red-500">No riders found</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className=" text-center">
              <TableHead className="w-[100px]">Rider Image</TableHead>
              <TableHead className="font-semibold">Rider Name</TableHead>
              <TableHead className="font-semibold">Rider Email</TableHead>
              <TableHead>Rider Address</TableHead>
              <TableHead>Rider Identification</TableHead>
              <TableHead>Rider Number</TableHead>
              <TableHead>Vehicle Type</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {riders.map((rider) => (
              <TableRow key={rider._id}>
                <TableCell className="font-medium">
                  <Image
                    src={rider.riderImage as string}
                    alt={rider.riderName as string}
                    width={100}
                    height={100}
                    className="rounded-full w-16 h-16 shadow-2xl"
                  />
                </TableCell>
                <TableCell className="font-semibold">
                  {rider.riderName}
                </TableCell>
                <TableCell className="font-semibold">
                  {rider.riderEmail}
                </TableCell>
                <TableCell>{rider.riderAddress}</TableCell>
                <TableCell>{rider.riderIdentification}</TableCell>
                <TableCell>{rider.riderNumber}</TableCell>
                <TableCell>{rider.vehicleType}</TableCell>
                <TableCell className="text-right space-x-4">
                  <button
                    onClick={() => handleRiderDetails(rider._id as string)}
                    className="px-3 py-1 hover:bg-green-50 rounded-lg text-green-400 font-bold text-xl border"
                  >
                    Details
                  </button>
                  <button
                    className="px-3 py-1 hover:bg-red-50 rounded-lg text-red-400 font-bold text-xl border"
                    onClick={() => handleRiderDelete(rider._id as string)}
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

export default AllRiders;
