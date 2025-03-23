/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { FaFacebook, FaLinkedin, FaSquareInstagram } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className="  border-t-2 border-gray-200 w-full bg-gray-50  overflow-hidden ">
      <div className="w-11/12 mx-auto space-y-7 my-10  ">
        <Link href="/" className="text-2xl md:text-3xl font-semibold">
          <Image src={logo} alt="logo" width={90} height={90} />
        </Link>
        <div className="lg:flex justify-between ">
          {" "}
          <div>
            <p className="max-w-lg mt-5 opacity-80">
              {" "}
              Craving delicious food? We've got you covered! At Craving, we
              bring your favorite meals straight to your doorstep with speed and
              convenience. Whether you're in the mood for a quick bite or a
              gourmet feast, our wide selection of restaurants ensures you
              always have the best options. Enjoy fast delivery, easy ordering,
              and exceptional service—all in just a few taps. Satisfy your
              cravings today!
            </p>
          </div>
          {/* this is a all page part */}
          <div>
            <h4 className="font-semibold text-xl py-3 opacity-70">Features</h4>
            <ul className="space-y-2 ">
              <li className=" border-b-2  border-transparent translate-0.5  hover:border-b-white  hover:inline-block ">
                <Link href="/">Home</Link>
              </li>

              <li className=" border-b-2  border-transparent  hover:border-b-white  hover:inline-block  ">
                <Link href="/aboutUs">About Us</Link>
              </li>
              <li className=" border-b-2 border-transparent  hover:border-b-white  hover:inline-block  ">
                <Link href="/contactUs">Contact Us</Link>
              </li>
            </ul>
          </div>
          {/* this is a social media part  */}
          <div>
            <h4 className="font-semibold text-xl pt-3 pb-3 opacity-70">
              Social Media{" "}
            </h4>
            <ul className="flex space-x-3 gap-4 justify-between items-start ">
              <li className="text-2xl text-blue-600 hover:opacity-70">
              <Link href="https://www.facebook.com" target="_blank">
              <FaFacebook />
                </Link>
                
              </li>
              <li className="text-2xl bg-gradient-to-r from-[#feda75] via-[#fa7e1e] to-[#d62976] rounded hover:opacity-70 ">
              <Link href="http://instagram.com" target="_blank">
              <FaSquareInstagram />
                </Link>
               
              </li>
              <li className="text-2xl bg-gradient-to-r from-[#0A66C2] to-[#084B99] rounded hover:opacity-70">
                <Link href="https://bd.linkedin.com" target="_blank">
                  <FaLinkedin />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
