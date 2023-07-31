import { initTE, Timepicker, Input } from "tw-elements";
import { useEffect } from "react";
import PropTypes from "prop-types";

const TimeInput = ({ time, setTime, error }) => {
  useEffect(() => {
    initTE({ Timepicker, Input });

    const timePickerValue = document.querySelector("#timepicker-value");
    new Timepicker(timePickerValue);

    timePickerValue.addEventListener("input.te.timepicker", (input) => {
      if (input.target.value !== "") setTime(input.target.value);
      else setTime("");
    });
  }, [setTime]);
  return (
    <div
      data-te-with-icon="false"
      id="timepicker-value"
      className="relative mt-4"
    >
      <input
        readOnly
        value={time === "" ? null : time}
        type="text"
        placeholder="time"
        data-te-toggle="timepicker-just-input"
        className={`peer bg-[#0C2024]/20 pl-5 w-full h-12 outline-none py-2 px-3 placeholder:select-none placeholder:text-transparent rounded-3xl focus:outline-none ${
          error
            ? "focus:ring-0 focus:border-red-700 border-red-700"
            : "focus:ring-2 focus:border-primary focus:ring-primary"
        }`}
        id="time party"
      />
      <label
        htmlFor="time party"
        className={`absolute pointer-events-none capitalize select-none flex justify-center items-center gap-1 left-5 -top-1 transition-all px-1 duration-300 text-base
        peer-placeholder-shown:text-xl peer-placeholder-shown:top-2 peer-placeholder-shown:left-7
        peer-focus:left-5 peer-focus:-top-1 peer-focus:text-base ${
          error ? "text-red-700" : "text-black"
        }`}
      >
        time party
      </label>
      <p className="text-red-700 pl-6 text-xl">{error}</p>
    </div>
  );
};

TimeInput.propTypes = {
  time: PropTypes.string,
  error: PropTypes.string,
  setTime: PropTypes.func,
};

export default TimeInput;
