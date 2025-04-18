"use client";

import bannerImage from "@/assets/bannerImg/contactUs-banner.jpg";
import Image from "next/image";
// import whatsappQR from "@/assets/images/whatsappQR.jpg";
import rider from "@/assets/images/rider.png";
import owner from "@/assets/images/owner.jpg";
import { useState } from "react";
import Link from "next/link";
import Banner from "@/components/shared/Banner";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  email: string;
  query: string;
}

const ContactUs = () => {

  const {data : session }=useSession();
  console.log(session,"this is a session form")

   const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    query: "",
  });

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  
    const form = e.currentTarget;
    const formData = new FormData(form);
   
    // formData.append("access_key", accessKey);
    // const accessKey =process.env.EMAIL_ACCESS_KEY_HERE;
    formData.append("access_key","85802a92-148d-4af4-9df0-48804d5ed65e");
  
    // console.log(formData, "this is form data");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
  
      const result = await res.json();
  
      if (result.success) {

         toast.success("Message sent successfully", {
                position: "top-center",
                autoClose: 1000,
              });
              form.reset(); // resets native form fields
              setFormData({
                name: "",
                email: "",
                query: "",
              }); 
     // console.log("Success:", result);
      } else {
        toast.error("Message not sent", {
          position: "top-center",
          autoClose: 1000,
        });
        // console.log("Error:", result);


      }
    } catch  {
      toast.error("Message not sent try again ", {
        position: "top-center",
        autoClose: 1000,
      })
      // console.error("Network error:", error);
    }
  };


  return (
    <div className="   ">
      {/* Banner section */}
      <Banner image={bannerImage.src} title={`Contact Us`} subtitle={`Get in touch with us effortlessly! Whether you have questions, feedback, or need assistance, we are here to help. Reach out and let's connect!`} />

      {/* get in touch section  */}
      <div className=" w-11/12 mx-auto py-10">
        <h3 className="text-4xl font-bold mb-4">
          Get in <span className="text-amber-500">Touch</span>
        </h3>

        <div className="grid lg:grid-cols-2 gap-3">
          {/* contact information */}
          <div className="py-6 md:py-10  ">
            <div className="mt-4  text-gray-700 grid grid-cols-2 items-center  gap-4 lg:gap-5">
              <Link href="/beRider">
                <div className="relative ">
                  <Image
                    src={rider}
                    alt="rider"
                    className=" h-45 w-45  hover:scale-110 mx-auto rounded-lg bg-gray-100 border-2  border-amber-500 "
                  />
                  <div className="-mt-7   text-white  font-semibold  text-xl flex items-center justify-center ">
                    <p className=" bg-gray-700    rounded-b-lg px-11 lg:px-12">
                      Be Rider
                    </p>
                  </div>
                </div>
              </Link>
              <Link href="/beOwner">
                <div>
                  <Image
                    src={owner}
                    alt="owner"
                    className="w-45 mx-auto h-45  hover:scale-110 rounded-lg bg-gray-100 border-2  border-amber-500 "
                  />
                  <div className="-mt-7   text-white font-semibold text-xl flex items-center justify-center ">
                    <p className="bg-gray-700  rounded-b-lg  px-10">Be Owner</p>
                  </div>
                </div>
              </Link>

              <p className="py-3 size-5xl pl-3 text-center rounded-lg bg-gray-100 border-2  border-amber-500">
                📍 Mirpur, Dhaka
              </p>

              <p className="py-3 pl-3 text-center  rounded-lg bg-gray-100 border-2  border-amber-500">
                📞+123 456 7890
              </p>

              <p className="py-3  text-center pl-3 col-span-2 rounded-lg bg-gray-100 border-2  border-amber-500">
                📧 support@craving.com
              </p>

              {/* <Image
                src={whatsappQR}
                alt="whatsapp QR code"
                className="w-12 mx-auto h-12 rounded-lg bg-gray-100 border-2  border-amber-500 "
              /> */}
            </div>
          </div>
          {/* contact form */}
          <div className="p-6 md:p-10  ">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                defaultValue={session?.user?.email}
              
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
              <textarea
                name="query"
                rows={4}
                placeholder="Your Message"
                value={formData.query}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-amber-500 text-white font-semibold py-2 rounded-lg hover:bg-amber-600 transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
