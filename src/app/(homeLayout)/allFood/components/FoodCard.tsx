// import React from "react";
// import { FaStar } from "react-icons/fa6";
// import { MdFavoriteBorder } from "react-icons/md";
// import OrderDetailsModal from "./OrderDetailsModal";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { useSession } from "next-auth/react";
// import { addToCart } from "@/app/action/auth/allApi";
// import { toast } from "react-toastify";

// // Define the interface for the food prop
// interface Food {
//   _id: string;
//   restaurant_id: string;
//   foodName: string;
//   description: string;
//   price: number;
//   category: string;
//   image: string;
//   is_available: boolean;
//   created_at: string;
//   owner_email: string;
//   user_email: string
// }

// interface FoodCardProps {
//   food: Food; // Define the type of the food prop
// }

// const FoodCard: React.FC<FoodCardProps> = ({ food }) => {

//   const data = useSession();

//   const cartFood = { ...food, user_email: data.data?.user?.email, created_at: new Date(food.created_at) }

//   const handleClick = () => {
//     addToCart(cartFood)
//     toast.success("Added to cart")
//   }




//   return (
//     <div>
//       <div className=" rounded-lg shadow-2xl ">
//         <div className="rounded-lg rounded-b-none  relative overflow-hidden inline-block">
//           {/* <Image
//                     src={foodImg}
//                     alt=" burger"
//                     className="rounded-lg rounded-b-none  transition-transform duration-300 ease-in-out transform hover:scale-109 "
//                     /> */}
//           <p className="text-xl absolute top-3 right-3   ">
//             <MdFavoriteBorder className=" p-1 rounded-full  w-8 h-8  hover:border-1 hover:bg-gray-300 bg-white " />
//           </p>
//         </div>
//         <OrderDetailsModal food={food}>
//           <div className="space-y-2 mx-2 mb-1 p-2">
//             <div className="flex justify-between items-center ">
//               <h1 className=" text-md lg:text-lg font-semibold">
//                 {food.foodName}
//               </h1>
//               <p className="flex justify-center gap-1 items-center ">
//                 {" "}
//                 <span className="text-orange-400">
//                   <FaStar />
//                 </span>{" "}
//                 4.5 <span className=" text-sm">(200+)</span>
//               </p>
//             </div>
//             <strong>${food.price}</strong>
//           </div>
//         </OrderDetailsModal>
//         {/* buttons */}
//         <div>
//           <Button onClick={handleClick} variant="default">Add to Cart</Button>
//           <Link href={`/cart`}><Button variant="default">Order Now</Button></Link>
//         </div>
//       </div>
//     </div>

//   );
// };

// export default FoodCard;




import React from "react";
import { FaStar } from "react-icons/fa6";
import OrderDetailsModal from "./OrderDetailsModal";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { addToCart } from "@/app/action/auth/allApi";
import { toast } from "react-toastify";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";

// Define the interface for the food prop
interface Food {
  _id: string;
  restaurant_id: string;
  foodName: string;
  description: string;
  price: number;
  category: string;
  image: string;
  is_available: boolean;
  created_at: string;
  owner_email: string;
  user_email: string
}

interface FoodCardProps {
  food: Food; // Define the type of the food prop
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {

  const data = useSession();

  const cartFood = { ...food, user_email: data.data?.user?.email, created_at: new Date(food.created_at) }

  const handleClick = () => {
    addToCart(cartFood)
    toast.success("Added to cart")
  }




  return (
    <div className="rounded-lg shadow-2xl space-y-5">
      {/* image content */}
      <OrderDetailsModal food={food}>
        <div className="relative h-[300px] overflow-hidden rounded-t-lg cursor-pointer group">
          <Image
            src={food.image}
            alt={food.foodName}
            width={300}
            height={300}
            className="w-full h-full object-cover rounded-t-lg"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity duration-300">
            <p className="text-white text-lg font-semibold">Click To See Details</p>
          </div>
        </div>
      </OrderDetailsModal>

      {/* text content */}
      <div className="mx-5 mb-5">
        <div className="flex justify-between items-center ">
          <h1 className=" text-md lg:text-xl font-bold">
            {food.foodName}
          </h1>
          <p className="flex justify-center gap-1 items-center ">
            {" "}
            <span className="text-orange-400">
              <FaStar />
            </span>{" "}
            4.5 <span className=" text-sm">(200+)</span>
          </p>
        </div>

        <div className="mt-3 mx-auto size">
          <p className="flex items-center justify-end text-md text-black font-bold">{food.price} BDT</p>
        </div>

        {/* buttons */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <button onClick={handleClick} className='text-white bg-orange-500 hover:bg-orange-600 flex items-center justify-center space-x-2 py-2 px-4 rounded-sm shadow-md transition-colors duration-300 cursor-pointer'>
            <FaShoppingCart size={20} />
            <span className="ml-1">Add to Cart</span>
          </button>

          <Link href="/cart"><button className='text-orange-950 hover:text-white transition-all border border-orange-400 hover:bg-orange-500 flex items-center justify-center space-x-2 py-2 px-4 rounded-sm shadow-md duration-300 cursor-pointer'>
            Order Now
          </button></Link>
        </div>
      </div>

    </div>
  );
};

export default FoodCard;