import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../user/Navbar'


const Auth = () => {

  return (
    <>
     <Navbar />
     <Outlet /> 
    </>
  )
}

export default Auth
