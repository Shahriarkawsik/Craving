"use client";

import { useEffect, useState } from "react";
import CravingRevenueLineChart from "./components/CravingRevenueLineChart";
import CravingTopCategoryPieChart from "./components/CravingTopCategoryPieChart";
import { getRevenueExpenseData, getTopCategory, getTotalOwnerBalance, getTotalRiderBalance, getTotalSales, getUserCounts } from "@/app/action/auth/allApi";
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

export interface UserCountTypes {
    total_customer: number;
    total_owner: number;
    total_rider: number;
}

const AdminStatics = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [cravingRevenueData, setCravingRevenueData] = useState<CravingRevenueDataTypes[]>([]);
    const [cravingTopFoodCategoryData, setCravingTopFoodCategoryData] = useState<CravingTopFoodCategoryDataTypes[]>([]);
    const [userCount, setUserCount] = useState<UserCountTypes>();
    const [totalSales, setTotalSales] = useState<{total_sales: number}>();

    useEffect(() => {
        const fetchTopCategories = async () => {
            try {
                setIsLoading(true);
                const data = await getTopCategory();
                setCravingTopFoodCategoryData(data);
            } catch (e) {
                console.log('Something went wrong', e);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchRevenueExpense = async () => {
            try {
                setIsLoading(true);
                const data = await getRevenueExpenseData();
                setCravingRevenueData(data);
                console.log(data);
            } catch (e) {
                console.log('Something went wrong', e);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchUserCount = async () => {
            try{
                setIsLoading(true);
                const data = await getUserCounts();
                setUserCount(data);
            }catch(e){
                console.log('Something went wrong', e);
            }finally{
                setIsLoading(false);
            }
        };

        const fetchTotalBalance = async () => {
            try{
                setIsLoading(true);
                // const data1 = await getTotalSales();
                // const data2 = await getTotalOwnerBalance();
                const data3 = await getTotalRiderBalance();
                setTotalSales(data3);
            }catch(e){
                console.log('Something went wrong', e);
            }finally{
                setIsLoading(false);
            }
        }

        fetchTotalBalance();
        fetchUserCount();
        fetchRevenueExpense();
        fetchTopCategories();
    }, [])

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
                    <p className="text-3xl font-extrabold text-orange-400">{totalSales?.total_sales || 0} BDT</p>
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
                    <p className="text-3xl font-extrabold text-orange-400">{cravingRevenueData.reduce((acc, item) => {
                        return acc + item.revenue;
                    }, 0)} BDT</p>
                    <p className="text-md font-light">Craving Revenue</p>
                </div>
                <div className="flex flex-col items-center justify-center p-5 gap-1 bg-white rounded-md shadow-md">
                    <p className="text-3xl font-extrabold text-orange-400">{userCount?.total_customer || 0}</p>
                    <p className="text-md font-light">Total Customer</p>
                </div>
                <div className="flex flex-col items-center justify-center p-5 gap-1 bg-white rounded-md shadow-md">
                    <p className="text-3xl font-extrabold text-orange-400">{userCount?.total_owner || 0}</p>
                    <p className="text-md font-light">Total Owner</p>
                </div>
                <div className="flex flex-col items-center justify-center p-5 gap-1 bg-white rounded-md shadow-md">
                    <p className="text-3xl font-extrabold text-orange-400">{userCount?.total_rider || 0}</p>
                    <p className="text-md font-light">Total Rider</p>
                </div>
                <div className="flex flex-col items-center justify-center p-5 gap-1 bg-white rounded-md shadow-md">
                    <p className="text-3xl font-extrabold text-orange-400">{cravingRevenueData.reduce((acc, item) => {
                        return acc + item.expense;
                    }, 0)} BTD</p>
                    <p className="text-md font-light">Craving Expens</p>
                </div>
            </section>

            {/* craving revenue statistics in line graph */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="col-span-2 bg-white p-5 space-y-5 overflow-x-auto rounded-md shadow-md">
                    <h2 className="text-xl font-bold">Total Revenue: {cravingRevenueData.reduce((acc, item) => {
                        return acc + item.revenue;
                    }, 0)} BDT</h2>
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
