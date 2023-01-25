import React from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from '../form/Title'
import CustomLink from "../CustomLink";
import { commonModalClasses } from "../../utils/theme";


const Signin = () => {

  return (
    
    <div className="fixed inset-0 dark:bg-primary bg-white -z-10 flex justify-center items-center ">
      <Container>
        <form className={commonModalClasses +  "w-72"}>
          <Title >Sign in</Title>
          <FormInput name="email" label="Email" placeholder="emai@gmail.com"  />
          <FormInput name="password" label="Password" placeholder="*********"  />
        <Submit value="Sign in" />
        <div className="flex justify-between">
            <CustomLink  to="/auth/forgetPassword" >forget password </CustomLink>
            <CustomLink  to="/auth/signup" >Sign Up</CustomLink> 
        </div>
        </form>
      </Container>
    </div>
  );
};

export default Signin;
