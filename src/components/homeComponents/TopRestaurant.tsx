import Image from "next/image";
// import restaurantImg001 from "../../assets/restaurantsImg/restaurantImg-001.jpeg";
import { FaLocationDot } from "react-icons/fa6";
import { MdFoodBank } from "react-icons/md";

const TopRestaurant = () => {
  interface Restaurant {
    name: string;
    photo: string;
    location: string;
    bestFood: string;
  }

  const restaurants: Restaurant[] = [
    {
      name: "The Spice Garden",
      photo: "https://i.ibb.co.com/1J024rwp/restaurant-Img-001.jpg",
      location: "Dhaka, Bangladesh",
      bestFood: "Butter Chicken Curry",
    },
    {
      name: "Sea Breeze Café",
      photo: "https://i.ibb.co.com/1J024rwp/restaurant-Img-001.jpg",
      location: "Cox's Bazar, Bangladesh",
      bestFood: "Grilled Lobster with Garlic Butter",
    },
    {
      name: "Urban Bites",
      photo: "https://i.ibb.co.com/1J024rwp/restaurant-Img-001.jpg",
      location: "Gulshan, Dhaka",
      bestFood: "Cheese-stuffed Burgers",
    },
    {
      name: "Green Leaf Vegan",
      photo: "https://i.ibb.co.com/1J024rwp/restaurant-Img-001.jpg",
      location: "Banani, Dhaka",
      bestFood: "Quinoa Avocado Salad",
    },
    {
      name: "Golden Wok",
      photo: "https://i.ibb.co.com/1J024rwp/restaurant-Img-001.jpg",
      location: "Chittagong, Bangladesh",
      bestFood: "Szechuan Chicken Noodles",
    },
  ];

  return (
    <section className="w-11/12 mx-auto space-y-7" id="nearby-restaurants">
      <h1 className="text-center text-2xl font-bold">Nearby Restaurants</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {restaurants.map((restaurant, index) => (
          <div
            key={index}
            className="border space-y-4 rounded-lg shadow-2xl bg-white"
          >
            <figure>
              <Image
                className="w-full h-full"
                src={restaurant.photo}
                width={250}
                height={250}
                alt="this is a noodles platter."
              />
            </figure>
            <div className="space-y-4 mx-2">
              <h1 className="text-center text-2xl font-bold">
                {restaurant.name}
              </h1>
              <p className="flex gap-2">
                <FaLocationDot className="text-2xl" /> {restaurant.location}
              </p>
              <p className="flex gap-2">
                <MdFoodBank className="text-2xl" /> {restaurant.bestFood}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRestaurant;
