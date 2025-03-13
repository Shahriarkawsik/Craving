import Image from "next/image";
import dish01 from "../../assets/bannerImg/dish-banner-001.jpg";

const Banner = () => {
  return (
    <section className="w-full lg:h-[500px] bg-black">
      <div className="flex flex-col lg:flex-row h-full">
        <div className="w-full lg:w-[60%] h-full flex justify-center items-center">
          <h1 className="text-white text-3xl lg:text-5xl font-bold">
            This is the banner.
          </h1>
        </div>
        <figure className="w-full lg:w-[40%] h-full">
          <Image
            className="w-full h-full object-cover"
            src={dish01}
            alt="this is a noodles platter."
            layout="responsive"
          />
        </figure>
      </div>
    </section>
  );
};

export default Banner;
