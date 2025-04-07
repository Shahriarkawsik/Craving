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

const Services = async () => {
  // Get the database instance
  const db = await dbConnect();

  // Get the collection
  const servicesCollection: Collection<ResturantType> =
    db.collection("resturant");

  // Fetch data from MongoDB
  const data: ResturantType[] = await servicesCollection.find({}).toArray();

  return (
    <div>
      <h1 className="text-center">Resturant</h1>
      <ul>
        {data.map((resturn) => (
          <div key={resturn._id}>
            <h1 className="text-center">{resturn.title}</h1>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Services;
