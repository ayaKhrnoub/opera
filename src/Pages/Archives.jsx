import { Link } from "react-router-dom";
import React from "react";
import PageHeader from "../Components/PageHeader";
import { images } from "../Constant";
import { BiSearch } from "react-icons/bi";
import { motion } from "framer-motion";
import useFetch from "../Hooks/useFetch";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import baseURL from "../Constant/URL";

const buttonVariant = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, repeatType: "reverse" },
  },
};

const Card = ({ title, path, img }) => {
  return (
    <div className="w-[300px] group relative h-[200px] overflow-hidden bg-red-600 rounded-xl">
      <div className="w-full  h-full">
        <img
          width={640}
          height={360}
          className="w-full h-full object-cover"
          src={img}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="absolute flex justify-center items-center inset-0 bg-black/40 translate-y-full group-hover:translate-y-0 duration-300">
        <motion.div
          className="w-full"
          variants={buttonVariant}
          whileHover="hover"
        >
          <Link
            to={`${path}`}
            className="bg-[#eee] text-center rounded-2xl flex justify-center items-center text-xl cursor-pointer w-4/5 mx-auto py-2"
          >
            {title}
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  path: PropTypes.number,
  img: PropTypes.string,
};

const Archives = () => {
  const [folderList, setFolderList] = useState([]);
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useFetch(
    `/api/party/opened?page=${page}&count=6`
  );
  const [maxPage, setMaxPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const saveScrollPosition = () => {
    window.sessionStorage.setItem("scrollPosition", window.pageYOffset);
  };
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!isLoading && !error) {
      setFolderList((prev) => [...prev, ...data.data.data]);
      setMaxPage(data.data.last_page);
      setItemsPerPage(data.data.per_page);
    }
  }, [isLoading, error, data]);

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem("scrollPosition");

    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition));
      sessionStorage.removeItem("scrollPosition");
    }
  }, [folderList]);

  const search = async (e) => {
    e.preventDefault();
    console.log("first");
    try {
      const response = await axios.get(`${baseURL}/api/party/search?name=${input}`);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className="mt-16">
      <PageHeader img={images.aboutHeader} text="Damascus Opera Archives" />
      <div className="w-[90%] mx-auto bg-[#CAD2D3] my-4 rounded-xl shadow-lg">
        <form onSubmit={search} className="flex py-4 w-6/12 mx-auto px-3 my-4">
          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
            <BiSearch className="text-2xl" />
          </div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="w-full bg-[#FEF5F5] -ml-10 pl-10 pr-3 py-2 rounded-xl border-none outline-none  focus:ring-primary focus:ring-2"
            placeholder="Search"
          />
        </form>
        <div className="w-[95%] mx-auto pb-4 flex flex-wrap gap-4 justify-center items-center">
          {isLoading && page === 1
            ? Array(itemsPerPage * page)
                .fill(0)
                .map((_, index) => (
                  <React.Fragment key={index}></React.Fragment>
                ))
            : // Otherwise, map over partyList and render EventCard components
              folderList.map((folder) => (
                <Card
                  path={folder.id}
                  img={folder.photo}
                  key={folder.id}
                  title={folder.name}
                />
              ))}
        </div>
        {page === maxPage ? null : (
          <div className="flex justify-center items-center pb-4">
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
      </div>
    </main>
  );
};

export default Archives;
