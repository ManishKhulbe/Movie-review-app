import React from "react";
import { useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

const Actors = () => {
  const profile={
    avatar:"https://plus.unsplash.com/premium_photo-1682175064711-2e2870132d9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0M3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    name:'john doe',
    about:" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident obcaecati deleniti dolores minus eligendi debitis in repudiandae at dignissimos odio fugiat minima, eveniet tenetur iste sunt ducimus numquam consequuntur! Optio."

  }
  return (
    <div className="grid grid-cols-4 gap-3 my-5">
      <ActorProfile profile={profile} />
     
    </div>
  );
};

const ActorProfile = ({ profile }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleOnMouseEnter = () => {
    setShowOptions(true);
  };

  const handleOnMouseLeave = () => {
    setShowOptions(false);
  };
  if (!profile) return null;
  const { name, about = "", avatar } = profile;
  return (
    <div className="bg-white shadow dark:bg-secondary  rounded h-20 overflow-hidden">
      <div
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className="flex cursor-pointer relative"
      >
        <img
          src={avatar}
          alt={name}
          className="w-20 aspect-square object-cover"
        ></img>
        <div className="px-2">
          <h1 className="text-xl text-primary dark:text-white font-semibold">
            {name}
          </h1>
          <p className=" text-primary dark:text-white ">
            {about.substring(0, 50)}
          </p>
        </div>
        <Options visible={showOptions} />
      </div>
    </div>
  );
};

const Options = ({ visible, onDeleteClick, onEditClick }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm flex justify-center items-center space-x-5">
      <button
        onClick={onDeleteClick}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition "
        type="button"
      >
        <BsTrash />
      </button>
      <button
        onClick={onEditClick}
        className=" p-2 rounded-full bg-white text-primary hover:opacity-80 transition "
        type="button"
      >
        <BsPencilSquare />
      </button>
    </div>
  );
};

export default Actors;
