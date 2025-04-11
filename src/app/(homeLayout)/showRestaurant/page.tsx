// import dbConnect from "@/lib/dbConnect";
// import { Collection } from "mongodb";

// // Define a type for the restaurant data
// interface RestaurantType {
//   _id: string;
//   title: string;
//   location: string;
//   owner: string;
//   email: string;
// }

// const ShowRestaurant = async () => {
//   try {
//     // Get the database instance
//     const db = await dbConnect();

//     // Get the collection
//     const restaurantCollection: Collection<RestaurantType> =
//       db.collection("restaurant");

//     // Fetch data from MongoDB
//     const data: RestaurantType[] = await restaurantCollection
//       .find({})
//       .toArray();

//     return (
//       <div>
//         <h1 className="text-center">Restaurants</h1>
//         <ul>
//           {data.map((restaurant) => (
//             <div key={restaurant._id}>
//               <h1 className="text-center">{restaurant.title}</h1>
//             </div>
//           ))}
//         </ul>
//       </div>
//     );
//   } catch (error) {
//     console.error("Error fetching restaurants:", error);
//     return (
//       <div>
//         <h1>Failed to load restaurants</h1>
//       </div>
//     );
//   }
// };

// export default ShowRestaurant;
import React from "react";

const page = () => {
  return <div>this is show restaurant</div>;
};

export default page;
