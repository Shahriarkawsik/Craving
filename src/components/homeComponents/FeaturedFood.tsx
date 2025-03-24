import Image from "next/image";
import foodImg from "../../assets/bannerImg/dish-banner-003.jpg";

import { FaStar } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";

const FeaturedFood = () => {
  // interface featuredFood {
  //   name: string;
  //   description: string;
  //   price: number;
  //   rating: number;
  // }
  // const featuredFoods: featuredFood[] = [
  //   {
  //     name: "Barger",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, perspiciatis.",
  //     price: 100, // Replace with the actual price
  //     rating: 5, // Replace with the actual rating
  //   },
  // ];
  return (
    <section className="w-11/12 mx-auto  space-y-5">
      <div className="text-center">
        <h1 className=" text-2xl my-10  lg:text-4xl  text-orange-600  uppercase border-t-2 border-b-2 border-orange-300 p-4 inline-block">
          Featured Food
        </h1>
      </div>
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-4">
         
    
        {/*  this is a card-1 */}
        <div className=" rounded-lg shadow-2xl ">
          <div className="rounded-lg rounded-b-none  relative overflow-hidden inline-block">
            <Image
              src={foodImg}
              alt=" burger"
              className="rounded-lg rounded-b-none  transition-transform duration-300 ease-in-out transform hover:scale-109 "
            />
            <p className="text-xl absolute top-3 right-3   ">
              <MdFavoriteBorder className=" p-1 rounded-full  w-8 h-8  hover:border-1 hover:bg-gray-300 bg-white " />
            </p>
          </div>
          <div className="space-y-2 mx-2 mb-1 p-2">
            <div className="flex justify-between items-center ">
              <h1 className=" text-md lg:text-lg font-semibold">Burger</h1>
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
        {/*  this is a card-1 */}
        <div className=" rounded-lg shadow-2xl ">
          <div className="rounded-lg rounded-b-none  relative overflow-hidden inline-block">
            <Image
              src={foodImg}
              alt=" burger"
              className="rounded-lg rounded-b-none  transition-transform duration-300 ease-in-out transform hover:scale-109 "
            />
            <p className="text-xl absolute top-3 right-3   ">
              <MdFavoriteBorder className=" p-1 hover:border-1 hover:bg-gray-300 rounded-full w-8 h-8 bg-white " />
            </p>
          </div>
          <div className="space-y-2 mx-2 mb-1 p-2">
            <div className="flex justify-between items-center ">
              <h1 className=" text-md lg:text-lg font-semibold">Burger</h1>
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
        {/*  this is a card-1 */}
        <div className=" rounded-lg shadow-2xl ">
          <div className="rounded-lg rounded-b-none  relative overflow-hidden inline-block">
            <Image
              src={foodImg}
              alt=" burger"
              className="rounded-lg rounded-b-none  transition-transform duration-300 ease-in-out transform hover:scale-109 "
            />
            <p className="text-xl absolute top-3 right-3   ">
              <MdFavoriteBorder className=" p-1 hover:border-1 hover:bg-gray-300 rounded-full w-8 h-8 bg-white " />
            </p>
          </div>
          <div className="space-y-2 mx-2 mb-1 p-2">
            <div className="flex justify-between items-center ">
              <h1 className=" text-md lg:text-lg font-semibold">Burger</h1>
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
        {/*  this is a card-1 */}
        <div className=" rounded-lg shadow-2xl ">
          <div className="rounded-lg rounded-b-none  relative overflow-hidden inline-block">
            <Image
              src={foodImg}
              alt=" burger"
              className="rounded-lg rounded-b-none  transition-transform duration-300 ease-in-out transform hover:scale-109 "
            />
            <p className="text-xl absolute top-3 right-3   ">
              <MdFavoriteBorder className=" p-1 hover:border-1 hover:bg-gray-300 rounded-full w-8 h-8 bg-white " />
            </p>
          </div>
          <div className="space-y-2 mx-2 mb-1 p-2">
            <div className="flex justify-between items-center ">
              <h1 className=" text-md lg:text-lg font-semibold">Burger</h1>
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
    </section>
  );
};

export default FeaturedFood;
