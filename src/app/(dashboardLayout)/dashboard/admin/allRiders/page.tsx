"use client";
import { CommonPayload, getAllRider } from "@/app/action/auth/allApi";
import { useEffect, useState } from "react";

const AllRiders = () => {
  const [riders, setRiders] = useState<CommonPayload[]>([]);
  console.log(riders);
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
    <div>
      <h1>this is all Riders</h1>
    </div>
  );
};

export default AllRiders;
