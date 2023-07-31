import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const popupOverlayStyles = `
  fixed z-50 w-screen h-screen bg-[#00000060] inset-0 flex justify-center items-center
`;

const popupContainerStyles = `
  rounded-lg after:absolute relative after:inset-0 after:bg-primary/20 after:-z-10 bg-white z-40 shadow-shadow flex flex-col max-h-[95vh] p-3 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%]
`;

const Popup = ({ isOpen, onClose, children, clickOutSide }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (
        clickOutSide &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        onClose(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => removeEventListener("mousedown", handleClick);
  }, [onClose, clickOutSide]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className={popupOverlayStyles}
        >
          <motion.div
            initial={{ opacity: 0, y: "-5vh" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-2vh" }}
            transition={{ duration: 0.3 }}
            ref={modalRef}
            className={popupContainerStyles}
          >
            <div
              className={`
                overflow-x-hidden overflow-y-auto
               w-full h-full cursor-default flex flex-col relative p-3 pt-0`}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  clickOutSide: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Popup;
