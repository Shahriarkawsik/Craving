"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";



interface EarningData {
    Month: string;
    restaurants: number;
}

const AdminStatics = () => {
    // const { data: session } = useSession();
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
    
    const totalRider = 10
    const totalRestaurant = 15
    const totalUser = 20


    return (
        <div className="mx-auto">

            {/* statistics cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 text-center transition-transform hover:scale-105 duration-300 ease-in-out bg-amber-100">
                    <CardContent>
                        <h3 className="text-xl font-semibold">Total Rider</h3>
                        <p className="text-2xl font-bold">{totalRider}</p>
                    </CardContent>
                </Card>
                <Card className="p-4 text-center transition-transform hover:scale-105 duration-300 ease-in-out bg-teal-100">
                    <CardContent>
                        <h3 className="text-xl font-semibold">Total Restaurant</h3>
                        <p className="text-2xl font-bold">{totalRestaurant}</p>
                    </CardContent>
                </Card>
                <Card className="p-4 text-center transition-transform hover:scale-105 duration-300 ease-in-out bg-rose-100">
                    <CardContent>
                        <h3 className="text-xl font-semibold">Total User</h3>
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
