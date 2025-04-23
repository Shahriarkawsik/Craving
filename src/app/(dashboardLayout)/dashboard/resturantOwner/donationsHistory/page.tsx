"use client";

import { getDonationsHistoryData } from "@/app/action/auth/allApi";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const DonationsHistory = () => {
    const {data:session} = useSession()
    useEffect(()=> {
        const fetchDonationsAllData = async () => {
            try {
                if(session?.user?.email) {
                    const data = await getDonationsHistoryData({email:session?.user?.email})
                    console.log(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchDonationsAllData()
    }, [session?.user?.email])
    return (
        <div>
            <h1>kflskdfslkd</h1>
        </div>
    );
};

export default DonationsHistory;