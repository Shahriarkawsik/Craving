import dbConnect from "@/lib/dbConnect";
import { Collection } from "mongodb";

// Define a type for the user data
interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
}

const SignInUser = async (email: string): Promise<User | null> => {
  // Get the database instance
  const db = await dbConnect();

  // Get the collection
  const userCollection: Collection<User> = db.collection("users");

  // Find the user by email
  const user = await userCollection.findOne({ email });

  // If the user exists, return the user object with necessary fields
  if (user) {
    return {
      id: user._id.toString(), // Convert MongoDB ObjectId to string
      email: user.email,
      password: user.password,
      name: user.name || "Anonymous", // Default to "Anonymous" if no name
    };
  }

  // Return null if no user found
  return null;
};

export default SignInUser;
