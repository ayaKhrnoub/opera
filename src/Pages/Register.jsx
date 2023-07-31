import React, { useReducer } from "react";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { Navigate, useNavigate } from "react-router-dom";
import AccountInputField from "../Components/AccountInputField";
import axios from "axios";
import baseURL from "../Constant/URL";
import { useAuthContext } from "../Context/AuthContext";

const initialState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  password: "",
  email: "",
  confirmPassword: "",
  isLoading: false,
  requestStatus: { isDone: false, message: "" },
  errors: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIRST_NAME":
      return { ...state, firstName: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_LAST_NAME":
      return { ...state, lastName: action.payload };
    case "SET_PHONE_NUMBER":
      return { ...state, phoneNumber: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_REQUEST_STATUS":
      return { ...state, requestStatus: action.payload };
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    default:
      return state;
  }
}

const Register = () => {
  const [state, dispatchState] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatchState({
      type: "SET_REQUEST_STATUS",
      payload: {
        isDone: false,
        message: "",
      },
    });
    dispatchState({
      type: "SET_ERRORS",
      payload: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        email: "",
      },
    });

    if (validate()) {
      try {
        dispatchState({ type: "SET_LOADING", payload: true });

        const formData = {
          first_name: state.firstName,
          last_name: state.lastName,
          phone_number: state.phoneNumber,
          email: state.email,
          password: state.password,
          c_password: state.confirmPassword,
        };
        await axios.post(`${baseURL}/api/auth/register`, formData);
        navigate("/account/verify", {
          replace: true,
          state: { email: state.email },
        });
      } catch (error) {
        if (!error.response) {
          dispatchState({
            type: "SET_REQUEST_STATUS",
            payload: {
              isDone: true,
              message: "Please check your internet connection",
            },
          });
        } else {
          if (error.response.status === 500) {
            dispatchState({
              type: "SET_REQUEST_STATUS",
              payload: {
                isDone: true,
                message:
                  "The phone number, email or username has already been taken",
              },
            });
          } else {
            dispatchState({
              type: "SET_REQUEST_STATUS",
              payload: {
                isDone: true,
                message: JSON.stringify(error.response.data.message),
              },
            });
          }
        }
      } finally {
        dispatchState({ type: "SET_LOADING", payload: false });
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "first name":
        dispatchState({ type: "SET_FIRST_NAME", payload: value });
        break;
      case "last name":
        dispatchState({ type: "SET_LAST_NAME", payload: value });
        break;
      case "phone number":
        dispatchState({ type: "SET_PHONE_NUMBER", payload: value });
        break;
      case "email":
        dispatchState({ type: "SET_EMAIL", payload: value });
        break;
      case "password":
        dispatchState({ type: "SET_PASSWORD", payload: value });
        break;
      case "confirm password":
        dispatchState({ type: "SET_CONFIRM_PASSWORD", payload: value });
        break;
      default:
        break;
    }
  };

  const validate = () => {
    let tempErrors = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      username: "",
    };
    tempErrors.firstName = state.firstName ? "" : "This field is required";
    tempErrors.lastName = state.lastName ? "" : "This field is required";
    tempErrors.phoneNumber =
      state.phoneNumber === ""
        ? "This field is required"
        : /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
            state.phoneNumber
          )
        ? ""
        : "phone number format is not valid";

    tempErrors.password =
      state.password === ""
        ? "This field is required"
        : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(state.password)
        ? ""
        : "password format is not valid";
    tempErrors.confirmPassword =
      state.confirmPassword === ""
        ? "This field is required"
        : state.confirmPassword === state.password
        ? ""
        : "There is no match for the password";

    tempErrors.email =
      state.email === ""
        ? "This field is required"
        : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.email)
        ? ""
        : "email format is not valid";

    dispatchState({ type: "SET_ERRORS", payload: tempErrors });

    return Object.values(tempErrors).every((error) => error === "");
  };
  if (Object.keys(user).length !== 0) return <Navigate to="/" replace />;
  return (
    <React.Fragment>
      <div className="text-center mb-5">
        <h2 className="font-bold text-3xl text-gray-900 capitalize">
          create new account
        </h2>
      </div>
      {state.requestStatus.isDone ? (
        <p className="text-red-600 text-center text-lg">
          {state.requestStatus.message}
        </p>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center gap-4">
          <AccountInputField
            label="first name"
            placeholder=""
            value={state.firstName}
            onChange={handleChange}
            isPassword={false}
            Icon={<AiOutlineUser />}
            error={state.errors.firstName}
          />
          <AccountInputField
            label="last name"
            placeholder=""
            value={state.lastName}
            onChange={handleChange}
            isPassword={false}
            Icon={<AiOutlineUser />}
            error={state.errors.lastName}
          />
        </div>
        <AccountInputField
          label="email"
          placeholder=""
          value={state.email}
          onChange={handleChange}
          isPassword={false}
          Icon={<AiOutlineMail />}
          error={state.errors.email}
        />
        <AccountInputField
          label="phone number"
          placeholder=""
          value={state.phoneNumber}
          onChange={handleChange}
          isPassword={false}
          Icon={<BsTelephone />}
          error={state.errors.phoneNumber}
        />
        <AccountInputField
          label="password"
          placeholder=""
          value={state.password}
          onChange={handleChange}
          isPassword={true}
          Icon={<RiLockPasswordLine />}
          error={state.errors.password}
        />
        <AccountInputField
          label="confirm password"
          placeholder=""
          value={state.confirmPassword}
          onChange={handleChange}
          isPassword={true}
          Icon={<RiLockPasswordLine />}
          error={state.errors.confirmPassword}
        />
        <div className="flex mt-4 flex-col justify-center items-center">
          <div className="w-full px-3 mb-2">
            <button
              type="submit"
              disabled={state.isLoading}
              className="flex justify-center items-center w-full max-w-xs text-2xl uppercase mx-auto bg-primary hover:bg-primary/80 transition-all duration-300 hover:scale-105 text-white rounded-lg px-3 py-2 font-semibold"
            >
              {state.isLoading ? (
                <AiOutlineLoading3Quarters className="text-4xl text-center animate-spin" />
              ) : (
                <span>register</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Register;
