import { useEffect, Fragment, useReducer } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineNumber, AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import AccountInputField from "../Components/AccountInputField";
import axios from "axios";
import baseURL from "../Constant/URL";
import { useAuthContext } from "../Context/AuthContext";

const initialState = {
  password: "",
  confirmPassword: "",
  code: "",
  isLoading: false,
  requestStatus: { isDone: false, message: "" },
  errors: { confirmPassword: "", password: "", code: "" },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_CODE":
      return { ...state, code: action.payload };
    case "SET_OTP":
      return { ...state, password: action.payload };
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

const ResetPassword = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const location = useLocation();
  const [state, dispatchState] = useReducer(reducer, initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "confirm password":
        dispatchState({ type: "SET_CONFIRM_PASSWORD", payload: value });
        break;
      case "password":
        dispatchState({ type: "SET_PASSWORD", payload: value });
        break;
      case "otp code":
        dispatchState({ type: "SET_CODE", payload: value });
        break;
      default:
        break;
    }
  };

  const validate = () => {
    let tempErrors = {
      confirmPassword: "",
      password: "",
      code: "",
    };

    tempErrors.password =
      state.password === ""
        ? "This field is required"
        : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(state.password)
        ? ""
        : "password format is not valid";

    tempErrors.confirmPassword =
      state.confirmPassword === ""
        ? "This field is required"
        : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(state.confirmPassword)
        ? ""
        : state.password !== state.confirmPassword
        ? "There is no match for the password"
        : "password format is not valid";

    tempErrors.code =
      state.code === ""
        ? "This field is required"
        : state.code.length !== 4
        ? "password format is not valid"
        : isNaN(+state.code)
        ? "The field must contain numbers only"
        : "";

    dispatchState({ type: "SET_ERRORS", payload: tempErrors });

    return Object.values(tempErrors).every((error) => error === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatchState({
      type: "SET_ERRORS",
      payload: { email: "", password: "", code: "" },
    });
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
          email: location.state?.email,
          password: state.password,
          confirm_password: state.password,
          code: state.code,
        };
        await axios.post(`${baseURL}/api/auth/new-password`, formData);
        navigate("/account/login", { replace: true });
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (Object.keys(user).length !== 0 || !location.state?.email)
    return <Navigate to="/" replace />;
  return (
    <Fragment>
      <div className="text-center mb-10">
        <h2 className="font-bold text-3xl text-gray-900 capitalize">
          set new password
        </h2>
      </div>
      {state.requestStatus.isDone ? (
        <p className="text-red-600 text-center text-lg">
          {state.requestStatus.message}
        </p>
      ) : null}
      <form onSubmit={handleSubmit}>
        <AccountInputField
          label="password"
          placeholder="************"
          value={state.password}
          onChange={handleChange}
          isPassword={true}
          Icon={<RiLockPasswordLine />}
          error={state.errors.password}
        />
        <AccountInputField
          label="confirm password"
          placeholder="************"
          value={state.confirmPassword}
          onChange={handleChange}
          isPassword={true}
          Icon={<RiLockPasswordLine />}
          error={state.errors.confirmPassword}
        />
        <div className="mb-5">
          <AccountInputField
            label="otp code"
            placeholder=""
            value={state.code}
            onChange={handleChange}
            isPassword={false}
            Icon={<AiOutlineNumber />}
            error={state.errors.code}
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
                "reset"
              )}
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default ResetPassword;
