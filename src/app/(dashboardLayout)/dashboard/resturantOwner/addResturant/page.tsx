"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { FormEvent } from "react";
// import { addResturant } from "../../../../action/auth/allApi";
// import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { addRestaurant } from "@/app/action/auth/allApi";
import { Slide, toast } from "react-toastify";

const AddResturant = () => {

  type Inputs = {
    restaurantName: string,
    location: string,
    ownerName: string,
    restaurantEmail: string,
    restaurantLogo: string,
    restaurantPhone: number,
  }

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // adding submit date
    const addedDate = new Date().toISOString();
    // adding rating field
    const restaurantRating = 0;
    // adding owner object ID
    const ownerId = "abc123";
    // restaurant data for database
    const restaurantData = { ...data, addedDate, restaurantRating, ownerId };

    try {
      addRestaurant(restaurantData);
      toast.success("Resturant Added Successfully!", {
        position: "top-center",
        transition: Slide
      });
    }
    catch (error) {
      toast.error("Something went wrong!", {
        position: "top-center",
        transition: Slide
      });
      console.log("ERROR:", error);
    }
  }




  return (
    <div className="w-10/12 mx-auto">
      <h3 className="text-center mb-7 text-2xl md:text-3xl font-bold">
        Add Resturant
      </h3>
      <div className="px-5 lg:px-10 py-10 bg-gray-50 shadow-md rounded-3xl">
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Restaurant Name and location */}
          <div className="lg:flex gap-7 mb-5">
            <div className="w-full">
              <label className="text-gray-700 font-bold" htmlFor="restaurantName">
                Restaurant Name
              </label>
              <Input type="text" {...register('restaurantName', { required: true })} id="restaurantName" placeholder="Food & Fun" />
              {
                errors.restaurantName && <p className="text-red-500 text-xs italic">Please enter Restaurant name</p>
              }
            </div>
            <div className="w-full">
              <label className="text-gray-700 font-bold" htmlFor="location">
                Location
              </label>
              <Input type="text" {...register('location', { required: true })} id="location" placeholder="2/A Emperor Building, Gulshan-1" />
              {
                errors.location && <p className="text-red-500 text-xs italic">Please enter restaurant location</p>
              }
            </div>
          </div>

          {/* Owner name and restaurant email */}
          <div className="lg:flex gap-7 mb-5">
            <div className="w-full">
              <label className="text-gray-700 font-bold" htmlFor="ownerName">
                Owner Name
              </label>
              <Input type="text" {...register('ownerName', { required: true })} id="ownerName" placeholder="John Doe" />
              {
                errors.location && <p className="text-red-500 text-xs italic">Please enter owner name</p>
              }
            </div>
            <div className="w-full">
              <label className="text-gray-700 font-bold" htmlFor="restaurantEmail">
                Email
              </label>
              <Input type="email" {...register('restaurantEmail', { required: true })} id="restaurantEmail" placeholder="example@gmail.com" />
              {
                errors.restaurantEmail && <p className="text-red-500 text-xs italic">Please enter restaurant email</p>
              }
            </div>
          </div>

          {/* Restaurant logo and phone number */}
          <div className="lg:flex gap-7 mb-5">
            <div className="w-full">
              <label className="text-gray-700 font-bold" htmlFor="restaurantPhone">
                Phone Number
              </label>
              <Input type="number" {...register('restaurantPhone', { required: true })} id="restaurantPhone" placeholder="01xxxxxxxx" />
              {
                errors.restaurantPhone && <p className="text-red-500 text-xs italic">Please enter restaurant phone number</p>
              }
            </div>
            <div className="w-full">
              <label className="text-gray-700 font-bold" htmlFor="restaurantLogo">
                Logo
              </label>
              <Input type="url" {...register('restaurantLogo', { required: true })} id="restaurantLogo" placeholder="https://example.com" />
              {
                errors.restaurantLogo && <p className="text-red-500 text-xs italic">Please enter restaurant logo link</p>
              }
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button type="submit" variant="outline">Add Restaurant</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResturant;
