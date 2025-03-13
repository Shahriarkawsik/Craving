import Banner from "@/components/homeComponents/banner";

export default function Home() {
  return (
    <section className="lg:space-y-10 lg:my-10">
      {/* Banner section */}
      <Banner />
      {/* Banner section */}
      <h1 className="text-center mt-50 text-2xl font-bold mb-5">
        This is Food delivery project
      </h1>
    </section>
  );
}
