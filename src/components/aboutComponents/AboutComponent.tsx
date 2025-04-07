"use client";
import Image from "next/image";
import missionImg from "@/assets/images/missionImg1.jpg";
import visionImg from "@/assets/images/vision.jpg";
import aboutUsBanner from "@/assets/bannerImg/aboutBanner1.jpg";
import whyLottie from "@/assets/why.json";
import { CiFacebook } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import Lottie from "lottie-react";
import Marquee from "react-fast-marquee";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutComponent: React.FC = () => {
  interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
    socials: {
      facebook: string;
      linkedin: string;
      github: string;
    };
  }

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Siam Mohammed Abdulah",
      role: "Founder & CEO",
      image: "https://i.ibb.co.com/Y7qgBzch/turjojpg.jpg",
      socials: {
        facebook: "https://www.facebook.com/tur.jo.9275",
        linkedin: "https://www.linkedin.com/in/siam-mohammed-abdulah-0193b4162",
        github: "https://github.com/TurjoSiam",
      },
    },
    {
      id: 2,
      name: "AL Mahmud Rakib",
      role: "Head of Logistics",
      image: "https://i.ibb.co.com/5xtrS8JD/rakib.jpg",
      socials: {
        facebook: "https://www.facebook.com/profile.php?id=100007789877647",
        linkedin: "https://www.linkedin.com/in/rakib-rkb",
        github: "https://github.com/mahmudrkb",
      },
    },
    {
      id: 3,
      name: "Md. Shahriar Kabir",
      role: "Delivery Operations Manager",
      image: "https://i.ibb.co.com/BKQ0RhVf/kabir.jpg",
      socials: {
        facebook: "https://www.facebook.com/shahriar.kawsik/",
        linkedin: "https://www.linkedin.com/in/md-shahriar-kabir-cse",
        github: "https://www.facebook.com/shahriar.kawsik/",
      },
    },
    {
      id: 4,
      name: "Mahbub Hossen",
      role: "Customer Support Lead",
      image: "https://i.ibb.co.com/RGGKkkn8/mahbub.png",
      socials: {
        facebook: "https://www.facebook.com/mahbub.hossen.1/",
        linkedin: "https://www.linkedin.com/in/mahbub-hossen-6b0136335/",
        github: "https://github.com/mahbubHossen-dev",
      },
    },
    {
      id: 5,
      name: "Gulam Jakaria",
      role: "Marketing & Promotions",
      image: "https://i.ibb.co.com/fG2TDP7k/jakaria.jpg",
      socials: {
        facebook: "https://www.facebook.com/gulam.jakaria.732339",
        linkedin: "https://www.linkedin.com/in/gulam-jakaria-e4",
        github: "https://github.com/Jakaria030",
      },
    },
    {
      id: 6,
      name: "Shahidul Islam",
      role: "Restaurant Partnership Manager",
      image:
        "https://i.ibb.co.com/275Tjgv8/290565919-482999250252208-8067465362451643121-n.jpg",
      socials: {
        facebook: "https://www.facebook.com/profile.php?id=100056264109156",
        linkedin: "https://www.linkedin.com/in/shahidul-islam13",
        github: "https://github.com/shahidulshohid",
      },
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000, // Default duration for all animations
      once: true, // Animation runs once
    });
  }, []);

  return (
    <div>
      <div>
        {/* banner section  */}
        <div
          className="flex justify-center items-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${aboutUsBanner.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "350px",
            width: "100%",
          }}
        >
          {/* this is a banner  */}

          <div className="w-3xl mx-auto text-center z-50">
            <h2 className="text-2xl md:text-4xl font-bold text-white">
              About Us
            </h2>
            <p className="mt-2 text-white">
              Enjoy fresh, delicious meals delivered straight to your doorstep
              with ease. We connect you to the best restaurants and home chefs
              for a hassle-free dining experience!
            </p>
          </div>
        </div>
        <div className="w-11/12 mx-auto">
          <div>
            {/* team member  */}
            <section className="container mx-auto p-6">
              <div className="text-center my-10 ">
                <p>---From 11:00am to 05:00pm---</p>
                <h1 className=" text-2xl  mt-3 lg:text-4xl  text-orange-600  uppercase border-t-2 border-b-2 border-orange-300 p-4 inline-block">
                  Meet Our Food Delivery Team
                </h1>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="border p-4 rounded-lg shadow-md text-center bg-white"
                  >
                    <div className="relative w-full h-[250px]">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {/* Overlay */}
                      <div className="overlay">
                        <h3 className="text-lg font-semibold">{member.name}</h3>
                        <p className="text-sm">{member.role}</p>
                        {/* social icons  */}
                        <div className="flex justify-center items-center gap-2 mt-2">
                          <a
                            href={member.socials.facebook}
                            target="_blank"
                            className="text-white hover:text-[#ff8a00]"
                          >
                            <CiFacebook size={30} />
                          </a>
                          <a
                            href={member.socials.facebook}
                            target="_blank"
                            className="text-white hover:text-[#ff8a00]"
                          >
                            <CiLinkedin size={30} />
                          </a>
                          <a
                            href={member.socials.facebook}
                            target="_blank"
                            className="text-white hover:text-[#ff8a00]"
                          >
                            <FaGithub size={30} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* About Content */}
            <div className="max-w-5xl mx-auto p-6">
              {/* Our Mission */}

              <section className="mb-10 my-10 flex flex-col lg:flex-row gap-5">
                <div className="max-w-xl">
                  <h2 className=" text-2xl lg:text-4xl font-semibold text-gray-800">
                    Our <span className="text-[#ff8a00]">Mission</span>
                  </h2>
                  <p className=" text-gray-600 mt-3 leading-relaxed ">
                    Craving is dedicated to transforming the way you experience
                    food delivery. Our mission is to bring you a diverse
                    selection of meals from top restaurants, ensuring speed,
                    freshness, and quality with every order. We are committed to
                    convenience, customer satisfaction, and making great food
                    accessible anytime, anywhere.
                  </p>
                </div>
                <div className="w-full mb-10  lg:mb-0  max-h-[300px]">
                  <Image
                    src={missionImg}
                    alt="This is our mission"
                    className="w-full mx-auto h-full object-cover rounded-lg"
                  ></Image>
                </div>
              </section>
              {/* OUR VISION */}
              <section className="mt-10 my-10 flex flex-col-reverse lg:flex-row gap-5">
                <div className="w-full mb-10 lg:mb-0  h-[300px]">
                  <Image
                    src={visionImg}
                    alt="This is our mission"
                    className="w-full mx-auto h-full object-cover rounded-lg"
                  ></Image>
                </div>
                <div className="max-w-xl">
                  <h2 className=" text-2xl lg:text-4xl font-semibold text-gray-800">
                    Our <span className="text-[#ff8a00]">Vision</span>
                  </h2>
                  <p className=" text-gray-600 mt-3 space-y-3 leading-relaxed ">
                    Our vision is to become the most trusted and
                    customer-centric food delivery platform, making delicious
                    meals easily accessible to everyone. We aspire to
                    revolutionize the food industry with innovative technology,
                    seamless delivery, and a commitment to quality, ensuring
                    that every meal brings joy and convenience to our customers
                    lives.
                  </p>
                </div>
              </section>
              {/* Why Choose Us */}
              <section className="mt-10">
                <h2 className=" m-10 text-2xl text-center lg:text-4xl font-semibold text-gray-800">
                  Why Choose <span className="text-orange-600 ">Us</span>?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className=" mt-6 space-y-4">
                    <div
                      data-aos="fade-up"
                      className="p-6 bg-white shadow-lg rounded-lg"
                    >
                      <h3 className="text-xl font-semibold text-orange-500">
                        Fast & Reliable Delivery
                      </h3>
                      <p className="text-gray-600">
                        Get your favorite meals delivered in record time.
                      </p>
                    </div>
                    <div
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      className="p-6 bg-white shadow-lg rounded-lg"
                    >
                      <h3 className="text-xl font-semibold text-orange-500">
                        Fresh & Quality Ingredients
                      </h3>
                      <p className="text-gray-600">
                        We ensure the highest quality food from trusted sources.
                      </p>
                    </div>
                    <div
                      data-aos="fade-up"
                      data-aos-duration="2000"
                      className="p-6 bg-white shadow-lg rounded-lg"
                    >
                      <h3 className="text-xl font-semibold text-orange-500">
                        Wide Variety of Cuisines
                      </h3>
                      <p className="text-gray-600">
                        Enjoy a diverse menu from top restaurants & home chefs.
                      </p>
                    </div>
                    <div
                      data-aos="fade-up"
                      data-aos-duration="3000"
                      className="p-6 bg-white shadow-lg rounded-lg"
                    >
                      <h3 className="text-xl font-semibold text-orange-500">
                        Easy & Secure Payment
                      </h3>
                      <p className="text-gray-600">
                        Multiple payment options for a seamless experience.
                      </p>
                    </div>
                  </div>

                  {/* animation  */}
                  <div>
                    <Lottie
                      height={100}
                      animationData={whyLottie}
                      loop={true}
                    />
                  </div>
                </div>
              </section>

              {/* How It Works */}

              {/* <section className="mt-12 text-center">
              <h2 className="text-3xl font-semibold text-gray-800">
                How It Works?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="p-6 bg-white shadow-lg rounded-lg">
                  <h3 className="text-xl font-semibold text-orange-500">
                    Browse & Choose
                  </h3>
                  <p className="text-gray-600">
                    Explore a wide variety of meals and pick your favorites.
                  </p>
                </div>
                <div className="p-6 bg-white shadow-lg rounded-lg">
                  <h3 className="text-xl font-semibold text-orange-500">
                    Order & Pay
                  </h3>
                  <p className="text-gray-600">
                    Place your order with easy and secure payment options.
                  </p>
                </div>
                <div className="p-6 bg-white shadow-lg rounded-lg">
                  <h3 className="text-xl font-semibold text-orange-500">
                    Enjoy Fast Delivery
                  </h3>
                  <p className="text-gray-600">
                    Get your meal delivered hot & fresh to your doorstep.
                  </p>
                </div>
              </div>
            </section> */}

              {/* Testimonials (Optional) */}
              <section className="mt-12">
                <h2 className="text-3xl font-semibold text-gray-800 text-center">
                  What Our Customers Say
                </h2>
                <div className=" mt-6">
                  <Marquee pauseOnHover>
                    {teamMembers.map((member, index) => (
                      <div
                        className="p-6 mx-3 bg-gray-100 max-w-xl shadow-lg rounded-lg"
                        key={index}
                      >
                        <div className="flex">
                          <Image
                            src={member.image}
                            alt="customer"
                            width={150}
                            height={150}
                            className="w-12 h-12 rounded-full mr-4"
                          />
                          <p className="text-gray-600 italic">
                            Amazing service! The food was fresh, hot, and
                            delivered on time. Highly recommended!
                          </p>
                        </div>

                        <h4 className="text-orange-500 font-semibold mt-2">
                          - {member.name}
                        </h4>
                      </div>
                    ))}
                  </Marquee>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
