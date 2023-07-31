import { Link } from "react-router-dom";
import PageHeader from "../Components/PageHeader";
import { images } from "../Constant";
import { BiSearch } from "react-icons/bi";
import { motion } from "framer-motion";

const buttonVariant = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, repeatType: "reverse" },
  },
};

const Card = () => {
  return (
    <div className="w-[300px] group relative h-[200px] overflow-hidden bg-red-600 rounded-xl">
      <div className="w-full  h-full">
        <img
          width={640}
          height={360}
          className="w-full h-full object-cover"
          src={images.intro2}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="absolute flex justify-center items-center inset-0 bg-black/40 translate-y-full group-hover:translate-y-0 duration-300">
        <motion.div className="w-full" variants={buttonVariant} whileHover="hover">
          <Link
            to="65"
            className="bg-[#eee] text-center rounded-2xl flex justify-center items-center text-xl cursor-pointer w-4/5 mx-auto py-2"
          >
            title title title title title title
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

const Archives = () => {
  return (
    <main className="mt-16">
      <PageHeader img={images.aboutHeader} text="Damascus Opera Archives" />
      <div className="w-[90%] mx-auto bg-[#CAD2D3] my-4 rounded-xl shadow-lg">
        <div className="flex py-4 w-6/12 mx-auto px-3 my-4">
          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
            <BiSearch className="text-2xl" />
          </div>
          <input
            type="text"
            className="w-full bg-[#FEF5F5] -ml-10 pl-10 pr-3 py-2 rounded-xl border-none outline-none  focus:ring-primary focus:ring-2"
            placeholder="Search"
          />
        </div>
        <div className="w-[95%] mx-auto pb-4 flex flex-wrap gap-4 justify-center items-center">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </main>
  );
};

export default Archives;
