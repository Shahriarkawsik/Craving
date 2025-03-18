import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-700  text-white  w-full  overflow-hidden ">
      <div className="w-11/12 mx-auto space-y-7 my-10  ">
        <div className="flex justify-between items-center">
         
            {" "}
            <div>
              <Link href="/" className="text-2xl md:text-3xl font-semibold">
                <Image src={logo} alt="logo" width={90} height={90} />
              </Link>
              <p className="max-w-lg mt-5"> Professionally productivate technically sound vortals before enterprise catalysts for change. Authoritatively iterate prospective technology via plug-and-play alignments. Dynamically pursue focused e-business and efficient scenarios. Compellingly promote viral infomediaries before global sources. Monotonectally recaptiualize backend leadership skills rather than synergistic functionalities.

Dramatically unleash high standards in models.</p>
            </div>
        

          <div>2</div>

          <div>3</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
