import PropTypes from "prop-types";
import { useAuthContext } from "../Context/AuthContext";
import { Link, Navigate } from "react-router-dom";

const Item = ({ title, text }) => {
  return (
    <div className="flex flex-col sm:flex-row w-4/5 mx-auto pb-4 text-xl font-semibold justify-center sm:items-center items-start">
      <h3 className="w-1/2 sm:w-1/3 capitalize">{title}</h3>
      <p className="pt-2 sm:pt-0 flex-1 text-2xl sm:text-xl">{text}</p>
    </div>
  );
};
Item.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const Profile = () => {
  const { user } = useAuthContext();
  if (Object.keys(user).length === 0) return <Navigate to="/" replace />;
  return (
    <div className="mt-16 min-h-100vh flex items-center justify-center px-5 py-5">
      <div className="w-[95%] sm:w-3/5">
        <div className="bg-primary/20 py-8 rounded-3xl shadow-xl w-full overflow-hidden">
          <h1 className="text-4xl w-4/5 mx-auto capitalize pb-4 text-center font-bold">
            my profile
          </h1>
          <Item title="first name :" text={user.first_name} />
          <Item title="last name :" text={user.last_name} />
          <Item title="phone number :" text={user.phone_number} />
          <Item title="email :" text={user.email} />
          <div className="flex justify-center pt-4 items-center">
            <Link
              to="/account/edit"
              className="bg-primary capitalize text-white py-1 active:scale-110 hover:scale-105 transition-all duration-150 px-4 text-2xl rounded-lg"
            >
              edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
