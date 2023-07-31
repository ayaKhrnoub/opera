import React, { useReducer, useEffect, useState } from "react";
import AccountInputField from "../Components/AccountInputField";
import { AiOutlineUser, AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { useAuthContext } from "../Context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Popup from "../Components/Popup";
import RequiredAuth from "../Components/RequiredAuth";
import baseURL from "../Constant/URL";
import axios from "axios";

const initialState = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  isLoading: false,
  requestStatus: { isDone: false, message: "" },
  errors: { firstName: "", lastName: "", phoneNumber: "" },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIRST_NAME":
      return { ...state, firstName: action.payload };
    case "SET_LAST_NAME":
      return { ...state, lastName: action.payload };
    case "SET_PHONE_NUMBER":
      return { ...state, phoneNumber: action.payload };
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

const Edit = () => {
  const [state, dispatchState] = useReducer(reducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user, token, dispatch } = useAuthContext();

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      dispatchState({
        type: "SET_FIRST_NAME",
        payload: user.first_name,
      });
      dispatchState({
        type: "SET_LAST_NAME",
        payload: user.last_name,
      });
      dispatchState({
        type: "SET_PHONE_NUMBER",
        payload: user.phone_number,
      });
    } else {
      setShowModal(true);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatchState({
      type: "SET_ERRORS",
      payload: { firstName: "", lastName: "", phoneNumber: "" },
    });

    if (validate()) {
      try {
        dispatchState({ type: "SET_LOADING", payload: true });

        const formData = {
          first_name: state.firstName,
          last_name: state.lastName,
          phone_number: state.phoneNumber,
        };
        const { data } = await axios.post(
          `${baseURL}/api/auth/update-profile`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch({ type: "SET_USER_INFORMATION", payload: data.data });
        navigate(-1, { replace: true });
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
          dispatchState({
            type: "SET_REQUEST_STATUS",
            payload: {
              isDone: true,
              message: JSON.stringify(error.response.data.message),
            },
          });
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
      default:
        break;
    }
  };

  const validate = () => {
    let tempErrors = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
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

    dispatchState({ type: "SET_ERRORS", payload: tempErrors });

    return Object.values(tempErrors).every((error) => error === "");
  };

  if (Object.keys(user).length === 0) return <Navigate to="/" replace />;
  return (
    <React.Fragment>
      <div className="text-center mb-10">
        <h2 className="font-bold text-3xl text-gray-900 capitalize">
          edit your information
        </h2>
      </div>
      {state.requestStatus.isDone ? (
        <p className="text-red-600 text-center text-lg">
          {state.requestStatus.message}
        </p>
      ) : null}
      <form onSubmit={handleSubmit}>
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
          Icon={<AiOutlineUser />}
          error={state.errors.lastName}
        />
        <AccountInputField
          label="phone number"
          placeholder=""
          value={state.phoneNumber}
          onChange={handleChange}
          Icon={<BsTelephone />}
          error={state.errors.phoneNumber}
        />
        <div className="flex flex-col justify-center items-center -mx-3">
          <div></div>
          <div className="w-full px-3 mb-5">
            <button
              type="submit"
              disabled={state.isLoading}
              className="flex justify-center items-center w-full max-w-xs text-2xl uppercase mx-auto bg-primary hover:bg-primary/80 disabled:cursor-wait
               disabled:bg-primary/80 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 text-white rounded-lg px-3 py-2 font-semibold"
            >
              {state.isLoading ? (
                <AiOutlineLoading3Quarters className="text-4xl text-center animate-spin" />
              ) : (
                <span>edit</span>
              )}
            </button>
          </div>
        </div>
      </form>
      <Popup isOpen={showModal} onClose={setShowModal}>
        <RequiredAuth />
      </Popup>
    </React.Fragment>
  );
};

export default Edit;
