import React, { useState ,useEffect } from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import CustomLink from "../CustomLink";
import { commonModalClasses } from "../../utils/theme";
import {useAuth, useNotification} from '../hooks'
import {useNavigate} from 'react-router-dom'


const validateUserInfo = ({ name, email, password }) => {
  if (!email.trim()) return { status: false, error: "Email is missing" };
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) return { status: false, error: "Invalid Email " };
  if (!password.trim()) return { status: false, error: "Password is missing" };
  if (password.length < 8)
    return { status: false, error: "Password must be 8 character long" };

  return { status: true };
};

const Signin = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const {updateNotification} = useNotification()
  const {handleLogin , authInfo}=useAuth()
  const {isPending , isLoggedIn } = authInfo
  const handleChange = ({ target }) => {
    let { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  }; 

const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { status, error } = validateUserInfo(userInfo);

    if (!status) return updateNotification("error" , error);
    
    handleLogin(userInfo.email, userInfo.password)
  };


  useEffect(()=>{
    if(isLoggedIn) navigate('/')
    // eslint-disable-next-line
  },[isLoggedIn])
  return (
    <div className="fixed inset-0 dark:bg-primary bg-white -z-10 flex justify-center items-center ">
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + "w-72"}>
          <Title>Sign in</Title>
          <FormInput
          onChange ={handleChange}
            value={userInfo.email}
            name="email"
            label="Email"
            placeholder="emai@gmail.com"
          />
          <FormInput
            value={userInfo.password}
            onChange ={handleChange}
            name="password"
            label="Password"
            placeholder="*********"
            type='password'
          />
          <Submit value="Sign in" busy={isPending}/>
          <div className="flex justify-between">
            <CustomLink to="/auth/forgetPassword">forget password </CustomLink>
            <CustomLink to="/auth/signup">Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Signin;
