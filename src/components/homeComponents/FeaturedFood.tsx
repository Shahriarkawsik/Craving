import { useEffect, useState } from "react";
import { FoodDetails, getFeaturedFood } from "@/app/action/auth/allApi";
import FoodCard from "../shared/FoodCard";

const FeaturedFood = () => {

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
          {featuredFoods.map((food) => (
            <FoodCard key={food.food_id} food={food}/>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedFood;