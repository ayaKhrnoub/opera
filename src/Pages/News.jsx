import React from "react";
import Section from "../Components/Section";
import ContactUs from "../Containers/ContactUs";
import Line from "../Components/Line";
import PageHeader from "../Components/PageHeader";
import { images } from "../Constant";
import useFetch from "../Hooks/useFetch";
import Loading from "../Pages/Loading";
import { useState } from "react";
import { useEffect } from "react";

const News = () => {
  const { data, isLoading, error } = useFetch("/api/section/news");
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    if (!isLoading && !error) setNewsList(data.data);
  }, [isLoading, error, data]);
  if (isLoading) return <Loading />;
  return (
    <main>
      <PageHeader overLay={true} img={images.newsHeader} text="Opera News" />

      {newsList.map((news, index) => (
        <React.Fragment key={news.id}>
          <Section
            button={false}
            dirLtr={index % 2 !== 0}
            image={news.image}
            text={news.text}
            title={news.title}
          />
          <Line />
        </React.Fragment>
      ))}
      <ContactUs />
    </main>
  );
};

export default News;
