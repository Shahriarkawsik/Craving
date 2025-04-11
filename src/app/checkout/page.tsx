// app > checkout > page.tsx
"use client";

import React from "react";

const CheckoutPage = () => {
  const initiatePayment = async () => {
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 500, // Example static amount, you can make this dynamic
          // name: "Shahriar", // Optionally pass other details
          // email: "shahriar@example.com",
          // phone: "01712345678",
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
    <section className="text-center mt-10">
      <h1 className="text-xl font-bold">Checkout Page</h1>
      <button
        onClick={initiatePayment}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Pay Now
      </button>
    </section>
  );
};

export default CheckoutPage;
