import React from "react";
import Section from "../Components/Section";
import ContactUs from "../Containers/ContactUs";
import Line from "../Components/Line";
import { images } from "../Constant";
import PageHeader from "../Components/PageHeader";
import a from "../assets/image/welcome.png"
const AboutUs = () => {
  return (
    <React.Fragment>
      <PageHeader img={images.aboutHeader} text="Damascus Opera" />
      <Section image={a} button={false} />
      <Line />
      <Section image={a} button={false} dirLtr={true} />
      <Line />
      <ContactUs />
    </React.Fragment>
  );
};

export default AboutUs;
