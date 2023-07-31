import { useEffect } from "react";
import ReservationForm from "../Components/ReservationForm";
import { useAuthContext } from "../Context/AuthContext";
import { useState } from "react";
import Popup from "../Components/Popup";
import RequiredAuth from "../Components/RequiredAuth";

const Reservation = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    if (Object.keys(user).length === 0) setShowPopup(true);
  }, [user]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full flex justify-center items-center mt-[100px]">
      <div className="w-4/5 sm:w-3/5 py-6 mx-auto bg-primary/20 shadow-lg rounded-2xl">
        <div className="flex w-11/12  mx-auto my-8 justify-between relative items-end">
          <div
            className="w-[75px] mx-auto h-[50px] bg-[#8EA3AA] relative after:absolute
     after:w-[75px] after:h-[50px] after:-top-[50%] after:-right-[50%] after:bg-[#CAD2D3]/70"
          />
          <h2 className="font-bold w-[75%] text-4xl">
            theater booking for private party
          </h2>
        </div>
        <div className="w-4/5 mx-auto">
          <ReservationForm />
        </div>
      </div>
      <Popup isOpen={showPopup} onClose={setShowPopup}>
        <RequiredAuth />
      </Popup>
    </main>
  );
};

export default Reservation;
