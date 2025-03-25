"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { addResturant } from "../../../../action/auth/allApi";
import { toast } from "react-toastify";

const AddResturant = () => {
  const handleAddResturant = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const title = (form.elements.namedItem("title") as HTMLInputElement).value;
      const location = (form.elements.namedItem("location") as HTMLInputElement).value;
      const owner = (form.elements.namedItem("owner") as HTMLInputElement).value;
      const email = (form.elements.namedItem("email") as HTMLInputElement)
        .value;
        const result = await addResturant({title, location, owner, email})
        toast.success('Restaurant Added Successfully')
    };
  return (
    <div className="w-8/12 mx-auto">
      <h3 className="text-center mb-5 text-2xl md:text-3xl font-semibold">
        Add Resturant
      </h3>
      <div className="px-5 lg:px-8 py-6">
        <form onSubmit={handleAddResturant}>
          {/* first title and location */}
          <div className="lg:flex gap-3 mb-3">
            <div className="w-full">
              <label className="text-gray-700 " htmlFor="job_title">
                Title
              </label>
              <Input type="text" name="title" placeholder="Title" />
            </div>
            <div className="w-full">
              <label className="text-gray-700 " htmlFor="job_title">
                Location
              </label>
              <Input type="text" name="location" placeholder="Location" />
            </div>
          </div>
          {/* owner and email  */}
          <div className="lg:flex gap-3 mb-3">
          <div className="w-full">
              <label className="text-gray-700 " htmlFor="job_title">
                Owner
              </label>
              <Input type="text" name="owner" placeholder="Owner" />
            </div>
            <div className="w-full">
              <label className="text-gray-700 " htmlFor="job_title">
                Email
              </label>
              <Input type="email" name="email" placeholder="Email" />
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
