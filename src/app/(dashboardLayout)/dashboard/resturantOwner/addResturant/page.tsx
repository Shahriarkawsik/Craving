"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { FormEvent } from "react";
// import { addResturant } from "../../../../action/auth/allApi";
// import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";

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


  }

  const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const date = new Date().toISOString();
    const restaurantData = {...data, date};
    console.log(restaurantData);
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
              <Input type="text" {...register('restaurantName')} id="restaurantName" placeholder="Food & Fun" />
            </div>
            <div className="w-full">
              <label className="text-gray-700 " htmlFor="location">
                Location
              </label>
              <Input type="text" {...register('location')} id="location" placeholder="2/A Emperor Building, Gulshan-1" />
            </div>
          </div>

          {/* Owner name and restaurant email */}
          <div className="lg:flex gap-3 mb-3">
          <div className="w-full">
              <label className="text-gray-700 " htmlFor="job_title">
                Owner Name
              </label>
              <Input type="text" {...register('ownerName')} id="owner" placeholder="John Doe" />
            </div>
            <div className="w-full">
              <label className="text-gray-700 " htmlFor="restaurantEmail">
                Restaurant Email
              </label>
              <Input type="email" id="restaurantEmail" placeholder="example@gmail.com" />
            </div>
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline">Add Resturant</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResturant;
