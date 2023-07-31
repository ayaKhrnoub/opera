import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { TfiClose } from "react-icons/tfi";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiUser } from "react-icons/bi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useAuthContext } from "../../Context/AuthContext";
import UserLinks from "./UserLinks";

const AuthButtons = ({ resize, toggle, setToggle }) => {
  const userDropdownRef = useRef(null);
  const [userInformation, setUserInformation] = useState(false);
  const { user } = useAuthContext();

  const handleClickOutside = useCallback(
    (e) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target)
      ) {
        setUserInformation(false);
      }
    },
    [setUserInformation]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
  return (
    <div className="flex justify-center items-center gap-1 sm:gap-4">
      {Object.keys(user).length === 0 ? (
        <div className="flex justify-center items-center gap-1 sm:gap-4">
          <Link
            to="/account/login"
            state={{ path: location.pathname }}
            className="bg-primary capitalize text-white py-1 hover:scale-105 transition-all duration-150 px-4 text-sm sm:text-lg rounded-lg"
          >
            login
          </Link>
          <Link
            to="/reservation"
            className="capitalize bg-purple text-white py-1 hover:scale-105 transition-all duration-150 px-4 text-sm sm:text-lg rounded-lg"
          >
            reservation
          </Link>
        </div>
      ) : (
        <div className="flex justify-center items-center gap-2 ">
          <div
            ref={userDropdownRef}
            className="w-10 h-10 relative flex justify-center items-center rounded-full bg-[#E4E6EB]"
          >
            <button
              onClick={() => setUserInformation((prev) => !prev)}
              className="w-full rounded-full h-full flex justify-center items-center"
            >
              <BiUser className="text-2xl" />
              <span className="sr-only">user information button</span>
            </button>
            <UserLinks userInformation={userInformation} />
          </div>
          <div
            className="w-10 h-10 cursor-pointer relative
                         flex justify-center items-center rounded-full bg-[#E4E6EB]"
          >
            <IoIosNotificationsOutline className="text-3xl" />
            <span className="sr-only">notifications button</span>
            <span className="absolute w-3 h-3 rounded-full right-0 top-0 bg-[#f00] animate-ping"></span>
          </div>
          <Link
            to="/reservation"
            className="capitalize bg-purple text-white py-1 hover:scale-105 transition-all duration-150 px-4 text-sm sm:text-lg rounded-lg"
          >
            reservation
          </Link>
        </div>
      )}
      {!resize ? (
        <div
          onClick={() => setToggle((prev) => !prev)}
          className="text-2xl cursor-pointer"
        >
          {!toggle ? <RxHamburgerMenu /> : <TfiClose />}
        </div>
      ) : null}
    </div>
  );
};

AuthButtons.propTypes = {
  resize: PropTypes.bool.isRequired,
  toggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.func.isRequired,
};

export default AuthButtons;
