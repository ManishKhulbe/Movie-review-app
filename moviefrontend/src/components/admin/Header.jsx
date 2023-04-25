import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";
import { useRef } from "react";
import { useTheme } from "../hooks";
import AppSearchForm from "../form/AppSearchForm";


const Header = ({onAddMovieClick , onAddActorClick}) => {
  const [showOptions, setShowOptions] = useState(false);
  const { toggleTheme } = useTheme();
  const options = [{title : "Add Movie" , onClick : onAddMovieClick },
  {title : "Add Actor" , onClick : onAddActorClick }];

  return (
    <div className="flex items-center justify-between relative p-5 ">
      <AppSearchForm placeholder='search movies..' />
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleTheme}
          className="dark:text-white text-light-subtle "
        >
          <BsFillSunFill size={24} />{" "}
        </button>
        <button
          onClick={() => setShowOptions(true)}
          className="flex  space-x-2 border-secondary  hover:border-primary text-secondary hover:opacity-70 transition font-semibold border-2 rounded text-lg item-center px-4 py-2 dark:border-dark-subtle dark:text-dark-subtle"
          id="option-container"
        >
          <span>Create</span>
          <AiOutlinePlus />
        </button>
      </div>

      <CreateOptions
        visible={showOptions}
        onClose={() => setShowOptions(false)}
        options={options}
      />
    </div>
  );
};

const CreateOptions = ({ options, visible, onClose }) => {
  const container = useRef();
  const containerId = "option-container";
  useEffect(() => {
    const handleClose = (e) => {
      if (!visible) return;
      const { parentElement, id } = e.target;
      console.log("🚀 ~ file: Dashboard.jsx:43 ~ handleClose ~ value:", id);

      if (parentElement.id === containerId || id === containerId) return;
      container.current.classList.remove("animate-scale");
      container.current.classList.add("animate-scale-reverse");
    };
    document.addEventListener("click", handleClose);

    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, [visible]);

  const handleAnimationEnd = (e) => {
    if (e.target.classList.contains("animate-scale-reverse")) onClose();
    e.target.classList.remove("animate-scale");
  };


  const handleClick=(fn)=>{
fn()
onClose()
  }
  if (!visible) return null;
  return (
    <div
      id={containerId}
      ref={container}
      className="absolute right-0 top-12 z-50 flex flex-col space-y-5 p-5 dark:bg-secondary bg-white drop-shadow-lg rounded animate-scale"
      onAnimationEnd={handleAnimationEnd}
    >
      {options.map(({title, onClick}) => {
        return <Option key={title} onClick={()=>handleClick(onClick)}>{title} </Option>;
      })}
    </div>
  );
};

const Option = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="dark:text-white text-secondary hover:opacity-80 transition"
    >
      {children}
    </button>
  );
};

export default Header;
