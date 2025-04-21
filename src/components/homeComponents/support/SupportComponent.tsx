"use client";
import React from "react";
import Lottie from "lottie-react";
import supportLottie from "@/assets/supportLottie.json";
import Link from "next/link";

const SupportComponent: React.FC = () => {
  return (
    <section className="py-10 bg-gray-100">
      {/* <SectionHeading title="Support" subtitle="Customer Support" /> */}
      <div className="w-11/12 mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Text content */}
        <div className=" space-y-6  text-justify">
          <h5 className="text-2xl lg:text-4xl font-semibold">
            Customer <span className="text-amber-500">Support</span>
          </h5>
          <p>
            At Craving, we prioritize customer satisfaction and are always here
            to assist you. We offer 24/7 customer support through live chat,
            email, and phone to ensure a smooth and hassle-free experience. Your
            convenience is our commitment!
          </p>

          <Link href="/contactUs">
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-4xl">
              Support Here
            </button>
          </Link>
        </div>

        {/* Lottie animation */}
        <div>
          <Lottie animationData={supportLottie} loop={true} />
        </div>
      </div>
    </section>
  );
};

export default SupportComponent;
