import PropTypes from "prop-types";
import useFetch from "../Hooks/useFetch";
import Loading from "../Pages/Loading";

const Item = ({ title, text }) => {
  return (
    <div className="flex flex-col sm:flex-row w-4/5 mx-auto pb-4 text-xl font-semibold justify-center sm:items-center items-start">
      <h3 className="w-1/2 sm:w-1/3 capitalize">{title}</h3>
      <p className="pt-2 sm:pt-0 flex-1 text-2xl sm:text-xl">{text}</p>
    </div>
  );
};
Item.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const PartyInfo = ({ id }) => {
  const { data,  } = useFetch(`/api/party/show/${id}`);
  return (
    <div className="flex justify-center items-center flex-col">
      <Item title="orchestra name" text={data?.orchestra_name} />
      <Item title="theater name" text={data?.theater_name} />
      <Item title="date" text={data?.date} />
      <Item title="orchestra name" text={data?.orchestra_name} />
    </div>
  );
};

export default PartyInfo;

PartyInfo.propTypes = {
  id: PropTypes.number.isRequired,
};
