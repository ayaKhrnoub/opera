import PropTypes from "prop-types";

const Button = ({ text, type, isLoading }) => {
  return (
    <button
      disabled={isLoading}
      type={type}
      className="px-4 h-10 relative uppercase bg-primary text-white 
                font-normal hover:bg-primary/70 transition-all duration-300
                "
    >
      <span className="block absolute w-6 border border-b-0 border-r-0 border-primary -left-[5px] -top-[5px] h-6" />
      {isLoading ? <span>sending..</span> : <span>{text}</span>}
      <span className="block absolute w-6 border border-t-0 border-l-0 border-primary -right-[5px] -bottom-[5px] h-6" />
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Button;
