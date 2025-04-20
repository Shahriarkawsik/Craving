"use client";

import { getOrderCartByEmail } from "@/app/action/auth/allApi";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const SuccessPage = () => {
  const session = useSession();
  useEffect(()=> {
    const fetchCartItem = async () => {
      if(session.data?.user.email){
        try {
          const cartItems = await getOrderCartByEmail(session.data?.user.email);
          console.log(cartItems);
        }
        catch(error){
          console.log("ERROR", error);
        }
      }
    }
    fetchCartItem();
  }, [session])


  return <section>✅ Payment Successful!</section>;
};
export default SuccessPage;
