import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { genres } from "../../utils/genres";
import Submit from "../form/Submit";
import ModalContainer from "./ModalContainer";

const GenresModals = ({ previousSelection ,visible, onClose, onSubmit }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const handleGenresSelector = (gen) => {
    let newGenres = [];
    if (selectedGenres.includes(gen)) {
      newGenres = selectedGenres.filter((genres) => genres !== gen);
    } else {
      newGenres = [...selectedGenres, gen];
    }

    setSelectedGenres([...newGenres]);
  };

  useEffect(()=>{
    setSelectedGenres(previousSelection);
    // eslint-disable-next-line
  },[])

  const handleSubmit =()=>{
    onSubmit(selectedGenres)
    onClose()
  }

  const handleClose=()=>{
    setSelectedGenres(previousSelection)
    onClose()
  }
  return (
    <ModalContainer visible={visible} onClose={handleClose}>
      <div className="flex flex-col justify-between h-full">
        <div>
        <h1 className="dark:text-white text-primary text-2xl font-semibold text-center">
          Select Genres
        </h1>
     
        <div className="space-y-3">
          {genres.map((gen) => {
            return (
              <Genres
              onClick={() => handleGenresSelector(gen)}
                key={gen}
                selected={selectedGenres.includes(gen)}
                >
                {gen}
              </Genres>
            );
        })}
        </div>
        </div>
        <Submit value='Select' type='button' onClick={handleSubmit} />
      </div>
    </ModalContainer>
  );
};

const Genres = ({ children, selected, onClick }) => {
  const getSelectedStyle = () => {
    return selected
      ? "dark:bg-white dark:text-primary bg-light-subtle text-white "
      : "dark:text-white text-primary";
  };
  return (
    <button
      onClick={onClick}
      className={
        getSelectedStyle() +
        " border-2 dark:border-dark-subtle border-light-subtle  p-1 rounded mr-3"
      }
    >
      {children}
    </button>
  );
};

export default GenresModals;
