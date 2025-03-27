import Banner from "@/components/homeComponents/banner";
import Category from "@/components/homeComponents/Category";
import FeaturedFood from "@/components/homeComponents/FeaturedFood";
import TopRestaurant from "../../components/homeComponents/TopRestaurant";
import Support from "@/components/homeComponents/Support";
import FAQ from "@/components/homeComponents/FAQ";
import CitiesWeServe from "@/components/homeComponents/CitiesWeServe";
import { getServerSession } from "next-auth";

export default function Home() {
  const session = getServerSession()
  return (
    <section className="lg:space-y-20">
      {/* bg-amber-100 */}
      {/* Banner section */}
      <Banner />
      <p>{JSON.stringify(session)}</p>
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
