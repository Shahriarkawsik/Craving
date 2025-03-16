"use client"

import contactUsBanner from "@/assets/bannerImg/contactUs-banner.jpg"
import Image from "next/image";
import whatsappQR from "@/assets/images/whatsappQR.jpg"
import { useState } from "react";


interface FormData {
    name: string;
    email: string;
    query: string;
}




const ContactUs = () => {

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        query: "",
    });

    // Handle input change 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission 
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Form submitted!"); // submission functionality and toast will be added later
    };



    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Banner section */}
            <div
                className="flex justify-center items-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${contactUsBanner.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "280px",
                    width: "100%",
                }}
            >
                <div className="w-3xl mx-auto text-center z-50">
                    <h2 className="text-2xl md:text-4xl font-bold text-white">
                        Contact Us
                    </h2>
                    <p className="mt-2 text-gray-300">
                        Get in touch with us effortlessly! Whether you have questions, feedback, or need assistance, we are here to help. Reach out and let’s connect!
                    </p>
                </div>
            </div>
            <div className="flex items-start">
            {/* contact information */}
                <div className="p-6 md:p-10 w-full max-w-2/5">
                    <div className="flex flex-col items-center">
                        <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
                        <div className="mt-4 text-gray-700 flex flex-col items-center gap-3">
                            <p><strong>📍 Address:</strong> 221B Baker street, Dhaka</p>
                            <p><strong>📧 Email:</strong> support@craving.com</p>
                            <p><strong>📞 Phone:</strong> +123 456 7890</p>
                            <p><strong>📩 Whatsapp:</strong></p>
                            <Image
                                src={whatsappQR}
                                alt="whatsapp QR code"
                                className="w-40 h-40 rounded-lg shadow-md"
                            />
                        </div>
                    </div>


                </div>
                {/* contact form */}
                <div className="p-6 md:p-10 w-full max-w-3/5">
                    <h3 className="text-2xl font-bold mb-4">Send Us a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <textarea
                            name="query"
                            rows={4}
                            placeholder="Your Message"
                            value={formData.query}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                        Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;