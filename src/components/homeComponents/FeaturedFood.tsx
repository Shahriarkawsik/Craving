import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { FeaturedFoodType, getFeaturedFood } from "@/app/action/auth/allApi";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

const FeaturedFood = () => {

  const [featuredFoods, setFeaturedFoods] = useState<FeaturedFoodType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFeaturedFood();
        setFeaturedFoods(data);
      } catch (err) {
        console.error("Error fetching featured foods:", err);
        setError("Failed to load featured foods.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <section className="w-11/12 mx-auto  space-y-5">
      {/* heading */}
      <div className="text-center">
        <h1 className=" text-2xl my-10  lg:text-4xl  text-orange-600  uppercase border-t-2 border-b-2 border-orange-300 p-4 inline-block">
          Featured Food
        </h1>
      </div>

      {/* feature food content */}

        {loading ? (
          <p className="text-center text-lg font-medium py-6">Loading featured foods...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-6">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {featuredFoods.map((food, indx) => (
              <div key={indx} className="rounded-lg shadow-2xl space-y-5">
              {/* image content */}
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
                    {food.rating} <span className=" text-sm">({food.reviewCount}+)</span>
                  </p>
                </div>
        
                <div className="mt-3 mx-auto size">
                  <p className="flex items-center justify-end text-md text-black font-bold">{food.price} BDT</p>
                </div>
        
                {/* buttons */}
                <div className="mt-3 flex items-center justify-between gap-2">
                  <button className='text-white bg-orange-500 hover:bg-orange-600 flex items-center justify-center space-x-2 py-2 px-4 rounded-sm shadow-md transition-colors duration-300 cursor-pointer'>
                    <FaShoppingCart size={20} />
                    <span className="ml-1">Add to Cart</span>
                  </button>
        
                  <Link href={`/cart`}><button className='text-orange-950 hover:text-white transition-all border border-orange-400 hover:bg-orange-500 flex items-center justify-center space-x-2 py-2 px-4 rounded-sm shadow-md duration-300 cursor-pointer'>
                    Order Now
                  </button></Link>
                </div>
              </div>
        
            </div>
            ))}
          </div>
        )}
    </section>
  );
};

export default FeaturedFood;