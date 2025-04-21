"use client";

// import { addToOrder, getOrderCartByEmail } from "@/app/action/auth/allApi";
// import { useSession } from "next-auth/react";
// import React, { useEffect } from "react";
// interface CartItem {
//   _id: string;
//   restaurant_id: string;
//   foodName: string;
//   description: string;
//   price: number;
//   category: string;
//   image: string;
//   is_available: boolean;
//   created_at: Date | null;
//   owner_email: string | null;
//   user_email: string;
// }

const SuccessPage = () => {
  // const session = useSession();
  // const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  // useEffect(() => {
  //   const fetchCartItem = async () => {
  //     if (session.data?.user.email) {
  //       try {
  //         const cartItems = await getOrderCartByEmail(session.data?.user.email);
  //         setCartItems(cartItems);
  //       }
  //       catch (error) {
  //         console.log("ERROR", error);
  //       }
  //     }
  //   }
  //   fetchCartItem();
  //   const addToOrderCollection = async () => {
  //     try{
  //       addToOrder({items: cartItems});
  //     }
  //     catch(error){
  //       console.log("ERROR", error);
  //     }
  //   }

  //   addToOrderCollection();
  // }, [session])


  return <section className="w-10/12 min-h-screen flex items-center justify-center mx-auto">✅ Payment Successful!</section>;
};
export default SuccessPage;
