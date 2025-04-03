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
  // const handleAddResturant = async (e: FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const form = e.currentTarget;
  //     const title = (form.elements.namedItem("title") as HTMLInputElement).value;
  //     const location = (form.elements.namedItem("location") as HTMLInputElement).value;
  //     const owner = (form.elements.namedItem("owner") as HTMLInputElement).value;
  //     const email = (form.elements.namedItem("email") as HTMLInputElement)
  //       .value;
  //       addResturant({title, location, owner, email})
  //       toast.success("Resturant Added Successfully!");
  //   };

  type Inputs = {
    restaurantName: string,
    location: string,
    ownerName: string,
    restaurantEmail: string
  }

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const addedDate = new Date().toISOString();
    const restaurantData = { ...data, addedDate };

    try {
      addRestaurant(restaurantData);
      toast.success("Resturant Added Successfully!", {
        position: "bottom-center",
        transition: Slide
      });
    }
    catch (error) {
      toast.error("Something went wrong!", {
        position: "bottom-center",
        transition: Slide
      });
      console.log("ERROR:", error);
    }
  }




  return (
    <div className="w-8/12 mx-auto">
      <h3 className="text-center mb-5 text-2xl md:text-3xl font-semibold">
        Add Resturant
      </h3>
      <div className="px-5 lg:px-8 py-6">
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Restaurant Name and location */}
          <div className="lg:flex gap-3 mb-3">
            <div className="w-full">
              <label className="text-gray-700 " htmlFor="restaurantName">
                Restaurant Name
              </label>
              <Input type="text" {...register('restaurantName', { required: true })} id="restaurantName" placeholder="Food & Fun" />
              {
                errors.restaurantName && <p className="text-red-500 text-xs italic">Please enter Restaurant name</p>
              }
            </div>
            <div className="w-full">
              <label className="text-gray-700 " htmlFor="location">
                Location
              </label>
              <Input type="text" {...register('location', { required: true })} id="location" placeholder="2/A Emperor Building, Gulshan-1" />
              {
                errors.location && <p className="text-red-500 text-xs italic">Please enter restaurant location</p>
              }
            </div>
          </div>

          {/* Owner name and restaurant email */}
          <div className="lg:flex gap-3 mb-3">
            <div className="w-full">
              <label className="text-gray-700 " htmlFor="ownerName">
                Owner Name
              </label>
              <Input type="text" {...register('ownerName', { required: true })} id="ownerName" placeholder="John Doe" />
              {
                errors.location && <p className="text-red-500 text-xs italic">Please enter owner name</p>
              }
            </div>
            <div className="w-full">
              <label className="text-gray-700 " htmlFor="restaurantEmail">
                Restaurant Email
              </label>
              <Input type="email" {...register('restaurantEmail', { required: true })} id="restaurantEmail" placeholder="example@gmail.com" />
              {
                errors.restaurantEmail && <p className="text-red-500 text-xs italic">Please enter restaurant email</p>
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
