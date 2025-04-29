"use client";

import { useEffect, useState } from "react";
import CravingRevenueLineChart from "./components/CravingRevenueLineChart";
import CravingTopCategoryPieChart from "./components/CravingTopCategoryPieChart";
import { getTopCategory } from "@/app/action/auth/allApi";
import Spinner from "@/components/shared/Spinner";

export interface CravingTopFoodCategoryDataTypes {
    category: string;
    value: number;
};

export interface CravingRevenueDataTypes {
    month: string;
    revenue: number;
    expense: number;
};


const AdminStatics = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [cravingRevenueData, setCravingRevenueData] = useState<CravingRevenueDataTypes[]>([]);
    const [cravingTopFoodCategoryData, setCravingTopFoodCategoryData] = useState<CravingTopFoodCategoryDataTypes[]>([]);

    // craving revenue data format
    const cravingRevenueData: CravingRevenueDataTypes[] = [
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

    useEffect(() => {
        const fetchTopCategories = async () => {
            try{
                setIsLoading(true);
                const data = await getTopCategory();
                setCravingTopFoodCategoryData(data);
            }catch(e){
                console.log('Something went wrong', e);
            }finally{
                setIsLoading(false);
            }
        }

        fetchTopCategories();
    }, [])

    console.log(cravingTopFoodCategoryData);
    if (isLoading) {
        return <div className="w-full min-h-screen flex items-center justify-center">
            <Spinner />;
        </div>
    }

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
