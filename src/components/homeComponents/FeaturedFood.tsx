import { useEffect, useState } from "react";
import { FoodDetails, getFeaturedFood } from "@/app/action/auth/allApi";
import FoodCard from "../shared/FoodCard";
import { useRouter } from "next/navigation";
import Spinner from "../shared/Spinner";

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
    <section className="w-11/12 mx-auto  py-7">
      {/* heading */}
      <div className="text-center">
        <h1 className=" text-2xl mb-10  lg:text-4xl  text-orange-600  uppercase border-t-2 border-b-2 border-orange-300 p-4 inline-block">
          Featured Food
        </h1>
      </div>

      {/* feature food content */}

      {loading ? (
        <div className="flex items-center justify-center"><Spinner /></div>
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
  );
};

export default FeaturedFood;