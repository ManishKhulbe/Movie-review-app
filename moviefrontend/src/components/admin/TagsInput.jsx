import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const TagsInput = ({name , onChange , value}) => {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const input = useRef();
  const tagsInput = useRef();
  const handleOnChange = ({ target }) => {
    const { value } = target;
    if (value !== ",") setTag(value);
  };
  const handleKeyDown = ({ key }) => {
    if (key === "," || key === "Enter") {
      if (!tag) return;
      if (tags.includes(tag)) return setTag("");
      setTags([...tags, tag]);
      setTag("");
      
    }
    if (key === "Backspace" && tags.length && !tag) {
      //   const newTags =  tags.filter((_,index)=> index!== tags.length-1)
      //   setTags([...newTags])
      tags.splice(tags.length - 1, 1);
      setTags([...tags]);
    }
  };

  useEffect(() => {
    if(value.length)setTags(value)
  }, [value]);
  useEffect(() => {
    input.current.scrollIntoView();
  }, [tag]);
  
  useEffect(()=>{
    onChange(tags)
    // eslint-disable-next-line
  },[tags ]);

  const removeTag = (tagToRemove) => {
    const tagIndex = tags.indexOf(tagToRemove);
    tags.splice(tagIndex, 1);
    setTags([...tags]);
  };

  const handleOnFocus = () => {
    tagsInput.current.classList.remove(
      "dark:border-dark-subtle",
      "border-light-subtle"
    );
    tagsInput.current.classList.add(
      "dark:border-white",
      "border-primary"
    );
  };
  const handleOnBlur = () => {
    tagsInput.current.classList.add(
      "dark:border-dark-subtle",
      "border-light-subtle"
    );
    tagsInput.current.classList.remove(
      "dark:border-white",
      "border-primary"
    ); 
  };

  return (
    <div>
      <div
        ref={tagsInput}
        onKeyDown={handleKeyDown}
        className=" border-2 bg-transparent dark:border-dark-subtle border-light-subtle px-2 h-10 rounded w-full text-white flex items-center space-x-2 overflow-x-auto custom-scroll-bar transition"
      >
        {tags.map((t) => (
          <Tag onClick={() => removeTag(t)} key={t}>
            {t}
          </Tag>
        ))}
        <input
          ref={input}
          type="text"
          className="h-full flex-grow bg-transparent outline-none dark:text-white text-primary"
          placeholder=" tag one ,tag two..."
          value={tag}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
      </div>
    </div>
  );
};

const Tag = ({ children, onClick }) => {
  return (
    <span className="dark:bg-white bg-primary dark:text-primary text-white flex items-center text-sm px-1 whitespace-nowrap">
      {" "}
      {children}
      <button type="button" onClick={onClick}>
        <AiOutlineClose size={12} />
      </button>{" "}
    </span>
  );
};

export default TagsInput;
