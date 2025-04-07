"use client";
import { useParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { updateFood } from "@/app/action/auth/allApi";
import Swal from "sweetalert2";


interface Inputs {
  foodName: string;
  description: string;
  price: number;
  category: string;
  foodImage: string;
  is_available: boolean;
  created_at: Date;
}

export default function UpdateFood() {
  const { id } = useParams<{ id: string }>(); 

  // console.log("Food ID:", id);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();



  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!id) {
      toast.error("Food ID is missing!");
      return;
    }

    const allData = { ...data, id };

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await updateFood(allData);
          // console.log(result)
          if (result.modifiedCount > 0) {
            Swal.fire({
              title: "Update Successfully!",
              text: "Your Food has been Updated.",
              icon: "success"
            });
            reset();
          }
        } catch (error) {
          toast.error("Something went wrong! " + error);
        }
      }
    });
  };

  return (
    <section
    // style={{
    //   backgroundImage: url(${ BGImg.src }),
    //   backgroundSize: "cover",
    //   backgroundPosition: "center",
    // }}
    // className="min-h-screen w-full border-2 border-red-500"
    >
      <div className="w-11/12 lg:w-9/12 mx-auto py-8 sm:py-12">
        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-5xl leading-tight  font-semibold text-center mb-6">
          Update Your Food
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
                type="text"
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
              value={"Update Food"}
              className="bg-orange-400 hover:bg-orange-300 text-white text-lg font-bold rounded-lg py-2 px-4 col-span-1 sm:col-span-2"
            />
          </form>
        </div>
      </div>
    </section>
  );
}
