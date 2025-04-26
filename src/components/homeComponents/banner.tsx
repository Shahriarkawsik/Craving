"use client";
import ButtonComponent from "../shared/button/ButtonComponent";
const Banner = () => {
  const handleClick = () => {
    const restaurantSection = document.getElementById("nearby-restaurants");
    if (restaurantSection) {
      restaurantSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="relative w-full h-[75vh] overflow-hidden">
      {/* Background Video */}
      <video
        src="/foodBanner.mp4" // Put the video inside the public folder
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Content on top of the video (Optional) */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full w-full bg-black/40 text-white text-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4">
        Crave It. Click It. Enjoy It!
        </h1>
        <p className="text-lg text-gray-200 lg:text-xl mb-8">
        Order your favorite meals in seconds — hot, fresh, and delivered to your door.
        </p>

        <ButtonComponent title="Explore Now" onClick={handleClick} />
      </div>
    </section>
  );
};

export default Banner;
