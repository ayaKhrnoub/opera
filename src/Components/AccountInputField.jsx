import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const AccountInputField = ({
  Icon,
  label,
  placeholder,
  value,
  onChange,
  isPassword,
  error,
}) => {
  const [type, setType] = useState(isPassword);

  const onChangeCallback = useCallback(
    (e) => {
      onChange(e);
    },
    [onChange]
  );
  return (
    <div className="flex flex-1">
      <div className="w-full px-3 mb-2">
        <label htmlFor={label} className="capitalize font-semibold px-1">
          {label}
        </label>
        <div className="flex relative">
          <div
            className={`w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center
          ${error ? "text-red-600" : "text-inherit"}`}
          >
            {Icon}
          </div>
          <input
            type={type ? "password" : "text"}
            autoComplete="off"
            value={value}
            name={label}
            onChange={onChangeCallback}
            className={`w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 ${
              error ? "border-red-600" : "border-gray-200"
            } focus:border-primary outline-none focus:ring-0`}
            placeholder={placeholder}
          />
          {isPassword ? (
            <div
              onClick={() => setType((prev) => !prev)}
              className={`absolute text-xl cursor-pointer right-4 top-1/2 z-50 -translate-y-1/2`}
            >
              {type ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
          ) : null}
        </div>
        {error ? <p className="pl-4 text-red-600">{error}</p> : null}
      </div>
    </div>
  );
};

AccountInputField.propTypes = {
  Icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isPassword: PropTypes.bool,
};

export default AccountInputField;
