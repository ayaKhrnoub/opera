import React from "react";
import Popup from "./Popup";
import Reservation from "./Reservation";

const ReservationButton = () => {
  const [openPopup, setOpenPopup] = React.useState(false);

  return (
    <React.Fragment>
      <button
        className="bg-purple capitalize text-white py-1 hover:scale-105 transition-all duration-150 px-4 text-sm sm:text-lg rounded-lg"
        onClick={() => setOpenPopup(true)}
      >
        reservation
      </button>
      <Popup isOpen={openPopup} onClose={setOpenPopup}>
        <Reservation />
      </Popup>
    </React.Fragment>
  );
};

export default ReservationButton;
