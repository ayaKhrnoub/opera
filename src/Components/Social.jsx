import PropTypes from "prop-types";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { MdOutlineFacebook } from "react-icons/md";
import { GrYoutube } from "react-icons/gr";
const Social = ({ isWhite }) => {
  return (
    <div
      className={`${
        isWhite ? "text-white" : "text-black"
      } flex justify-end items-center w-1/3 gap-3`}
    >
      <a href="#">
        <AiOutlineTwitter className="w-5 h-5" />
        <span className="sr-only">twitter link</span>
      </a>
      <a href="#">
        <MdOutlineFacebook className="w-5 h-5" />
        <span className="sr-only">facebook link</span>
      </a>
      <a href="#">
        <AiFillInstagram className="w-5 h-5" />
        <span className="sr-only">instagram link</span>
      </a>
      <a href="#">
        <GrYoutube className="w-5 h-5" />
        <span className="sr-only">youtube link</span>
      </a>
    </div>
  );
};

Social.propTypes = {
  isWhite: PropTypes.bool,
};

export default Social;
