import Image from "next/image";
import foodImg from "../../assets/bannerImg/dish-banner-003.jpg";
const FeaturedFood = () => {
  return (
    <section className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <div className="border space-y-4 rounded-lg shadow-2xl">
        <Image src={foodImg} alt="" className="rounded-lg" />
        <div className="space-y-2 mx-2">
          <h1 className="text-center text-2xl font-bold">Barger</h1>
          <p>
            <strong>Description:</strong>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
            perspiciatis.
          </p>
          <p>
            <strong>Price:</strong> $100
          </p>
          <p>
            <strong>Rating:</strong> 5
          </p>
        </div>
      </div>
      <div className="border space-y-4 rounded-lg shadow-2xl">
        <Image src={foodImg} alt="" className="rounded-lg" />
        <div className="space-y-2 mx-2">
          <h1 className="text-center text-2xl font-bold">Barger</h1>
          <p>
            <strong>Description:</strong>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
            perspiciatis.
          </p>
          <p>
            <strong>Price:</strong> $100
          </p>
          <p>
            <strong>Rating:</strong> 5
          </p>
        </div>
      </div>
      <div className="border space-y-4 rounded-lg shadow-2xl">
        <Image src={foodImg} alt="" className="rounded-lg" />
        <div className="space-y-2 mx-2">
          <h1 className="text-center text-2xl font-bold">Barger</h1>
          <p>
            <strong>Description:</strong>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
            perspiciatis.
          </p>
          <p>
            <strong>Price:</strong> $100
          </p>
          <p>
            <strong>Rating:</strong> 5
          </p>
        </div>
      </div>
      <div className="border space-y-4 rounded-lg shadow-2xl">
        <Image src={foodImg} alt="" className="rounded-lg" />
        <div className="space-y-2 mx-2">
          <h1 className="text-center text-2xl font-bold">Barger</h1>
          <p>
            <strong>Description:</strong>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
            perspiciatis.
          </p>
          <p>
            <strong>Price:</strong> $100
          </p>
          <p>
            <strong>Rating:</strong> 5
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFood;
