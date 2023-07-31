import PropTypes from "prop-types";

const PageHeader = ({ text, img, overLay }) => {
  return (
    <div
      className={`mt-16 relative${
        overLay
          ? " after:absolute after:inset-0 after:bg-black/60 after:z-20"
          : ""
      }`}
    >
      <img
        className="w-full h-full"
        width="100%"
        height="100%"
        src={img}
        alt=""
        loading="lazy"
      />
      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white z-40 absolute top-1/2 -translate-y-1/2 left-12">
        {text}
      </p>
    </div>
  );
};

PageHeader.propTypes = {
  text: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  overLay: PropTypes.bool,
};

export default PageHeader;
