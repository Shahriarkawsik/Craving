"use client";
import { Card, CardContent } from "@/components/ui/card";
import { FC, useEffect, useState } from "react";
import restaurantLogo from "@/assets/images/rider.png";
import Image from "next/image";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSession } from "next-auth/react";
import { getActiveRider, RiderPayload } from "@/app/action/auth/allApi";

interface EarningData {
  day: string;
  earnings: number;
}

const RidersProfile: FC = () => {
  const weeklyEarnings: EarningData[] = [
    { day: "Mon", earnings: 220 },
    { day: "Tue", earnings: 318 },
    { day: "Wed", earnings: 309 },
    { day: "Thu", earnings: 500 },
    { day: "Fri", earnings: 511 },
    { day: "Sat", earnings: 490 },
    { day: "Sun", earnings: 350 },
  ];
  /* Current User */
  const { data } = useSession();
  const [rider, setRider] = useState<RiderPayload | null>(null);
  const {
    riderName,
    riderAddress,
    riderTotalEarning,
    riderTotalOrder,
    riderTotalRating,
    riderTotalTransaction,
  } = rider ?? {};
  useEffect(() => {
    const fetchRider = async () => {
      try {
        const email = data?.user?.email;
        if (!email) {
          console.warn("No email found. Skipping fetch.");
          return;
        }
        const response = await getActiveRider(email);

        if (response) {
          setRider(response);
        }
      } catch (error) {
        console.error("Error fetching rider:", error);
      }
    };
    fetchRider();
  }, [data?.user?.email]); // ✅ add dependency

  return (
    <div className="p-6 mx-auto">
      {/* restaurant information */}
      <Card className="p-4 shadow-lg bg-orange-200">
        <CardContent>
          <div className="flex items-center space-x-4">
            <Image
              src={restaurantLogo}
              alt="Restaurant Logo"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold">{riderName}</h2>
              <p className="text-gray-500">{riderAddress}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <Card className="p-4 text-center transition-transform hover:scale-105 duration-300 ease-in-out bg-amber-100">
          <CardContent>
            <h3 className="text-xl font-semibold">Total Earnings</h3>
            <p className="text-2xl font-bold">{riderTotalEarning} BDT</p>
          </CardContent>
        </Card>
        <Card className="p-4 text-center transition-transform hover:scale-105 duration-300 ease-in-out bg-teal-100">
          <CardContent>
            <h3 className="text-xl font-semibold">Total Orders</h3>
            <p className="text-2xl font-bold">{riderTotalOrder}</p>
          </CardContent>
        </Card>
        <Card className="p-4 text-center transition-transform hover:scale-105 duration-300 ease-in-out bg-rose-100">
          <CardContent>
            <h3 className="text-xl font-semibold">Ratting</h3>
            <p className="text-2xl font-bold">{riderTotalRating}</p>
          </CardContent>
        </Card>
        <Card className="p-4 text-center transition-transform hover:scale-105 duration-300 ease-in-out bg-violet-100">
          <CardContent>
            <h3 className="text-xl font-semibold">Total Transactions</h3>
            <p className="text-2xl font-bold">{riderTotalTransaction} BDT</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* bar chart */}
        <Card className="p-4 border border-blue-300">
          <CardContent>
            <h3 className="text-xl font-semibold text-center mb-4">
              Weekly Earnings
            </h3>
            <BarChart width={400} height={250} data={weeklyEarnings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="earnings" fill="#8884d8" />
            </BarChart>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RidersProfile;
