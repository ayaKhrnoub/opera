import React from "react";
import Introduction from "../Containers/Introduction";
import Section from "../Components/Section";
import OurEvents from "../Containers/OurEvents";
import OurNews from "../Components/OurNews";
import ContactUs from "../Containers/ContactUs";
import a from "../assets/image/welcome.png"
const Home = () => {
  return (
    <React.Fragment>
      <Introduction />
      <Section image={a}/>
      <OurEvents />
      <OurNews />
      <ContactUs />
    </React.Fragment>
  );
};

export default Home;
