import { useState } from "react";
import PropTypes from "prop-types"; 
import Slider from "react-slick";
import { introduction } from "../constant";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const SampleNextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 md:right-[2%] right-[1%] cursor-pointer"
      onClick={onClick}
    >
      <IoIosArrowForward className="md:text-6xl text-4xl text-white" />
    </div>
  );
};

SampleNextArrow.propTypes = {
  onClick: PropTypes.func,
};

const SamplePrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 md:left-[2%] left-[1%] z-10 cursor-pointer"
      onClick={onClick}
    >
      <IoIosArrowBack className="md:text-6xl text-4xl text-white" />
    </div>
  );
};

SamplePrevArrow.propTypes = {
  onClick: PropTypes.func,
};

const Introduction = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderSettings = {
    dots: false,
    autoPlay: true,
    autoplaySpeed: 10000,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    className:'w-full w-full',
    draggable: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (_, next) => setCurrentSlide(next),
  };

  return (
    <div className="relative h-screen w-screen">
      <Slider {...sliderSettings}>
        {introduction.header.map((item, index) => (
          <div className="bg-primary relative h-screen w-screen" key={item.id}>
            <img
              className="w-full object-cover h-full absolute top-0 left-0"
              src={item.image}
              alt={item.id}
              loading="lazy"
            />
            {index === currentSlide && (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full flex z-10 relative flex-col items-start justify-center"
              >
                <div className="w-[70%] mx-auto">
                  <h2
                    className={`text-white mb-2 md:mb-4 text-3xl  md:text-7xl capitalize font-bold`}
                  >
                    {item.title}
                  </h2>
                  <p
                    className={` max-w-[900px] text-white w-full md:w-9/12 font-bold capitalize text-xl md:text-3xl`}
                  >
                    {item.text}
                  </p>
                  <button className="bg-dark text-base md:text-2xl px-4 h-12 rounded-lg mt-4 text-white capitalize cursor-pointer transition-all hover:bg-dark/75">
                    {item.buttonText}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Introduction;
