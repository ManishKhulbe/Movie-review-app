import React from "react";

const FormInput = ({label , name,placeholder ,...rest}) => {
  return (
    <div className="flex flex-col-reverse  ">
      <input
    
        id={name}
        name={name}
        className="bg-transparent rounded border-2 dark:border-dark-subtle border-light-subtle w-full text-lg outline-none dark:focus:border-white   focus:border-primary p-1 peer transition "
        placeholder={placeholder}
        {...rest}
      />
      <label
        htmlFor={name}
        className="font-semibold dark:text-dark-subtle text-light-subtle  peer-focus:text-primary dark:peer-focus:text-white transition self-start"
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
