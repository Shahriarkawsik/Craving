"use client";
import React from "react";
import Lottie from "lottie-react";
import supportLottie from "../../assets/supportLottie.json";
import Link from "next/link";
// import SectionHeading from "../shared/SectionHeading";

const Support: React.FC = () => {
  return (
    <section className="py-10 bg-amber-50">
      {/* <SectionHeading title="Support" subtitle="Customer Support" /> */}
      <div className="w-11/12 mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Text content */}
        <div className="flex-1 space-y-6 text-lg text-justify">
          <p>
            At Craving, we prioritize customer satisfaction and are always here
            to assist you. We offer 24/7 customer support through live chat,
            email, and phone to ensure a smooth and hassle-free experience. Your
            convenience is our commitment!
          </p>
          <Link href="/contactUs">
            <button className="bg-amber-500 text-white font-bold py-2 px-4 rounded-4xl">
              Support here
            </button>
          </Link>
        </div>

        {/* Lottie animation */}
        <div className="flex-1 flex justify-center shadow-lg">
          <Lottie
            animationData={supportLottie}
            loop={true}
            style={{ width: 400, height: 400 }}
          />
        </div>
      </div>
    </section>
  );
};

export default Support;
