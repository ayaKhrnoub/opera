import { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";

const Global = createContext({});

const initialState = {
  user: {},
  token: "",
  loggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_INFORMATION":
      return { ...state, user: action.payload };
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_IS_LOGGED_IN":
      return { ...state, loggedIn: action.payload };
  }
};

const AuthContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Global.Provider
      value={{
        dispatch,
        ...state
      }}
    >
      {children}
    </Global.Provider>
  );
};

AuthContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  return useContext(Global);
}
