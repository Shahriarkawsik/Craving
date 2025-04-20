"use client";
import {
  addDonationFood,
  getRestaurantForDonation,
  CommonPayload,
} from "@/app/action/auth/allApi";
import BGImg from "@/assets/addFoodBG.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
// import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

interface FormData {
  restaurantName: string;
}
const AddFood = () => {
  const [getRestaurant, setGetRestaurant] = useState<CommonPayload[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const { data: session } = useSession();
  //get restaurant from data base
  useEffect(() => {
    const fetchDonationsRestaurant = async () => {
      try {
        if (session?.user?.email) {
          const restaurantData = await getRestaurantForDonation({
            email: session.user.email,
          });
          setGetRestaurant(restaurantData as FormData[]);
        }
      } catch (error) {
        console.error("Something went wrong", error);
      }
    };

    fetchDonationsRestaurant();
  }, [session]);

  console.log(getRestaurant[0]?.restaurantName);

  type Inputs = {
    id: string;
    title: string;
    description: string;
    image: string;
    location: string;
    restaurantName: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "first_time-using_cloudinary");
  
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dprd5ohlg/image/upload", {
        method: "POST",
        body: data
      });
  
      const uploadedImageUrl = await res.json();
      setImage(uploadedImageUrl?.url);
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // const imageFile = { image: data.image[0] };
    // const res = await axios.post(image_hosting_api, imageFile, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    // if (res.data.success) {
      //now send the food donation data to the server with the image url
      const foodData = {
        title: data.title,
        description: data.description,
        image: image as string,
        location: data.location,
        restaurantName: getRestaurant[0].restaurantName,
      };
      try {
        await addDonationFood(foodData);
        toast.success("Food Donation Added Successfully!");
        reset();
      } catch (error) {
        toast.error("Something went wrong!" + error);
      }
    // }
  };

  return (
    <section
    style={{
      backgroundImage: `url(${BGImg.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="w-11/12 lg:w-9/12 mx-auto py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl lg:text-5xl leading-tight font-semibold text-center mb-6">
        Add Donation Food
      </h1>

      <div className="m-4 sm:m-8 lg:m-12 bg-white max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 shadow-2xl rounded-3xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4"
        >
          <div className="space-y-3">
            <label className="font-semibold text-sm sm:text-base lg:text-lg">Title*</label>
            <input
              type="text"
              placeholder="Type here..."
              className="w-full input bg-gray-100 rounded-md p-2"
              {...register("title", { required: true })}
            />
            {errors.title && <span className="text-red-600 text-sm">Title is required</span>}
          </div>

          <div className="space-y-3">
            <label className="font-semibold text-sm sm:text-base lg:text-lg">Description*</label>
            <input
              type="text"
              className="w-full input bg-gray-100 rounded-md p-2"
              placeholder="Type here..."
              {...register("description", { required: true })}
            />
            {errors.description && <span className="text-red-600 text-sm">Description is required</span>}
          </div>

          <div className="space-y-3">
            <label className="font-semibold text-sm sm:text-base lg:text-lg">Image*</label>
            <input
              type="file"
              className="w-full input bg-gray-100 rounded-md p-2"
              onChange={handleImageChange}
            />
            {!image && <span className="text-red-600 text-sm">Image is required</span>}
          </div>

          <div className="space-y-3">
            <label className="font-semibold text-sm sm:text-base lg:text-lg">Location*</label>
            <input
              type="text"
              className="w-full input bg-gray-100 rounded-md p-2"
              placeholder="Type here..."
              {...register("location", { required: true })}
            />
            {errors.location && <span className="text-red-600 text-sm">Location is required</span>}
          </div>

          <div className="space-y-3">
            <label className="font-semibold text-sm sm:text-base lg:text-lg">Restaurant Name*</label>
            <input
              type="text"
              className="w-full input bg-gray-100 rounded-md p-2"
              placeholder="Type here..."
              defaultValue={getRestaurant[0]?.restaurantName}
              disabled
            />
          </div>

          <input
            type="submit"
            value="Add Food"
            className="bg-orange-400 hover:bg-orange-300 text-white text-lg font-bold rounded-lg py-2 px-4 col-span-1 sm:col-span-2"
          />
        </form>
      </div>
    </div>
  </section>
);
};

export default AddFood;
