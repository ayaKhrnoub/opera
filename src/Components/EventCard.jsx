import { images } from "../Constant";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const EventCard = ({ party }) => {
  return (
    <div className="w-[250px] cursor-default relative group overflow-hidden hover:scale-[1.15] duration-300 shadow-navbar bg-[#F6F7F8] h-[330px]">
      <div className="h-[200px] relative after:absolute after:w-full after:h-2 after:bg-primary after:top-0">
        <img
          className="w-full h-full object-cover"
          // src={party.photo}
          src={images.intro1}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="flex justify-between mx-4 pt-2 items-center">
        <h2 className="capitalize text-2xl font-bold">{party.name}</h2>
        <p className="text-lg">
          {party.date?.slice(0, 10)?.split("-")?.join("/")}
        </p>
      </div>
      <p className="mx-4 text-sm font-medium">
        The {party.team_name} ensemble is performing at {party.theater_name}
      </p>
      <Link
        to={`/event/${party.id}/tickets`}
        className="opacity-0 group-hover:opacity-100 flex duration-300 capitalize text-xl text-primary font-bold justify-start items-center mx-4"
      >
        <span>buy tickets</span>
        <span>
          <IoIosArrowForward />
        </span>
      </Link>
      <Link
        to={`/event/${party.id}`}
        className="font-bold pb-4 duration-300 opacity-0 group-hover:opacity-100 inline-flex justify-start text-sm items-center px-4"
      >
        <span>More Details</span>
        <span>
          <IoIosArrowForward />
        </span>
      </Link>
      <p className="font-bold absolute bottom-4 duration-100 group-hover:hidden flex justify-start items-center mx-4">
        <span>Read More</span>
        <span>
          <IoIosArrowForward />
        </span>
      </p>
    </div>
  );
};

EventCard.propTypes = {
  party: PropTypes.object.isRequired,
};

export default EventCard;
