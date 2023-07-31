import React from "react";
import { Link } from "react-router-dom";

const RequiredAuth = () => {
  return (
    <React.Fragment>
      <div className="flex w-11/12  mx-auto my-8 justify-between relative items-end">
        <div
          className="w-[75px] mx-auto h-[50px] bg-[#8EA3AA] relative after:absolute
     after:w-[75px] after:h-[50px] after:-top-[50%] after:-right-[50%] after:bg-[#CAD2D3]/70"
        />
        <h2 className="font-bold w-[60%] mx-auto text-4xl">Oops!</h2>
      </div>
      <p className="w-[90%] mt-2 text-3xl text-start mx-auto">
        Looks like you need to be logged in to book.
      </p>
      <p className="w-[90%] mt-2 text-3xl text-start mx-auto">
        Don{"'"}t worry, registering is quick and easy!
      </p>
      <p className="w-[90%] mb-4 mt-2  text-3xl text-start mx-auto">
        Click here to log in or sign up.
      </p>
      <div className="flex justify-center items-center gap-3">
        <Link
          to="/account/login"
          className="capitalize bg-primary text-white py-1 hover:scale-105 transition-all duration-150 px-4 text-lg sm:text-xl rounded-lg"
          state={{ path: location.pathname }}
        >
          login
        </Link>
        <Link
          to={-1}
          className="capitalize bg-purple text-white py-1 hover:scale-105 transition-all duration-150 px-4 text-lg sm:text-xl rounded-lg"
        >
          back
        </Link>
      </div>
    </React.Fragment>
  );
};

export default RequiredAuth;
