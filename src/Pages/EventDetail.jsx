import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { images } from "../Constant";
import { BsFileEarmarkArrowDownFill, BsClockFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import Square from "../Components/Square";
import PropTypes from "prop-types";
import useFetch from "../Hooks/useFetch";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

const Item = ({ title, text }) => {
  return (
    <div className="flex w-4/5 mx-auto  pb-4 text-xl font-semibold justify-between items-center">
      <h3 className="w-4/5">{title}</h3>
      <p className="w-1/5">{text}</p>
    </div>
  );
};
Item.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const EventDetail = () => {
  const { pathname } = useLocation();
  const { eventId } = useParams();
  const { data, isLoading, error } = useFetch(`/api/party/show/${eventId}`);
  console.log(data)
  const [party, setParty] = useState([]);

  useEffect(() => {
    if (!isLoading && !error) {
      setParty(data);
    }
  }, [data, isLoading, error]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (isLoading) return <p>loading...</p>;
  return (
    <div className="mt-16 min-h-100vh flex items-center justify-center px-5 py-5">
      <div className="bg-gray-100 rounded-3xl shadow-xl w-full overflow-hidden max-w-[95%]">
        <div className="flex flex-col md:flex-row w-full">
          <div className="block w-full md:w-1/2">
            <img
              className="w-full h-full object-cover"
              src={images.intro1}
              alt=""
              loading="lazy"
            />
          </div>
          <div
            className="w-full md:w-1/2 z-10 py-2 px-5 md:px-10 relative
          after:absolute after:inset-0 after:z-[-1] after:bg-primary/20"
          >
            <div className="mx-auto my-8 capitalize relative">
              <div className="w-1/2 flex justify-between items-center mx-auto">
                <Square />
                <h2 className="font-bold text-3xl">more detail</h2>
              </div>
            </div>
            <Item title="Party Name:" text={party.name} />
            <Item title="Team Name:" text={party.orchestra_name} />
            <Item title="Theater Name:" text={party.theater_name} />
            <Item
              title="Number of seats:"
              text={`${party.seats_number} seats`}
            />
            <Item
              title="Available seats:"
              text={`${
                party.seats_number - party.booked_seats_number !== 0
                  ? `${party.seats_number - party.booked_seats_number} seats`
                  : "There are no seats available"
              }`}
            />
            <Item title="ticket price:" text={`${party.ticket_price}$`} />

            <div className="py-8 text-xl font-semibold">
              <div className="w-3/5 text-2xl flex flex-row-reverse justify-between items-center mx-auto">
                <Tippy
                  delay={300}
                  content={
                    <span className="text-lg block text-center">
                      download file
                    </span>
                  }
                >
                  <span>
                    <BsFileEarmarkArrowDownFill className="cursor-pointer" />
                  </span>
                </Tippy>
                <Tippy
                  delay={300}
                  content={
                    <span className="text-lg block text-center">
                      {party.date?.slice(10, 16)}
                    </span>
                  }
                >
                  <span>
                    <BsClockFill className="cursor-pointer" />
                  </span>
                </Tippy>
                <Tippy
                  delay={300}
                  content={
                    <span className="text-lg block text-center">
                      {party.date?.slice(0, 10)?.split("-")?.join("/")}
                    </span>
                  }
                >
                  <span>
                    <FaCalendarAlt className="cursor-pointer" />
                  </span>
                </Tippy>
              </div>
            </div>
            <div className="text-center mb-5">
              <Link
                to="tickets"
                className="bg-secondary select-none uppercase px-8 py-2 rounded-lg mt-5 text-2xl text-white hover:bg-secondary/80 active:scale-105"
              >
                Buy Tickets
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
