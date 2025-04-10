"use client";
import dynamic from "next/dynamic";

const AboutComponent = dynamic(
  () => import("@/components/aboutComponents/AboutComponent"),
  { ssr: false }
);
const page = () => {
  return (
    <section>
      <AboutComponent />
    </section>
  );
};

export default page;
