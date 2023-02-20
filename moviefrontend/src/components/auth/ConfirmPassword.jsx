import React from "react";
import { commonModalClasses } from "../../utils/theme";
import { useNavigate, useSearchParams } from "react-router-dom";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { resetPassword, verifyPassResetToken } from "../../api/auth";
import { useNotification } from "../hooks";
import { useEffect } from "react";
const ConfirmPassword = () => {
  const [password, setPassword] = useState({
    one: "",
    two: "",
  });
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    isValidToken();
    // eslint-disable-next-line
  }, []);

  const isValidToken = async () => {
    const { error, valid } = await verifyPassResetToken(token, id);
    console.log(
      "🚀 ~ file: ConfirmPassword.jsx:30 ~ isValidToken ~ error, valid:",
      error,
      valid
    );
    setIsVerifying(false);
    if (error) return updateNotification("error", error);
    if (error) {
      setIsValid(false);
      return navigate("/auth/resetPassword", { replace: true });
    }
    setIsValid(true);
  };

const handleChange=({target})=>{
const {name , value} = target

setPassword({...password ,[name] : value })

}

const handleSubmit=async (e)=>{
e.preventDefault()
if(!password){
  return updateNotification('error' ,"Password is required !")
}
if(password.one.trim().length < 8){
  return updateNotification('error' ,"Password length should be 8 char")
}
if(password.one !== password.two){
return updateNotification('error',"Password Do not match !")
}
console.log(password)
const {error , message} = await resetPassword({newPassword :password.one , userId : id , token})
if (error) {
 
  return updateNotification('error', error)
}
updateNotification('success' , message)
navigate('/auth/signin' ,{replace : true})
}

  if (isVerifying)
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-2 items-center">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Please wait ! we are verifying your token
            </h1>
            <ImSpinner3 className="animate-spin text-4xl dark:text-white text-primary" />
          </div>
        </Container>
      </FormContainer>
    );

  if (!isValid) {
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-2 items-center">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Sorry! the token is not valid
            </h1>
          </div>
        </Container>
      </FormContainer>
    );
  }
  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + "w-96"}>
          <Title>Enter new password</Title>
          <FormInput
            value={password.one}
            onChange={ handleChange}
            name="one"
            label="New Password"
            placeholder="*************"
            type="password"
          />
          <FormInput
            value={password.two}
            onChange={handleChange}
            name="two"
            label="Confirm Password"
            placeholder="*************"
            type="password"
          />

          <Submit value="Submit" />
        </form>
      </Container>
    </FormContainer>
  );
};

export default ConfirmPassword;
