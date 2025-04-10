"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { FormEvent } from "react";
// import { addResturant } from "../../../../action/auth/allApi";
// import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { Slide, toast } from "react-toastify";
import { updateRestaurant } from "@/app/action/auth/allApi";
import { useSession } from 'next-auth/react';

const AddResturant = () => {

    const {data: session} = useSession()
    
  type Inputs = {
    restaurantName: string;
    location: string;
    ownerName: string;
    restaurantEmail: string;
    restaurantLogo: string;
    restaurantPhone: number;
    restaurantDescription: string;
    restaurantAddress: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // adding submit date
    const resturantUpdatedDate = new Date().toISOString();
    // restaurant data for database
    const restaurantData = { ...data, resturantUpdatedDate};
    // console.log(restaurantData)
    try {
      const data = await updateRestaurant(restaurantData, session?.user?.email as string);
      console.log(data)
      if(data.modifiedCount > 0){
        toast.success("Resturant Updated Successfully!", {
          position: "top-center",
          transition: Slide,
        });
      }else{
        toast.error("Resturant Update unsuccessful!", {
          position: "top-center",
          transition: Slide,
        });
      }
      
    } catch (error) {
      toast.error(`Something went wrong! ${error}`, {
        position: "top-center",
        transition: Slide,
      });
      // console.log("ERROR:", error);
    }
    // console.log(session)
  };

  return (
    <div className="w-8/12 mx-auto">
      <h3 className="text-center mb-5 text-2xl md:text-3xl font-semibold">
        Update Resturant
      </h3>
      <div className="px-5 lg:px-8 py-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Restaurant Name and location */}
          <div className="lg:flex gap-3 mb-3">
            <div className="w-full">
              <label className="text-gray-700 " htmlFor="restaurantName">
                Restaurant Name
              </label>
              <Input
                type="text"
                {...register("restaurantName", { required: true })}
                id="restaurantName"
                placeholder="Food & Fun"
              />
              {errors.restaurantName && (
                <p className="text-red-500 text-xs italic">
                  Please enter Restaurant name
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="text-gray-700 " htmlFor="location">
                Location
              </label>
              <Input
                type="text"
                {...register("location", { required: true })}
                id="location"
                placeholder="2/A Emperor Building, Gulshan-1"
              />
              {errors.location && (
                <p className="text-red-500 text-xs italic">
                  Please enter restaurant location
                </p>
              )}
            </div>
          </div>

          {/* Owner name and restaurant email */}
          <div className="lg:flex gap-3 mb-3">
            <div className="w-full">
              <label className="text-gray-700 " htmlFor="ownerName">
                Owner Name
              </label>
              <Input
                type="text"
                {...register("ownerName", { required: true })}
                id="ownerName"
                placeholder="John Doe"
              />
              {errors.location && (
                <p className="text-red-500 text-xs italic">
                  Please enter owner name
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="text-gray-700 " htmlFor="restaurantEmail">
                Restaurant Email
              </label>
              <Input
                type="email"
                {...register("restaurantEmail", { required: true })}
                id="restaurantEmail"
                placeholder="example@gmail.com"
              />
              {errors.restaurantEmail && (
                <p className="text-red-500 text-xs italic">
                  Please enter restaurant email
                </p>
              )}
            </div>
          </div>

          {/* Restaurant logo and phone number */}
          <div className="lg:flex gap-3 mb-3">
            <div className="w-full">
              <label className="text-gray-700 " htmlFor="restaurantPhone">
                Restaurant Number
              </label>
              <Input
                type="number"
                {...register("restaurantPhone", { required: true })}
                id="restaurantPhone"
                placeholder="01xxxxxxxx"
              />
              {errors.restaurantPhone && (
                <p className="text-red-500 text-xs italic">
                  Please enter restaurant phone number
                </p>
              )}
            </div>

            <div className="w-full">
              <label className="text-gray-700 " htmlFor="restaurantLogo">
                Restaurant Logo
              </label>
              <Input
                type="url"
                {...register("restaurantLogo", { required: true })}
                id="restaurantLogo"
                placeholder="https://example.com"
              />
              {errors.restaurantLogo && (
                <p className="text-red-500 text-xs italic">
                  Please enter restaurant logo link
                </p>
              )}
            </div>


          </div>

          <div className="lg:flex gap-3 mb-3">
            {/* Restaurant Description */}
            <div className="w-full">
              <label className="text-gray-700 " htmlFor="restaurantDescription">
                Restaurant Description
              </label>
              <Input
                type="text"
                {...register("restaurantDescription", { required: true })}
                id="restaurantDescription"
                placeholder="https://example.com"
              />
              {errors.restaurantDescription && (
                <p className="text-red-500 text-xs italic">
                  Please enter restaurant logo link
                </p>
              )}
            </div>

            {/* Restaurant Address */}
            <div className="w-full">
              <label className="text-gray-700 " htmlFor="restaurantAddress">
                Restaurant Address
              </label>
              <Input
                type="text"
                {...register("restaurantAddress", { required: true })}
                id="restaurantAddress"
                placeholder="https://example.com"
              />
              {errors.restaurantAddress && (
                <p className="text-red-500 text-xs italic">
                  Please enter restaurant logo link
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button type="submit" variant="outline">
              Update Restaurant
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResturant;
