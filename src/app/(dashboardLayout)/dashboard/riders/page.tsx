import { Card, CardContent } from '@/components/ui/card';
import { FC } from 'react';
import restaurantLogo from "@/assets/categoryImg/fast-food.png"
import Image from "next/image";
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";

const RidersProfile: FC = () => {
    return (
        <div className="p-6 mx-auto">
            {/* restaurant information */}
            <Card className="p-4 shadow-lg bg-orange-100">
                <CardContent>
                    <div className="flex items-center space-x-4">
                        <Image src={restaurantLogo} alt="Restaurant Logo" className="w-16 h-16 rounded-full" />
                        <div>
                            <h2 className="text-2xl font-bold">Hasan Mahmud</h2>
                            <p className="text-gray-500">Senior Rider, Chattogram City Area</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* statistics cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <Card className="p-4 text-center transition-transform hover:scale-105 duration-300 ease-in-out bg-amber-100">
                    <CardContent>
                        <h3 className="text-xl font-semibold">Total Earnings</h3>
                        <p className="text-2xl font-bold">20000 BDT</p>
                    </CardContent>
                </Card>
                <Card className="p-4 text-center transition-transform hover:scale-105 duration-300 ease-in-out bg-teal-100">
                    <CardContent>
                        <h3 className="text-xl font-semibold">Total Orders</h3>
                        <p className="text-2xl font-bold">178</p>
                    </CardContent>
                </Card>
                <Card className="p-4 text-center transition-transform hover:scale-105 duration-300 ease-in-out bg-rose-100">
                    <CardContent>
                        <h3 className="text-xl font-semibold">Total Reviews</h3>
                        <p className="text-2xl font-bold">93</p>
                    </CardContent>
                </Card>
                <Card className="p-4 text-center transition-transform hover:scale-105 duration-300 ease-in-out bg-violet-100">
                    <CardContent>
                        <h3 className="text-xl font-semibold">Total Transactions</h3>
                        <p className="text-2xl font-bold">15000 BDT</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* bar chart */}
                <Card className="p-4 border border-blue-300">
                    <CardContent>
                        <h3 className="text-xl font-semibold text-center mb-4">Weekly Earnings</h3>
                        <BarChart width={400} height={250} data={weeklySales}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#8884d8" />
                        </BarChart>
                    </CardContent>
                </Card>
                {/* pie chart */}
                <Card className="p-4 border border-green-300">
                    <CardContent>
                        <h3 className="text-xl font-semibold text-center mb-4">Food Categories</h3>
                        <PieChart width={400} height={250}>
                            <Pie data={foodCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label />
                            <Tooltip />
                        </PieChart>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default RidersProfile;