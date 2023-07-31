import { Fragment } from "react";
import { AiOutlineLoading3Quarters, AiOutlineUser } from "react-icons/ai";
import AccountInputField from "../Components/AccountInputField";
import { useNavigate } from "react-router-dom";
import { useReducer } from "react";
import axios from "axios";
import baseURL from "../Constant/URL";

const initialState = {
  email: "",
  password: "",
  isLoading: false,
  requestStatus: { isDone: false, message: "" },
  errors: { email: "", password: "" },
  rememberMe: false,
  isVerified: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
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
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [state, dispatchState] = useReducer(reducer, initialState);

  const validate = () => {
    let tempErrors = {
      email: "",
    };
    tempErrors.email =
      state.email === ""
        ? "This field is required"
        : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.email)
        ? ""
        : "email format is not valid";

    dispatchState({ type: "SET_ERRORS", payload: tempErrors });

    return Object.values(tempErrors).every((error) => error === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatchState({ type: "SET_ERRORS", payload: { email: "", password: "" } });
    dispatchState({
      type: "SET_REQUEST_STATUS",
      payload: {
        isDone: true,
        message: "",
      },
    });

    if (validate()) {
      try {
        dispatchState({ type: "SET_LOADING", payload: true });

        const formData = {
          email: state.email,
        };
        await axios.post(`${baseURL}/api/auth/forget-password`, formData);
        navigate("reset", { state: { email: state.email } });
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
              message: error.response.data.message,
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
      case "email":
        dispatchState({ type: "SET_EMAIL", payload: value });
        break;
      default:
        break;
    }
  };
  return (
    <Fragment>
      <div className="text-center mb-2">
        <h2 className="font-bold text-3xl text-gray-900 capitalize">
          forget password
        </h2>
      </div>
      <div className="text-center mb-10">
        <h3 className="font-bold text-2xl text-primary capitalize">
          please enter your email
        </h3>
      </div>

      {state.requestStatus.isDone ? (
        <p className="text-red-600 text-center text-lg">
          {state.requestStatus.message}
        </p>
      ) : null}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <AccountInputField
            label="email"
            placeholder="example@example.com"
            value={state.email}
            onChange={handleChange}
            isPassword={false}
            Icon={<AiOutlineUser />}
            error={state.errors.email}
          />
        </div>
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
                <span>login</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default ForgetPassword;
