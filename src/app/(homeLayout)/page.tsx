import Banner from "@/components/homeComponents/banner";
import Category from "@/components/homeComponents/Category";
import FeaturedFood from "@/components/homeComponents/FeaturedFood";
import TopRestaurant from "../../components/homeComponents/TopRestaurant";
import Support from "@/components/homeComponents/Support";
import FAQ from "@/components/homeComponents/FAQ";
import CitiesWeServe from "@/components/homeComponents/CitiesWeServe";
import EidCart from "@/components/homeComponents/EidCart";
import CountdownTimer from "@/components/homeComponents/CountdownTimer";



export default function Home() {
  return (
    <section className="lg:space-y-20">
      {/* bg-amber-100 */}
      {/* Banner section */}
      <Banner />
         <CountdownTimer targetDate="2025-04-10T00:00:00" />
      <EidCart/>
   

      {/* Category Section */}
      <Category />
      {/* Cities We Serve Section */}
      <CitiesWeServe></CitiesWeServe>
      {/* Featured Food */}
      <FeaturedFood />
      {/* top restaurant */}
      <TopRestaurant />
      {/* faq section */}
      <FAQ></FAQ>
      {/* Support */}
      <Support />
    </section>
  );
}
