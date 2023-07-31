/* eslint-disable no-unused-vars */
import { Datepicker, initTE } from "tw-elements";
import { useEffect } from "react";
import PropTypes from "prop-types";

const DateInput = ({ date, setDate, error }) => {
  useEffect(() => {
    initTE({ Datepicker });

    const datePicker = document.querySelector("#datepicker");
    new Datepicker(datePicker, {
      disablePast: true,
      confirmDateOnSelect: true,
      format: "yyyy/mm/dd",
    });

    datePicker.addEventListener("dateChange.te.datepicker", (input) => {
      setDate(input.date.toString());
    });
  }, [setDate]);
  return (
    <div id="datepicker" className="relative mt-4">
      <input
        type="text"
        onChange={(e) => setDate(e.target.value)}
        placeholder="date"
        data-te-datepicker-toggle-ref
        data-te-datepicker-toggle-button-ref
        data-te-format="dd, mmm, yyyy"
        className={`peer bg-[#0C2024]/20 pl-5 w-full h-12 outline-none py-2 px-3 placeholder:select-none placeholder:text-transparent rounded-3xl focus:outline-none ${
          error
            ? "focus:ring-0 focus:border-red-700 border-red-700"
            : "focus:ring-2 focus:border-primary focus:ring-primary"
        }`}
        id="date"
      />
      <label
        htmlFor="date"
        className={`absolute pointer-events-none capitalize select-none flex justify-center items-center gap-1 left-5 -top-1 transition-all px-1 duration-300 text-base
        peer-placeholder-shown:text-xl peer-placeholder-shown:top-2 peer-placeholder-shown:left-7
        peer-focus:left-5 peer-focus:-top-1 peer-focus:text-base ${
          error ? "text-red-700" : "text-black"
        }`}
      >
        date
      </label>
      <p className="text-red-700 pl-6 text-xl">{error}</p>
    </div>
  );
};

DateInput.propTypes = {
  date: PropTypes.string,
  error: PropTypes.string,
  setDate: PropTypes.func,
};

export default DateInput;
