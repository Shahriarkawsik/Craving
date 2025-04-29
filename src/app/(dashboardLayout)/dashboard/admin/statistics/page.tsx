"use client";

import CravingRevenueLineChart from "./components/CravingRevenueLineChart";
import CravingTopCategoryPieChart from "./components/CravingTopCategoryPieChart";

export interface CravingTopFoodCategoryDataTypes {
    category: string;
    value: number;
};



const AdminStatics = () => {
    // const [isLoading, setIsLoading] = useState(false);

    // craving revenue data format
    const cravingRevenueData = [
        {
            "month": "January",
            "revenue": 4000,
            "expense": 2400
        },
        {
            "month": "February",
            "revenue": 2000,
            "expense": 3000
        },
        {
            "month": "March",
            "revenue": 3000,
            "expense": 1000
        },
        {
            "month": "April",
            "revenue": 5000,
            "expense": 2500
        },
        {
            "month": "May",
            "revenue": 1500,
            "expense": 1000
        },
        {
            "month": "June",
            "revenue": 5000,
            "expense": 2500
        },
        {
            "month": "July",
            "revenue": 1000,
            "expense": 3000
        },
        {
            "month": "August",
            "revenue": 4500,
            "expense": 3000
        },
        {
            "month": "September",
            "revenue": 5000,
            "expense": 5000
        },
        {
            "month": "October",
            "revenue": 3000,
            "expense": 1000
        },
        {
            "month": "November",
            "revenue": 1000,
            "expense": 2000
        },
        {
            "month": "December",
            "revenue": 2000,
            "expense": 1000
        },
    ];

    //   for pie chart
    const cravingTopFoodCategoryData: CravingTopFoodCategoryDataTypes[] = [
        {
            "category": "Fast Food",
            "value": 20
        },
        {
            "category": "See Food",
            "value": 40
        },
        {
            "category": "Chinese",
            "value": 30
        },
        {
            "category": "Desert",
            "value": 10
        },
    ];



    // if (isLoading) {
    //     return <div className="w-full min-h-screen flex items-center justify-center">
    //         <Spinner />;
    //     </div>
    // }

    return (
        <div className="space-y-5">
            {/* title */}
            <section>
                <h1 className="uppercase text-2xl">Statistics</h1>
            </section>

            {/* statistic in card */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                <div className="flex flex-col items-center justify-center p-5 gap-1 bg-white rounded-md shadow-md">
                    <p className="text-3xl font-extrabold text-orange-400">45000 BDT</p>
                    <p className="text-md font-light">Total Sales</p>
                </div>
                <div className="flex flex-col items-center justify-center p-5 gap-1 bg-white rounded-md shadow-md">
                    <p className="text-3xl font-extrabold text-orange-400">45000 BDT</p>
                    <p className="text-md font-light">Owner Balance</p>
                </div>
                <div className="flex flex-col items-center justify-center p-5 gap-1 bg-white rounded-md shadow-md">
                    <p className="text-3xl font-extrabold text-orange-400">45000 BDT</p>
                    <p className="text-md font-light">Rider Balance</p>
                </div>
                <div className="flex flex-col items-center justify-center p-5 gap-1 bg-white rounded-md shadow-md">
                    <p className="text-3xl font-extrabold text-orange-400">45000 BDT</p>
                    <p className="text-md font-light">Craving Revenue</p>
                </div>
                <div className="flex flex-col items-center justify-center p-5 gap-1 bg-white rounded-md shadow-md">
                    <p className="text-3xl font-extrabold text-orange-400">45000</p>
                    <p className="text-md font-light">Total Customer</p>
                </div>
                <div className="flex flex-col items-center justify-center p-5 gap-1 bg-white rounded-md shadow-md">
                    <p className="text-3xl font-extrabold text-orange-400">45000</p>
                    <p className="text-md font-light">Total Restaurant</p>
                </div>
                <div className="flex flex-col items-center justify-center p-5 gap-1 bg-white rounded-md shadow-md">
                    <p className="text-3xl font-extrabold text-orange-400">45000</p>
                    <p className="text-md font-light">Total Rider</p>
                </div>
                <div className="flex flex-col items-center justify-center p-5 gap-1 bg-white rounded-md shadow-md">
                    <p className="text-3xl font-extrabold text-orange-400">45000 BTD</p>
                    <p className="text-md font-light">Craving Expens</p>
                </div>
            </section>

            {/* craving revenue statistics in line graph */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="col-span-2 bg-white p-5 space-y-5 overflow-x-auto rounded-md shadow-md">
                    <h2 className="text-xl font-bold">Total Revenue: 45000 BDT</h2>
                    <CravingRevenueLineChart data={cravingRevenueData} />
                </div>
                <div className="col-span-1 bg-white p-5 rounded-md shadow-md">
                    <h2 className="text-xl font-bold">Top Categories</h2>
                    <div className="flex items-center justify-center">
                        <CravingTopCategoryPieChart data={cravingTopFoodCategoryData} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminStatics;
