"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CommonPayload, getFoodDonationData, allDonationDataForOwnerHistory } from "@/app/action/auth/allApi";
import { useSession } from "next-auth/react";

const Page = () => {
  const { id } = useParams();
  const {data:session} = useSession()
  const [amount, setAmount] = useState(0);
  const [donationData, setDonationData] = useState<CommonPayload[]>([]);

  useEffect(() => {
    const fetchDonationsData = async () => {
      try {
        const data = await getFoodDonationData({ id: id as string });
        setDonationData(data);
      } catch (error) {
        console.error("Something went wrong", error);
      }
    };
    fetchDonationsData();
  }, [id]);

  const initiatePayment = async () => {
    const allDonationData = {
      title: donationData[0]?.title ?? "Untitled",
      description: donationData[0]?.description ?? "",
      image: donationData[0]?.image ?? undefined,
      location: donationData[0]?.location ?? "",
      restaurantName: donationData[0]?.restaurantName ?? "",
      restaurantOwnerEmail: donationData[0]?.restaurantOwnerEmail ?? "",
      email: session?.user?.email ?? "No Available",
      userImage: session?.user?.image ?? undefined,
      amount: amount.toString(),
    };
    console.log(allDonationData, "==========================");
     try {
          await allDonationDataForOwnerHistory(allDonationData);
        } catch (error) {
          console.error("Something went wrong", error);
        }
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
        }),
      });

      const data = await res.json(); // Ensure backend responds with JSON

      if (data?.url) {
        window.location.href = data.url; // Redirect to the payment gateway
      } else {
        console.error("No URL received from payment gateway.");
      }
    } catch (err) {
      console.error("Payment initiation error:", err);
    }

  };

  return (
    <div>
      {/* background image part  */}
      <div
        className="flex justify-center items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${donationData[0]?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "350px",
          width: "100%",
        }}
      >
        <div className="w-3xl mx-auto text-center z-50">
          <h2 className="text-2xl md:text-4xl font-bold text-white">{donationData[0]?.title}</h2>
          <p className="mt-2 text-white">{donationData[0]?.location}</p>
        </div>
      </div>
      {/* payment part  */}
      <div className="w-11/12 mx-auto my-10">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-3xl my-2 mb-5">Payment</h1>
          <div className="w-lg mx-auto">
            <label className="text-lg mb-1">Total Amount</label>
            <Input onChange={(e) => setAmount(Number(e.target.value))} />
          </div>
          <button
            onClick={initiatePayment}
            className="btn bg-blue-600 cursor-pointer text-white mt-2 py-2 rounded px-2"
          >
            Proceed to payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
