import Image from "next/image";
import foodImg from "../../assets/bannerImg/dish-banner-003.jpg";

const FeaturedFood = () => {
  // interface featuredFood {
  //   name: string;
  //   description: string;
  //   price: number;
  //   rating: number;
  // }
  // const featuredFoods: featuredFood[] = [
  //   {
  //     name: "Barger",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, perspiciatis.",
  //     price: 100, // Replace with the actual price
  //     rating: 5, // Replace with the actual rating
  //   },
  // ];
  return (
    <section className="w-11/12 mx-auto text-center space-y-5">
      <h1 className="text-5xl font-bold text-orange-600 uppercase border-b-5 border-t-5 border-orange-300 p-3 inline-block">
        Featured Food
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
      </div>
    </section>
  );
};

export default FeaturedFood;
