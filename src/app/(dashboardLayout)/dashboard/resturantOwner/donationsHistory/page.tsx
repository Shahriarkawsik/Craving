"use client";

import {
  CommonPayload,
  getDonationsHistoryData,
} from "@/app/action/auth/allApi";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

const DonationsHistory = () => {
  const { data: session } = useSession();
  const [allDonationData, setAllDonationData] = useState<CommonPayload[]>([]);
  useEffect(() => {
    const fetchDonationsAllData = async () => {
      try {
        if (session?.user?.email) {
          const data = await getDonationsHistoryData({
            restaurantOwnerEmail: session?.user?.email,
          });
          setAllDonationData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDonationsAllData();
  }, [session?.user?.email]);
  console.log(allDonationData);
  return (
    <div className="overflow-auto w-full">
      <table className="table w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left">User Image</th>
            <th className="p-4 text-left">User Email</th>
            <th className="p-4 text-left">Payment Amount</th>
            <th className="p-4 text-left">Owner Image</th>
            <th className="p-4 text-left">Restaurant Name</th>
          </tr>
        </thead>
        <tbody>
          {allDonationData.map((donation) => (
            <tr key={donation._id} className="border-b border-gray-200">
              <td className="p-4 whitespace-nowrap">
                <Image
                  src={donation.userImage || "/default-user.png"}
                  alt="User profile picture"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </td>
              <td className="p-4 whitespace-nowrap">{donation.email}</td>
              <td className="p-4 whitespace-nowrap">${donation.amount}</td>
              <td className="p-4 whitespace-nowrap">
                <Image
                  src={donation.image || "/default-user.png"}
                  alt="User profile picture"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </td>
              <td className="p-4 whitespace-nowrap">
                {donation.restaurantName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationsHistory;
