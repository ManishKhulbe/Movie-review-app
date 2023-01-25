import React from 'react'

const Title = ({children }) => {
  return (
    <div className='dark:text-white text-secondary text-xl font-semibold text-center' >
      {children}
    </div>
  )
}

export default Title
