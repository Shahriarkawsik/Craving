"use client";
import React from "react";
import BGImg from "@/assets/bgImg.jpg";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";

// import { useForm, SubmitHandler } from "react-hook-form";

const BeRider = () => {
  // type Inputs = {
  //   // restaurant_id: string;
  //   id: string;
  //   foodName: string;
  //   description: string;
  //   price: number;
  //   category: string;
  //   foodImage: string;
  //   is_available: boolean;
  //   created_at: Date;
  // };

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm<Inputs>();
  // const onSubmit: SubmitHandler<Inputs> = (data) => {
  //   console.log(data);
  // };
  return (
    <section
      className="bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: `url(${BGImg.src})`,
      }}
    >
      <div className="w-11/12 lg:w-9/12 mx-auto py-8 sm:py-12 space-y-10">
        <h2 className="text-center text-2xl lg:text-4xl font-bold">
          Be <span className="text-amber-500">Rider</span>
        </h2>
        <div className="bg-white shadow-2xl p-10 rounded-3xl">
          <form
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            action=""
            // onSubmit={handleSubmit(onSubmit)}
          >
            {/* Restaurant Owner Email */}
            <div className="space-y-3">
              <Label className="font-semibold">Email</Label>
              <Input
                readOnly
                value={"Rider"}
                type="email"
                id="email"
                placeholder="Type your email"
              />
            </div>
            {/* Restaurant Name */}
            <div className="space-y-3">
              <Label className="font-semibold">Restaurant Name*</Label>
              <Input type="text" id="name" placeholder="Type restaurant name" />
            </div>
            {/* Restaurant Email */}
            <div className="space-y-3">
              <Label className="font-semibold">Restaurant Email*</Label>
              <Input
                type="email"
                id="restaurant_email"
                placeholder="Type restaurant email"
              />
            </div>
            {/* Restaurant Number */}
            <div className="space-y-3">
              <Label className="font-semibold">Restaurant Number*</Label>
              <Input
                type="number"
                id="restaurant_number"
                placeholder="+880 1234 567890"
              />
            </div>
            {/* Restaurant Description */}
            <div className="space-y-3">
              <Label className="font-semibold">Description*</Label>
              <Input
                type="text"
                id="description"
                placeholder="Type restaurant description"
              />
            </div>
            {/* Restaurant Address */}
            <div className="space-y-3">
              <Label className="font-semibold">Restaurant Address*</Label>
              <Input
                type="text"
                id="restaurant_address"
                placeholder="Type restaurant address"
              />
            </div>
            {/* Restaurant Owner NID photo */}
            <div className="space-y-3">
              <Label className="font-semibold">NID Photo*</Label>
              <Input
                type="file"
                id="restaurant_address"
                className="border-none"
                // placeholder="restaurant_address"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BeRider;
