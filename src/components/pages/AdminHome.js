import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../admin/Header'
import Navbar from '../admin/Navbar'


const AdminHome = () => {

  return (
    <div className='flex dark:bg-primary bg-white  '>
     <Navbar />
     <div className='flex-1 p-2 max-w-screen-xl'>
     <Header/>
     <Outlet /> 
     </div>
    </div>
  )
}

export default AdminHome
