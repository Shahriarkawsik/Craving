import Image from "next/image";
import chottogram from "../../assets/cities/chottogram.jpeg";
import comilla from "../../assets/cities/comilla.jpg";
import dhaka from "../../assets/cities/dhaka.jpg";
import khulna from "../../assets/cities/khulna.jpg";
import mymensingh from "../../assets/cities/mymensingh.jpg";
import rajshahi from "../../assets/cities/rajshahi.jpeg";
import rangpur from "../../assets/cities/rangpur.jpeg";
import sylhet from "../../assets/cities/sylhet.jpg";

const CitiesWeServe = () => {
    const cities = [
        {
            id: 1,
            image: dhaka,
            city_name: "Dhaka",
        },
        {
            id: 2,
            image: chottogram,
            city_name: "Chattogram",
        },
        {
            id: 3,
            image: sylhet,
            city_name: "Sylhet",
        },
        {
            id: 4,
            image: khulna,
            city_name: "Khulna",
        },
        {
            id: 5,
            image: rajshahi,
            city_name: "Rajshahi",
        },
        {
            id: 6,
            image: comilla,
            city_name: "Comilla",
        },
        {
            id: 7,
            image: rangpur,
            city_name: "Rangpur",
        },
        {
            id: 8,
            image: mymensingh,
            city_name: "Mymensingh",
        },
    ];

    return (
        <section className="w-11/12 mx-auto  space-y-5 text-center">
            <h1 className="text-2xl lg:text-4xl  text-orange-600  uppercase border-t-2 border-b-2 border-orange-300 p-4 inline-block">
                Cities We Serve
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {cities.map((city) => (
                    <div
                        key={city.id}
                        className="relative group cursor-pointer">
                        <Image
                            src={city.image}
                            alt={city.city_name}
                            className="w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold rounded-lg">
                            <p className="bg-black px-4 py-1 rounded-md">{city.city_name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CitiesWeServe;