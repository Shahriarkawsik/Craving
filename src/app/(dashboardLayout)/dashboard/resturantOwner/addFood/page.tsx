"use client";
import React from "react";
import BGImg from "@/assets/addFoodBG.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { addFood } from "@/app/action/auth/allApi";
import { toast } from "react-toastify";

const AddFood = () => {
  type Inputs = {
    // restaurant_id: string;
    id: string;
    foodName: string;
    description: string;
    price: number;
    category: string;
    foodImage: string;
    is_available: boolean;
    created_at: Date;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const allData = { ...data, created_at: new Date(), is_available: true };
    try {
      await addFood(allData);
      toast.success("Food Added Successfully!");
      reset();
    } catch (error) {
      toast.error("Something went wrong!" + error);
    }
  };

  return (
    <section
      style={{
        backgroundImage: `url(${BGImg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
     
      }}
      // className="min-h-screen w-full border-2 border-red-500"
    >
      <div className="w-11/12 lg:w-9/12 mx-auto py-8 sm:py-12">
        {/* Page Title */}
        <h1 className="  text-xl  lg:text-3xl    leading-tight  font-semibold text-center mb-6">
          Add New Food
        </h1>

        {/* Form Container */}

        <div className="m-4 sm:m-8 lg:m-12 bg-amber-100/50  max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 shadow-2xl rounded-3xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 grid lg:grid-cols-2 gap-5"
          >
            <div className="space-y-3 col-span-2 lg:col-span-1">
              {/* Food Name */}
              <label className="font-semibold  ">
                Food Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Type here..."
                className="w-full input bg-gray-100  rounded-md p-2"
                {...register("foodName", { required: true })}
                required
              />
              {errors.foodName && (
                <span className="text-red-600 text-sm">
                  Food Name is required
                </span>
              )}
            </div>
            {/* Food Description */}
            <div className="space-y-3 col-span-2 lg:col-span-1">
              <label className="font-semibold ">
                Food Description<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="w-full input bg-gray-100  rounded-md p-2 "
                placeholder="Type here..."
                {...register("description", { required: true })}
                required
              />
              {errors.description && (
                <span className="text-red-600 text-sm">
                  Food Description is required
                </span>
              )}
            </div>

            {/* Price */}
            <div className="space-y-3 col-span-2 lg:col-span-1">
              <label className="font-semibold">
                Price<span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                className="w-full input bg-gray-100 rounded-md p-2 "
                placeholder="Type here..."
                {...register("price", { required: true })}
                required
              />
              {errors.price && (
                <span className="text-red-600 text-sm">Price is required</span>
              )}
            </div>

            {/* Category */}
            <div className="space-y-3 col-span-2 lg:col-span-1">
              <label className="font-semibold">
                Category<span className="text-red-600">*</span>
              </label>
              <input
                type=""
                className="w-full input bg-gray-100  rounded-md p-2 "
                placeholder="Type here..."
                {...register("category", { required: true })}
                required
              />
              {errors.category && (
                <span className="text-red-600 text-sm">
                  Category is required
                </span>
              )}
            </div>

            {/* Food Image URL */}
            <div className="space-y-3  col-span-2 ">
              <label className="fieldset-label  font-semibold leading-6">
                Image file
              </label>
              <input
                // type="file"
                type="url"
                className="w-full cursor-pointer  input bg-gray-100  rounded-md p-2 "
                placeholder="Type here..."
                {...register("foodImage", { required: true })}
                required
              />
              {errors.foodImage && (
                <span className="text-red-600 text-sm">
                  Food Image URL is required
                </span>
              )}
            </div>

            <input
              type="submit"
              value={"Add Food"}
              className="bg-orange-400 hover:bg-orange-300 text-white font-semibold rounded-lg py-2 px-4 col-span-1 sm:col-span-2"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddFood;
