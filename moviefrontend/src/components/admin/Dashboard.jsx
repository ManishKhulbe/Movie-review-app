import React from 'react'
import ActorModal from '../modals/ActorUploadModal'


import MovieUpload from './MovieUpload'

const Dashboard = ({showMovieUploadModal , hideMovieUploadModal , showActorUploadModal,hideActorUploadModal }) => {
  return (
    <>
    <ActorModal visible={showActorUploadModal } onClose={hideActorUploadModal} />
    <MovieUpload visible={showMovieUploadModal} onClose={hideMovieUploadModal} />

    
    </>
  )
}

export default Dashboard