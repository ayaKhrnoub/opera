import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";
import baseURL from "../Constant/URL";

export default function useLogout() {
  const { dispatch, token } = useAuthContext();
  const navigate = useNavigate();
  const logout = async () => {
    dispatch({ type: "SET_TOKEN", payload: "" });
    dispatch({ type: "SET_USER_INFORMATION", payload: {} });
    try {
      await axios.get(`${baseURL}/api/auth/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Cookies.remove("token");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
}
