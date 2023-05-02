import React from "react";

const CustomButtonLink = ({ label, clickable = true , onClick }) => {
  const className = clickable
    ? "text-highlight dark:text-highlight-dark hover:underline cursor-pointer"
    : "text-highlight dark:text-highlight-dark cursor-default";
  return (
    <button onClick={onClick} type="button" className={className}>
      {label}
    </button>
  );
};

export default CustomButtonLink;
