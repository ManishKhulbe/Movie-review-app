import React from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const ConfirmPassword = () => {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + "w-96"}>
          <Title>Enter new password</Title>
          <FormInput
            name="password"
            label="New Password"
            placeholder="*************"
            type="password"
          />
          <FormInput
            name="confirmPassword"
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
