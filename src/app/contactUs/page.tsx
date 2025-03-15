import contactUsBanner from "@/assets/bannerImg/contactUs-banner.jpg"

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
        </div>
    );
};

export default ContactUs;