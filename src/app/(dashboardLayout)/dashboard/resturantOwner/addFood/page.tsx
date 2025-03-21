"use client";
import Link from "next/link";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import BGImg from "@/assets/addFoodBG.png";
import { useForm, SubmitHandler } from "react-hook-form";

const AddFood = () => {
  type Inputs = {
    foodName: string;
    description: string;
    price: number;
    category: string;
    image: string;
    is_available: boolean;
    created_at: Date;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <section
      style={{
        backgroundImage: `url(${BGImg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen"
    >
      <div className="w-11/12 lg:w-9/12 mx-auto font-Poppins py-8 sm:py-12">
        {/* Back to home */}
        <Link href="/" className="flex items-center gap-3 mb-8">
          <FaArrowLeftLong className="text-lg sm:text-xl" />
          <p className="font-Rancho text-xl sm:text-2xl lg:text-3xl text-color6">
            Back to home
          </p>
        </Link>

        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-5xl leading-tight  font-semibold text-center mb-6">
          Add New Food
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
                Food Name*
              </label>
              <input
                type="text"
                placeholder="Type here..."
                className="w-full input bg-gray-100 text-sm sm:text-base lg:text-lg rounded-md p-2 sm:p-3"
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
            <div className="space-y-3">
              <label className="font-semibold text-sm sm:text-base lg:text-lg">
                Food Description*
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
                  Food Description is required
                </span>
              )}
            </div>

            {/* Price */}
            <div className="space-y-3">
              <label className="font-semibold text-sm sm:text-base lg:text-lg">
                Price*
              </label>
              <input
                type="number"
                className="w-full input bg-gray-100 text-sm sm:text-base lg:text-lg rounded-md p-2 sm:p-3"
                placeholder="Type here..."
                {...register("price", { required: true })}
                required
              />
              {errors.price && (
                <span className="text-red-600 text-sm">Price is required</span>
              )}
            </div>

            {/* Category */}
            <div className="space-y-3">
              <label className="font-semibold text-sm sm:text-base lg:text-lg">
                Category*
              </label>
              <input
                type="number"
                className="w-full input bg-gray-100 text-sm sm:text-base lg:text-lg rounded-md p-2 sm:p-3"
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
            <div className="space-y-3">
              <label className="fieldset-label font-Inter font-semibold text-xl leading-6">
                Image file*
              </label>
              <input
                // type="file"
                type="url"
                className="w-full input bg-gray-100 text-sm sm:text-base lg:text-lg rounded-md p-2 sm:p-3"
                placeholder="Type here..."
                {...register("image", { required: true })}
                required
              />
              {errors.image && (
                <span className="text-red-600 text-sm">
                  Food Image URL is required
                </span>
              )}
            </div>

            <input
              type="submit"
              value={"Add Task"}
              className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold rounded-lg py-2 px-4 col-span-1 sm:col-span-2"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddFood;
