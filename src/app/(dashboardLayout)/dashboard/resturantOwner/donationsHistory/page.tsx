"use client";

import { CommonPayload, getDonationsHistoryData } from "@/app/action/auth/allApi";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const DonationsHistory = () => {
    const {data:session} = useSession()
    const [allDonationData, setAllDonationData] = useState<CommonPayload[]>([])
    useEffect(()=> {
        const fetchDonationsAllData = async () => {
            try {
                if(session?.user?.email) {
                    const data = await getDonationsHistoryData({restaurantOwnerEmail:session?.user?.email})
                    setAllDonationData(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchDonationsAllData()
    }, [session?.user?.email])
    console.log(allDonationData)
    return (
        <div>
            <h1>kflskdfslkd</h1>
        </div>
    );
};

export default DonationsHistory;