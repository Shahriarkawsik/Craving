import Banner from "@/components/homeComponents/banner";
import Category from "@/components/homeComponents/Category";
import FeaturedFood from "@/components/homeComponents/FeaturedFood";
import TopRestaurant from "../../components/homeComponents/TopRestaurant";
import Support from "@/components/homeComponents/Support";

export default function Home() {
  return (
    <section className="lg:space-y-20">
      {/* bg-amber-100 */}
      {/* Banner section */}
      <Banner />
      {/* Category Section */}
      <Category />
      {/* Featured Food */}
      <FeaturedFood />
      {/* top restaurant */}
      <TopRestaurant />
      {/* Support */}
      <Support />
    </section>
  );
}
