"use server";
import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import { Collection } from "mongodb";
import { Sort } from "mongodb";
export interface CommonPayload {
  name?: string;
  image?: string,
  role?: string,
  email?: string;
  password?: string;
  userStatus?: string;
  title?: string;
  location?: string;
  owner?: string;
  phone?:number;
  status?:string;
  address?:string;
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
  _id: string; // get from the database after fetch.
  restaurantOwnerEmail?: string;
  restaurantName?: string;
  restaurantEmail?: string;
  restaurantNumber?: number;
  restaurantDescription?: string;
  restaurantAddress?: string;
  ownerNIDPhoto?: string;
  // food available or not
  isAvailable?: boolean;
  // restaurant information
  ownerName?: string,
  addedDate?: string,
  restaurantLogo?: string,
  restaurantPhone?: number,
  restaurantRating?: number,
  ownerId?: string
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
    image:payload.image,
    email: payload.email,
    password: payload.password,
    role:payload.role,
    phone:payload.phone,
    status:payload.status,
    address:payload.address,
    created_at: new Date(),
  });
};


// Adding new restaurant information
export const addRestaurant = async (payload: CommonPayload): Promise<void> => {
  const db = await dbConnect();
  const restaurantCollection = db.collection("allRestaurant");

  await restaurantCollection.insertOne({
    restaurantName: payload.restaurantName,
    location: payload.location,
    ownerName: payload.ownerName,
    restaurantEmail: payload.restaurantEmail,
    addedDate: payload.addedDate,
    restaurantLogo: payload.restaurantLogo,
    restaurantPhone: payload.restaurantPhone,
    restaurantRating: payload.restaurantRating,
    ownerId: payload.ownerId
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
/*create Be Rider application */
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
/* Approved and update rider status */
// export const update;

/* Delete Be Rider */
export const deleteRider = async (riderId: string): Promise<void> => {
  const db = await dbConnect();
  const riderCollection: Collection<CommonPayload> = db.collection("beRider");
  await riderCollection.deleteOne({ _id: new ObjectId(riderId) });
};

/* Get all rider request */
export const getAllRider = async (): Promise<CommonPayload[]> => {
  try {
    const db = await dbConnect();
    const riderCollection: Collection<CommonPayload> = db.collection("beRider");
    const riderData = await riderCollection.find({}).toArray();
    return riderData;
  } catch (error) {
    console.error("Error fetching riders:", error);
    throw new Error("Failed to fetch rider data");
  }
};

export interface FoodItem {
  _id: string;
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

export const foodAvailableOrNot = async (
  payload: CommonPayload
): Promise<unknown> => {
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
    }
  );

  console.log(result);
  return result;
};

export const getAllFoods = async (query?: string, category?: string, sort?: string): Promise<FoodItem[]> => {
  console.log(sort)
  const db = await dbConnect();
  const foodCollection: Collection<FoodItem> = db.collection("food");
  console.log(category)
  let filter: Record<string, unknown> = {};


  if(category === 'All Food'){
    filter = {}
  }

  if (category && category !== 'All Food') {
    filter.category = category; // নির্দিষ্ট ক্যাটাগরির ফিল্টার
  }

  if (query) {
    filter.foodName = { $regex: query, $options: "i" }; // Case-insensitive search
  }

  const sortOption: Sort = {}

  if(sort === 'Ascending'){
    sortOption.price = 1
  }else if(sort === 'Descending'){
    sortOption.price = -1
  }


  console.log(filter)
  const foodData = await foodCollection.find(filter).sort(sortOption).toArray();


  return foodData.map((food) => ({
    ...food,
    _id: (food._id as unknown as ObjectId).toString(),
  }));
};
