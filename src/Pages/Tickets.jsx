import { useEffect } from "react";
import TheaterSeats from "../Components/TheaterSeats";
import useFetch from "../Hooks/useFetch";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Tickets = () => {
  const { data, isLoading, error, errorMessage } = useFetch(
    `/api/party/my-tickets`
  );
  const [myTickets, setMyTickets] = useState([]);
  const { eventId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      // booked_seat_number
      if (!error) {
        if (data?.data) {
          setMyTickets(
            data.data
              .filter((ticket) => +ticket.party_id === +eventId)
              .map((seat) => +seat.booked_seat_number)
          );
        }
      } else {
        if (typeof errorMessage !== "string") {
          if (errorMessage?.response?.data?.message === "Unauthenticated.") {
            setIsLoggedIn(false);
          }
        }
      }
    }
  }, [data, isLoading, error, eventId, errorMessage]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="mt-16 min-h-100vh px-5 py-5">
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold capitalize">
        select your seats
      </h2>
      <div className="w-[95%] px-12 mt-8 overflow-x-auto mx-auto">
        <div className="flex w-full justify-evenly items-start mb-4 gap-1 md:gap-2">
          <div className="flex justify-center items-center gap-4">
            <button
              className={`bg-gray-500 hover:scale-110 duration-200 w-5 h-5 md:w-7 md:h-7 rounded-sm`}
            >
              <span className="sr-only">seat</span>
            </button>
            <p className="text-xl font-semibold capitalize">available</p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <button
              className={`bg-primary hover:scale-110 duration-200 w-5 h-5 md:w-7 md:h-7 rounded-sm`}
            >
              <span className="sr-only">seat</span>
            </button>
            <p className="text-xl font-semibold capitalize">sold</p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <button
              className={`bg-purple hover:scale-110 duration-200 w-5 h-5 md:w-7 md:h-7 rounded-sm`}
            >
              <span className="sr-only">seat</span>
            </button>
            <p className="text-xl font-semibold capitalize">selected</p>
          </div>
        </div>
      </div>
      {isLoading ? null : (
        <TheaterSeats userSeats={myTickets} isLoggedIn={isLoggedIn} />
      )}
    </div>
  );
};

export default Tickets;
