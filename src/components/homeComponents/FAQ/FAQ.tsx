"use client";
import dynamic from "next/dynamic";
const FaqComponent = dynamic(
  () => import("@/components/homeComponents/FAQ/FaqComponent"),
  { ssr: false }
);

const FAQ = () => {
  return (
    <section>
      <FaqComponent />
    </section>
  );
};

export default FAQ;
