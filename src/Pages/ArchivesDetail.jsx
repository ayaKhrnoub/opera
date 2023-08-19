import React, { useEffect, useState } from "react";
import { images } from "../Constant";
import ContactUs from "../Containers/ContactUs";
import useFetch from "../Hooks/useFetch";
import { useParams } from "react-router-dom";

function splitArray(array, lengths) {
  let result = [];
  let currentIndex = 0;

  lengths.forEach((length) => {
    result.push(array.slice(currentIndex, currentIndex + length));
    currentIndex += length;
  });

  while (currentIndex < array.length) {
    result.push(array.slice(currentIndex, currentIndex + lengths[2]));
    currentIndex += lengths[2];
  }

  return result;
}

const ArchivesDetail = () => {
  const { id } = useParams();
  const [imageList, setImageList] = useState([]);
  const { data, isLoading, error } = useFetch(`/api/party/get-archived/${id}`);

  useEffect(() => {
    if (!isLoading && !error) {
      setImageList(splitArray(data?.media, [5, 5, 5]));
    }
  }, [data, isLoading, error]);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(imageList);
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
          {imageList.map((group, i) => (
            <div
              key={i}
              className="w-10/12 py-6 mx-auto flex-col md:flex-row flex justify-center items-center gap-4"
            >
              <div className="flex-1 w-full">
                <img
                  src={group[0]}
                  className="w-full h-full object-cover"
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4 grid-rows-2">
                {group[1] ? (
                  <img
                    className="rounded-tl-[50px] w-full h-full object-cover"
                    loading="lazy"
                    src={group[1]}
                    alt=""
                  />
                ) : null}
                {group[2] ? (
                  <img
                    className="rounded-tr-[50px] w-full h-full object-cover"
                    loading="lazy"
                    src={group[2]}
                    alt=""
                  />
                ) : null}
                {group[3] ? (
                  <img
                    className="rounded-bl-[50px] w-full h-full object-cover"
                    loading="lazy"
                    src={group[3]}
                    alt=""
                  />
                ) : null}
                {group[4] ? (
                  <img
                    className="rounded-br-[50px] w-full h-full object-cover"
                    loading="lazy"
                    src={group[4]}
                    alt=""
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <ContactUs />
      </main>
    </React.Fragment>
  );
};

export default ArchivesDetail;
