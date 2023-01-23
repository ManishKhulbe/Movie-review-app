import React from "react";
import { useState, useEffect, useRef } from "react";
import Container from "../Container";
import Submit from "../form/Submit";
import Title from "../form/Title";
const OTP_LEN = 6;

const EmailVerification = () => {
  const [otp, setotp] = useState(new Array(OTP_LEN).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const inputRef = useRef();
  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  };
  const focusPrevInputField = (index) => {
    index - 1 !== 0 ? setActiveOtpIndex(index - 1) : setActiveOtpIndex(0);
  };
  var currentOTPIndex;

  function handleOtpChange({ target }, index) {
    const { value } = target;
    const newOtp = [...otp];
    
    newOtp[index] = value.substring(value.length - 1, value.length);

    if (!value) focusPrevInputField(index);
    else focusNextInputField(index);
    setotp([...newOtp]);
    console.log(
      newOtp,
      value,
      value.substring(value.length - 1, value.length),
      currentOTPIndex
    );
  }

  // function handleKeyDown({ key }, index) {
  //   newOtp[index] = value.substring(value.length - 1, value.length);
  //   console.log(index,"vv")
  //   currentOTPIndex = index;
  //   if (key === "Backspace") {
  //     focusPrevInputField(currentOTPIndex);
  //   }
  // }

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center ">
      <Container>
        <form className="bg-secondary rounded p-6  space-y-6">
          <div>
            <Title>Please Enter teh OTP to verify the account </Title>
            <p className="text-center text-dark-subtle">
              Otp has been sent to your Email
            </p>
          </div>
          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  ref={activeOtpIndex === index ? inputRef : null}
                  key={index}
                  value={otp[index] || " "}
                  onChange={(e) => handleOtpChange(e, index)}
                  // onKeyDown={(e) => handleKeyDown(e, index)}
                  type="number"
                  className="w-12 h-12 border-2  border-dark-subtle focus:border-white rounded bg-transparent text-center outline-none font-semibold text-xl "
                />
              );
            })}
          </div>

          <Submit value="Verify Account" />
        </form>
      </Container>
    </div>
  );
};

export default EmailVerification;
