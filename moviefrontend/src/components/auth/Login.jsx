import React from "react";
import Navbar from '../user/Navbar'
import Signin from "./Signin";
import {Outlet} from 'react-router-dom'

function Login() {
  return<>
    <Navbar />
    <Signin />
    <Outlet />
  </>
}

export default Login;
