import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { navbar } from "../../Constant";
import useLogout from "../../Hooks/useLogout";

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

const UserLinks = ({ userInformation }) => {
  const logout = useLogout();
  return userInformation ? (
    <motion.ul
      variants={dropdownVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition="transition"
      className={`absolute overflow-hidden capitalize text-black -right-5 shadow-navbar top-[50px] font-bold text-xl w-[250px] bg-white rounded-lg`}
    >
      {navbar.userLinks.map((link) => (
        <motion.li
          key={link.id}
          initial={{ opacity: 0, x: "75%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: link.id * 0.1 }}
          className="hover:bg-[#E4E6EB] group flex justify-center items-center"
        >
          {link.type === "link" ? (
            <Link
              to={link.path}
              className="flex p-3 group-hover:scale-110 origin-left duration-200 justify-between px-8 items-center w-full h-full"
            >
              <span>{link.name}</span>
              <span>
                <link.icon />
              </span>
            </Link>
          ) : (
            <button
              onClick={async () => logout()}
              className="flex p-3 group-hover:scale-110 origin-left duration-200 justify-between px-8 items-center w-full h-full"
            >
              <span>{link.name}</span>
              <span>
                <link.icon />
              </span>
            </button>
          )}
        </motion.li>
      ))}
    </motion.ul>
  ) : null;
};

UserLinks.propTypes = {
  userInformation: PropTypes.bool.isRequired,
};

export default UserLinks;
