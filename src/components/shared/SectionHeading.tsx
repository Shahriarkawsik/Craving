interface SectionHeadingProps {
  title: string;
  subtitle: string;
}
const SectionHeading: React.FC<SectionHeadingProps> = ({ subtitle, title }) => {
  return (
    <div className={`flex flex-col items-center justify-center my-5`}>
      <p>{subtitle}</p>
      <h1 className="border-b-2 border-t-2 border-gray-500 mt-3 text-2xl md:text-3xl font-bold">
        {title}
      </h1>
    </div>
  );
};

export default SectionHeading;
