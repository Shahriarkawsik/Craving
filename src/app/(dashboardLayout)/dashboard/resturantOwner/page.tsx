import { Card } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";
import restaurantLogo from "@/assets/categoryImg/fast-food.png"



interface SalesData {
    day: string;
    sales: number;
}

interface FoodCategoryData {
    name: string;
    value: number;
}


const RestaurantOwner = () => {

    const weeklySales: SalesData[] = [
        { day: "Mon", sales: 1200 },
        { day: "Tue", sales: 900 },
        { day: "Wed", sales: 1500 },
        { day: "Thu", sales: 1800 },
        { day: "Fri", sales: 2200 },
        { day: "Sat", sales: 2500 },
        { day: "Sun", sales: 2000 },
    ];

    const foodCategory: FoodCategoryData[] = [
        { name: "Burgers", value: 10 },
        { name: "Pizzas", value: 5 },
        { name: "Drinks", value: 7 },
        { name: "Desserts", value: 8 },
    ];


    return (
        <div className="p-6">
            <Card className="p-4 shadow-lg">
                <div className="flex items-center space-x-4">
                    <img
                        src={restaurantLogo}
                        alt="Restaurant Logo"
                        className="w-16 h-16 rounded-full"
                    />
                    <div>
                        <h2 className="text-2xl font-bold">Delicious Bites</h2>
                        <p className="text-gray-500">123 Main Street, Food Town</p>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <Card className="p-4 text-center">
                    <h3 className="text-xl font-semibold">Total Food Items</h3>
                    <p className="text-2xl font-bold">30</p>
                </Card>
                <Card className="p-4 text-center">
                    <h3 className="text-xl font-semibold">Food Categories</h3>
                    <p className="text-2xl font-bold">4</p>
                </Card>
                <Card className="p-4 text-center">
                    <h3 className="text-xl font-semibold">Total Sales</h3>
                    <p className="text-2xl font-bold">$12,000</p>
                </Card>
                <Card className="p-4 text-center">
                    <h3 className="text-xl font-semibold">Total Orders</h3>
                    <p className="text-2xl font-bold">320</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card className="p-4">
                    <h3 className="text-xl font-semibold text-center mb-4">Weekly Sales</h3>
                    <BarChart width={400} height={250} data={weeklySales}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" fill="#8884d8" />
                    </BarChart>
                </Card>
                <Card className="p-4">
                    <h3 className="text-xl font-semibold text-center mb-4">Food Categories</h3>
                    <PieChart width={400} height={250}>
                        <Pie data={foodCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label />
                        <Tooltip />
                    </PieChart>
                </Card>
            </div>
        </div>
    );
};

export default RestaurantOwner;