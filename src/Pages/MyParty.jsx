import { useState } from "react";
import useFetch from "../Hooks/useFetch";
import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Loading from "./Loading";
import { useAuthContext } from "../Context/AuthContext";

const MyParty = () => {
  const { data, isLoading, error } = useFetch("/api/party/my-tickets");
  const [ticketList, setTicketList] = useState([]);
  const { user } = useAuthContext();
  useEffect(() => {
    if (!isLoading && !error) {
      setTicketList(
        data.data.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      );
    }
  }, [isLoading, error, data]);

  if (Object.keys(user).length === 0) return <Navigate to="/" replace />;
  return (
    <div className="mt-16 min-h-100vh flex-col flex items-center justify-center px-5 py-5">
      <h1 className="font-bold text-primary text-4xl capitalize pb-4">
        my tickets
      </h1>
      <div className="w-[95%] sm:w-4/5 flex justify-between items-center flex-wrap gap-4">
        {isLoading ? (
          <Loading />
        ) : ticketList.length !== 0 ? (
          ticketList.map((ticket) => (
            <div
              key={ticket.id}
              className="w-[250px] h-[125px] bg-[#EEE] rounded-lg shadow-lg"
            >
              <div className="px-4 font-bold">
                <h2 className="text-center cursor-default text-primary font-bold text-xl py-3">
                  {ticket.party_name}
                </h2>

                <div className="flex cursor-default text-xl justify-around items-center">
                  <p>seat number</p>
                  <p>{ticket.booked_seat_number}</p>
                </div>
                <div className="flex text-xl justify-center items-center">
                  <Link
                    className="text-purple capitalize pt-3 hover:underline"
                    to={`${ticket.id}`}
                  >
                    ticket information
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center flex justify-center items-center w-full font-bold text-xl capitalize">
            You haven't registered for any party yet
          </p>
        )}
      </div>
    </div>
  );
};

export default MyParty;
