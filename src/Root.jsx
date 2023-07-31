import React from "react";
import { Navbar, Footer } from "./Containers";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";


const Root = () => {
  const {pathname} = useLocation()
  useEffect(()=>{
    window.scrollTo({
      top:0,
      left:0,
      behavior:"instant"
    })
  }, [pathname])
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
