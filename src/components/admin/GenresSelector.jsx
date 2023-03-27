import React from 'react'
import { ImTree } from 'react-icons/im'

const GenresSelector = ({badge , children , onClick}) => {

  const renderBadge = (badge) => {
    return (
      <span className="dark:bg-dark-subtle  bg-light-subtle text-white absolute top-0 right-0 w-5 h-5 translate-x-2 -translate-y-1 text-sm rounded-full flex justify-center items-center">
        {+badge <= 9 ? badge : "9+"}
      </span>
    );
  };

  return (
    <button type="button" onClick={onClick} className='relative flex items-center space-x-2 border-2 dark:border-dark-subtle border-light-subtle dark:hover:border-white hover:border-primary transition dark:text-dark-subtle text-light-subtle dark:hover:text-white hover:text-primary rounded py-1 px-3' >
      <ImTree/>
      <span>{children}</span>
      {renderBadge(badge)}
    </button>
  )
}

export default GenresSelector
 