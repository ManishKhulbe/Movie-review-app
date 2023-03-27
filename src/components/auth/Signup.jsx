import React, { useState , useEffect } from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import CustomLink from "../CustomLink";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../form/FormContainer";
import { createUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useNotification, useAuth } from "../hooks";

const validateUserInfo = ({ name, email, password }) => {
  if (!name.trim()) return { status: false, error: "name is missing" };
  if (!/^[a-z A-Z]+$/.test(name))
    return { status: false, error: "Invalid Name" };
  if (!email.trim()) return { status: false, error: "Email is missing" };
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) return { status: false, error: "Invalid Email " };
  if (!password.trim()) return { status: false, error: "Password is missing" };
  if (password.length < 8)
    return { status: false, error: "Password must be 8 character long" };

  return { status: true };
};

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const {  authInfo}= useAuth()
  const {  isLoggedIn } = authInfo
  const {updateNotification} = useNotification()
  const handleChange = ({ target }) => {
    let { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { status, error } = validateUserInfo(userInfo);

    if (!status) return updateNotification("error" , error);
    const response = await createUser(userInfo);
    if (response.error) return console.log(response.error);
    navigate("/auth/emailVerification", {
      state: { user: response.user },
      replace: true,
    });
 
  };
  let { email, name, password } = userInfo;


  useEffect(()=>{
    if(isLoggedIn) navigate('/')
    // eslint-disable-next-line
  },[isLoggedIn])
  return (
    <FormContainer>
      <Container>
        
        <form
          onSubmit={handleSubmit}
          className={commonModalClasses + "w-72 space-y-6"}
        >
          <Title>Sign up</Title>
          <FormInput
            value={name}
            onChange={handleChange}
            name="name"
            label="Name"
            placeholder="enter name"
          />
          <FormInput
            value={email}
            onChange={handleChange}
            name="email"
            label="Email"
            placeholder="emai@gmail.com"
          />
          <FormInput
            value={password}
            onChange={handleChange}
            name="password"
            label="Password"
            placeholder="*********"
            type="password"
          />
          <Submit value="Sign up" />
          <div className="flex justify-between">
            <CustomLink to="/auth/forgetPassword">forget password </CustomLink>
            <CustomLink to="/auth/signin">Sign in</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default Signup;
