"use client";
import { useState } from "react";
import Countdown from "./CountDown";
import Image from "next/image";
import { MdFavoriteBorder } from "react-icons/md";
import { FaStar } from "react-icons/fa6";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  image :string
}

export default function EidCart() {
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: "Pizza", quantity: 2, image:"https://i.ibb.co.com/r7BnPmx/pizza-bg.jpg" },
    { id: 2, name: "Burger", quantity: 1,image:"https://i.ibb.co.com/r7BnPmx/pizza-bg.jpg" },
  ]);

  const handleExpire = () => {
    setIsExpired(true);
    setCart([]); // Clear cart
  };

  return (
    <div className="w-11/12 mx-auto">
      <div className="p-4">
        <h1 className="text-3xl flex font-bold mb-2">
          Eid Offer Expired in
          <span>{!isExpired && <Countdown onExpire={handleExpire} />}</span>
        </h1>

        {isExpired ? (
          <p className="text-red-500 mt-4">⏳ Your Eid offer has expired!</p>
        ) : (
          <ul className="mt-4 grid grid-cols-4 gap-5 space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="border p-2 rounded shadow">
                <div className=" rounded-lg shadow-2xl ">
                  <div className="rounded-lg rounded-b-none  relative overflow-hidden inline-block">
                    <Image
                    width={200}
                    height={200}
                      src={item.image}
                      alt=" burger"
                      className="rounded-lg rounded-b-none  transition-transform duration-300 ease-in-out transform hover:scale-109 "
                    />
                    <p className="text-xl absolute top-3 right-3   ">
                      <MdFavoriteBorder className=" p-1 rounded-full  w-8 h-8  hover:border-1 hover:bg-gray-300 bg-white " />
                    </p>
                  </div>
                  <div className="space-y-2 mx-2 mb-1 p-2">
                    <div className="flex justify-between items-center ">
                      <h1 className=" text-md lg:text-lg font-semibold">
                        {" "}
                        {item.name}{" "}
                      </h1>
                      <p className="flex justify-center gap-1 items-center ">
                        {" "}
                        <span className="text-orange-400">
                          <FaStar />
                        </span>{" "}
                        4.5 <span className=" text-sm">(200+)</span>
                      </p>
                    </div>
                    <strong>$100</strong>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
