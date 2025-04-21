"use client";

import React, { useEffect, useState } from "react";
import bannerImage from "@/assets/bannerImg/aboutBanner1.jpg";
import Banner from "@/components/shared/Banner";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaRegStar, FaStar } from "react-icons/fa6";
import {
  addToCart,
  getSingleFoodDetails,
  Reviews,
  SingleFoodDetails,
} from "@/app/action/auth/allApi";
import Image from "next/image";
import { FaShoppingCart, FaStarHalfAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { CartFood } from "@/components/shared/FoodCard";

const FoodDetails = () => {
  const params = useParams();
  const foodId = params?.id as string;

  const { data } = useSession();
  const router = useRouter();

  const [food, setFood] = useState<SingleFoodDetails | null>(null);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      if (!foodId) return;
      const data = await getSingleFoodDetails(foodId);
      setFood(data);
    };

    fetchFoodDetails();
  }, [foodId]);

  if (!food) {
    return (
      <div className="w-11/12 mx-auto my-20 text-center text-lg font-semibold">
        Loading food details...
      </div>
    );
  }

  // handle add to cart
  const { reviews, ...updatedFood } = food;
  console.log(reviews);
  const cartFood: CartFood = {
    ...updatedFood,
    user_email: data?.user?.email,
    created_at: new Date(),
  };
  const handleAddToCart = () => {
    if (data?.user.email) {
      addToCart(cartFood);
      toast.success("Food added in the cart.");
    } else {
      router.push("/signIn");
    }
  };

  return (
    <div>
      {/* Banner section */}
      <Banner
        image={bannerImage.src}
        title={food.foodName}
        subtitle={`Crafted with Passion and Taste`}
      />

      {/* Back link */}
      <div className="w-10/12 lg:w-8/12 mx-auto mt-10">
        <Link
          href={`/allFood`}
          className="flex items-center gap-x-1 hover:text-orange-500 w-fit"
        >
          <FaArrowLeft />
          <span>All Food</span>
        </Link>
      </div>

      {/* Food Details */}
      <div className="w-10/12 lg:w-8/12 mx-auto my-10">
        <div className="flex flex-col md:flex-row items-center md:items-start md:gap-8">
          <Image
            src={food.image}
            alt={food.foodName}
            width={300}
            height={300}
            className="md:basis-1/3 h-72 object-cover rounded-xl mb-6"
          />
          <div className="md:basis-2/3 md:h-72 flex flex-col items-start">
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-1">{food.foodName}</h2>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) =>
                  index < Math.floor(food.rating) ? (
                    <FaStar key={index} className="text-yellow-500 mr-1" />
                  ) : index < Math.floor(food.rating) + 1 &&
                    food.rating % 1 >= 0.5 ? (
                    <FaStarHalfAlt
                      key={index}
                      className="text-yellow-500 mr-1"
                    />
                  ) : (
                    <FaRegStar key={index} className="text-gray-300 mr-1" />
                  )
                )}
                <span className="ml-2 text-sm">({food.rating | 0})</span>
              </div>

              <p className="text-md text-gray-700 my-2 text-justify">
                {food.description}
              </p>
              <p className="text-md text-gray-700">
                <span className="font-semibold">Category:</span> {food.category}
              </p>
              <p className="text-md text-gray-700">
                <span className="font-semibold">Price:</span> {food.price} BDT
              </p>
            </div>

            <div className="w-full flex justify-between gap-5 mt-5">
              <button
                onClick={handleAddToCart}
                disabled={!food.is_available}
                className={`${
                  food.is_available
                    ? "cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                } w-full text-white bg-orange-500 hover:bg-orange-600 flex items-center justify-center space-x-1 py-2 px-2 sm:px-4 rounded-sm shadow-md transition-colors duration-300`}
              >
                <FaShoppingCart size={20} />
                <span className="ml-1">
                  {food.is_available ? "Add To Cart" : "Out Of Stock"}
                </span>
              </button>

              <Link href={`/cart`} className="w-full">
                <button className="w-full text-orange-950 hover:text-white transition-all border border-orange-400 hover:bg-orange-500 flex items-center justify-center space-x-1 py-2 px-4 rounded-sm shadow-md duration-300 cursor-pointer">
                  Order Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">
            User Reviews ({food.reviewCount})
          </h3>
          {food.reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {food.reviews.map((review: Reviews, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center gap-x-3 mb-2">
                    <Image
                      src={review.userImage}
                      alt={review.userName}
                      width={300}
                      height={300}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{review.userName}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, index) =>
                          index < Math.floor(review.rating) ? (
                            <FaStar
                              key={index}
                              className="text-yellow-500 mr-1"
                            />
                          ) : index < Math.floor(review.rating) + 1 &&
                            review.rating % 1 >= 0.5 ? (
                            <FaStarHalfAlt
                              key={index}
                              className="text-yellow-500 mr-1"
                            />
                          ) : (
                            <FaRegStar
                              key={index}
                              className="text-gray-300 mr-1"
                            />
                          )
                        )}
                        <span className="ml-2 text-sm">({review.rating})</span>
                      </div>
                    </div>
                  </div>
                  <p>{review.review}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
