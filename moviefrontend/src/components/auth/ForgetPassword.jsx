import React from 'react'
import Container  from '../Container';
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from '../form/Title'
import CustomLink from "../CustomLink";

const ForgetPassword = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center ">
      <Container>
        <form className="bg-secondary rounded p-6 w-96 space-y-6">
          <Title >Please Enter Your email</Title>
          <FormInput name="email" label="Email" placeholder="emai@gmail.com"  />
         
        <Submit value="Submit" />
        <div className="flex justify-between">
        <CustomLink  to="/auth/signup" >Sign up</CustomLink> 
            <CustomLink  to="/auth/signin" >Sign in</CustomLink> 
        </div>
        </form>
      </Container>
    </div>
  );
}

export default ForgetPassword
