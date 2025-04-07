"use server";
import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import { Collection } from "mongodb";
import { Sort } from "mongodb";
export interface CommonPayload {
  name?: string;
  image?: string;
  role?: string;
  email?: string;
  password?: string;
  userStatus?: string;
  title?: string;
  location?: string;
  owner?: string;
  phone?: number;
  status?: string;
  address?: string;
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
  riderImage?: string;
  riderIdentification?: number;
  // Be Owner
  _id?: string; // get from the database after fetch.
  restaurantOwnerId?: string;
  restaurantOwnerEmail?: string;
  restaurantOwnerName?: string;
  restaurantName?: string;
  restaurantEmail?: string;
  restaurantNumber?: number;
  restaurantDescription?: string;
  restaurantAddress?: string;
  ownerIdentification?: number;
  restaurantOpeningDate: Date;
  foodCategories: string[];
  totalFoodItem: number;
  restaurantTotalSell: number;
  restaurantTotalOrder: number;
  restaurantCompleteOrder: number;
  restaurantPendingOrder: number;
  // food available or not
  isAvailable?: boolean;
  // restaurant information
  ownerName?: string;
  addedDate?: string;
  restaurantLogo?: string;
  restaurantPhone?: number;
  restaurantRating?: number;
  ownerId?: string;
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
    image: payload.image,
    email: payload.email,
    password: payload.password,
    role: payload.role,
    phone: payload.phone,
    status: payload.status,
    address: payload.address,
    created_at: new Date(),
  });
};
/* Get Login user Details */
export const getUserDetails = async (
  email: string
): Promise<CommonPayload | null> => {
  const db = await dbConnect();
  const userCollection: Collection<CommonPayload> = db.collection("users");

  const user = await userCollection.findOne({ email });

  if (!user) return null;

  return {
    ...user,
    _id: (user._id as unknown as ObjectId).toString(),
    created_at: user.created_at ? new Date(user.created_at) : undefined,
  };
};

export const updateUserRole = async (
  email: string,
  role: string
): Promise<void> => {
  const db = await dbConnect();
  const userCollection = db.collection("users");
  await userCollection.updateOne({ email }, { $set: { role } });
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
    ownerId: payload.ownerId,
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
    restaurantOwnerName: payload.restaurantOwnerName,
    restaurantName: payload.restaurantName,
    restaurantEmail: payload.restaurantEmail,
    restaurantNumber: payload.restaurantNumber,
    restaurantLogo: payload.restaurantLogo,
    restaurantDescription: payload.restaurantDescription,
    ownerIdentification: payload.ownerIdentification,
    restaurantAddress: payload.restaurantAddress,
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
    riderImage: payload.riderImage,
    riderIdentification: payload.riderIdentification,
    riderNumber: payload.riderNumber,
    riderAddress: payload.riderAddress,
    description: payload.description,
    vehicleType: payload.vehicleType,
    created_at: payload.created_at,
  });
};
/* Approved and update rider status */

/* Delete Be Resturant Owner Application */
export const deleteResturantOwner = async (
  resturantOwnerId: string
): Promise<void> => {
  const db = await dbConnect();
  const resturantOwnerCollection: Collection<CommonPayload> =
    db.collection("beResturantOwner");
  await resturantOwnerCollection.deleteOne({
    // _id: new ObjectId(resturantOwnerId),
    _id: (resturantOwnerId as unknown as ObjectId).toString(),
  });
};

/* Delete Be Rider Application */
export const deleteRider = async (riderId: string): Promise<void> => {
  const db = await dbConnect();
  const riderCollection: Collection<CommonPayload> = db.collection("beRider");
  await riderCollection.deleteOne({ 
    // _id: new ObjectId(riderId) 
      _id: (riderId as unknown as ObjectId).toString(),
  });
};
/* Get all resturant owner Application */
export const getAllResturantOwner = async (): Promise<CommonPayload[]> => {
  try {
    const db = await dbConnect();
    const resturantOwnerCollection: Collection<CommonPayload> =
      db.collection("beResturantOwner");
    const resturantOwnerData = await resturantOwnerCollection
      .find({})
      .toArray();
    // Convert created_at to Date object
    const formattedResturantOwnerData = resturantOwnerData.map(
      (resturantOwner) => ({
        ...resturantOwner,
        _id: (resturantOwner._id as unknown as ObjectId).toString(),
        created_at: resturantOwner.created_at
          ? new Date(resturantOwner.created_at)
          : undefined,
      })
    );

    return formattedResturantOwnerData;
  } catch (error) {
    console.error("Error fetching resturant owners:", error);
    throw new Error("Failed to fetch resturant owner data");
  }
};
/* Resturant Payload */
// export type ResturantPayload = {
//   restaurantOwnerId: string;
//   restaurantOwnerEmail: string;
//   restaurantOwnerName: string;
//   restaurantName: string;
//   restaurantEmail: string;
//   restaurantNumber: string;
//   restaurantLogo: string;
//   restaurantDescription: string;
//   restaurantAddress: string;
//   ownerIdentification: number;
//   restaurantOpeningDate: Date;
//   foodCategories: string[];
//   restaurantRating: number;
//   totalFoodItem: number;
//   restaurantTotalSell: number;
//   restaurantTotalOrder: number;
//   restaurantCompleteOrder: number;
//   restaurantPendingOrder: number;
// };

