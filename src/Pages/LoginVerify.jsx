import React, { useState } from "react";
import OTPInput from "../Components/OTPInput";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import baseURL from "../Constant/URL";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../Context/AuthContext";
import { useEffect } from "react";
import Loading from "./Loading";

const LoginVerify = () => {
  const [otp, setOtp] = useState("");
  const { dispatch } = useAuthContext();
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const request = async () => {
      setRequestLoading(true);
      try {
        await axios.post(`${baseURL}/api/auth/forget-password`, {
          email: state?.email,
        });
      } catch (error) {
        if (!error.response) {
          toast("Please check your internet connection", {
            position: "bottom-left",
            autoClose: 5000,
            pauseOnHover: false,
            type: "error",
            theme: "colored",
          });
        } else {
          toast(error.response.data.message, {
            position: "bottom-left",
            autoClose: 5000,
            pauseOnHover: false,
            type: "error",
            theme: "colored",
          });
        }
      } finally {
        setRequestLoading(false);
      }
    };
    if (state?.email) {
      request();
    }
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = {
        email: state.email,
        code: otp,
      };
      const response = await axios.post(`${baseURL}/api/auth/verify`, formData);
      dispatch({ type: "SET_TOKEN", payload: response.data.data.token });
      dispatch({ type: "SET_IS_LOGGED_IN", state: true });
      navigate("/", { replace: true });
    } catch (error) {
      if (!error.response) {
        toast("Please check your internet connection", {
          position: "bottom-left",
          autoClose: 5000,
          pauseOnHover: false,
          type: "error",
          theme: "colored",
        });
      } else {
        toast(error.response.data.message, {
          position: "bottom-left",
          autoClose: 5000,
          pauseOnHover: false,
          type: "error",
          theme: "colored",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  if (requestLoading) return <Loading />;
  return (
    <React.Fragment>
      <div className="text-center mb-2">
        <h2 className="font-bold text-2xl sm:text-4xl text-gray-900 capitalize">
          verify your account
        </h2>
      </div>
      <p className="py-4 text-base text-center sm:text-xl">
        We have sent a verification code to your email, please paste it here to
        complete the account creation process
      </p>
      <form onSubmit={handleSubmit}>
        <OTPInput valueLength={4} otp={otp} setOtp={setOtp} />
        <div className="flex justify-center gap-4 pt-4 items-center">
          <button
            disabled={isLoading}
            className="flex justify-center items-center w-1/2 max-w-xs disabled:cursor-wait disabled:hover:scale-100 disabled:bg-primary/80 text-2xl uppercase mx-auto bg-primary hover:bg-primary/80 transition-all duration-300 hover:scale-105 text-white rounded-lg px-3 py-2 font-semibold"
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="text-4xl text-center animate-spin" />
            ) : (
              <span>verify</span>
            )}
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default LoginVerify;
