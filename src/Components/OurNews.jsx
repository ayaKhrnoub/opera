import Title from "./Title";
import { images } from "../constant";
import WhatIsUp from "./WhatIsUp";

const OurNews = () => {
  return (
    <section className="pt-[100px] w-[90%] mx-auto">
      <Title text1="our" text2="news" />
      <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
        <WhatIsUp />
        <div className="flex-1">
          <img
            className="w-full h-full object-cover"
            src={images.news}
            height="100%"
            width="100%"
            alt=""
            loading="lazy"
          />
        </div>
        <div className="flex-1">
          <img
            className="w-full h-full object-cover"
            height="100%"
            width="100%"
            src={images.news}
            alt=""
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default OurNews;
