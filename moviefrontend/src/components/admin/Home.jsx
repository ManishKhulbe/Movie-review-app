import React from 'react'
import AppInfoBox from './AppInfoBox'
import LatestUploads from './LatestUploads'

const Home = () => {
  return (
   
      <div className='grid grid-cols-3 gap-5 p-5'>
    <AppInfoBox title='Total Uploads' subTitle='100'/>
    <AppInfoBox title='Total Users' subTitle='10044'/>
    <AppInfoBox title='Total Reviews' subTitle='111'/>
    <LatestUploads/> 
       </div>
 
  )
}

export default Home
