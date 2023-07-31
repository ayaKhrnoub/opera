import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../Hooks/useFetch";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import Popup from "./Popup";
import PayTickets from "./PayTickets";

// A utility function that splits an array into smaller arrays of specified lengths
function splitArray(array, lengths) {
  let result = [];
  let currentIndex = 0;

  lengths.forEach((length) => {
    result.push(array.slice(currentIndex, currentIndex + length));
    currentIndex += length;
  });

  while (currentIndex < array.length) {
    result.push(array.slice(currentIndex, currentIndex + lengths[2]));
    currentIndex += lengths[2];
  }

  return result;
}

const TheaterSeats = ({ userSeats, isLoggedIn }) => {
  const { eventId } = useParams();
  const [seats, setSeats] = useState([]);
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false);

  const [select, setSelect] = useState([]);
  const [userBooked, setUserBooked] = useState([]);
  const { data, isLoading, error } = useFetch(`/api/party/show/${eventId}`);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      if (!isLoggedIn) {
        console.log("خالصة الجلسة");
      }
    } else {
      console.log("مالو مسجل دخولو");
    }
  }, [user, isLoggedIn]);

  useEffect(() => {
    setSelect(userSeats);
  }, [userSeats]);

  useEffect(() => {
    setUserBooked(select.filter((i) => !userSeats.includes(i)));
  }, [select, userSeats]);

  useEffect(() => {
    if (!isLoading) {
      if (!error) {
        setSeats(splitArray(JSON.parse(data.seats), [22, 26, 30]));
      } else {
        console.log("navigate to 404");
      }
    }
  }, [data, isLoading, error]);
  return (
    <Fragment>
      <div className="w-[95%] px-12 overflow-x-auto mx-auto">
        <div className="min-w-[750px] sm:w-full mx-auto">
          <div
            style={{ transform: "perspective(700px) rotateX(-70deg)" }}
            className="w-[95%] mx-auto h-28 bg-primary/80 relative"
          />
          <div
            className="w-[88.5%] -translate-y-10 mx-auto h-20 relative bg-gradient-to-t
                 to-primary/30 from-transparent"
          />
          {seats.map((i, index) => (
            <div
              key={index}
              className="flex w-full justify-center items-start mb-4 gap-1 md:gap-2"
            >
              {i.map((j, index) => (
                <button
                  onClick={() => {
                    if (j.booked) return;
                    if (userSeats.length >= user.allowed_tickets) return;
                    else {
                      if (select.includes(j.number))
                        setSelect((prev) => prev.filter((i) => i !== j.number));
                      else {
                        if (select.length >= user.allowed_tickets) return;
                        else setSelect((prev) => [...prev, j.number]);
                      }
                    }
                  }}
                  disabled={j.booked}
                  key={index}
                  className={`${
                    select.includes(j.number) ? "bg-purple" : "bg-gray-500"
                  } disabled:bg-primary hover:scale-110 duration-200 w-5 h-5 md:w-7 md:h-7 rounded-sm`}
                >
                  <span className="sr-only">{`seats number ${j.number}`}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8 items-center">
        <button
          onClick={() => setShowModal(true)}
          className="uppercase h-10 w-24 text-xl sm:text-2xl text-white rounded-lg bg-primary"
        >
          next
        </button>
      </div>
      <Popup isOpen={showModal} onClose={setShowModal} clickOutSide>
        <PayTickets
          userBooked={userBooked}
          setShowModal={setShowModal}
          ticketPrice={+data?.ticket_price}
        />
      </Popup>
    </Fragment>
  );
};

// PropTypes for the TheaterSeats component
TheaterSeats.propTypes = {
  userSeats: PropTypes.arrayOf(PropTypes.number).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default TheaterSeats;
