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
  /*Add Food*/
  // restaurant_id: string;
  id?: string;
  foodName?: string;
  description?: string;
  price?: number;
  category?: string;
  foodImage?: string;
  is_available?: boolean;
  created_at?: Date;
  // Be Rider
  riderEmail?: string;
  riderName?: string;
  riderNumber?: number;
  riderAddress?: string;
  vehicleType?: string;
  // Be Owner
  restaurantOwnerEmail?: string;
  restaurantName?: string;
  restaurantEmail?: string;
  restaurantNumber?: number;
  restaurantDescription?: string;
  restaurantAddress?: string;
  ownerNIDPhoto?: string;
  // food available or not
  isAvailable: boolean
}

export const registerUser = async (payload: CommonPayload): Promise<void> => {
  // Connect to the database and create user collection
  const userCollection = await dbConnect().then((db) => db.collection("users"));
  // validation for existing user
  const existingUser = await userCollection.findOne({ email: payload.email });

  if (existingUser) {
    throw new Error(
      "This email is already registered. Please use a different email."
    );
  }
  await userCollection.insertOne({
    name: payload.name,
    email: payload.email,
    password: payload.password,
  });
};

export const addResturant = async (payload: CommonPayload): Promise<void> => {
  // connect to the database and create add resturant collection
  const resturantCollection = await dbConnect().then((db) =>
    db.collection("resturant")
  );
  await resturantCollection.insertOne({
    title: payload.title,
    location: payload.location,
    owner: payload.owner,
    email: payload.email,
  });
};

// Post Add food from resturant owner
export const addFood = async (payload: CommonPayload): Promise<void> => {
  // connect to the database and create add food collection
  const foodCollection = await dbConnect().then((db) => db.collection("food"));
  await foodCollection.insertOne({
    foodName: payload.foodName,
    description: payload.description,
    price: payload.price,
    category: payload.category,
    foodImage: payload.foodImage,
    is_available: payload.is_available,
    created_at: payload.created_at,

  });
};
/* Be Resturant Owner */
export const addResturantOwner = async (
  payload: CommonPayload
): Promise<void> => {
  // connect to the database and create add resturant owner collection
  const resturantOwnerCollection = await dbConnect().then((db) =>
    db.collection("beResturantOwner")
  );
  await resturantOwnerCollection.insertOne({
    restaurantOwnerEmail: payload.restaurantOwnerEmail,
    restaurantName: payload.restaurantName,
    restaurantEmail: payload.restaurantEmail,
    restaurantNumber: payload.restaurantNumber,
    restaurantDescription: payload.restaurantDescription,
    restaurantAddress: payload.restaurantAddress,
    ownerNIDPhoto: payload.ownerNIDPhoto,
    created_at: payload.created_at,
  });
};
/* Be Rider */
export const addRider = async (payload: CommonPayload): Promise<void> => {
  // connect to the database and create add rider collection
  const riderCollection = await dbConnect().then((db) =>
    db.collection("beRider")
  );
  await riderCollection.insertOne({
    riderEmail: payload.riderEmail,
    riderName: payload.riderName,
    riderNumber: payload.riderNumber,
    riderAddress: payload.riderAddress,
    description: payload.description,
    vehicleType: payload.vehicleType,
    created_at: payload.created_at,
  });
};

interface FoodItem {
  _id?: string;
  id?: string;
  restaurant_id?: string;
  foodName: string;
  description: string;
  price: number;
  category: string;
  image: string;
  is_available: boolean;
  created_at: string;
  owner_email: string;
}
//  get all food specific owner
export const getAllFoodsData = async (email: string): Promise<FoodItem[]> => {
  const db = await dbConnect();
  const foodCollection: Collection<FoodItem> = db.collection("food");

  const foodData = await foodCollection.find({ owner_email: email }).toArray();
  const formattedFoodData = foodData.map((food) => ({
    ...food,
    _id: (food._id as unknown as ObjectId).toString(),
  }));
  return formattedFoodData;
};

// Delete specific food
export const deleteFood = async (
  payload: CommonPayload
): Promise<{ acknowledged: boolean; deletedCount: number }> => {
  try {
    const db = await dbConnect();
    const foodCollection = db.collection("food");

    const result = await foodCollection.deleteOne({
      _id: new ObjectId(payload.id),
    });


    if (result.deletedCount === 0) {
      throw new Error("No item found to delete");
    }
    return {
      acknowledged: result.acknowledged,
      deletedCount: result.deletedCount,
    };
  } catch (error) {
    console.error("Error deleting food item:", error);
    throw error;
  }
};


export const updateFood = async (
  payload: CommonPayload
): Promise<{
  acknowledged: boolean;
  matchedCount: number;
  modifiedCount: number;
}> => {
  const db = await dbConnect();
  const foodCollection = db.collection("food");

  const result = await foodCollection.updateOne(
    { _id: new ObjectId(payload.id) },
    {
      $set: {
        foodName: payload.foodName,
        description: payload.description,
        price: payload.price,
        category: payload.category,
        foodImage: payload.foodImage,
      },
    },
    { upsert: false }
  );
  return {
    acknowledged: result.acknowledged,
    matchedCount: result.matchedCount,
    modifiedCount: result.modifiedCount,
  };
};


export const foodAvailableOrNot = async (payload: CommonPayload): Promise<unknown> => {
  console.log(payload);

  // connect to the database and get the food collection
  const foodCollection = await dbConnect().then((db) => db.collection("food"));

  // update the existing food item based on its ID
  const result = await foodCollection.updateOne(
    { _id: new ObjectId(payload.id) }, // filter by ID
    {
      $set: {
        is_available: payload.isAvailable,
      },
    },
  );

  console.log(result);
  return result; 


};


