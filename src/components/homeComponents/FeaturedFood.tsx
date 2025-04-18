<<<<<<< HEAD
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import Link from "next/link";
=======
import { useEffect, useState } from "react";
import { FoodDetails, getFeaturedFood } from "@/app/action/auth/allApi";
import FoodCard from "../shared/FoodCard";
import { useRouter } from "next/navigation";
>>>>>>> 835f6fb979bb6abade129764afe17513b6f5c012

const FeaturedFood = () => {
  const router = useRouter();

  const [featuredFoods, setFeaturedFoods] = useState<FoodDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
<<<<<<< HEAD
    <Link href="/allFood">
      <section className="w-11/12 mx-auto  space-y-5">
        <div className="text-center">
          <h1 className=" text-2xl my-10  lg:text-4xl  text-orange-600  uppercase border-t-2 border-b-2 border-orange-300 p-4 inline-block">
            Featured Food
          </h1>
        </div>
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-4">


          {/*  this is a card-1 */}
          <div className=" rounded-lg shadow-2xl ">
            <div className="rounded-lg rounded-b-none relative overflow-hidden inline-block">
            <div className="max-h-[300px] w-fit">
                <Image
                  src="https://www.sargento.com/assets/Uploads/Recipe/Image/burger_0__FocusFillWyIwLjAwIiwiMC4wMCIsMTEwMCw2NTdd.jpg"
                  width={300}
                  height={200}
                  alt=" burger"
                  className="rounded-lg rounded-b-none object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 "
                />
              </div>
              <p className="text-xl absolute top-3 right-3   ">
                <MdFavoriteBorder className=" p-1 rounded-full  w-8 h-8  hover:border-1 hover:bg-gray-300 bg-white " />
              </p>
            </div>
            <div className="space-y-2 mx-2 mb-1 p-2">
              <div className="flex justify-between items-center ">
                <h1 className=" text-md lg:text-lg font-semibold">Cheese Burger</h1>
                <p className="flex justify-center gap-1 items-center ">
                  {" "}
                  <span className="text-orange-400">
                    <FaStar />
                  </span>{" "}
                  4.5 <span className=" text-sm">(200+)</span>
                </p>
              </div>
              <strong>200 BDT</strong>
            </div>
          </div>
          {/*  this is a card-1 */}
          <div className=" rounded-lg shadow-2xl ">
            <div className="rounded-lg rounded-b-none  relative overflow-hidden inline-block">
              <div className="max-h-[300px] w-fit">
                <Image
                  src="https://cicili.tv/wp-content/uploads/2024/08/Chicken-Fried-Rice-Small-2.jpg"
                  width={300}
                  height={200}
                  alt=" burger"
                  className="rounded-lg rounded-b-none object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 "
                />
              </div>
              <p className="text-xl absolute top-3 right-3   ">
                <MdFavoriteBorder className=" p-1 hover:border-1 hover:bg-gray-300 rounded-full w-8 h-8 bg-white " />
              </p>
            </div>
            <div className="space-y-2 mx-2 mb-1 p-2">
              <div className="flex justify-between items-center ">
                <h1 className=" text-md lg:text-lg font-semibold">Fried Rice</h1>
                <p className="flex justify-center gap-1 items-center ">
                  {" "}
                  <span className="text-orange-400">
                    <FaStar />
                  </span>{" "}
                  4.5 <span className=" text-sm">(200+)</span>
                </p>
              </div>
              <strong>230 BDT</strong>
            </div>
          </div>
          {/*  this is a card-1 */}
          <div className=" rounded-lg shadow-2xl ">
            <div className="rounded-lg rounded-b-none  relative overflow-hidden inline-block">
            <div className="max-h-[300px] w-fit">
                <Image
                  src="https://www.allrecipes.com/thmb/m4Uz46d-neAIwiBEdcCeBNbppZM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/6776_Pizza-Dough_ddmfs_4x3_1724-fd91f26e0bd6400a9e89c6866336532b.jpg"
                  width={300}
                  height={200}
                  alt=" burger"
                  className="rounded-lg rounded-b-none object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 "
                />
              </div>
              <p className="text-xl absolute top-3 right-3   ">
                <MdFavoriteBorder className=" p-1 hover:border-1 hover:bg-gray-300 rounded-full w-8 h-8 bg-white " />
              </p>
            </div>
            <div className="space-y-2 mx-2 mb-1 p-2">
              <div className="flex justify-between items-center ">
                <h1 className=" text-md lg:text-lg font-semibold">Pizza</h1>
                <p className="flex justify-center gap-1 items-center ">
                  {" "}
                  <span className="text-orange-400">
                    <FaStar />
                  </span>{" "}
                  4.5 <span className=" text-sm">(200+)</span>
                </p>
              </div>
              <strong>600 BDT</strong>
            </div>
          </div>
          {/*  this is a card-1 */}
          <div className=" rounded-lg shadow-2xl ">
            <div className="rounded-lg rounded-b-none  relative overflow-hidden inline-block">
            <div className="max-h-[300px] w-fit">
                <Image
                  src="https://www.thespruceeats.com/thmb/3QatTcsVjKeDVCD-rIeUa4fSRAs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/perfect-banana-split-recipe-305712-hero-01-ef0482a539394da0b5ba64ade0c73b98.jpg"
                  width={300}
                  height={200}
                  alt=" burger"
                  className="rounded-lg rounded-b-none object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 "
                />
              </div>
              <p className="text-xl absolute top-3 right-3   ">
                <MdFavoriteBorder className=" p-1 hover:border-1 hover:bg-gray-300 rounded-full w-8 h-8 bg-white " />
              </p>
            </div>
            <div className="space-y-2 mx-2 mb-1 p-2">
              <div className="flex justify-between items-center ">
                <h1 className=" text-md lg:text-lg font-semibold">Ice Cream Sundae</h1>
                <p className="flex justify-center gap-1 items-center ">
                  {" "}
                  <span className="text-orange-400">
                    <FaStar />
                  </span>{" "}
                  4.5 <span className=" text-sm">(200+)</span>
                </p>
              </div>
              <strong>500 BDT</strong>
            </div>
          </div>

        </div>
      </section>
    </Link>
=======
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10">
          {featuredFoods.map((food) => (
            <FoodCard key={food.food_id} food={food} />
          ))}
        </div>
      )}

      <div className="text-black w-fit mx-auto mt-10">
        <button onClick={() => router.push('/allFood')} className="px-4 py-2 border-2 border-orange-500 text-black hover:text-white hover:bg-orange-500 transition-colors duration-200 rounded-sm cursor-pointer">See All Food</button>
      </div>
    </section>
>>>>>>> 835f6fb979bb6abade129764afe17513b6f5c012
  );
};

export default FeaturedFood;