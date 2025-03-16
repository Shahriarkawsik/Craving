import React from "react";
import customerSupport from "@/assets/customer-support.png";
const Support = () => {
  return (
    <section
      className="h-[25vh] bg-no-repeat bg-center"
      style={{
        backgroundImage: `linear-gradient(to right,rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.9)), url(${customerSupport.src})`,
        backgroundSize: "100% 200%",
      }}
    >
      <div className="w-11/12 mx-auto">
        <h1>customer Support</h1>
      </div>
    </section>
  );
};

export default Support;
