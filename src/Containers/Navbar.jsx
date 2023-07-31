/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect, memo } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthButtons, DropDown, Links, Logo } from "../Components";

// Function to determine whether the window is larger than 922 pixels
function getInitialResize() {
  return window.innerWidth > 922 ? true : false;
}

const Navbar = () => {
  const location = useLocation(); // Get the current location from the useLocation hook

  const [scrolled, setScrolled] = useState(false); // State to track whether the user has scrolled the page
  const [toggle, setToggle] = useState(false); // State to toggle the mobile menu
  const [resize, setResize] = useState(getInitialResize()); // State to track whether the window is larger than 922 pixels

  // Function to handle resizing of the window
  const handleResize = useCallback(() => {
    setResize(getInitialResize());
  }, []);

  // Function to handle scrolling of the page
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY; // Get the current scroll position
    if (scrollTop > 50) {
      setScrolled(true); // If the user has scrolled more than 50 pixels, set the scrolled state to true
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    if (toggle) setToggle(false);
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup the event listener
  }, [handleResize]);

  useEffect(() => {
    if (location.pathname === "/") {
      setScrolled(false); // If the user is on the home page, set the scrolled state to false
      window.addEventListener("scroll", handleScroll);
    } else {
      setScrolled(true);
    }
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup the event listener
  }, [location.pathname, handleScroll]);

  // Memoize components
  const MemoizedAuthButtons = memo(AuthButtons);
  const MemoizedDropDown = memo(DropDown);

  return (
    <nav
      className={`${
        scrolled ? "bg-white shadow-navbar" : "bg-transparent shadow-none"
      } transition-all duration-300 fixed z-50 w-full top-0 left-0 px-4 sm:px-8`}
    >
      <div className="w-full h-16 max-w-7xl mx-auto flex justify-between items-center">
        <Logo scrolled={scrolled} />
        {/* Render the Links component if the window is larger than 922 pixels */}
        {resize && <Links scrolled={scrolled} />}
        <MemoizedAuthButtons
          resize={resize}
          toggle={toggle}
          setToggle={setToggle}
        />
      </div>
      <AnimatePresence>
        {/* Render the MemoizedDropDown component if the mobile menu is toggled */}
        {toggle && !resize && <MemoizedDropDown setToggle={setToggle} />}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
