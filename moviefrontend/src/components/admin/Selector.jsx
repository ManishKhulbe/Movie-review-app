import React from 'react'

const Selector = ({name ,value,onChange,label,options}) => { 
  return (
    <select className='border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary outline-none transition rounded bg-transparent text-light-subtle dark:text-dark-subtle dark:focus:text-white focus:text-primary pr-10 p-1' id={name} name={name} value={value} onChange={onChange} >
      {options.map(({title, value}, index) => {
        return( <option  selected={index===0 ? "selected": null} value={value}  key={title}>{title}</option>)
      })}
    </select>
  )
}

export default Selector