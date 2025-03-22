import dbConnect from "@/lib/dbConnect";
import { Collection } from "mongodb";

// Define a type for the service data
interface ResturantType {
    _id: string;
    title: string;
    location: string;
    owner: string;
    email: string;
}

const ShowRestaurant = async () => {
    // Get the database instance
    const db = await dbConnect();

    // Get the collection
    const restaurantCollection: Collection<ResturantType> = db.collection("resturant");

    // Fetch data from MongoDB
    const data: ResturantType[] = await restaurantCollection.find({}).toArray();

    return (
        <div>
            <h1 className="text-center">Resturant</h1>
            <ul>
                {data.map((restaurant) => (
                    <div key={restaurant._id}>
                        <h1 className="text-center">{restaurant.title}</h1>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default ShowRestaurant;


