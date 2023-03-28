import React from "react";

const commonPosterUi= 'flex justify-center items-center border border-dashed rounded aspect-video dark:border-dark-subtle border-light-subtle cursor-pointer'

const PosterSelector = ({accept, name, selectedPoster,onChange }) => {
  return (
    <div>
      <input accept={accept} name={name} onChange={onChange} id={name} type="file" hidden />
      <label htmlFor={name}>
        {selectedPoster ? <img className={commonPosterUi+"object-cover"} src={selectedPoster} alt="" /> : <PosterUI />}
      </label>
    </div>
  );
};

const PosterUI = () => {
  return (
    <div className={commonPosterUi}>
      <span className="dark:text-dark-subtle text-light-subtle">Select Poster</span>
    </div>
  );
};

export default PosterSelector;
