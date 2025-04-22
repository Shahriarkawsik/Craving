"use server";
import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import { Collection } from "mongodb";
// import bcrypt, { decodeBase64 } from "bcryptjs";
import bcrypt from "bcryptjs";

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
  user_email?: string;
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
  // _id?: ObjectId;
  restaurantOwnerId?: string;
  restaurant_id?: string;
  restaurantOwnerEmail?: string;
  owner_email?: string;
  restaurantOwnerName?: string;
  restaurantName?: string;
  restaurantEmail?: string;
  restaurantNumber?: number;
  restaurantDescription?: string;
  restaurantAddress?: string;
  ownerIdentification?: number;
  restaurantOpeningDate?: Date;
  resturantUpdatedDate?: Date;
  foodCategories?: string[];
  totalFoodItem?: number;
  restaurantTotalSell?: number;
  restaurantTotalOrder?: number;
  restaurantCompleteOrder?: number;
  restaurantPendingOrder?: number;
  // food available or not
  isAvailable?: boolean;
  // restaurant information
  ownerName?: string;
  addedDate?: string;
  restaurantLogo?: string;
  restaurantPhone?: number;
  restaurantRating?: number;
  ownerId?: string;
  city?: string;
  restaurantId?: string;
}

// FoodDetails interface use in getAllFood(), getFeaturedFood() - added by Jakaria
export interface FoodDetails {
  food_id: string;
  restaurant_id: string;
  rating: number;
  reviewCount: number;
  foodName: string;
  price: number;
  category: string;
  image: string;
  is_available: boolean;
}

export interface Reviews {
  userName: string;
  userImage: string;
  rating: number;
  review: string;
}

export interface SingleFoodDetails extends FoodDetails {
  description: string;
  reviews: Reviews[];
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

  if (!payload.password) {
    throw new Error("Password is Required");
  }
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  await userCollection.insertOne({
    name: payload.name,
    image: payload.image,
    email: payload.email,
    // password: payload.password,
    password: hashedPassword,
    role: payload.role,
    phone: payload.phone,
    status: payload.status,
    address: payload.address,
    created_at: new Date(),
  });
};

// update user
export const updateUser = async (payload: CommonPayload): Promise<void> => {
  // Connect to the database and update user collection
  const userCollection = await dbConnect().then((db) => db.collection("users"));
  await userCollection.updateOne(
    { email: payload.email },
    {
      $set: {
        name: payload.name,
        image: payload.image,
        phone: payload.phone,
        address: payload.address,
      },
    }
  );
  console.log(payload);
};

// Adding new restaurant information
// export const addRestaurant = async (payload: CommonPayload): Promise<void> => {}

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
    // _id: new ObjectId(user._id),

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

