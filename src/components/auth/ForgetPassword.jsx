import React from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import { commonModalClasses } from "../../utils/theme";
import { useState } from "react";
import { forgetPassword } from "../../api/auth";
import { isValidEmail } from "../../utils/helper";
import { useNotification } from "../hooks";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  
 const {updateNotification} =  useNotification()
  const handleChange = ({ target }) => {
    let { value } = target;
    setEmail(value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isValidEmail(email)) return updateNotification("error" ,"Invalid Email")
   const {error , message}=  await forgetPassword(email)
   if(error) return updateNotification('error',error)
   updateNotification('success', message);
  };
  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + "w-96 "}>
          <Title>Please Enter Your email</Title>
          <FormInput
            onChange={handleChange}
            value={email}
            name="email"
            label="Email"
            placeholder="emai@gmail.com"
          />

          <Submit value="Submit" />
          <div className="flex justify-between">
            <CustomLink to="/auth/signup">Sign up</CustomLink>
            <CustomLink to="/auth/signin">Sign in</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default ForgetPassword;
