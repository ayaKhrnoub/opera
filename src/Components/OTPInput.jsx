import React, { useMemo } from "react";
import PropTypes from "prop-types";

// A regular expression used to match only numbers
const reg = new RegExp(/^\d+$/);

const OTPInput = ({ valueLength, otp, setOtp }) => {

  const valueItems = useMemo(() => {
    const valueArray = otp.split("");
    const items = [];
    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      // If the character is a number, add it to the items array
      // Otherwise, add an empty string to the items array
      if (reg.test(char)) items.push(char);
      else items.push("");
    }
    return items;
  }, [valueLength, otp]);

  const handelChange = (e, index) => {
    const target = e.target;
    let value = target.value.trim();
    const next = target.nextElementSibling;
    const isTargetDigit = reg.test(value);

    if (!reg.test(value) && value !== "") return;

    // If the value is not a number, replace it with a space
    value = isTargetDigit ? value : " ";

    const targetValueLength = value.length;

    // If the length of the value is 1, update the OTP string at the specified index
    // and focus on the next input field if it exists
    if (targetValueLength === 1) {
      setOtp(
        (prev) => prev.substring(0, index) + value + prev.substring(index + 1)
      );
      if (!isTargetDigit) return;

      if (next) {
        next.focus();
      }
    } 
    // Else if the length of the value is equal to the valueLength prop, update the OTP string
    // and blur the input field
    else if (targetValueLength === valueLength) {
      setOtp(value);
      target.blur();
    }
  };

  const handelOnKeyDown = (e) => {
    const target = e.target;
    const { key } = e;
    const prev = target.previousElementSibling;
    const next = target.nextElementSibling;

    // If the arrow right or down key is pressed, focus on the next input field if it exists
    if (key === "ArrowRight" || key === "ArrowDown") {
      e.preventDefault();
      if (next) {
        next.focus();
      }
    }
    // If the arrow left or up key is pressed, focus on the previous input field if it exists
    if (key === "ArrowLeft" || key === "ArrowUp") {
      e.preventDefault();
      if (prev) {
        prev.focus();
      }
    }
    // If the backspace key is pressed and the input field is empty, focus on the previous input field
    if (e.key !== "Backspace" || target.value !== "") return;
    if (prev) {
      prev.focus();
    }
  };

  // Handle the focus event on an input field
  const handelOnFocus = (e) => {
    const { target } = e;
    // Select the entire value of the input field
    target.setSelectionRange(0, target.value.length);
  };

  return (
    <div className="sm:w-4/5 mx-auto w-full">
      <div className="w-1/2 mx-auto flex justify-center items-center gap-1 py-2">
        {valueItems.map((number, index) => (
          <React.Fragment key={index}>
            <input
              type="text"
              autoComplete="one-time-code"
              inputMode="numeric"
              pattern="\d{1}"
              value={number}
              id={`otp input field ${index + 1}`}
              onChange={(e) => handelChange(e, index)}
              onKeyDown={handelOnKeyDown}
              onFocus={handelOnFocus}
              className="border-1 select-none border-black w-8 h-8 text-center p-0.5 text-black text-xl rounded-lg m-auto focus:border-primary focus:ring-primary"
              maxLength={valueLength}
              tabIndex={index + 1}
            />
          </React.Fragment>
        ))}
      </div>
      {valueItems.map((_, index) => (
        <React.Fragment key={index}>
          <label
            htmlFor={`otp input field ${index + 1}`}
            className="sr-only"
          >{`otp input field ${index + 1}`}</label> 
        </React.Fragment>
      ))}
    </div>
  );
};

export default OTPInput;

OTPInput.propTypes = {
  valueLength: PropTypes.number.isRequired,
  otp: PropTypes.string.isRequired,
  setOtp: PropTypes.func.isRequired,
};
