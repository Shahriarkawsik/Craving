"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Lottie from "lottie-react";
import faqAnimation from "@/assets/faq.json";

const FaqComponent: React.FC = () => {
  // FAQ Items
  const faqItems = [
    {
      value: "item-1",
      question: "How do I place an order?",
      answer:
        "You can place an order by selecting your desired restaurant, choosing menu items, adding them to your cart, and then proceeding to checkout to confirm the order.",
    },
    {
      value: "item-2",
      question: "How long does delivery take?",
      answer:
        "Delivery times vary depending on the restaurant and your location. You can view an estimated delivery time when placing your order.",
    },
    {
      value: "item-3",
      question: "Do I need an account to place an order?",
      answer:
        "Yes, creating an account helps us provide better service and allows you to track your orders, save delivery addresses, and view order history.",
    },
    {
      value: "item-4",
      question: "Can I cancel or modify my order after placing it?",
      answer:
        "You can modify or cancel your order within a limited time after placing it. Please check your order summary or contact support for assistance.",
    },
    {
      value: "item-5",
      question: "Can I order from multiple restaurants at once?",
      answer:
        "Currently, you can place orders from one restaurant per transaction. If you want to order from multiple restaurants, you’ll need to place separate orders.",
    },
  ];

  return (
    <section className="w-11/12 mx-auto space-y-10 my-5">
      <div className="flex flex-col md:flex-row justify-between gap-5">
        {/* Lottie Animation Section */}
        <div className="max-w-lg flex justify-center items-center mx-auto rounded-lg border-2 border-slate-500 border-dashed">
          <Lottie animationData={faqAnimation} />
        </div>

        {/* Accordion Section */}
        <div className="w-full">
          <h1 className="flex-grow text-2xl lg:text-4xl text-orange-600 uppercase">
            Frequently Asked Questions
          </h1>

          <Accordion type="single" collapsible>
            {faqItems.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger className="hover:no-underline cursor-pointer">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqComponent;