export const updateRestaurant = async (
  payload: CommonPayload,
  email: string
): Promise<{
  acknowledged: boolean;
  matchedCount: number;
  modifiedCount: number;
}> => {
  const db = await dbConnect();
  const foodCollection = db.collection("restaurant");

  const result = await foodCollection.updateOne(
    { restaurantOwnerEmail: email },
    {
      $set: {
        restaurantName: payload.restaurantName,
        ownerName: payload.ownerName,
        restaurantEmail: payload.restaurantEmail,
        restaurantLogo: payload.restaurantLogo,
        restaurantPhone: payload.restaurantPhone,
        restaurantDescription: payload.restaurantDescription,
        restaurantAddress: payload.restaurantAddress,
        resturantUpdatedDate: payload.resturantUpdatedDate,
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

export const showRestaurantByCity = async (
  city: CommonPayload
): Promise<CommonPayload[]> => {
  const db = await dbConnect();
  const restaurantCollection = db.collection("restaurant");
  let query = {};
  if (city.city === "all") {
    query = {};
  } else {
    query = { restaurantAddress: city.city };
  }
  const result = await restaurantCollection.find(query).toArray();
  // console.log("city api", city.city);
  return result.map((restaurant) => ({
    ...restaurant,
    _id: (restaurant._id as unknown as ObjectId).toString(),
  }));
};

export const getFoodByRestaurantId = async (
  restaurantId: CommonPayload
): Promise<FoodItem[]> => {
  const db = await dbConnect();
  const foodCollection = db.collection("food");

  const result = await foodCollection
    .find({ restaurant_id: restaurantId.id })
    .toArray();

  return result.map((food) => ({
    _id: (food._id as ObjectId).toString(),
    restaurant_id: food.restaurant_id,
    foodName: food.foodName,
    description: food.description,
    price: food.price,
    category: food.category,
    image: food.image,
    is_available: food.is_available,
    created_at: food.created_at,
  }));
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
// Post Add donation food from restaurant owner
export const addDonationFood = async (
  payload: CommonPayload
): Promise<void> => {
  const foodDonationCollection = await dbConnect().then((db) =>
    db.collection("donationFood")
  );
  await foodDonationCollection.insertOne({
    title: payload.title,
    description: payload.description,
    image: payload.image,
    location: payload.location,
    restaurantName: payload.restaurantName,
  });
};
//get foodDonation from data base for showFoodDonation page
export const getFoodDonation = async (): Promise<CommonPayload[]> => {
  const foodDonationCollection = await dbConnect().then((db) =>
    db.collection("donationFood")
  );
  const result = await foodDonationCollection.find({}).toArray();
  return result.map((foodDonation) => ({
    _id: (foodDonation._id as unknown as ObjectId).toString(),
    title: foodDonation.title,
    description: foodDonation.description,
    image: foodDonation.image,
    location: foodDonation.location,
    restaurantName: foodDonation.restaurantName,
  }));
};

// get donation data by id for donation cat page 
export const getFoodDonationData = async (query: {id:string}): Promise<CommonPayload[]> => {
  const id = query.id;
  const db = await dbConnect();
  const   foodDonationCollection = db.collection("donationFood");
  const result = await foodDonationCollection.find({
    _id: new ObjectId(id)
  }).toArray(); 
  return result.map((foodDonation) => {
    return ({
    _id: (foodDonation._id as unknown as ObjectId).toString(),
    title: foodDonation.title,
    description: foodDonation.description,
    image: foodDonation.image,
    location: foodDonation.location,
    restaurantName: foodDonation.restaurantName,
  })
  })
}

//get restaurant from data base for showFoodDonation page
export const getRestaurantForDonation = async (query: { email: string }): Promise<CommonPayload[]> => {
  const email = query.email;
  const db = await dbConnect();
  const foodDonationCollection = db.collection("restaurant");

  const result = await foodDonationCollection.find({
    restaurantOwnerEmail: email
  }).toArray();

  return result.map((restaurant) => ({
    _id: (restaurant._id as ObjectId).toString(),
    restaurantName: restaurant.restaurantName,
  }));
};
 
/*create Be Rider application Collection*/
export const createBeRiderApplication = async (
  payload: CommonPayload
): Promise<void> => {
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

// add to cart
export const addToCart = async (payload: CommonPayload): Promise<void> => {
  const cartCollection = await dbConnect().then((db) => db.collection("cart"));
  await cartCollection.insertOne({
    restaurant_id: payload.restaurant_id,
    foodName: payload.foodName,
    description: payload.description,
    price: payload.price,
    category: payload.category,
    image: payload.image,
    is_available: payload.is_available,
    created_at: payload.created_at,
    owner_email: payload.owner_email,
    user_email: payload.user_email,
  });
};


// add to order
// export const addToOrder = async (payload: CommonPayload): Promise<void> => {
//   const orderCollection = await dbConnect().then((db) => db.collection("order"));
//   await orderCollection.insertOne({
//     restaurant_id: payload.restaurant_id,
//     foodName: payload.foodName,
//     description: payload.description,
//     price: payload.price,
//     category: payload.category,
//     image: payload.image,
//     is_available: payload.is_available,
//     created_at: payload.created_at,
//     owner_email: payload.owner_email,
//     user_email: payload.user_email,
//   });
// };



/* Get all rider Application request */
export const getBeRiderApplication = async (): Promise<CommonPayload[]> => {
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
/* Delete Be Rider Application */
export const deleteRiderApplication = async (
  riderId: string
): Promise<void> => {
  const db = await dbConnect();
  const riderCollection = db.collection("beRider");
  
  await riderCollection.deleteOne({
    _id: new ObjectId(riderId),
  });
};
/* Be Resturant Owner Application */
export const createResturantOwnerApplication = async (
  payload: CommonPayload
): Promise<void> => {
  // connect to the database and create add resturant owner collection
  const resturantOwnerCollection = await dbConnect().then((db) =>
    db.collection("beRestaurantOwner")
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
/* Get all resturant owner Application */
export const getRestaurantOwnerApplication = async (): Promise<
  CommonPayload[]
> => {
  try {
    const db = await dbConnect();
    const resturantOwnerCollection: Collection<CommonPayload> =
      db.collection("beRestaurantOwner");
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
/* Delete Be Resturant Owner Application */
export const deleteRestaurantOwnerApplication = async (
  resturantOwnerId: string
): Promise<void> => {
  const db = await dbConnect();
  const resturantOwnerCollection =
    db.collection("beRestaurantOwner");
  await resturantOwnerCollection.deleteOne({
    _id: new ObjectId(resturantOwnerId)
  });
};

/* Create Resturant Collection */
export const createRestaurant = async (
  payload: CommonPayload
): Promise<void> => {
  const db = await dbConnect();
  const resturantCollection: Collection<CommonPayload> =
    db.collection("restaurant");
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
/* Get all Restaurant Data */
export const getRestaurant = async (): Promise<CommonPayload[]> => {
  try {
    const db = await dbConnect();
    const resturantCollection: Collection<CommonPayload> =
      db.collection("restaurant");
    const resturantData = await resturantCollection.find({}).toArray();
    // Ensure all fields are returned exactly as CommonPayload expects
    const formattedResturantData: CommonPayload[] = resturantData.map(
      (resturant) => ({
        _id: (resturant._id as unknown as ObjectId).toString(),
        restaurantOwnerId: resturant.restaurantOwnerId,
        restaurantOwnerEmail: resturant.restaurantOwnerEmail,
        restaurantOwnerName: resturant.restaurantOwnerName,
        restaurantName: resturant.restaurantName,
        restaurantEmail: resturant.restaurantEmail,
        restaurantNumber: resturant.restaurantNumber,
        restaurantLogo: resturant.restaurantLogo,
        restaurantDescription: resturant.restaurantDescription,
        restaurantAddress: resturant.restaurantAddress,
        ownerIdentification: resturant.ownerIdentification,
        restaurantOpeningDate: new Date(resturant.restaurantOpeningDate || 0),
        foodCategories: resturant.foodCategories || [],
        restaurantRating: resturant.restaurantRating || 0,
        totalFoodItem: resturant.totalFoodItem || 0,
        restaurantTotalSell: resturant.restaurantTotalSell || 0,
        restaurantTotalOrder: resturant.restaurantTotalOrder || 0,
        restaurantCompleteOrder: resturant.restaurantCompleteOrder || 0,
        restaurantPendingOrder: resturant.restaurantPendingOrder || 0,
      })
    );
    return formattedResturantData;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return []; // fallback return
  }
};
/* Delete Restaurant */
export const deleteRestaurant = async (id: string): Promise<void> => {
  const db = await dbConnect();
  const restaurantCollection: Collection<CommonPayload> =
    db.collection("restaurant");
  await restaurantCollection.deleteOne({ _id: new ObjectId(id).toString() });
};

// get restaurant specific owner
export const getRestaurantByEmail = async (
  email: string
): Promise<CommonPayload> => {
  const db = await dbConnect();
  const foodCollection = db.collection("resturant");

  const result = await foodCollection.findOne({
    restaurantOwnerEmail: email,
  });

  const formattedFoodData = {
    ...result,
    _id: (result?._id as unknown as ObjectId).toString(),
  };

  return formattedFoodData;
};

/* Create Rider Collection*/
export type RiderPayload = {
  // _id?: string;
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
/* Delete Rider */
export const deleteRider = async (riderId: string): Promise<void> => {
  const db = await dbConnect();
  const riderCollection: Collection<RiderPayload> = db.collection("rider");
  await riderCollection.deleteOne({
    _id: new ObjectId(riderId),
  });
};
/* Get specific Rider */
export const getActiveRider = async (
  riderEmail: string
): Promise<RiderPayload | null> => {
  const db = await dbConnect();
  const riderCollection: Collection<RiderPayload> = db.collection("rider");
  const rider = await riderCollection.findOne({ riderEmail });
  return rider ?? null;
};

/* Get All Rider */
export const getAllRider = async (): Promise<RiderPayload[]> => {
  const db = await dbConnect();
  const riderCollection: Collection<RiderPayload> = db.collection("rider");
  const riderData = await riderCollection.find({}).toArray();
  return riderData;
};

export interface FoodItem {
  _id?: string;
  id?: string;
  restaurant_id?: string;
  foodName?: string;
  description: string;
  price: number;
  category: string;
  image: string;
  is_available?: boolean;
  created_at?: string;
  owner_email?: string;
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

// get food details dynamically
export const getFoodDetails = async (id: string): Promise<FoodItem | null> => {
  const db = await dbConnect();
  const foodCollection: Collection<FoodItem> = db.collection("food");

  const foodDetails = await foodCollection.findOne({
    // _id: new ObjectId(id)
    _id: (id as unknown as ObjectId).toString(),
  });

  if (!foodDetails) return null;

  const serializedFood = {
    ...foodDetails,
    _id: foodDetails._id.toString(),
    created_at: foodDetails.created_at?.toString(),
  };

  return serializedFood as FoodItem;
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

//update food
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

  return result;
};

// signle food get by food id - added by Jakaria
export const getSingleFood = async (id: string) => {
  const db = await dbConnect();
  const foodCollection = db.collection("food");

  const foodItem = await foodCollection.findOne({ _id: new ObjectId(id) });

  return foodItem;
};

export const getOrderCartByEmail = async (email: string) => {
  const db = await dbConnect();
  const cartCollection = db.collection("cart");

  const cartItems = await cartCollection.find({ user_email: email }).toArray();

  return cartItems.map((item) => ({
    _id: item._id.toString(),
    restaurant_id: item.restaurant_id?.toString() || null,
    foodName: item.foodName || "",
    description: item.description || "",
    price: item.price || 0,
    category: item.category || "",
    image: item.image || "",
    is_available: item.is_available ?? true,
    created_at: item.created_at ? new Date(item.created_at) : null,
    owner_email: item.owner_email ?? null,
    user_email: item.user_email || "",
  }));
};



// Delete Cart Item
export const deleteCartItem = async (
  payload: CommonPayload
): Promise<{ acknowledged: boolean; deletedCount: number }> => {
  try {
    const db = await dbConnect();
    const cartCollection = db.collection("cart");
    console.log(payload);
    const result = await cartCollection.deleteOne({
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

// aggregate food and reveiw collection and find 8 collection based on max rating but min price (For featured food section) - added by Jakaria
export const getFeaturedFood = async (): Promise<FoodDetails[]> => {
  const db = await dbConnect();
  const reviewCollection = db.collection("reviews");

  const featuredFoods = await reviewCollection
    .aggregate<FoodDetails>([
      {
        $addFields: {
          food_id: { $toObjectId: "$food_id" },
        },
      },
      {
        $group: {
          _id: "$food_id",
          avgRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "food",
          localField: "_id",
          foreignField: "_id",
          as: "food_details",
        },
      },
      {
        $unwind: "$food_details",
      },
      {
        $match: {
          "food_details.is_available": true,
        },
      },
      {
        $project: {
          food_id: { $toString: "$_id" },
          restaurant_id: "$food_details.restaurant_id",
          rating: { $round: ["$avgRating", 1] },
          reviewCount: 1,
          foodName: "$food_details.foodName",
          price: "$food_details.price",
          category: "$food_details.category",
          image: "$food_details.image",
          is_available: "$food_details.is_available",
        },
      },
      {
        $sort: {
          rating: -1,
          price: 1,
        },
      },
      {
        $limit: 8,
      },
    ])
    .toArray();

  return featuredFoods.map((item) => ({
    food_id: item.food_id,
    restaurant_id: item.restaurant_id,
    rating: item.rating,
    reviewCount: item.reviewCount,
    foodName: item.foodName,
    price: item.price,
    category: item.category,
    image: item.image,
    is_available: item.is_available,
  }));
};

// aggregate food and review collection and find all data. Also add category base data find. It use in allFood page - added by Mahbub modified by jakaria
export const getAllFoods = async (
  query?: string,
  category?: string,
  sort?: string
): Promise<FoodDetails[]> => {
  const db = await dbConnect();
  const foodCollection: Collection = db.collection("food");

  const matchStage: Record<string, unknown> = {};

  if (category && category !== "All Food") {
    matchStage.category = category;
  }

  if (query) {
    matchStage.foodName = { $regex: query, $options: "i" };
  }

  const sortStage: Record<string, 1 | -1> = {};
  if (sort === "Ascending") {
    sortStage.price = 1;
  } else if (sort === "Descending") {
    sortStage.price = -1;
  }

  const foods = await foodCollection
    .aggregate<FoodDetails>([
      { $match: matchStage },
      {
        $lookup: {
          from: "reviews",
          let: { foodIdStr: { $toString: "$_id" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$food_id", "$$foodIdStr"] },
              },
            },
          ],
          as: "review_data",
        },
      },
      {
        $addFields: {
          rating: { $ifNull: [{ $avg: "$review_data.rating" }, 0] },
          reviewCount: { $size: "$review_data" },
          food_id: { $toString: "$_id" },
        },
      },
      {
        $project: {
          _id: 0,
          food_id: 1,
          restaurant_id: 1,
          rating: 1,
          reviewCount: 1,
          foodName: 1,
          price: 1,
          category: 1,
          image: 1,
          is_available: 1,
        },
      },
      { $sort: Object.keys(sortStage).length ? sortStage : { foodName: 1 } },
    ])
    .toArray();

  return foods;
};

// signle food details find
export const getSingleFoodDetails = async (
  foodId: string
): Promise<SingleFoodDetails | null> => {
  const db = await dbConnect();
  const foodCollection: Collection = db.collection("food");

  const result = await foodCollection
    .aggregate([
      {
        $match: { _id: new ObjectId(foodId) },
      },
      {
        $lookup: {
          from: "reviews",
          let: { foodIdStr: { $toString: "$_id" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$food_id", "$$foodIdStr"] },
              },
            },
            {
              $lookup: {
                from: "users",
                let: { userIdObj: { $toObjectId: "$user_id" } },
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ["$_id", "$$userIdObj"] },
                    },
                  },
                  {
                    $project: {
                      _id: 0,
                      name: 1,
                      image: 1,
                    },
                  },
                ],
                as: "user",
              },
            },
            {
              $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                _id: 0,
                rating: 1,
                review: 1,
                userName: "$user.name",
                userImage: "$user.image",
              },
            },
          ],
          as: "reviews",
        },
      },
      {
        $addFields: {
          averageRating: { $avg: "$reviews.rating" },
          reviewCount: {
            $size: {
              $filter: {
                input: "$reviews",
                as: "r",
                cond: { $ifNull: ["$$r.rating", false] },
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          food_id: { $toString: "$_id" },
          foodName: 1,
          description: 1,
          price: 1,
          category: 1,
          image: 1,
          is_available: 1,
          restaurant_id: 1,
          rating: { $round: ["$averageRating", 1] },
          reviewCount: 1,
          reviews: 1,
        },
      },
    ])
    .toArray();

  const data = result[0];
  if (!data) return null;

  return {
    food_id: data.food_id,
    restaurant_id: data.restaurant_id,
    rating: data.rating,
    reviewCount: data.reviewCount,
    foodName: data.foodName,
    price: data.price,
    category: data.category,
    image: data.image || null,
    is_available: data.is_available,
    description: data.description,
    reviews: (data.reviews || []).map((review: Reviews) => ({
      userName: review.userName || "Anonymous",
      userImage: review.userImage || null,
      rating: review.rating,
      review: review.review,
    })),
  };
};
