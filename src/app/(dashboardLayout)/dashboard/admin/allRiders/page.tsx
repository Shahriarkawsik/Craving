"use client";
import { CommonPayload, getAllRider } from "@/app/action/auth/allApi";
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
const AllRiders = () => {
  const [riders, setRiders] = useState<CommonPayload[]>([]);
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
  return (
    <section className="w-11/12 mx-auto ">
      {!riders || riders.length === 0 ? (
        <p className="text-center text-2xl text-red-500">No riders found</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border border-orange-600 text-center">
              <TableHead className="w-[100px]">Rider Image</TableHead>
              <TableHead>Rider Name</TableHead>
              <TableHead>Rider Email</TableHead>
              <TableHead>Rider Address</TableHead>
              <TableHead>Rider Identification</TableHead>
              <TableHead>Rider Number</TableHead>
              <TableHead className="text-right">Vehicle Type</TableHead>
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
                    className="rounded-full w-16 h-16"
                  />
                </TableCell>
                <TableCell>{rider.riderName}</TableCell>
                <TableCell>{rider.riderEmail}</TableCell>
                <TableCell>{rider.riderAddress}</TableCell>
                <TableCell>{rider.riderIdentification}</TableCell>
                <TableCell>{rider.riderNumber}</TableCell>
                <TableCell className="text-right">
                  {rider.vehicleType}
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
