import Image from "next/image";
import dish01 from "../../assets/bannerImg/dish-banner-001.jpg";
const Banner = () => {
  return (
    <section className="w-full lg:h-[500px] bg-black ">
      <div className="flex h-full">
        <div className="w-[60%] h-full">
          <h1>this is banner.</h1>
        </div>
        <figure className="w-[40%] h-full">
          <Image
            className="w-full h-full"
            src={dish01}
            alt="this is a noodles platter."
          />
        </figure>
      </div>
    </section>
  );
};

export default Banner;
