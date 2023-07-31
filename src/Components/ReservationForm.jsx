import { useState, useCallback } from "react";
import InputField from "./InputField";
import TimeInput from "./TimeInput";
import DateInput from "./DateInput";
import Popup from "./Popup";
import PropTypes from "prop-types";
import axios from "axios";
import baseURL from "../Constant/URL";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const FormData = ({ title, text }) => {
  return (
    <div className="w-full mb-2 flex justify-center items-center">
      <p className="flex-1 text-2xl">{title}:</p>
      <p className="flex-1 text-2xl">{text}</p>
    </div>
  );
};

FormData.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}

function convertTime(timeString) {
  const timeArray = timeString.split(" ");
  let hours = parseInt(timeArray[0].split(":")[0]);
  const minutes = parseInt(timeArray[0].split(":")[1]);
  const amPm = timeArray[1];

  if (amPm === "PM" && hours < 12) {
    hours = hours + 12;
  } else if (amPm === "AM" && hours === 12) {
    hours = hours - 12;
  }

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedTime = `${formattedHours}:${formattedMinutes}`;

  return formattedTime;
}

const ReservationForm = () => {
  const { token } = useAuthContext();
  // Define state variables using the useState hook
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [reasonOfParty, setReasonOfParty] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = useCallback(() => {
    let tempErrors = {
      email: "",
      name: "",
      phone: "",
      reasonOfParty: "",
      date: "",
      time: "",
    };
    tempErrors.name = name ? "" : "This field is required";
    tempErrors.reasonOfParty = reasonOfParty ? "" : "This field is required";
    tempErrors.date = date ? "" : "This field is required";
    tempErrors.time = time ? "" : "This field is required";
    tempErrors.email =
      email === ""
        ? "This field is required"
        : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
        ? ""
        : "email format is not valid";
    tempErrors.phone =
      phone === ""
        ? "This field is required"
        : /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s/0-9]*$/g.test(phone)
        ? ""
        : "phone number format is not valid";
    tempErrors.numberOfPeople =
      numberOfPeople === ""
        ? "This field is required"
        : /^\d+$/.test(numberOfPeople)
        ? ""
        : "number only";

    setErrors(tempErrors);

    return Object.values(tempErrors).every((error) => error === "");
  }, [date, name, email, numberOfPeople, reasonOfParty, time, phone]);

  // Define a callback to handle form submission
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setIsLoading(true);
      try {
        const formData = {
          email: email,
          name: name,
          phone: phone,
          number_of_people: numberOfPeople,
          party_reason: reasonOfParty,
          date: `${formatDate(new Date(date))} ${convertTime(time)}:00`,
        };
        const response = await axios.post(
          `${baseURL}/api/theater/book`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setShowPopup(false);
        setName("");
        setEmail("");
        setNumberOfPeople("");
        setReasonOfParty("");
        setTime("");
        setPhone("");
        setDate("");
        toast(response.data.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          type: "success",
          theme: "colored",
        });
      } catch (error) {
        if (!error.response) {
          setShowPopup(false);
          toast("Please check your internet connection", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            type: "error",
            theme: "colored",
          });
        } else {
          setShowPopup(false);
          toast(error.response.data.message, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            type: "error",
            theme: "colored",
          });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [name, email, phone, reasonOfParty, numberOfPeople, date, time, token]
  );
  const handleClick = useCallback(() => {
    if (validate()) setShowPopup(true);
  }, [validate]);

  // Return the form with input fields and a submit button
  return (
    <div className="w-11/12 mx-auto">
      {/* Display a heading for the form */}
      <h3 className="text-xl font-bold mb-4 pl-7">Please Sent Forms</h3>
      <div className="w-full px-3 mb-4">
        {/* Display an input field for name*/}
        <InputField
          error={errors.name}
          value={name}
          onChange={setName}
          label="name:"
        />
      </div>
      <div className="w-full px-3 mb-4">
        {/* Display an input field for email*/}
        <InputField
          error={errors.email}
          value={email}
          onChange={setEmail}
          label="email:"
        />
      </div>
      <div className="w-full px-3 mb-4">
        {/* Display an input field for phone*/}
        <InputField
          error={errors.phone}
          value={phone}
          onChange={setPhone}
          label="phone:"
        />
      </div>
      <div className="w-full px-3 mb-4">
        {/*Display an input field for number of people*/}
        <InputField
          value={numberOfPeople}
          error={errors.numberOfPeople}
          onChange={setNumberOfPeople}
          label="number of people:"
        />
      </div>
      <div className="w-full px-3 mb-4">
        {/* Display an input field for reason of party*/}
        <InputField
          error={errors.reasonOfParty}
          value={reasonOfParty}
          onChange={setReasonOfParty}
          label="reason of party:"
        />
      </div>
      <div className="w-full px-3 mb-4">
        {/* Display an input field for date*/}
        <DateInput error={errors.date} date={date} setDate={setDate} />
      </div>
      <div className="w-full px-3 mb-4">
        {/*Display an input field for time of party*/}
        <TimeInput error={errors.time} setTime={setTime} />
      </div>
      <div className="text-center">
        <button
          onClick={handleClick}
          className="bg-secondary uppercase px-8 py-2 rounded-lg mt-5 text-xl text-white hover:bg-secondary/80 active:scale-105"
        >
          sent
        </button>
      </div>
      <Popup isOpen={showPopup} onClose={setShowPopup} clickOutSide>
        <div className="w-[90%] mx-auto">
          <div className="flex w-11/12  mx-auto my-8 justify-between relative items-end">
            <div
              className="w-[75px] mx-auto h-[50px] bg-[#8EA3AA] relative after:absolute
     after:w-[75px] after:h-[50px] after:-top-[50%] after:-right-[50%] after:bg-[#CAD2D3]/70"
            />
            <h2 className="font-bold capitalize w-[60%] text-4xl">
              confirm data
            </h2>
          </div>
          <FormData title="name" text={name} />
          <FormData title="email" text={email} />
          <FormData title="phone" text={phone} />
          <FormData title="number of people" text={numberOfPeople} />
          <FormData title="reason of party" text={reasonOfParty} />
          <FormData title="date" text={new Date(date).toDateString()} />
          <FormData title="time" text={time} />
          <div className="flex justify-center gap-4 items-center">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="capitalize disabled:cursor-wait disabled:hover:scale-100 disabled:bg-primary/80 bg-primary flex justify-center items-center text-white py-1 hover:scale-105 transition-all duration-150 w-20 text-lg sm:text-xl rounded-lg"
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="text-3xl animate-spin" />
              ) : (
                "submit"
              )}
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="capitalize bg-purple text-white py-1 hover:scale-105 transition-all duration-150 px-4 text-lg sm:text-xl rounded-lg"
            >
              back
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default ReservationForm;
