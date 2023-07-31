import Title from "../Components/Title";
import EventCard from "../Components/EventCard";
import useFetch from "../Hooks/useFetch";
import { useEffect } from "react";
import { useState } from "react";
import EventCardLoading from "../Components/EventCardLoading";
const OurEvents = () => {
  const { data, isLoading, error } = useFetch("/api/party/opened?page=1");
  const [partyList, setPartyList] = useState([]);
  useEffect(() => {
    if (!isLoading && !error) {
      setPartyList(data.data.data);
    }
  }, [data, isLoading, error]);

  return (
    <section className="relative w-full after:top-0 after:left-0 after:z-[-1] after:absolute after:w-full after:h-[75vh] after:bg-[#0C2024]/90 pt-4 mt-4">
      <div className="mt-8 w-[90%] mx-auto">
        <Title text1="our" text2="event" white={true} />
        <p className="text-white text-lg md:text-3xl">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration
        </p>

        <div className="mt-8 gap-8 flex justify-center items-center flex-wrap">
          {isLoading
            ? Array(8)
                .fill(0)
                .map((_, index) => <EventCardLoading key={index} />)
            : partyList.map((party) => (
                <EventCard key={party.id} party={party} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default OurEvents;
