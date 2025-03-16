import contactUsBanner from "@/assets/bannerImg/contactUs-banner.jpg"
import Image from "next/image";
import whatsappQR from "@/assets/images/whatsappQR.jpg"




const ContactUs = () => {
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
            {/* contact information */}
            <div className="bg-white shadow-lg rounded-xl p-6 md:p-10 w-full max-w-3xl">
                <div className="grid md:grid-cols-2 items-center gap-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                        <p className="text-gray-600">Feel free to contact us for any inquiries.</p>
                        <div className="mt-4 space-y-3 text-gray-700">
                            <p><strong>📍 Address:</strong> 123 Street, City, Country</p>
                            <p><strong>📧 Email:</strong> contact@example.com</p>
                            <p><strong>📞 Phone:</strong> +123 456 7890</p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Image
                            src={whatsappQR}
                            alt="whatsapp QR code"
                            className="w-40 h-40 rounded-lg shadow-md"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ContactUs;