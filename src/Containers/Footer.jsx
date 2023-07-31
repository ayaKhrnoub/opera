import Social from "../Components/Social";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
const Footer = () => {
  return (
    <footer className="w-full mt-8 bg-dark">
      <div className="container mx-auto sm:px-16 px-12">
        <div
          className="flex py-8 gap-8 text-white text-2xl justify-end items-center
                        relative after:absolute after:inset-0 after:top-full after:w-full after:h-[1px]
                        after:bg-white/25"
        >
          <p className="flex justify-center items-baseline gap-1">
            <span>
              <BsFillTelephoneFill className="text-lg" />
            </span>
            <span>0938756281</span>
          </p>
          <p className="flex justify-center items-center gap-1">
            <span>
              <MdEmail className="text-lg" />
            </span>
            <span>info@OPERA.com</span>
          </p>
        </div>
        <div className="w-full pb-4 pt-6 flex justify-between items-center">
          <p className="text-xl text-white">
            © {new Date().getFullYear()} All Rights Reserved . Opera{" "}
          </p>
          <Social isWhite={true} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
