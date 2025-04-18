"use client";
import { addDonationFood } from "@/app/action/auth/allApi";
import BGImg from "@/assets/addFoodBG.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import axios from 'axios';

const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddFood = () => {
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const imageFile = {image: data.image[0]}
    const res = await axios.post(image_hosting_api, imageFile, {

      headers: {
        "Content-Type" : "multipart/form-data"
      }
    })
    if(res.data.success){
      //now send the food donation data to the server with the image url
      const foodData = {
        title: data.title,
        description: data.description,
        image: res.data.data.display_url,
        location: data.location,
        restaurantName: "default"
      }
      try {
      await addDonationFood(foodData)
        toast.success("Food Donation Added Successfully!");
        reset();
      } catch (error) {
        toast.error("Something went wrong!" + error);
      }
    }
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
        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-5xl leading-tight  font-semibold text-center mb-6">
          Add Donation Food
        </h1>

        {/* Form Container */}
        <div className="m-4 sm:m-8 lg:m-12 bg-white max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 shadow-2xl rounded-3xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4"
          >
            <div className="space-y-3">
              {/* Food Name */}
              <label className="font-semibold text-sm sm:text-base lg:text-lg">
                Title*
              </label>
              <input
                type="text"
                placeholder="Type here..."
                className="w-full input bg-gray-100 text-sm sm:text-base lg:text-lg rounded-md p-2 sm:p-3"
                {...register("title", { required: true })}
                required
              />
              {errors.title && (
                <span className="text-red-600 text-sm">
                  Title is required
                </span>
              )}
            </div>
            {/* Food Description */}
            <div className="space-y-3">
              <label className="font-semibold text-sm sm:text-base lg:text-lg">
                description*
              </label>
              <input
                type="text"
                className="w-full input bg-gray-100 text-sm sm:text-base lg:text-lg rounded-md p-2 sm:p-3"
                placeholder="Type here..."
                {...register("description", { required: true })}
                required
              />
              {errors.description && (
                <span className="text-red-600 text-sm">
                  Description is required
                </span>
              )}
            </div>

            {/* Price */}
            <div className="space-y-3">
              <label className="font-semibold text-sm sm:text-base lg:text-lg">
                Image*
              </label>
              <input
                type="file"
                className="w-full input bg-gray-100 text-sm sm:text-base lg:text-lg rounded-md p-2 sm:p-3"
                placeholder="Type here..."
                {...register("image", { required: true })}
                required
              />
              {errors.image && (
                <span className="text-red-600 text-sm">Food Image is required</span>
              )}
            </div>

            {/* Category */}
            <div className="space-y-3">
              <label className="font-semibold text-sm sm:text-base lg:text-lg">
                Location*
              </label>
              <input
                type=""
                className="w-full input bg-gray-100 text-sm sm:text-base lg:text-lg rounded-md p-2 sm:p-3"
                placeholder="Type here..."
                {...register("location", { required: true })}
                required
              />
              {errors.location && (
                <span className="text-red-600 text-sm">
                  Location is required
                </span>
              )}
            </div>

            {/* Food Image URL */}
            <div className="space-y-3">
              <label className="fieldset-label font-Inter font-semibold text-xl leading-6">
                Restaurant Name*
              </label>
              <input
                // type="file"
                type="text"
                className="w-full input bg-gray-100 text-sm sm:text-base lg:text-lg rounded-md p-2 sm:p-3"
                placeholder="Type here..."
                defaultValue={"default"}
                disabled
              />
            </div>

            <input
              type="submit"
              value={"Add Food"}
              className="bg-orange-400 hover:bg-orange-300 text-white text-lg font-bold rounded-lg py-2 px-4 col-span-1 sm:col-span-2"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddFood;
