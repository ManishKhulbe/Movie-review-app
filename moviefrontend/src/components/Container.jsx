import React from 'react'

const Container = ({children , className}) => {
  return (
    <div className={'dark:text-white max-w-screen-xl mx-auto px-2 xl:p-0' + className}>
      {children}
    </div>
  )
}

export default Container
