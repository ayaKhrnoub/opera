import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { navbar } from "../../Constant";
const Links = ({ scrolled }) => {
  return (
    <ul className="flex gap-8 text-lg">
      {navbar.navLinks.map((link) => (
        <motion.li
          initial={{ opacity: 0, y: "-75%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: link.id * 0.1,
          }}
          className="hover:scale-110 hover:transition-all hover:duration-200"
          key={link.id}
        >
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-primary"
                  : scrolled
                  ? "text-black"
                  : "text-white"
              } capitalize font-semibold hover:duration-200 hover:text-primary`
            }
          >
            {link.link}
          </NavLink>
        </motion.li>
      ))}
    </ul>
  );
};

Links.propTypes = {
  scrolled: PropTypes.bool.isRequired,
};

export default Links;
