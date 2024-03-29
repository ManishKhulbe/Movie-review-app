import React from "react";
import { useState, useEffect, useRef } from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { useLocation, useNavigate } from "react-router-dom";
import { reSendEmailVerificationToken, verifyUserEmail } from "../../api/auth";
import { useAuth, useNotification } from "../hooks";
const OTP_LEN = 6;

function isValidOTP(otp) {
  let isValid = false;
  for (let val of otp) {
    isValid = !isNaN(parseInt(val));
    if (!isValid) break;
  }
  return isValid;
}

const EmailVerification = () => {
  const [otp, setotp] = useState(new Array(OTP_LEN).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const inputRef = useRef();
  const { isAuth, authInfo } = useAuth();
  const { isLoggedIn, profile } = authInfo;
  const isVerified = profile?.isVerified;
  const { state } = useLocation();

  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const user = state?.user;
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
  //   currentOTPIndex = index;
  //   if (key === "Backspace") {
  //     focusPrevInputField(currentOTPIndex);
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidOTP(otp)) {
      return updateNotification("error", "invalid OTP");
    }
    const {
      error,
      message,
      user: userResponse,
    } = await verifyUserEmail({
      OTP: otp.join(""),
      userId: user.id,
    });
    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    localStorage.setItem("auth-token", userResponse.token);
    isAuth();
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (!user) navigate("/not-found");
    if (isLoggedIn && isVerified) navigate("/");
    //eslint-disable-next-line
  }, [user, isLoggedIn, isVerified ]);


  const handleOTPResend=async ()=>{
   const {error , message}=  await reSendEmailVerificationToken(user.id)
   if(error) return updateNotification('error' , error)
   updateNotification('success' , message)
  }
  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses}>
          <div>
            <Title>Please Enter teh OTP to verify the account </Title>
            <p className="text-center dark:text-dark-subtle text-light-subtle">
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
                  className="w-12 h-12 border-2  dark:border-dark-subtle border-light-subtle dark:focus:border-white  focus:border-primary rounded bg-transparent text-center outline-none font-semibold text-xl "
                />
              );
            })}
          </div>
          <div>
            <Submit value="Verify Account" />
            <button
            onClick={handleOTPResend}
              type="button"
              className=" font-semibold hover:underline mt-2 "
            >
              I don't have OTP
            </button>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default EmailVerification;
