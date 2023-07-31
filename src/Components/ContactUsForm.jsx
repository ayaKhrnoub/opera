import { useCallback, useMemo, useState } from "react";
import Button from "./Button";
import PropTypes from "prop-types";
import axios from "axios";
import baseURL from "../Constant/URL";
import { toast } from "react-toastify";

// defining a reusable Input component
const Input = ({ label, onChange }) => {
  return useMemo(
    () => (
      <div className="mt-5 relative">
        <input
          id={label}
          name={label}
          type="text"
          className="peer bg-dark/90 h-10 w-full border-0 border-b-2 border-white focus:ring-0 text-white placeholder-transparent focus:outline-none focus:border-primary"
          placeholder={label}
          onChange={onChange}
        />
        <label
          htmlFor={label}
          className="absolute left-0 -top-3.5 text-white text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
        >
          {label}
        </label>
      </div>
    ),
    [label, onChange]
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired, // making sure the label prop is required and of type string
  onChange: PropTypes.func.isRequired, // making sure the onChange prop is required and of type function
};

// defining the main ContactUsForm component

const ContactUsForm = ({ buttonCenter }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false)

  // defining the onChange handlers for each input field
  const handleNameChange = useCallback((event) => {
    setName(event.target.value);
  }, []);

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handlePhoneChange = useCallback((event) => {
    setNumber(event.target.value);
  }, []);

  const validate = useCallback(() => {
    let flag = false;

    flag = !!name;
    flag = !!message;
    flag =
      email === ""
        ? true
        : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
        ? false
        : true;

    return !flag;
  }, [email, name, message]);
  const handleMessageChange = useCallback(async (event) => {
    setMessage(event.target.value);
  }, []);

  // defining a dynamic classes variable based on the buttonCenter prop
  const classes = useMemo(
    () => `mt-5 ${buttonCenter ? "text-center" : "text-start"}`,
    [buttonCenter]
  );

  // defining the form submission handler
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      console.log(number.length !== 10 && isNaN(parseInt(number)));
      console.log(isNaN(parseInt(number)));
      if (number.length === 10 && !isNaN(parseInt(number))) {
        if (validate()) {
          try {
            setIsLoading(true);
            const formData = {
              email,
              name,
              number,
              message,
            };
            await axios.post(`${baseURL}/api/contact`, formData);
            toast(
              "Thank you for sending the message. We will contact you as soon as possible",
              {
                position: "bottom-left",
                autoClose: 4000,
                pauseOnFocusLoss: false,
                pauseOnHover: false,
                draggable: true,
                type: "success",
                theme: "light",
              }
            );
          } catch (error) {
            console.log(error);
            if (!error.response) {
              toast("Please check your internet connection", {
                position: "bottom-left",
                autoClose: 4000,
                pauseOnFocusLoss: false,
                pauseOnHover: false,
                draggable: true,
                type: "error",
                theme: "colored",
              });
            } else {
              toast(error.response.data.message, {
                position: "bottom-left",
                autoClose: 4000,
                pauseOnFocusLoss: false,
                pauseOnHover: false,
                draggable: true,
                type: "error",
                theme: "colored",
              });
            }
          } finally {
            setIsLoading(false);
          }
        } else {
          toast("There is an error with the entered data", {
            position: "bottom-left",
            autoClose: 4000,
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            draggable: true,
            type: "error",
            theme: "colored",
          });
        }
      } else {
        toast("There is an error with the entered data", {
          position: "bottom-left",
          autoClose: 4000,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          draggable: true,
          type: "error",
          theme: "colored",
        });
      }
    },
    [email, number, name, message, validate]
  );

  return (
    <div className="flex-1 w-full bg-dark z-20 font-light relative">
      <div className="py-5 sm:py-10 px-8 sm:px-14">
        <h3 className="text-white uppercase text-3xl">
          get in <span className="font-semibold">touch</span>
        </h3>
        <form onSubmit={handleSubmit}>
          {/* rendering an Input component for each input field */}
          <Input label="Name" onChange={handleNameChange} />
          <Input label="Email" onChange={handleEmailChange} />
          <Input label="number" onChange={handlePhoneChange} />
          <Input label="message" onChange={handleMessageChange} />
          <div className={classes}>
            <Button text="submit" type="submit" isLoading={isLoading} />
            {/* rendering a custom Button component */}
          </div>
        </form>
      </div>
    </div>
  );
};

ContactUsForm.propTypes = {
  buttonCenter: PropTypes.bool.isRequired,
};

export default ContactUsForm; // exporting the ContactUsForm component for use in other files
