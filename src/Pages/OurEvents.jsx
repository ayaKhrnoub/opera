import React, { useEffect, useState } from "react";
import { images } from "../Constant";
import Title from "../Components/Title";
import EventCard from "../Components/EventCard";
import ContactUs from "../Containers/ContactUs";
import useFetch from "../Hooks/useFetch";
import EventCardLoading from "../Components/EventCardLoading";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const OurEvents = () => {
  // Define state variables
  const [page, setPage] = useState(1); // page number to fetch data from API
  const { data, isLoading, error } = useFetch(`/api/party/opened?page=${page}`); // fetch data from API using custom hook
  console.log(data)
  const [partyList, setPartyList] = useState([]); // array to store party data
  const [maxPage, setMaxPage] = useState(1); // maximum number of pages returned by API
  const [itemsPerPage, setItemsPerPage] = useState(8); // number of items per page returned by API

  // Save scroll position to session storage
  const saveScrollPosition = () => {
    window.sessionStorage.setItem("scrollPosition", window.pageYOffset);
  };

  // Update partyList and maxPage when data is fetched from API
  useEffect(() => {
    if (!isLoading && !error) {
      setPartyList((prev) => [...prev, ...data.data.data]);
      setMaxPage(data.data.last_page);
      setItemsPerPage(data.data.per_page);
    }
  }, [data, isLoading, error]);

  // Restore scroll position from session storage when partyList is updated
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem("scrollPosition");

    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition));
      sessionStorage.removeItem("scrollPosition");
    }
  }, [partyList]);

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
      <main className="w-full mb-8 relative after:top-0 after:left-0 after:z-[-1] after:absolute after:w-full after:h-[75vh] after:bg-[#0C2024]/90 pt-4 ">
        <div className="w-10/12 mx-auto">
          <Title text1="our" text2="event" white={true} />
          <p className="text-white py-4 mx-auto text-3xl">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration
          </p>
          <div className="mt-8 gap-8 flex justify-center items-center flex-wrap">
            {/* If data is still being fetched, show loading placeholders */}
            {isLoading && page === 1
              ? Array(itemsPerPage * page)
                  .fill(0)
                  .map((_, index) => <EventCardLoading key={index} />)
              : // Otherwise, map over partyList and render EventCard components
                partyList.map((party) => (
                  <EventCard key={party.id} party={party} />
                ))}
          </div>
        </div>
        {page === maxPage ? null : (
          <div className="flex justify-center items-center mt-12">
            {/* Button to load more data */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                saveScrollPosition();
                // If current page is already the last page, do nothing
                if (page === maxPage) return;
                // Otherwise, increment page number to fetch next page of data
                else setPage((prev) => prev + 1);
              }}
              disabled={isLoading}
              className="bg-secondary uppercase w-24 flex justify-center disabled:bg-secondary/80 items-center py-2 rounded-lg mt-5 text-xl text-white hover:bg-secondary/80 active:scale-105"
            >
              {/* If data is still being fetched and it's not the first page, show loading icon */}
              {isLoading && page > 1 ? (
                <AiOutlineLoading3Quarters className="text-3xl animate-spin" />
              ) : (
                // Otherwise, show "more" text
                <span>more</span>
              )}
            </button>
          </div>
        )}
        <ContactUs />
      </main>
    </React.Fragment>
  );
};

export default OurEvents;
