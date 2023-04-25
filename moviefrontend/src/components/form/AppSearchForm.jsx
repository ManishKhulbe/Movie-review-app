import React from 'react'
import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const AppSearchForm = ({showResetButton , placeholder , onSubmit, onReset}) => {
  const [value , setValue] = useState('')

  const handleSubmit=(e)=>{
    e.preventDefault()
    onSubmit(value)
  }

  const handleOnChange=(e)=>{
    setValue(e.target.value)
  }

  const handleReset =()=>{
    setValue('')
    onReset()
  }


  return (
    <form className='relative' onSubmit={handleSubmit}>
      <input
        type="text"
        className="bg-transparent rounded border-2 p-2 dark:border-dark-subtle border-light-subtle  dark:focus:border-white focus:border-primary dark:text-white peer transition outline-none text-lg"
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder}
      /> 

      {showResetButton ? <button type="button" onClick={handleReset} className='absolute top-1/2 -translate-y-1/2 right-2 text-secondary dark:text-white'>
        <AiOutlineClose/>
      </button> : null}
    </form>
  )
}

export default AppSearchForm
