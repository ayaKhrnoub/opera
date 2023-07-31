import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Logo = ({ scrolled }) => {
  return (
    <motion.h1
      initial={{ opacity: 0, x: "-75%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`${
        scrolled ? "text-black" : "text-white"
      } text-3xl sm:text-4xl font-bold`}
    >
      <Link className="capitalize" to="/">
        opera
      </Link>
    </motion.h1>
  );
};

Logo.propTypes = {
  scrolled: PropTypes.bool.isRequired,
};

export default Logo;
