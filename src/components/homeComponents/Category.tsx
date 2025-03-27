import Image from "next/image";
import Link from "next/link";

const Category = () => {
  interface categories {
    // id: number;
    name: string;
    image: string;
  }
  const categories: categories[] = [
    {
      name: "Fast Food",
      image: "https://i.ibb.co.com/6R6dhfjj/fast-food.png",
    },
    {
      name: "Vegetarian",
      image: "https://i.ibb.co.com/gZNtFHfY/vegetable.png",
    },
    {
      name: "Organic food",
      image: "https://i.ibb.co.com/YFW48bv1/diet.png",
    },
    {
      name: "Bakery",
      image: "https://i.ibb.co.com/RptyTZHP/cake-slice.png",
    },
    {
      name: "Chinese",
      image: "https://i.ibb.co.com/bjcWGc8f/noodles.png",
    },
    {
      name: "Desert",
      image: "https://i.ibb.co.com/LdXhfwgj/ice-cream.png",
    },
    {
      name: "Sea food",
      image: "https://i.ibb.co.com/KjSDtPPb/lobster.png",
    },
    {
      name: "Salad",
      image: "https://i.ibb.co.com/dwBxZ59V/salad.png",
    },
  ];
  return (
    <section className="w-11/12 mx-auto  space-y-5 text-center">
      <h1 className=" text-2xl lg:text-4xl my-10 text-orange-600  uppercase border-t-2 border-b-2 border-orange-300 p-4 inline-block">
        Food Categories
      </h1>
      <div className="grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4  justify-center items-center">
        {categories.map((category, index) => (
          <Link key={index} href={"/"}>
            <div className="border rounded-lg p-4 bg-white shadow-2xl hover:scale-105 hover:transition-all hover:border hover:border-orange-600">
              <figure>
                <Image
                  className="w-full h-full object-cover"
                  src={category.image}
                  width={112}
                  height={112}
                  alt="a fast food image"
                />
              </figure>
              <p className="text-sm  ">{category.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Category;
