import React from "react";
import Introduction from "../Containers/Introduction";
import Section from "../Components/Section";
import OurEvents from "../Containers/OurEvents";
import OurNews from "../Components/OurNews";
import ContactUs from "../Containers/ContactUs";

const Home = () => {
  return (
    <React.Fragment>
      <Introduction />
      <Section button={true} />
      <OurEvents />
      <OurNews />
      <ContactUs />
    </React.Fragment>
  );
};

export default Home;
