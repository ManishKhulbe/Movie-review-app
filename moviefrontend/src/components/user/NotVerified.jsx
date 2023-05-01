import React from "react";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";



export default function NotVerified() {
  const { authInfo } = useAuth();
  console.log(
    "🚀 ~ file: Home.jsx:8 ~ Home ~ authInfo:",
    authInfo,
    authInfo?.profile?.isVerified
  );
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/auth/emailVerification", { state: { user: authInfo?.profile } });
  };
  const { isLoggedIn } = authInfo;
  const isVerified = authInfo.profile?.isVerified;
  if (!authInfo?.profile?.isVerified) {
    return (
      <div>
       
          {isLoggedIn && !isVerified ? (
            <p className="text-lg text-center text-blue-500 p-2">
              It looks like you are not verified your account{" "}
              <button
                onClick={handleClick}
                className="text-blue-500 font-semibold hover:underline"
              >
                {" "}
                Click here to verify your account
              </button>
            </p>
          ) : null}
       
      </div>
    );
  }
}
