import React from 'react'
import ActorModal from '../modals/ActorUploadModal'
import AppInfoBox from './AppInfoBox'
import LatestUploads from './LatestUploads'

import MovieUpload from './MovieUpload'

const Dashboard = ({showMovieUploadModal , hideMovieUploadModal , showActorUploadModal,hideActorUploadModal }) => {
  return (
    <>
    <ActorModal visible={showActorUploadModal } onClose={hideActorUploadModal} />
    <MovieUpload visible={showMovieUploadModal} onClose={hideMovieUploadModal} />

    <div className='grid grid-cols-3 gap-5 my-5'>
    <AppInfoBox title='Total Uploads' subTitle='100'/>
    <AppInfoBox title='Total Users' subTitle='10044'/>
    <AppInfoBox title='Total Reviews' subTitle='111'/>
    <LatestUploads/>

      </div>
    </>
  )
}

export default Dashboard