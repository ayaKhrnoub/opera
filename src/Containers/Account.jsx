import { Outlet } from "react-router-dom";
import { images } from "../Constant";

const Account = () => {
  return (
    <div className="mt-16 min-h-100vh flex items-center justify-center px-5 py-5">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden max-w-[90%]">
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2">
            <img
              className="w-full h-full object-cover"
              src={images.intro1}
              alt=""
              loading="lazy"
            />
          </div>
          <div className="w-full md:w-1/2 py-5 px-5 md:px-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
