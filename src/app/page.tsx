import Banner from "@/components/homeComponents/banner";
import Category from "@/components/homeComponents/Category";
import FeaturedFood from "@/components/homeComponents/FeaturedFood";

export default function Home() {
  return (
    <section className="lg:space-y-10 lg:my-10 bg-amber-100">
      {/* Banner section */}
      <Banner />
      {/* Category Section */}
      <Category />
      {/* Featured Food */}
      <FeaturedFood />
      <h1 className="text-center mt-50 text-2xl font-bold mb-5">
        This is Food delivery project
      </h1>
    </section>
  );
}
