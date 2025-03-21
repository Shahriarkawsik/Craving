"use server";
import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import { Collection } from "mongodb";

interface CommonPayload {
  name?: string; 
  email?: string; 
  password?: string; 
  title?: string; 
  location?: string; 
  owner?: string; 
}

export const registerUser = async (payload: CommonPayload): Promise<void> => {
  // Connect to the database and create user collection
  const userCollection = await dbConnect().then((db) => db.collection('users'));
  // validation for existing user
  const existingUser = await userCollection.findOne({ email: payload.email });

  if (existingUser) {
    throw new Error("This email is already registered. Please use a different email.");
  }
  await userCollection.insertOne({
    name: payload.name,
    email: payload.email,
    password: payload.password
  });
}

export const addResturant = async (payload: CommonPayload): Promise<void> => {
  // connect to the database and create add resturant collection
  const resturantCollection = await dbConnect().then((db) => db.collection('resturant'))
  await resturantCollection.insertOne({
    title:payload.title,
    location:payload.location,
    owner:payload.owner,
    email:payload.email
  })
};



interface FoodItem {
  _id: string;
  id: string;
  restaurant_id: string;
  foodName: string;
  description: string;
  price: number;
  category: string;
  image: string;
  is_available: boolean;
  created_at: string;
  owner_email: string;
}

export const getAllFoodsData = async (email: string): Promise<FoodItem[]> => {
  const db = await dbConnect();
  const foodCollection: Collection<FoodItem> = db.collection("food");

  const foodData = await foodCollection.find({ owner_email: email }).toArray();
  const formattedFoodData = foodData.map((food) => ({
    ...food,
    _id: (food._id as unknown as ObjectId).toString(),
  }));
  // console.log(foodData);

  return formattedFoodData;
};