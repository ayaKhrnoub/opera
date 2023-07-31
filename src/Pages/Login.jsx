import { useEffect, Fragment, useReducer } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import Cookies from "js-cookie";
import AccountInputField from "../Components/AccountInputField";
import axios from "axios";
import baseURL from "../Constant/URL";
import { useAuthContext } from "../Context/AuthContext";

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
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_REQUEST_STATUS":
      return { ...state, requestStatus: action.payload };
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    case "SET_REMEMBER_ME":
      return { ...state, rememberMe: action.payload };
    case "SET_IS_VERIFIED":
      return { ...state, isVerified: action.payload };
    default:
      return state;
  }
}

const Login = () => {
  const navigate = useNavigate();
  const { dispatch, user } = useAuthContext();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  const [state, dispatchState] = useReducer(reducer, initialState);

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatchState({ type: "SET_ERRORS", payload: { email: "", password: "" } });
    dispatchState({ type: "SET_IS_VERIFIED", payload: false });
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
          password: state.password,
        };
        const response = await axios.post(
          `${baseURL}/api/auth/login`,
          formData
        );
        dispatch({ type: "SET_TOKEN", payload: response.data.data.token });
        dispatch({ type: "SET_IS_LOGGED_IN", state: true });
        if (state.rememberMe)
          Cookies.set("token", response.data.data.token, {
            expires: 30,
            path: "/",
          });
        navigate(redirectPath, { replace: true });
      } catch (error) {
        if (!error.response) {
          dispatchState({
            type: "SET_REQUEST_STATUS",
            payload: {
              isDone: true,
              message: "Please check your internet connection",
            },
          });
        } else if (error.response.status === 401) {
          dispatchState({
            type: "SET_REQUEST_STATUS",
            payload: {
              isDone: true,
              message: error.response.data.message,
            },
          });
          if (error.response.data.message === "Account must be verified.") {
            dispatchState({
              type: "SET_IS_VERIFIED",
              payload: true,
            });
          }
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
      case "password":
        dispatchState({ type: "SET_PASSWORD", payload: value });
        break;
      default:
        break;
    }
  };
  const handleCheck = (event) => {
    dispatchState({ type: "SET_REMEMBER_ME", payload: event.target.checked });
  };

  const validate = () => {
    let tempErrors = {
      email: "",
      password: "",
    };

    tempErrors.password = state.password ? "" : "This field is required";
    tempErrors.email =
      state.email === ""
        ? "This field is required"
        : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.email)
        ? ""
        : "email format is not valid";

    dispatchState({ type: "SET_ERRORS", payload: tempErrors });

    return Object.values(tempErrors).every((error) => error === "");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (Object.keys(user).length !== 0) return <Navigate to="/" replace />;
  return (
    <Fragment>
      <div className="text-center mb-10">
        <h2 className="font-bold text-3xl text-gray-900 capitalize">login</h2>
      </div>
      {state.requestStatus.isDone ? (
        <p className="text-red-600 text-center text-lg">
          {state.requestStatus.message}
        </p>
      ) : null}
      {state.isVerified ? (
        <Link
          state={{ email: state.email }}
          to="/account/login/verify"
          className="text-red-600 block text-center hover:underline text-lg"
        >
          verify your account
        </Link>
      ) : null}
      <form onSubmit={handleSubmit}>
        <AccountInputField
          label="email"
          placeholder="example@example.com"
          value={state.email}
          onChange={handleChange}
          isPassword={false}
          Icon={<AiOutlineUser />}
          error={state.errors.email}
        />
        <AccountInputField
          label="password"
          placeholder="************"
          value={state.password}
          onChange={handleChange}
          isPassword={true}
          Icon={<RiLockPasswordLine />}
          error={state.errors.password}
        />
        <div className="flex justify-between px-3 items-center mb-5 -mx-3">
          <div className="flex items-center">
            <input
              name="remember-me"
              id="remember-me"
              type="checkbox"
              value={state.rememberMe}
              onChange={handleCheck}
              className="rounded-sm text-primary focus:ring-0"
            />
            <label
              htmlFor="remember-me"
              className="capitalize ml-2 font-semibold px-1"
            >
              remember me
            </label>
          </div>
          <div>
            <Link
              to="/account/forget-password"
              className="w-full flex hover:text-primary justify-center items-center"
            >
              forget password?
            </Link>
          </div>
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
                "login"
              )}
            </button>
          </div>
          <div className="flex hover:text-primary -mx-3">
            <Link to="/account/register">create new account</Link>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
