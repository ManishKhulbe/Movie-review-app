import React from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from '../form/Title'
import CustomLink from "../CustomLink";
const Signup = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center ">
      <Container>
        <form className="bg-secondary rounded p-6 w-72 space-y-6">
          <Title >Sign up</Title>
          <FormInput name="name" label="Name" placeholder="enter name"  />
          <FormInput name="email" label="Email" placeholder="emai@gmail.com"  />
          <FormInput name="password" label="Password" placeholder="*********"  />
        <Submit value="Sign in" />
        <div className="flex justify-between">
            <CustomLink  to="/auth/forgetPassword" >forget password </CustomLink>
            <CustomLink  to="/auth/signin" >Sign in</CustomLink> 
        </div>
        </form>
      </Container>
    </div>
  );
};

export default Signup;

