import React from "react";
import { Navbar, Footer } from "./Containers";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Root = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
      <ToastContainer />
      <Footer />
    </React.Fragment>
  );
};

export default Root;
