import Button from "./Button";
import PropTypes from "prop-types";
import { images } from "../constant";

const Section = ({ button, dirLtr, image, title, text }) => {
  return (
    <section
      className={`${
        !dirLtr ? "md:flex-row" : "md:flex-row-reverse"
      } pt-16 w-10/12 mx-auto flex-col-reverse gap-4 flex justify-center md:items-start items-center`}
    >
      <div className="relative mb-4 md:w-1/3 w-10/12">
        <div
          className={`relative after:absolute after:bottom-0 after:bg-primary after:w-[85%]
          after:h-[90%] after:-z-10 ${
            !dirLtr
              ? "after:left-0 after:-translate-x-4 after:translate-y-4"
              : "after:right-0 after:translate-x-4 after:translate-y-4"
          }`}
        >
          <img
            className="w-full object-cover relative z-20"
            // src={image}
            src={images.welcome}
            alt={title}
            width="100%"
            height="100%"
            loading="lazy"
          />
        </div>
      </div>
      <div className="w-12/12 md:w-2/3">
        <div className="relative w-10/12 capitalize">
          <img className="absolute top-0 left-0" src={images.headerBg} alt="" />
          <h2 className="font-black text-primary text-4xl md:text-7xl pl-8 relative z-20">
            {title ? title : "title"}
          </h2>
          <p className="pl-8 w-full md:w-4/5 font-bold text-base md:text-2xl">
            theater entertainment & performing arts elementor
          </p>
        </div>
        {text ? (
          <div
            className="md:mt-8 mt-4 text-base sm:text-lg text-justify"
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
        ) : (
          <p className="md:mt-8 mt-4 text-base sm:text-lg text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            nulla repudiandae voluptatum minus. Minima facere quae repellat
            illum atque earum velit inventore doloremque nisi molestiae, et fuga
            ipsum exercitationem a eaque quis. Similique, ipsa voluptatum. Qui
            veritatis iure itaque animi, dicta magni aperiam ea offisciis ullam
            eos reprehenderit. Repellat, eaque?
          </p>
        )}
        {button ? (
          <div className="md:mt-8 mt-4 mb-4 md:mb-0 text-end">
            <Button text="Live stream" />
          </div>
        ) : null}
      </div>
    </section>
  );
};

Section.propTypes = {
  button: PropTypes.bool,
  dirLtr: PropTypes.bool,
  title: PropTypes.string,
  image: PropTypes.string,
  text: PropTypes.string,
};

export default Section;
