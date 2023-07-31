import useFetch from "../Hooks/useFetch";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import PartyInfo from "../Components/PartyInfo";
import { useState } from "react";
import Popup from "../Components/Popup";
import QRCode from "react-qr-code";

const TicketInformation = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetch(`/api/party/my-ticket/${id}`);
  const [showModal, setShowModal] = useState(false);

  if (isLoading) return <Loading />;
  return (
    <div className="mt-16 min-h-100vh flex items-center justify-center px-5 py-5">
      <div className="w-[95%] sm:w-3/5">
        <div className="bg-primary/20 py-8 rounded-3xl shadow-xl w-full overflow-hidden">
          <h1 className="text-4xl w-3/5 mx-auto capitalize pb-4 text-center font-bold">
            {data?.data?.party_name}
          </h1>
          <PartyInfo id={data?.data?.party_id} />
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="flex justify-center items-center w-56 max-w-xs text-lg uppercase mx-auto bg-primary hover:bg-primary/80 disabled:cursor-wait
               disabled:bg-primary/80 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 text-white rounded-lg px-3 py-2 font-semibold"
            >
              get QR code
            </button>
          </div>
        </div>
      </div>
      <Popup isOpen={showModal} clickOutSide={true} onClose={setShowModal}>
        <div className="w-full flex justify-center p-4 items-center">
          <QRCode value={data?.data?.id} />
        </div>
      </Popup>
    </div>
  );
};

export default TicketInformation;
