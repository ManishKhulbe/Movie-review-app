import React from 'react'

const Submit = ({value}) => {
  return (
    <input type="submit" className='w-full rounded dark:bg-white dark:text-secondary bg-secondary text-white hover:bg-opacity-90 transition font-semibold text-lg cursor-pointer p-1' value={value}/>
  )
}

export default Submit
