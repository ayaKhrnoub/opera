import PropTypes from "prop-types";

const Title = ({ text1, text2, white }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <h2 className="font-medium relative text-3xl md:text-5xl uppercase text-[#0C2024] mb-6">
        <span className="absolute w-12 h-[3px] bg-primary top-1/3 -left-16" />
        <span className="absolute w-8 h-[3px] bg-primary top-1/3 translate-y-3 translate-x-4 -left-16" />
        <span className="text-primary">{text1}</span>{" "}
        <span className={`${white ? "text-white" : "text-black"}`}>
          {text2}
        </span>
        <span className="absolute w-12 h-[3px] bg-primary top-1/3 -right-16" />
        <span className="absolute w-8 h-[3px] bg-primary top-1/3 translate-y-3 -translate-x-4 -right-16" />
      </h2>
    </div>
  );
};

// text1, text2, white

Title.propTypes = {
  text1: PropTypes.string,
  text2: PropTypes.string,
  white: PropTypes.bool,
};

export default Title;
