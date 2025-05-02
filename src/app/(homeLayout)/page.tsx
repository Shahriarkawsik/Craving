"use client";
import Banner from "@/components/homeComponents/banner";
import Category from "@/components/homeComponents/Category";
import FeaturedFood from "@/components/homeComponents/FeaturedFood";
import TopRestaurant from "../../components/homeComponents/TopRestaurant";
import Support from "@/components/homeComponents/support/Support";
import FAQ from "@/components/homeComponents/FAQ/FAQ";
import CitiesWeServe from "@/components/homeComponents/CitiesWeServe";
import { useEffect, useState } from "react";
import LocationModal from "@/components/homeComponents/location/LocationModal";
import { CommonPayload, showRestaurantByCity } from "../action/auth/allApi";
// import EidCart from "@/components/homeComponents/EidCart";
// import CountdownTimer from "@/components/homeComponents/CountdownTimer";
import dynamic from "next/dynamic";
import ShowDonationCard from "@/components/homeComponents/ShowDonationCard";

const CountdownTimer = dynamic(
  () => import("@/components/homeComponents/CountdownTimer"),
  {
    ssr: false,
  }
);

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [restaurants, setRestaurants] = useState<CommonPayload[]>([]);
  const [locationCity, setLocation] = useState<string | null>("");

  useEffect(() => {
    const locationAllowed = localStorage.getItem("locationAllowed");
    if (!locationAllowed) {
      setShowModal(true);
    }
  }, []);

  const handleLocationAllow = async (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;

    // console.log("user Location", { latitude, longitude });

    // ✅ Reverse Geocoding API call
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      const data = await res.json();
      localStorage.setItem("locationAllowed", data.address?.city);
      setLocation(data?.address?.city);
    } catch (err) {
      console.error("location error:", err);
    }

    // modal close after set localstorage

    setShowModal(false);
  };
  useEffect(() => {
    const locationAllowed = localStorage.getItem("locationAllowed");

    if (!locationAllowed && navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state !== "granted") {
          setShowModal(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    const storageCity = localStorage.getItem("locationAllowed");
    // console.log('city:', city)
    const fetchRestaurants = async () => {
      let city = locationCity || storageCity;
      if (!city) {
        city = "all";
      }
      try {
        const restaurantsData: CommonPayload[] = await showRestaurantByCity({
          city: city.toLowerCase(),
        });
        setRestaurants(restaurantsData);
        // console.log("result ======", restaurantsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRestaurants();
  }, [locationCity]);

  return (
    <section className="lg:space-y-5">
      {showModal && (
        <LocationModal
          onAllow={handleLocationAllow}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* bg-amber-100 */}
      {/* Banner section */}
      <div>
        <Banner />
        <CountdownTimer targetDate="2025-06-10T00:00:00" />
      </div>
      {/* <EidCart /> */}

      {/* Category Section */}
      <Category />
      
    
      {/* Featured Food */}
      <FeaturedFood />
      {/* top restaurant */}
      <TopRestaurant restaurants={restaurants} />
  
      {/* food donation  */}
      <ShowDonationCard></ShowDonationCard>
          {/* Cities We Serve Section */}
          <CitiesWeServe></CitiesWeServe>
      {/* faq section */}
      <FAQ></FAQ>
      {/* Support */}
      <Support />
    </section>
  );
}
