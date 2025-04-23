"use client";
import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";
import restaurantLogo from "@/assets/images/rider.png";
import Image from "next/image";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useSession } from "next-auth/react";
import { PieChart } from "lucide-react";
interface FoodCategoryData {
    name: string;
    value: number;
}

interface EarningData {
    Month: string;
    restaurants: number;
}

const AdminStatics = () => {
    const { data: session } = useSession();
    const weeklyEarnings: EarningData[] = [
        { Month: "Jan", restaurants: 220 },
        { Month: "Feb", restaurants: 318 },
        { Month: "Mar", restaurants: 309 },
        { Month: "Apr", restaurants: 500 },
        { Month: "May", restaurants: 511 },
        { Month: "Jun", restaurants: 490 },
        { Month: "Jul", restaurants: 350 },
        { Month: "Aug", restaurants: 350 },
        { Month: "Sep", restaurants: 350 },
        { Month: "Oct", restaurants: 350 },
        { Month: "Nov", restaurants: 350 },
        { Month: "Dec", restaurants: 350 },
    ];
    /* Current User */
    //   const { data } = useSession();
    //   const [rider, setRider] = useState<RiderPayload | null>(null);
    //   const {
    //     riderName,
    //     riderAddress,
    //     riderTotalEarning,
    //     riderTotalOrder,
    //     riderTotalRating,
    //     riderTotalTransaction,
    //   } = rider ?? {};
    //   useEffect(() => {
    //     const fetchRider = async () => {
    //       try {
    //         const email = data?.user?.email;
    //         if (!email) {
    //           console.warn("No email found. Skipping fetch.");
    //           return;
    //         }
    //         const response = await getActiveRider(email);

    //         if (response) {
    //           setRider(response);
    //         }
    //       } catch (error) {
    //         console.error("Error fetching rider:", error);
    //       }
    //     };
    //     fetchRider();
    //   }, [data?.user?.email]); // ✅ add dependency
    const totalRider = 10
    const totalRestaurant = 15
    const totalUser = 20

    const foodCategory: FoodCategoryData[] = [
        { name: "Burgers", value: 10 },
        { name: "Pizzas", value: 5 },
        { name: "Drinks", value: 7 },
        { name: "Desserts", value: 8 },
    ];


    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

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
                            <h2 className="text-2xl font-bold">{session?.user?.name}</h2>
                            <p className="text-gray-500">{session?.user?.address}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* statistics cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card className="p-4 text-center transition-transform hover:scale-105 duration-300 ease-in-out bg-amber-100">
                    <CardContent>
                        <h3 className="text-xl font-semibold">totalRider</h3>
                        <p className="text-2xl font-bold">{totalRider} BDT</p>
                    </CardContent>
                </Card>
                <Card className="p-4 text-center transition-transform hover:scale-105 duration-300 ease-in-out bg-teal-100">
                    <CardContent>
                        <h3 className="text-xl font-semibold">totalRestaurant</h3>
                        <p className="text-2xl font-bold">{totalRestaurant}</p>
                    </CardContent>
                </Card>
                <Card className="p-4 text-center transition-transform hover:scale-105 duration-300 ease-in-out bg-rose-100">
                    <CardContent>
                        <h3 className="text-xl font-semibold">totalUser</h3>
                        <p className="text-2xl font-bold">{totalUser}</p>
                    </CardContent>
                </Card>
                {/* <Card className="p-4 text-center transition-transform hover:scale-105 duration-300 ease-in-out bg-violet-100">
                    <CardContent>
                        <h3 className="text-xl font-semibold">Total Transactions</h3>
                        <p className="text-2xl font-bold">{riderTotalTransaction} BDT</p>
                    </CardContent>
                </Card> */}
            </div>


            {/* bar chart */}
            <div className="gap-6 mt-6">

                <Card className="py-4 px-2 border border-blue-300">
                    <CardContent>
                        <h3 className="text-xl font-semibold text-center mb-4">
                            Yearly Restaurant Added
                        </h3>
                        <BarChart width={800} height={300} data={weeklyEarnings}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="restaurants" fill="#8884d8" />
                        </BarChart>
                    </CardContent>
                </Card>

            
            </div>
        </div>
    );
};

export default AdminStatics;
