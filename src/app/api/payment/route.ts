// src > app > api > payment > route.ts
import { NextRequest, NextResponse } from "next/server";
import { useState } from "react";
import { SslCommerzPayment } from "sslcommerz";

const store_id = process.env.SSLCOMMERZ_STORE_ID!;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD!;
const is_live = false; // Set to true for production

export async function POST(req: NextRequest) {
  const sslcz = new SslCommerzPayment(store_id, store_passwd, is_live);
  const tran_id = Math.floor(100000 + Math.random() * 900000).toString();

  // Get the amount dynamically from the request body
  const body = await req.json();
  const { amount } = body;

   const data = {
    total_amount: amount,
    currency: "BDT",
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: "http://localhost:3000/payment/success",
    fail_url: "http://localhost:3000/payment/fail",
    cancel_url: "http://localhost:3000/payment/cancel",
    ipn_url: "http://localhost:3000/payment/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
    is_sent_email: true, // Does not work in demo version.
  };

  try {
    const apiResponse = await sslcz.init(data);
    if (apiResponse?.GatewayPageURL) {
      return NextResponse.json({ url: apiResponse.GatewayPageURL });
    } else {
      throw new Error("GatewayPageURL not found in the response.");
    }
  } catch (error) {
    console.error("Payment initiation error:", error);
    return NextResponse.json(
      { error: `Payment initiation failed: ${error}` },
      { status: 500 }
    );
  }
}
