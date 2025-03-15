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

            </div>
        </div>
    );
};

export default ContactUs;