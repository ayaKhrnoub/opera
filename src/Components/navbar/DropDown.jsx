import { useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { navbar } from "../../Constant";

// Define the dropdown animation variants
const dropdownVariants = {
  initial: {
    opacity: 0,
    scale: 0.5,
    transformOrigin: "top right",
  },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
  transition: { duration: 0.1, type: "spring", stiffness: 50 },
};

const DropDown = ({ setToggle }) => {
  const dropdown = useRef(null);

  // Define a callback function to handle clicks outside the dropdown
  const handleClickOutside = useCallback(
    (e) => {
      if (dropdown.current && !dropdown.current.contains(e.target)) {
        setToggle(false);
      }
    },
    [setToggle]
  );

  // Add an event listener to the document to detect clicks outside the dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);


  return (
    <motion.ul
      ref={dropdown}
      variants={dropdownVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition="transition"
      className={`absolute capitalize text-black right-8 shadow-navbar top-[70px] font-bold text-xl w-[250px] bg-white rounded-lg overflow-hidden`}
    >
      {navbar.navLinks.map((link) => (
        <motion.li
          key={link.id}
          initial={{ opacity: 0, x: "75%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: link.id * 0.1 }}
          className="p-3 flex justify-center items-center"
        >
          <Link
            to={link.path}

            className="hover:text-primary hover:scale-105 transition-all duration-300"
          >
            {link.link}
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
};

// Define the prop types for the DropDown component
DropDown.propTypes = {
  setToggle: PropTypes.func.isRequired,
};

export default DropDown;
