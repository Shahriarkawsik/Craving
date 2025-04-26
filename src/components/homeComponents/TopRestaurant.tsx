import { CommonPayload } from "@/app/action/auth/allApi";
import Image from "next/image";
import Link from "next/link";
// import restaurantImg001 from "../../assets/restaurantsImg/restaurantImg-001.jpeg";
import { FaLocationDot } from "react-icons/fa6";
// import { MdFoodBank } from "react-icons/md";
interface TopRestaurantProps {
  restaurants: CommonPayload[];
}
const TopRestaurant = ({ restaurants }: TopRestaurantProps) => {
  // interface Restaurant {
  //   name: string;
  //   photo: string;
  //   location: string;
  //   bestFood: string;
  // }

  // const restaurants: Restaurant[] = [
  //   {
  //     name: "The Spice Garden",
  //     photo: "https://i.ibb.co.com/1J024rwp/restaurant-Img-001.jpg",
  //     location: "Dhaka, Bangladesh",
  //     bestFood: "Butter Chicken Curry",
  //   },
  //   {
  //     name: "Sea Breeze Café",
  //     photo: "https://i.ibb.co/1J024rwp/restaurant-Img-001.jpg",
  //     location: "Cox's Bazar, Bangladesh",
  //     bestFood: "Grilled Lobster with Garlic Butter",
  //   },
  //   {
  //     name: "Urban Bites",
  //     photo: "https://i.ibb.co/1J024rwp/restaurant-Img-001.jpg",
  //     location: "Gulshan, Dhaka",
  //     bestFood: "Cheese-stuffed Burgers",
  //   },
  //   {
  //     name: "Green Leaf Vegan",
  //     photo: "https://i.ibb.co/1J024rwp/restaurant-Img-001.jpg",
  //     location: "Banani, Dhaka",
  //     bestFood: "Quinoa Avocado Salad",
  //   },
  //   {
  //     name: "Golden Wok",
  //     photo: "https://i.ibb.co/1J024rwp/restaurant-Img-001.jpg",
  //     location: "Chittagong, Bangladesh",
  //     bestFood: "Szechuan Chicken Noodles",
  //   },
  // ];
  // console.log(restaurants)
  return (
    <section className="w-11/12 mx-auto py-7 " id="nearby-restaurants">
    
      <div className="text-center">
        <h1 className=" text-2xl mb-10  lg:text-4xl  text-orange-600  uppercase border-t-2 border-b-2 border-orange-300 p-4 inline-block">
        Near by Restaurants
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {restaurants.map((restaurant, index) => (
          <Link
            href={`/restaurant/${restaurant._id}`}
            key={index}
            className="border space-y-4 overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-103 rounded-lg hover:shadow-2xl "
          >
            <figure>
              {
                restaurant.restaurantLogo ? <Image
                className="w-full rounded-lg rounded-b-none h-[250px] object-cover"
                src={restaurant?.restaurantLogo}
                width={300}
                height={250}
                alt="this is a noodles platter."
                unoptimized
              /> : ""
              }
            </figure>
            <div className="space-y-3 m-3 pb-2">
              <h1 className="text-2xl font-semibold">{restaurant.restaurantName}</h1>
              <div>
                <p className="flex mb-1 gap-2 items-center">
                  <FaLocationDot className="text-lg" /> {restaurant.restaurantAddress}
                </p>
                <p className="flex gap-2">
                  {/* <MdFoodBank className="text-2xl" /> {restaurant.bestFood} */}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopRestaurant;
