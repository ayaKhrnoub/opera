import Title from "../Components/Title";
import WhatIsUp from "../Components/WhatIsUp";
import ContactUsForm from "../Components/ContactUsForm";
import { images } from "../Constant";

const ContactUs = () => {
  return (
    <section className="pt-[100px] w-[90%] mx-auto">
      <Title text1="contact" text2="us" />
      <div className="flex flex-col justify-center lg:flex lg:flex-row sm:grid grid-cols-2 grid-rows-2 gap-6">
        <div className="sm:col-span-full flex-1">
          <WhatIsUp />
        </div>
        <div className="w-full h-full flex-1 z-20 relative">
          <img
            className="w-full h-full mx-auto md:w-full object-cover"
            src={images.contactImg}
            alt=""
            loading="lazy"
          />
        </div>
        <ContactUsForm buttonCenter={false} />
      </div>
    </section>
  );
};

export default ContactUs;
