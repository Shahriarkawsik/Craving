import { getSingleFood } from '@/app/action/auth/allApi';
import categoryBannerImage from "../../../../../assets/bannerImg/aboutBanner1.jpg";
import Link from 'next/link';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';

interface Props {
  params: { foodID: string };
}

const Page = async ({ params }: Props) => {
  const food = await getSingleFood(params.foodID);

  // fake review data
  const reviews = [
    {
      id: "1",
      userName: "Gulam Jakaria",
      userImage: "https://i.ibb.co.com/fG2TDP7k/jakaria.jpg",
      review: "The food was absolutely delicious! Will definitely order again. The food was absolutely delicious! Will definitely order again.",
      rating: 5,
      created_at: "2025-04-08"
    },
    {
      id: "2",
      userName: "Siam Mohammed Abdulah",
      userImage: "https://i.ibb.co.com/Y7qgBzch/turjojpg.jpg",
      review: "Good portion size, but the delivery was a bit late. The food was absolutely delicious! Will definitely order again.",
      rating: 4,
      created_at: "2025-04-07"
    },
    {
      id: "3",
      userName: "AL Mahmud Rakib",
      userImage: "https://i.ibb.co.com/5xtrS8JD/rakib.jpg",
      review: "Tasted great but could use a bit more seasoning. The food was absolutely delicious! Will definitely order again.",
      rating: 3,
      created_at: "2025-04-06"
    },
    {
      id: "4",
      userName: "Md. Shahriar Kabir",
      userImage: "https://i.ibb.co.com/BKQ0RhVf/kabir.jpg",
      review: "Excellent service and very tasty food! The food was absolutely delicious! Will definitely order again.",
      rating: 5,
      created_at: "2025-04-06"
    },
    {
      id: "5",
      userName: "Mahbub Hossen",
      userImage: "https://i.ibb.co.com/RGGKkkn8/mahbub.png",
      review: "Packaging was great, and the food arrived hot. The food was absolutely delicious! Will definitely order again.",
      rating: 4,
      created_at: "2025-04-05"
    },
    {
      id: "6",
      userName: "Shahidul Islam",
      userImage: "https://i.ibb.co.com/275Tjgv8/290565919-482999250252208-8067465362451643121-n.jpg",
      review: "Average taste, expected something better. The food was absolutely delicious! Will definitely order again.",
      rating: 3,
      created_at: "2025-04-04"
    }
  ];


  return (
    <div>
      {/* banner section */}
      <section
        className="flex justify-center items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${categoryBannerImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "350px",
          width: "100%",
        }}
      >
        {/* this is a banner */}
        <div className="w-3xl mx-auto text-center z-50">
          <h2 className="text-2xl md:text-4xl font-bold text-white">{food?.foodName}</h2>
          <p className="mt-2 text-white">
            Good food, good mood - fuel your day with flavors that make every bite unforgettable!
          </p>
        </div>
      </section>

      <section className="w-11/12 mx-auto">
        {/* path track */}
        <div className="mt-5">
          <ul className="flex items-center justify-start font-medium list-none">
            <li className="hover:text-orange-600 mr-1">
              <Link href={"/"}>{"Home > "}</Link>
            </li>
            <li className="hover:text-orange-600 mr-1">
              <Link href={`/category/${food?.category}`}>{food?.category} {" > "}</Link>
            </li>
            <li className="text-orange-600">{food?.foodName}</li>
          </ul>
        </div>

        {/* food details */}
        <div className='w-11/12 lg:w-10/12 mx-auto my-10'>

          {/* food details part */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10 lg:w-3/4 mx-auto'>
            <div className='flex items-center justify-center max-w-xl overflow-hidden'>
              <Image src={food?.image} width={400} height={400} alt={food?.foodName} className='object-cover'/>
            </div>
            <div className='space-y-4 flex flex-col'>
              <h2 className='text-xl md:text-2xl font-bold '>{food?.foodName}</h2>

              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className={`mr-1 ${5 >= index + 1 ? "text-yellow-500" : "text-gray-300"}`} />
                ))}
                <span className="ml-2 text-sm">({5})</span>
              </div>

              <p className='text-base text-gray-700 text-justify'>{food?.description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere, veniam aliquid! Nisi quisquam, porro omnis ullam iste neque aperiam illum. Ex, tenetur. Ad voluptates facilis nam veritatis soluta quos temporibus nihil totam, dolor dignissimos illo amet minus vero voluptatibus.</p>

              <p className='text-xl'><span className='mr-5'>Price:</span><span className='font-bold text-orange-500'>${food?.price}</span></p>

              <button className={`mt-auto w-full text-white md:text-xl bg-orange-400 hover:bg-orange-500 flex items-center justify-center space-x-2 py-2 px-4 rounded-sm shadow-md transition-colors duration-300 ${!food?.is_available ? 'cursor-not-allowed bg-gray-400 hover:bg-gray-400' : 'cursor-pointer'}`} disabled={!food?.is_available}>
                <FaShoppingCart size={20} />
                <span>{food?.is_available ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
            </div>
          </div>

          {/* user review part */}
          <div className='flex justify-center'>
            <h1 className="text-2xl lg:text-4xl my-10 text-orange-600  uppercase border-t-2 border-b-2 border-orange-300 p-4 inline-block">
              Costumer Reviews
            </h1>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {reviews.map((review) => {
              return <div key={review.id} className='flex space-x-4'>
                <div className='flex flex-col items-center justify-center'>
                  <Image src={review.userImage} width={100} height={100} alt={review.userName} className=' rounded-full ring-2 ring-orange-500 p-1' />
                </div>
                <div className='w-full space-y-0.5'>
                  <div className='flex items-center justify-between gap-5'>
                    <h2 className='text-xl font-semibold'>{review.userName}</h2>
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, index) => (
                        <FaStar key={index} className={`mr-1 ${review.rating >= index + 1 ? "text-yellow-500" : "text-gray-300"}`} />
                      ))}
                    </div>
                  </div>
                  <p className='text-base text-gray-700'>{review.review}</p>
                  <p className='text-sm text-gray-500'>{review.created_at}</p>
                </div>
              </div>
            })}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Page;