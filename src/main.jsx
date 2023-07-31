import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./router";
import { RouterProvider } from "react-router-dom";
import AuthContext from "./Context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContext>
    <RouterProvider router={App} />
  </AuthContext>
);
