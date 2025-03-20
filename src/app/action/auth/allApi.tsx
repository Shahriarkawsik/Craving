"use server";

import dbConnect from "@/lib/dbConnect";

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
