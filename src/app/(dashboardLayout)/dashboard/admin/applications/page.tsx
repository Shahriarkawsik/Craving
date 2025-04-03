"use client";
import {
  CommonPayload,
  deleteRider,
  getAllRider,
} from "@/app/action/auth/allApi";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FcContacts } from "react-icons/fc";
import { MdEmail, MdEmojiTransportation } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Swal from "sweetalert2";

const Applications = () => {
  const [riderApplications, setRiderApplications] = useState<CommonPayload[]>(
    []
  );

  useEffect(() => {
    const fetchRiderApplications = async () => {
      try {
        const response: CommonPayload[] = await getAllRider();
        setRiderApplications(response);
      } catch (error) {
        console.error("Error fetching rider applications:", error);
      }
    };
    fetchRiderApplications();
  }, []);
  /* approve Rider
  1. If approved then send email to rider
  2. If approved then send email to owner
  3. If approved, then update the rider status user to rider.
*/

  const handleApproveRider = async (riderId: string) => {
    try {
      // console.log(riderId);
      const {riderEmail} = riderApplications.find(
        (rider) => rider._id === riderId
      );
      console.log(riderEmail);
      /* step-01: update the rider status */ 
      
    } catch (error) {
      console.log(error);
    }
  };

  /* Reject Rider */
  const handleRejectRider = async (riderId: string) => {
    try {
      await deleteRider(riderId);
      const updatedRiderApplications = riderApplications.filter(
        (rider) => rider._id !== riderId
      );
      Swal.fire({
        icon: "success",
        timer: 2500,
        showConfirmButton: false,
        text: "Rider rejected successfully",
      });
      setRiderApplications(updatedRiderApplications);
    } catch (error) {
      console.error("Error rejecting rider:", error);
    }
  };

  return (
    <section>
      <div className="w-11/12 mx-auto space-y-10">
        <div>
          <h1>This is restaurant owner applications</h1>
        </div>
        <hr />
        <h1 className="text-center text-5xl text-red-400">
          This is rider applications
        </h1>
        <div className="space-y-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {riderApplications.map((rider) => (
            <div
              key={rider._id}
              className="shadow-2xl rounded-2xl p-6 space-y-2 hover:border hover:border-orange-300 hover:transition-all hover:scale-95"
            >
              <h1 className="text-2xl font-bold text-center">
                {rider.riderName}
              </h1>
              <p className="flex items-center gap-2 text-xl">
                <MdEmail className="text-2xl text-orange-500" />
                <span>{rider.riderEmail}</span>
              </p>
              <p className="flex items-center gap-2 text-xl">
                <FcContacts className="text-2xl text-orange-500" />
                <span>{rider.riderNumber}</span>
              </p>
              <p className="flex items-center gap-2 text-xl">
                <MdEmojiTransportation className="text-2xl text-orange-500" />
                <span>{rider.vehicleType}</span>
              </p>
              <p className="flex items-center gap-2 text-xl">
                <FaLocationDot className="text-2xl text-orange-500" />
                <span>{rider.riderAddress}</span>
              </p>
              <p className="flex items-center gap-2 text-xl">
                <TbListDetails className="text-2xl text-orange-500" />
                <span>{rider.description}</span>
              </p>
              <div className="flex justify-center items-center gap-5">
                <button
                  onClick={() => handleApproveRider(rider._id)}
                  className="bg-green-500 text-xl text-white px-4 py-1 rounded-lg hover:transition-all hover:bg-green-700"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectRider(rider._id)}
                  className="bg-red-500 text-xl text-white px-4 py-1 rounded-lg hover:transition-all hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Applications;
