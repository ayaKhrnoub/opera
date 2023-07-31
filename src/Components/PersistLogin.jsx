import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import baseURL from "../Constant/URL";
import { useAuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import Loading from "../Pages/Loading";

const PersistLogin = () => {
  const { dispatch, token, loggedIn } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    async function verifyUser() {
      if (!Cookies.get("token")) {
        setLoading(true);
      }
      try {
        const response = await axios.get(`${baseURL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token ? token : Cookies.get("token")}`,
          },
        });
        if (!token)
          dispatch({ type: "SET_TOKEN", payload: Cookies.get("token") });
        dispatch({
          type: "SET_USER_INFORMATION",
          payload: response.data.data,
        });
      } catch (error) {
        if (error?.response?.status === 401) {
          Cookies.remove("token");
          navigate("/account/login");
          toast(
            "Oops, your session has timed out! Please log in again to continue using our application.",
            {
              position: "bottom-left",
              autoClose: 2000,
              pauseOnFocusLoss: false,
              pauseOnHover: false,
              draggable: true,
              type: "error",
              theme: "colored",
            }
          );
        } else setLoading(false);
      } finally {
        isMounted && setLoading(false);
      }
    }
    Cookies.get("token") || token ? verifyUser() : setLoading(false);

    return () => {
      isMounted = false;
    };
  }, [dispatch, loggedIn, navigate]);
  return loading ? <Loading /> : <Outlet />;
};

export default PersistLogin;
