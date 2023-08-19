import { useState } from "react";
import { Fragment } from "react";
import Square from "./Square";
import { useEffect } from "react";
import PropTypes from "prop-types";
import OTPInput from "./OTPInput";
import { useAuthContext } from "../Context/AuthContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import baseURL from "../Constant/URL";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PayTickets = ({ userBooked, setShowModal, ticketPrice }) => {
  const [modalContent, setModalContent] = useState(0);
  const [Otp, setOtp] = useState("");
  const { eventId } = useParams();
  const { token } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const addParties = async () => {
    try {
      setIsLoading(true);
      for (let i = 0; i < userBooked.length; i++) {
        const id = userBooked[i];
        await axios.post(
          `${baseURL}/api/party/book-place`,
          {
            number: id,
            party_id: eventId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      toast("done", {
        position: "bottom-left",
        autoClose: 2000,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        draggable: true,
        type: "success",
        theme: "colored",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };
  useEffect(() => {
    setModalContent(0);
  }, []);

  return userBooked.length === 0 ? (
    <div>
      <p className="text-center pb-6 pt-10 text-3xl">
        Please choose a seat before continuing.
      </p>
      <div className="flex justify-center mt-2 items-center">
        <button
          onClick={() => setShowModal(false)}
          className="uppercase h-10 w-24 text-xl sm:text-2xl text-white rounded-lg bg-primary"
        >
          back
        </button>
      </div>
    </div>
  ) : modalContent === 0 ? (
    <Fragment>
      <div className="w-1/2 mt-4 mx-auto">
        <div className="mx-auto my-8 capitalize relative">
          <div className="w-full flex justify-between items-center mx-auto">
            <Square />
            <h3 className="font-bold uppercase text-3xl">
              {userBooked.length} seats
            </h3>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-10/12 mx-auto">
        <p className="text-2xl capitalize text-center font-semibold">
          Seat price: {ticketPrice} S.P
        </p>
        <p className="text-2xl capitalize text-center font-semibold">
          total price: {ticketPrice * userBooked.length} S.P
        </p>
      </div>
      <div className="flex justify-center gap-4 mt-2 items-center">
        <button
          onClick={() => setShowModal(false)}
          className="uppercase h-10 w-24 text-xl sm:text-2xl text-white rounded-lg bg-primary"
        >
          cancel
        </button>
        <button
          disabled={isLoading}
          onClick={addParties}
          className="uppercase h-10 w-24 text-xl sm:text-2xl flex justify-center items-center text-white rounded-lg bg-purple"
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            "pay"
          )}
        </button>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <h3 className="text-center text-3xl capitalize font-semibold pt-4">
        please enter code
      </h3>
      <p className="text-center text-base capitalize text-gray-600 font-semibold pt-2">
        We have sent you a verification code to your email. Please paste the
        code to verify
      </p>
      <div className="pt-2">
        <OTPInput otp={Otp} setOtp={setOtp} valueLength={4} />
      </div>
      <div className="flex justify-center items-center py-4">
        <button
          onClick={addParties}
          className="capitalize flex justify-center hover:bg-primary/80 duration-300 bg-primary rounded-lg text-2xl font-bold text-white items-center w-24 h-12 "
        >
          sent
        </button>
      </div>
    </Fragment>
  );
};

// PropTypes for the PayTickets component
PayTickets.propTypes = {
  userBooked: PropTypes.arrayOf(PropTypes.number).isRequired,
  setShowModal: PropTypes.func.isRequired,
  ticketPrice: PropTypes.number.isRequired,
};

export default PayTickets;