/* Create Resturant Collection */
export const createResturant = async (
  payload: CommonPayload
): Promise<void> => {
  const db = await dbConnect();
  const resturantCollection: Collection<CommonPayload> =
    db.collection("resturant");
  await resturantCollection.insertOne({
    restaurantOwnerId: payload.restaurantOwnerId,
    restaurantOwnerEmail: payload.restaurantOwnerEmail,
    restaurantOwnerName: payload.restaurantOwnerName,
    restaurantName: payload.restaurantName,
    restaurantEmail: payload.restaurantEmail,
    restaurantNumber: payload.restaurantNumber,
    restaurantLogo: payload.restaurantLogo,
    restaurantDescription: payload.restaurantDescription,
    restaurantAddress: payload.restaurantAddress,
    ownerIdentification: payload.ownerIdentification,
    restaurantOpeningDate: payload.restaurantOpeningDate,
    foodCategories: payload.foodCategories,
    restaurantRating: payload.restaurantRating,
    totalFoodItem: payload.totalFoodItem,
    restaurantTotalSell: payload.restaurantTotalSell,
    restaurantTotalOrder: payload.restaurantTotalOrder,
    restaurantCompleteOrder: payload.restaurantCompleteOrder,
    restaurantPendingOrder: payload.restaurantPendingOrder,
  });
};

/* Create Rider Collection*/
export type RiderPayload = {
  riderImage?: string;
  riderIdentification?: number;
  riderName?: string;
  riderEmail?: string;
  riderNumber?: number;
  riderAddress?: string;
  vehicleType?: string;
  riderTotalEarning: number;
  riderTotalOrder: number;
  riderTotalCompleteOrder: number;
  riderTotalRating: number;
  riderAvgRating: number;
  riderTotalTransaction: number;
};
/* Create Rider collection */
export const createRider = async (payload: RiderPayload): Promise<void> => {
  const db = await dbConnect();
  const riderCollection: Collection<RiderPayload> = db.collection("rider");
  await riderCollection.insertOne(payload);
};
/* Get specific Rider */
export const getActiveRider = async (
  riderEmail: string
): Promise<RiderPayload | null> => {
  const db = await dbConnect();
  const riderCollection: Collection<RiderPayload> = db.collection("rider");
  const rider = await riderCollection.findOne({ riderEmail });
  console.log(rider);
  return rider ?? null; // Ensures function always returns RiderPayload or null
};

/* Get all rider Application request */
export const getAllRider = async (): Promise<CommonPayload[]> => {
  try {
    const db = await dbConnect();
    const riderCollection: Collection<CommonPayload> = db.collection("beRider");
    const riderData = await riderCollection.find({}).toArray();
    // Convert created_at to Date object
    const formattedRiderData = riderData.map((rider) => ({
      ...rider,
      _id: (rider._id as unknown as ObjectId).toString(),
      created_at: rider.created_at ? new Date(rider.created_at) : undefined,
    }));

    return formattedRiderData;
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

export const getAllFoods = async (
  query?: string,
  category?: string,
  sort?: string
): Promise<FoodItem[]> => {
  const db = await dbConnect();
  const foodCollection: Collection<FoodItem> = db.collection("food");
  let filter: Record<string, unknown> = {};

  if (category === "All Food") {
    filter = {};
  }

  if (category && category !== "All Food") {
    filter.category = category; // নির্দিষ্ট ক্যাটাগরির ফিল্টার
  }

  if (query) {
    filter.foodName = { $regex: query, $options: "i" }; // Case-insensitive search
  }

  const sortOption: Sort = {};

  if (sort === "Ascending") {
    sortOption.price = 1;
  } else if (sort === "Descending") {
    sortOption.price = -1;
  }

  console.log(filter);
  const foodData = await foodCollection.find(filter).sort(sortOption).toArray();

  return foodData.map((food) => ({
    ...food,
    _id: (food._id as unknown as ObjectId).toString(),
  }));
};
