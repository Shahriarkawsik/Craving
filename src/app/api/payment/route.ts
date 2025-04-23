// src > app > api > payment > route.ts
// import { paymentDetails } from "@/app/payment/success/page";
import { NextRequest, NextResponse } from "next/server";
import { SslCommerzPayment } from "sslcommerz";
// import SuccessPage from './../../payment/success/page';

const store_id = process.env.SSLCOMMERZ_STORE_ID!;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD!;
const is_live = false; // Set to true for production
// const [paymentData, setPaymentData] = useState<any>(null);
// type PaymentData = {
//   total_amount: number;
//   currency: string;
//   tran_id: string;
//   success_url: string;
//   fail_url: string;
//   cancel_url: string;
//   ipn_url: string;
//   shipping_method: string;
//   product_name: string;
//   product_category: string;
//   product_profile: string;
//   cus_name: string;
//   cus_email: string;
//   cus_add1: string;
//   cus_add2: string;
//   cus_city: string;
//   cus_state: string;
//   cus_postcode: string;
//   cus_country: string;
//   cus_phone: string;
//   cus_fax: string;
//   ship_name: string;
//   ship_add1: string;
//   ship_add2: string;
//   ship_city: string;
//   ship_state: string;
//   ship_postcode: string | number;
//   ship_country: string;
//   is_sent_email: boolean;
// };

// function paymentDetails(data: PaymentData) {

//   return data;
// }

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
    success_url: "https://craving-six.vercel.app/payment/success",
    fail_url: "https://craving-six.vercel.app/payment/fail",
    cancel_url: "https://craving-six.vercel.app/payment/cancel",
    ipn_url: "https://craving-six.vercel.app/payment/ipn",
    shipping_method: "Home Delivery",
    product_name: "Computer",
    product_category: "Food",
    product_profile: "General",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Bangladesh",
    cus_postcode: "0000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: "0000",
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
