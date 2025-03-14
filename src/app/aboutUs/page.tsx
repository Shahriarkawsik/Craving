import Image from "next/image";
import aboutImage from "../../assets/about.jpg"
const AboutUs = () => {
  
  interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
  }

  const teamMembers : TeamMember[] = [
    {
      id: 1,
      name: "Siam Mohammed Abdulah",
      role: "Founder & CEO",
      image: "https://i.ibb.co.com/Y7qgBzch/turjojpg.jpg",
    },
    {
      id: 2,
      name: "AL Mahmud Rakib",
      role: "Head of Logistics",
      image: "https://i.ibb.co.com/5xtrS8JD/rakib.jpg",
    },
    {
      id: 3,
      name: "Md. Shahriar Kabir",
      role: "Delivery Operations Manager",
      image: "https://i.ibb.co.com/BKQ0RhVf/kabir.jpg",
    },
    {
      id: 4,
      name: "Mahbub Hossen",
      role: "Customer Support Lead",
      image: "https://i.ibb.co.com/BKQ0RhVf/kabir.jpg",
    },
    {
      id: 5,
      name: "Gulam Jakaria",
      role: "Marketing & Promotions",
      image: "https://i.ibb.co.com/BKQ0RhVf/kabir.jpg",
    },
    {
      id: 6,
      name: "Shahidul Islam",
      role: "Restaurant Partnership Manager",
      image: "https://i.ibb.co.com/275Tjgv8/290565919-482999250252208-8067465362451643121-n.jpg",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* banner section  */}
      <div
        className="flex justify-center items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${aboutImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "280px",
          width: "100%",
        }}
        
      >
        <div className="w-3xl mx-auto text-center z-50">
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            About Us
          </h2>
          <p className="mt-2 text-white">
            Enjoy fresh, delicious meals delivered straight to your doorstep
            with ease. We connect you to the best restaurants and home chefs for
            a hassle-free dining experience!
          </p>
        </div>
      </div>
      <div className="w-11/12 mx-auto">
      <div>
        {/* team member  */}
        <section className="container mx-auto p-6">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Meet Our Food Delivery Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="border p-4 rounded-lg shadow-md text-center bg-white"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-xl font-semibold mt-3">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
        {/* About Content */}
        <div className="max-w-5xl mx-auto p-6">
          {/* Our Mission */}
          <section className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 mt-3">
              We connect food lovers with the best restaurants and home chefs,
              ensuring fresh, high-quality meals delivered right to your
              doorstep.
            </p>
          </section>

          {/* Why Choose Us */}
          <section className="mt-10">
            <h2 className="text-3xl font-semibold text-gray-800 text-center">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-xl font-semibold text-orange-500">
                  Fast & Reliable Delivery
                </h3>
                <p className="text-gray-600">
                  Get your favorite meals delivered in record time.
                </p>
              </div>
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-xl font-semibold text-orange-500">
                  Fresh & Quality Ingredients
                </h3>
                <p className="text-gray-600">
                  We ensure the highest quality food from trusted sources.
                </p>
              </div>
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-xl font-semibold text-orange-500">
                  Wide Variety of Cuisines
                </h3>
                <p className="text-gray-600">
                  Enjoy a diverse menu from top restaurants & home chefs.
                </p>
              </div>
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <h3 className="text-xl font-semibold text-orange-500">
                  Easy & Secure Payment
                </h3>
                <p className="text-gray-600">
                  Multiple payment options for a seamless experience.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="mt-12 text-center">
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
          </section>

          {/* Testimonials (Optional) */}
          <section className="mt-12">
            <h2 className="text-3xl font-semibold text-gray-800 text-center">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <p className="text-gray-600 italic">
                  Amazing service! The food was fresh, hot, and delivered on
                  time. Highly recommended!
                </p>
                <h4 className="text-orange-500 font-semibold mt-2">
                  - Sarah M.
                </h4>
              </div>
              <div className="p-6 bg-white shadow-lg rounded-lg">
                <p className="text-gray-600 italic">
                  Best food delivery experience! The app is super easy to use
                  and the food is always great!
                </p>
                <h4 className="text-orange-500 font-semibold mt-2">
                  - John D.
                </h4>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
