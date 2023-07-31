import React from "react";
import { images } from "../Constant";
import ContactUs from "../Containers/ContactUs";
const ArchivesDetail = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
        <div className="w-9/12 mx-auto p-5 rounded-xl shadow-md bg-[#CAD2D3]">
          <nav className="capitalize flex gap-8 justify-center items-center">
            <button className="text-5xl italic capitalize font-semibold text-black">
              pics
            </button>
            <button className="text-5xl italic capitalize font-semibold text-black">
              videos
            </button>
          </nav>
          <div className="w-10/12 pt-6 mx-auto flex-col md:flex-row flex justify-center items-center gap-4">
            <div className="flex-1">
              <img src={images.news} alt="" loading="lazy" />
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4 grid-rows-2">
              <img className="rounded-tl-[50px] object-cover" loading="lazy" src={images.news} alt="" />
              <img className="rounded-tr-[50px] object-cover" loading="lazy" src={images.news} alt="" />
              <img className="rounded-bl-[50px] object-cover" loading="lazy" src={images.news} alt="" />
              <img className="rounded-br-[50px] object-cover" loading="lazy" src={images.news} alt="" />
            </div>
          </div>
          <div className="text-center mt-12">
            <button className="bg-secondary uppercase px-8 py-2 rounded-lg mt-5 text-xl text-white hover:bg-secondary/80 active:scale-105">
              more
            </button>
          </div>
        </div>
        <ContactUs />
      </main>
    </React.Fragment>
  );
};

export default ArchivesDetail;
