"use client";
import Banner from "@/components/shared/Banner";
import bannerImage from "@/assets/bannerImg/aboutBanner1.jpg";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Page = () => {
  const [amount, setAmount] = useState(0);
  console.log(amount);

  const initiatePayment = async () => {
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
      <Banner
        image={bannerImage.src}
        title={`Your Cart`}
        subtitle={`See your added items.`}
      />
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
