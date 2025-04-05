"use client";
// "use server"
import {
  CommonPayload,
  deleteResturantOwner,
  deleteRider,
  getAllResturantOwner,
  getAllRider,
  getUserDetails,
  updateUserRole,
} from "@/app/action/auth/allApi";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FcContacts } from "react-icons/fc";
import { MdEmail, MdEmojiTransportation } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import Swal from "sweetalert2";

const Applications = () => {
  const [userDetails, setUserDetails] = useState<CommonPayload | null>(null);
  const [riderApplications, setRiderApplications] = useState<CommonPayload[]>(
    []
  );
  const [restaurantOwnerApplications, setRestaurantOwnerApplications] =
    useState<CommonPayload[]>([]);

  // restaurant Owner Application
  useEffect(() => {
    const fetchOwnerApplications = async () => {
      try {
        const response: CommonPayload[] = await getAllResturantOwner();
        setRestaurantOwnerApplications(response);
      } catch (error) {
        console.error("Error fetching owner applications:", error);
      }
    };
    fetchOwnerApplications();
  }, []);
  // rider Application
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

  const handleApproveRider = async (riderId: string) => {
    try {
      const selectedRider = riderApplications.find((r) => r._id === riderId);
      if (!selectedRider) {
        console.warn("No rider found for ID:", riderId);
        return;
      }
      const { riderEmail } = selectedRider;
      // fetch user details by riderEmail
      const user = await getUserDetails(riderEmail);
      if (!user) {
        console.error("User not found for email:", riderEmail);
        return;
      }
      const { email, role } = user;
      console.log("Approving rider:", email, role);
      await updateUserRole(email, "rider"); // await is important here
      /* Create a Rider Collection */
      
      // Optional: Show success message
      console.log("Rider role updated successfully!");

      // TODO: update application status and send confirmation email
    } catch (error) {
      console.error("Error approving rider:", error);
    }
  };

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

  const handleApproveOwner = async (ownerId: string) => {
    console.log(ownerId);
  };
  const handleRejectOwner = async (ownerId: string) => {
    try {
      await deleteResturantOwner(ownerId);
      const updatedOwnerApplications = restaurantOwnerApplications.filter(
        (owner) => owner._id !== ownerId
      );
      Swal.fire({
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        text: "Owner rejected successfully",
      });
      setRestaurantOwnerApplications(updatedOwnerApplications);
    } catch (error) {
      console.error("Error rejecting owner:", error);
    }
  };

  return (
    <section>
      <div className="w-11/12 mx-auto space-y-10">
        <div className="space-y-8">
          <h1 className="text-center text-5xl text-red-400">
            This is restaurant owner applications
          </h1>
          <div className="space-y-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {restaurantOwnerApplications.map((owner) => (
              <div
                key={owner._id}
                className="shadow-2xl rounded-2xl p-6 space-y-2 hover:border hover:border-orange-300 hover:transition-all hover:scale-95"
              >
                <h1 className="text-2xl font-bold text-center">
                  {owner.restaurantName}
                </h1>
                <p>
                  <strong>Restaurant Email: </strong> {owner.restaurantEmail}
                </p>
                <p>
                  <strong>Restaurant Owner Name: </strong>
                  {owner.restaurantOwnerName}
                </p>
                <p>
                  <strong>Restaurant Owner Email: </strong>
                  {owner.restaurantOwnerEmail}
                </p>
                <p>
                  <strong>Restaurant Contact Number: </strong>
                  {owner.restaurantNumber}
                </p>
                <p>
                  <strong>Restaurant Address: </strong>
                  {owner.restaurantAddress}
                </p>
                <p>
                  <strong>About Restaurant: </strong>
                  {owner.restaurantDescription}
                </p>
                {/* ownerNIDPhoto */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleApproveOwner(owner._id)}
                    className="bg-green-500 text-xl text-white px-4 py-1 rounded-lg hover:transition-all hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectOwner(owner._id)}
                    className="bg-red-500 text-xl text-white px-4 py-1 rounded-lg hover:transition-all hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <h1 className="text-center text-5xl text-red-400">
          This is rider applications
        </h1>

        <div className="space-y-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* <div className="space-y-5 grid grid-cols-1 lg:grid-cols-2 gap-5 w-11/12 mx-auto"> */}
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
