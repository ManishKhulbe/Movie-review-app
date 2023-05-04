import React from 'react'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Header from '../admin/Header'
import Navbar from '../admin/Navbar'
import Dashboard from '../admin/Dashboard'


const AdminHome = () => {
  const [showMovieUploadModal,setShowMovieUploadModal] = useState(false)
  const [showActorUploadModal,setShowActorUploadModal] = useState(false)
  const hideMovieUploadModal=()=>{
    setShowMovieUploadModal(false)
  }
  const displayMovieUploadModal=()=>{
    setShowMovieUploadModal(true)
  }
  const hideActorUploadModal=()=>{
    setShowActorUploadModal(false)
  }
  const displayActorUploadModal=()=>{
    setShowActorUploadModal(true)
  }
  return (
    <>
    <div className='flex dark:bg-primary bg-white  '>
     <Navbar />
     <div className='flex-1  max-w-screen-xl'>
     <Header onAddMovieClick={displayMovieUploadModal} onAddActorClick={displayActorUploadModal}/>
     <Outlet /> 
     </div>
    </div>
    <Dashboard hideMovieUploadModal={hideMovieUploadModal} showMovieUploadModal={showMovieUploadModal} hideActorUploadModal={hideActorUploadModal} showActorUploadModal={showActorUploadModal}/>


    </>
  )
}

export default AdminHome
