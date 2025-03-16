import ButtonComponent from "../shared/button/ButtonComponent";
const Banner = () => {
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
      <div className="relative z-10 flex flex-col justify-center items-center h-full w-full bg-black/50 text-white text-center">
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">
          Welcome to Craving 🍲
        </h1>
        <p className="text-lg lg:text-2xl mb-8">
          Taste the best dishes made with love!
        </p>
        <ButtonComponent title="Explore Now" />;
        {/* <button className="px-6 py-3 bg-white text-black rounded-md text-lg hover:bg-gray-200 transition">
          Explore Now
        </button> */}
      </div>
    </section>
  );
};

export default Banner;
