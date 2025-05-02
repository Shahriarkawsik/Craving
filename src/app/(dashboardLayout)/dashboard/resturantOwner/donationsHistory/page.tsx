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
  // console.log(allDonationData);
  return (
    <div className="overflow-auto w-full">
      <table className="table w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left"></th>
            <th className="p-4 text-left">Campaign Name</th>
            <th className="p-4 text-left">Organized by</th>
            <th className="p-4 text-left">Donated by</th>
            <th className="p-4 text-left">Amount(BDT)</th>
          </tr>
        </thead>
        <tbody>
          {allDonationData.map((donation) => (
            <tr key={donation._id} className="border-b border-gray-200">
              <td className="p-4 whitespace-nowrap">
                <Image
                  src={donation.image || "/default-user.png"}
                  alt="User profile picture"
                  width={60}
                  height={60}
                  className="rounded-sm"
                />
              </td>
              <td className="p-4 whitespace-nowrap">Donate for {donation.location}</td>
              <td className="p-4 whitespace-nowrap">{donation.restaurantName}</td>
              <td className="p-4 whitespace-nowrap">
                {donation.email}
              </td>
              <td className="p-4 whitespace-nowrap">
                ${donation.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationsHistory;
