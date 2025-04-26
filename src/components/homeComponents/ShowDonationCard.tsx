"use client";
import { getFoodDonation } from "@/app/action/auth/allApi";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Spinner from "../shared/Spinner";

type FoodDonation = {
  _id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  restaurantName: string;
  restaurantOwnerEmail: string;
};

const ShowDonationCard = () => {
  const { data: session } = useSession();
  const [donations, setDonations] = useState<FoodDonation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await getFoodDonation();
        setDonations(data as FoodDonation[]);
      } catch (error) {
        console.error("Something went wrong", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);
  console.log(donations);

  if (loading) {
    return <div className="flex items-center justify-center"><Spinner /></div>
  }

  return (
    <section className="w-11/12 mx-auto  py-7">
      <div className="text-center">
        <h1 className=" text-2xl mb-10  lg:text-4xl  text-orange-600  uppercase border-t-2 border-b-2 border-orange-300 p-4 inline-block">
          Food Donations
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4">
        {donations.map((donation) => (
          <div
            key={donation?._id}
            className="border rounded-xl px-4 bg-white space-y-2"
          >
            <div>
              <Image
                className="w-full h-[300px] rounded-2xl object-cover"
                src={donation?.image}
                alt={donation?.title}
                width={200}
                height={200}
              />
            </div>
            <h2 className="text-2xl font-semibold mt-2">{donation.title}</h2>
            <address className="mt-1 text-md text-gray-800">
              {donation.location}
            </address>
            <p className="text-sm text-gray-600">
              {donation.description} 
            </p>

            <div className="flex justify-end">
              {(session?.user?.email !== donation?.restaurantOwnerEmail && session?.user?.role === "User") ? (
                <Link href={`/donationCart/${donation._id}`}>
                  <button className="hover:bg-amber-600 font-semibold bg-amber-500 text-white cursor-pointer py-1 px-4 rounded-4xl">
                    Donation
                  </button>
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShowDonationCard;
