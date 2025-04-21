"use client";
import {
  addDonationFood,
  getRestaurantForDonation,
  CommonPayload,
} from "@/app/action/auth/allApi";
import BGImg from "@/assets/addFoodBG.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/authentications/loadingSpinner/LoadingSpinner";

interface FormData {
  restaurantName: string;
}
const AddFood = () => {
  const [loading, setLoading] = useState(false);
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

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "first_time-using_cloudinary");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dprd5ohlg/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploadedImageUrl = await res.json();
      setImage(uploadedImageUrl?.url);
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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
        <h1 className="  text-xl  lg:text-3xl    leading-tight  font-semibold text-center mb-6">
          Add Donation Campaign
        </h1>

        <div className="m-4 sm:m-8 lg:m-12 bg-amber-100/50  max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 shadow-2xl rounded-3xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6  ">
            <div className="space-y-3">
              <label className="font-semibold  ">
                Title<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Type here..."
                className="w-full input bg-gray-100  rounded-md p-2"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-red-600 italic text-sm">
                  Title is required
                </span>
              )}
            </div>
            <div className="space-y-3 grid grid-cols-2  gap-4">
              <div className="space-y-3">
                <label className="font-semibold  ">
                  Image<span className="text-red-600">*</span>
                </label>
                <input
                  type="file"
                  className="w-full input bg-gray-100  rounded-md p-2"
                  onChange={handleImageChange}
                />
                {!image && (
                  <span className="text-red-600 italic text-sm">
                    Image is required
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <label className="font-semibold  ">
                  Location<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  className="w-full input bg-gray-100  rounded-md p-2"
                  placeholder="Type here..."
                  {...register("location", { required: true })}
                />
                {errors.location && (
                  <span className="text-red-600 italic text-sm">
                    Location is required
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-3">
              <label className="font-semibold  ">
                Description<span className="text-red-600">*</span>
              </label>
              <textarea
                className="w-full input bg-gray-100  rounded-md p-2"
                placeholder="Type here..."
                {...register("description", { required: true })}
              />
              {errors.description && (
                <span className="text-red-600 italic text-sm">
                  Description is required
                </span>
              )}
            </div>
            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-400 hover:bg-orange-300 text-white text-lg font-bold rounded-lg py-2 px-4 col-span-1 sm:col-span-2 flex items-center justify-center gap-2"
              >
                {loading ? <LoadingSpinner /> : "Add Campaign"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddFood;
