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
import BGImg from "@/assets/addFoodBG.png";
import { Textarea } from "@/components/ui/textarea";


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
    const resturantUpdatedDate = new Date();
    // restaurant data for database
    const restaurantData = { ...data, resturantUpdatedDate};
    // console.log(restaurantData)
    try {
      const data = await updateRestaurant(restaurantData, session?.user?.email as string);
      // console.log(data)
      if(data.modifiedCount > 0){
        toast.success("Restaurant Updated Successfully!", {
          position: "top-center",
          transition: Slide,
        });
      }else{
        toast.error("Restaurant Update unsuccessful!", {
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
   <section  style={{
    backgroundImage: `url(${BGImg.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
 
  }}>
     <div 
    className="p-4 w-11/12 lg:w-9/12 mx-auto py-8 sm:py-12">
      <h3 className="text-center mb-5 text-2xl md:text-3xl font-semibold">
        Update Restaurant
      </h3>
      <div className=" bg-amber-100/50  max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 shadow-2xl rounded-3xl">
        <form  onSubmit={handleSubmit(onSubmit)}>
          {/* Restaurant Name and location */}
          <div className=" lg:flex gap-3 mb-3">

            <div className="w-full">
              <label className="font-semibold" htmlFor="restaurantName">
                Restaurant Name
              </label>
              <Input 
              className="w-full input bg-gray-100  rounded-md p-2"
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
              <label className="font-semibold" htmlFor="location">
                Location
              </label>
              <Input className="w-full input bg-gray-100  rounded-md p-2"
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
              <label className="font-semibold" htmlFor="ownerName">
                Owner Name
              </label>
              <Input className="w-full input bg-gray-100  rounded-md p-2"
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
              <label className="font-semibold" htmlFor="restaurantEmail">
                Restaurant Email
              </label>
              <Input className="w-full input bg-gray-100  rounded-md p-2"
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
              <label className="font-semibold" htmlFor="restaurantPhone">
                Restaurant Number
              </label>
              <Input className="w-full input bg-gray-100  rounded-md p-2"
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
              <label className="font-semibold" htmlFor="restaurantLogo">
                Restaurant Logo
              </label>
              <Input className="w-full input bg-gray-100  rounded-md p-2"
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
           

            {/* Restaurant Address */}
            <div className="w-full">
              <label className="font-semibold" htmlFor="restaurantAddress">
                Restaurant Address
              </label>
              <Input className="w-full input bg-gray-100  rounded-md p-2"
                type="text"
                {...register("restaurantAddress", { required: true })}
                id="restaurantAddress"
                placeholder="Address"
              />
              {errors.restaurantAddress && (
                <p className="text-red-500 text-xs italic">
                  Please enter restaurant logo link
                </p>
              )}
            </div>
          </div> 


           {/* Restaurant Description */}
           <div className="w-full">
              <label className="font-semibold" htmlFor="restaurantDescription">
                Restaurant Description
              </label>
              <Textarea  className="w-full input bg-gray-100  rounded-md p-2"
                
                {...register("restaurantDescription", { required: true })}
                id="restaurantDescription"
                placeholder="Restaurant Description"
              />
              {errors.restaurantDescription && (
                <p className="text-red-500 text-xs italic">
                  Please enter restaurant logo link
                </p>
              )}
            </div>

          <div className="mt-6 text-center">
            <Button className="bg-orange-400 hover:bg-orange-300 text-white font-semibold rounded-lg py-2 px-4 col-span-1 sm:col-span-2" type="submit" variant="outline">
              Update Restaurant
            </Button>
          </div>
        </form>
      </div>
    </div>
   </section>
  );
};

export default AddResturant;
