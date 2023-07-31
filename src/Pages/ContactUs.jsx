import React from "react";
import { images } from "../Constant";
import ContactUsForm from "../Components/ContactUsForm";

const ContactUs = () => {

  return (
    <React.Fragment>
      <header className="relative h-screen w-screen">
        <div className="bg-primary relative h-screen w-screen">
          <img
            className="w-full h-full object-cover"
            src={images.intro1}
            alt=""
            loading="lazy"
          />
        </div>
      </header>
      <main className="w-full my-8">
        <div className="w-1/2 mx-auto p-5">
          <ContactUsForm buttonCenter={true} />
        </div>
      </main>
    </React.Fragment>
  );
};

export default ContactUs;
