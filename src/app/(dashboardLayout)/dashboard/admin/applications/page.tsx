"use client";
import {
  CommonPayload,
  createRestaurant,
  createRider,
  deleteRestaurantOwnerApplication,
  deleteRiderApplication,
  getRestaurantOwnerApplication,
  getBeRiderApplication,
  getUserDetails,
  RiderPayload,
  updateUserRole,
} from "@/app/action/auth/allApi";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApplicationTable from "./components/ApplicationTable";

export interface ApplicationInfo {
  id: string;
  name: string;
  email: string
  image: string;
  identification: string;
  date: Date;
}

const Applications = () => {
  const [riderApplications, setRiderApplications] = useState<CommonPayload[]>([]);
  const [restaurantOwnerApplications, setRestaurantOwnerApplications] = useState<CommonPayload[]>([]);
  // console.log(restaurantOwnerApplications);

  // Fetch restaurant owner applications
  useEffect(() => {
    const fetchOwnerApplications = async () => {
      try {
        const response = await getRestaurantOwnerApplication();
        if (Array.isArray(response)) {
          setRestaurantOwnerApplications(response);
        } else {
          setRestaurantOwnerApplications([]);
        }
      } catch (error) {
        console.error("Error fetching owner applications:", error);
        setRestaurantOwnerApplications([]); // ensure it's always an array
      }
    };
    fetchOwnerApplications();
  }, []);

  // Fetch rider applications
  useEffect(() => {
    const fetchRiderApplications = async () => {
      try {
        const response = await getBeRiderApplication();
        if (Array.isArray(response)) {
          setRiderApplications(response);
        } else {
          setRiderApplications([]);
        }
      } catch (error) {
        console.error("Error fetching rider applications:", error);
        setRiderApplications([]); // ensure it's always an array
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
      if (!riderEmail) {
        console.error("Rider email not found for ID:", riderId);
        return;
      }
      const user = await getUserDetails(riderEmail);
      if (!user) {
        console.error("User not found for email:", riderEmail);
        return;
      }
      await updateUserRole(user?.email as string, "Rider");

      const rider: RiderPayload = {
        riderImage: selectedRider.riderImage,
        riderName: selectedRider.riderName,
        riderEmail: selectedRider.riderEmail,
        riderNumber: selectedRider.riderNumber,
        riderAddress: selectedRider.riderAddress,
        riderIdentification: selectedRider.riderIdentification,
        vehicleType: selectedRider.vehicleType,
        riderTotalEarning: 0,
        riderTotalOrder: 0,
        riderTotalCompleteOrder: 0,
        riderTotalRating: 0,
        riderAvgRating: 0,
        riderTotalTransaction: 0,
      };
      await createRider(rider);
      Swal.fire({
        icon: "success",
        timer: 2500,
        showConfirmButton: false,
        text: "Rider role updated & rider added to collection!",
      });

      await deleteRiderApplication(riderId);
      setRiderApplications((prev) =>
        prev.filter((rider) => rider._id !== riderId)
      );
    } catch (error) {
      console.error("❌ Error approving rider:", error);
    }
  };

  const handleApproveOwner = async (ownerId: string) => {
    try {
      const selectedOwner = restaurantOwnerApplications.find(
        (owner) => owner._id === ownerId
      );

      // console.log(selectedOwner);
      if (!selectedOwner) {
        console.warn("❗ No owner found for ID:", ownerId);
        return;
      }
      const { restaurantOwnerEmail } = selectedOwner;
      if (!restaurantOwnerEmail) {
        console.warn("❗ No owner email found for ID:", ownerId);
        return;
      }
      const user = await getUserDetails(restaurantOwnerEmail);

      if (!user) {
        console.error("❌ User not found for email:", restaurantOwnerEmail);
        return;
      }
      // 1. Update the role
      await updateUserRole(user.email as string, "Owner");
      // 2. Create the restaurant
      const restaurant: CommonPayload = {
        restaurantOwnerId: user._id,
        restaurantOwnerEmail: selectedOwner?.restaurantOwnerEmail,
        restaurantOwnerName: selectedOwner.restaurantOwnerName,
        restaurantName: selectedOwner.restaurantName,
        restaurantEmail: selectedOwner.restaurantEmail,
        restaurantNumber: selectedOwner.restaurantNumber,
        restaurantLogo: selectedOwner.restaurantLogo,
        restaurantDescription: selectedOwner.restaurantDescription,
        restaurantAddress: selectedOwner.restaurantAddress,
        ownerIdentification: selectedOwner.ownerIdentification,
        restaurantOpeningDate: new Date(),
        foodCategories: [],
        restaurantRating: 0,
        totalFoodItem: 0,
        restaurantTotalSell: 0,
        restaurantTotalOrder: 0,
        restaurantCompleteOrder: 0,
        restaurantPendingOrder: 0,
      };
      await createRestaurant(restaurant);
      // 3. Delete the application
      await deleteRestaurantOwnerApplication(ownerId);
      // 4. Update UI
      setRestaurantOwnerApplications((prev) =>
        prev.filter((owner) => owner._id !== ownerId)
      );
      Swal.fire({
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        text: "Owner role updated & restaurant created successfully!",
      });
    } catch (error) {
      console.error("❌ Error approving owner:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Could not approve the owner. Please try again.",
      });
    }
  };

  const handleRejectRider = async (riderId: string) => {
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
          await deleteRiderApplication(riderId);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          setRiderApplications((prev) =>
            prev.filter((rider) => rider._id !== riderId)
          );
        }
      });
    } catch (error) {
      // console.error("Error rejecting rider:", error);
      Swal.fire({
        title: "Error!",
        text: `Failed to delete. ${error}`,
        icon: "error",
      });
    }
  };

  const handleRejectOwner = async (ownerId: string) => {
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
          await deleteRestaurantOwnerApplication(ownerId);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          setRestaurantOwnerApplications((prev) =>
            prev.filter((owner) => owner._id !== ownerId)
          );
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `Failed to delete. ${error}`,
        icon: "error",
      });
    }
  };

  const riderApplication: ApplicationInfo[] = riderApplications.map(app => ({
    id: app._id!,
    name: app.riderName!,
    email: app.riderEmail!,
    image: app.riderImage!,
    identification: app.riderIdentification!.toString(),
    date: new Date(app.created_at!)
  }));

  const ownerApplication: ApplicationInfo[] = restaurantOwnerApplications.map(app => {
    return {
      id: app._id!,
      name: app.restaurantOwnerName!,
      email: app.restaurantOwnerEmail!,
      image: app.restaurantLogo!,
      identification: app.ownerIdentification!.toString(),
      date: new Date(app.created_at!)
    }
  })

  return (
    <div>
      <section>
        <h1 className="uppercase text-2xl">Applications</h1>
        <p>Rider and Restaurant owner applications.</p>
      </section>

      {/* tabs */}
      <section className="my-5">
        <Tabs defaultValue="rider" className="w-full">
          <TabsList className="mb-5 w-full">
            <TabsTrigger value="rider" className="cursor-pointer">Rider</TabsTrigger>
            <TabsTrigger value="owner" className="cursor-pointer">Restaurent Owner</TabsTrigger>
          </TabsList>

          <TabsContent value="rider">
            <ApplicationTable applications={riderApplication} acceptApplication={handleApproveRider} rejectedApplication={handleRejectRider} allData={riderApplications}/>
          </TabsContent>
          <TabsContent value="owner">
            <ApplicationTable applications={ownerApplication} acceptApplication={handleApproveOwner} rejectedApplication={handleRejectOwner} allData={restaurantOwnerApplications}/>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Applications;


// {/* Owner applications */}
// <div className="space-y-8">
// <h1 className="text-center text-5xl text-red-400">
//   This is restaurant owner applications
// </h1>
// <div className="space-y-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
//   {restaurantOwnerApplications.map((owner) => (
//     <div
//       key={owner._id}
//       className="shadow-2xl rounded-2xl p-6 space-y-4 hover:border hover:border-orange-300 hover:transition-all hover:scale-95"
//     >
//       <figure className="flex justify-center">
//         <Image
//           src={owner?.restaurantLogo as string}
//           alt="Owner Image"
//           width={400}
//           height={400}
//           className="w-1/2 h-1/2 rounded-full"
//         />
//       </figure>
//       <h1 className="text-2xl font-bold text-center">
//         {owner.restaurantName}
//       </h1>
//       <p>
//         <strong>Restaurant Email: </strong> {owner.restaurantEmail}
//       </p>
//       <p>
//         <strong>Restaurant Contact Number: </strong>
//         {owner.restaurantNumber}
//       </p>
//       <p>
//         <strong>Restaurant Owner Name: </strong>
//         {owner.restaurantOwnerName}
//       </p>
//       <p>
//         <strong>Restaurant Owner Email: </strong>
//         {owner.restaurantOwnerEmail}
//       </p>
//       <p>
//         <strong>Restaurant NID number: </strong>
//         {owner.ownerIdentification}
//       </p>
//       <p>
//         <strong>Restaurant Address: </strong>
//         {owner.restaurantAddress}
//       </p>

//       <p>
//         <strong>About Restaurant: </strong>
//         {owner.restaurantDescription}
//       </p>

//       <div className="flex justify-center gap-4">
//         <button
//           onClick={() => handleApproveOwner(owner._id as string)}
//           className="bg-green-500 text-xl text-white px-4 py-1 rounded-lg hover:transition-all hover:bg-green-700"
//         >
//           Accept
//         </button>
//         <button
//           onClick={() => handleRejectOwner(owner._id as string)}
//           className="bg-red-500 text-xl text-white px-4 py-1 rounded-lg hover:transition-all hover:bg-red-700"
//         >
//           Reject
//         </button>
//       </div>
//     </div>
//   ))}
// </div>
// </div>

// <hr />

// {/* Rider applications */}
// <h1 className="text-center text-5xl text-red-400">
// This is rider applications
// </h1>

// <div className="space-y-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
// {riderApplications.map((rider) => (
//   <div
//     key={rider._id}
//     className="shadow-2xl rounded-2xl p-6 space-y-2 hover:border hover:border-orange-300 hover:transition-all hover:scale-95"
//   >
//     <figure className="flex justify-center">
//       <Image
//         src={rider.riderImage as string}
//         alt={rider.riderName as string}
//         width={300}
//         height={300}
//       />
//     </figure>
//     <h1 className="text-2xl font-bold text-center">
//       {rider.riderName}
//     </h1>
//     <p className="flex items-center gap-2 text-xl">
//       <MdEmail className="text-2xl text-orange-500" />
//       <span>{rider.riderEmail}</span>
//     </p>
//     <p className="flex items-center gap-2 text-xl">
//       <FcContacts className="text-2xl text-orange-500" />
//       <span>{rider.riderNumber}</span>
//     </p>
//     <p className="flex items-center gap-2 text-xl">
//       <MdEmojiTransportation className="text-2xl text-orange-500" />
//       <span>{rider.vehicleType}</span>
//     </p>
//     <p className="flex items-center gap-2 text-xl">
//       <FaLocationDot className="text-2xl text-orange-500" />
//       <span>{rider.riderAddress}</span>
//     </p>
//     <p className="flex items-center gap-2 text-xl">
//       <PiIdentificationCardFill className="text-2xl text-orange-500" />
//       <span>{rider.riderIdentification}</span>
//     </p>
//     <p className="flex items-center gap-2 text-xl">
//       <TbListDetails className="text-2xl text-orange-500" />
//       <span>{rider.description}</span>
//     </p>
//     <div className="flex justify-center items-center gap-5">
//       <button
//         onClick={() => handleApproveRider(rider._id as string)}
//         className="bg-green-500 text-xl text-white px-4 py-1 rounded-lg hover:transition-all hover:bg-green-700"
//       >
//         Accept
//       </button>
//       <button
//         onClick={() => handleRejectRider(rider._id as string)}
//         className="bg-red-500 text-xl text-white px-4 py-1 rounded-lg hover:transition-all hover:bg-red-700"
//       >
//         Reject
//       </button>
//     </div>
//   </div>
// ))}
// </div>