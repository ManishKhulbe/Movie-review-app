import React from 'react'
import Container  from '../Container';
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from '../form/Title'
import CustomLink from "../CustomLink";
import FormContainer from '../form/FormContainer';
import { commonModalClasses } from '../../utils/theme';

const ForgetPassword = () => {
  return (
    <FormContainer>
      <Container>
        <form className= {commonModalClasses+ "w-96 "}>
          <Title >Please Enter Your email</Title>
          <FormInput name="email" label="Email" placeholder="emai@gmail.com"  />
         
        <Submit value="Submit" />
        <div className="flex justify-between">
        <CustomLink  to="/auth/signup" >Sign up</CustomLink> 
            <CustomLink  to="/auth/signin" >Sign in</CustomLink> 
        </div>
        </form>
      </Container>
    </FormContainer>
  );
}

export default ForgetPassword
