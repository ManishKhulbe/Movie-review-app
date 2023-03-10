import React from "react";
import TagsInput from "./TagsInput";
import { commonInputClasses } from "../../utils/theme";
import LiveSearch from "./LiveSearch";
import { useState } from "react";
import Submit from "../form/Submit";
import { useNotification } from "../hooks";
import ModalContainer from "../modals/ModalContainer";
import WriterModals from "../modals/WriterModals";
import CastForm from "../form/CastForm";

const results = [
  { id: "1", name: "mk" },
  { id: "2", name: "km" },
];

const defaultMovieInfo = {
  title: "",
  storyLine: "",
  tags: [],
  cast: [],
  director: {},
  writers: [],
  releaseDate: "",
  poster: null,
  genres: [],
  type: "",
  language: "",
  status: "",
};
const MovieForm = () => {
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
  const [showWritersModal, setWritersModal] = useState(false);
  const { updateNotification } = useNotification();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(movieInfo);
  };

  const renderItem = (result) => {
    return (
      <div key={result.key} className="flex space-x-2 rounded overflow-hidden">
        <img
          src={result.avatar}
          alt={result.name}
          className="w-16 h-16 object-cover"
        />
        <p className="dark:text-white font-semibold">{result.name}</p>
      </div>
    );
  };
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setMovieInfo({ ...movieInfo, [name]: value });
  };

  const updateTags = (tags) => {
    setMovieInfo({ ...movieInfo, tags });
  };
  const updateDirector = (profile) => {
    setMovieInfo({ ...movieInfo, director: profile });
  };
  const updateWriters = (profile) => {
    const { writers } = movieInfo;
    for (let writer of writers) {
      if (writer.id === profile.id) {
        return updateNotification(
          "warning",
          "This Profile is already selected"
        );
      }
    }
    setMovieInfo({ ...movieInfo, writers: [...writers, profile] });
  };
const hideWritersModal=()=>{
  setWritersModal(false)
}
const displayWritersModal =()=>{
  const { writers } = movieInfo;
  if(writers.length) setWritersModal(true)
}
  const handleWriterRemove=(profileId)=>{
    const {writers} = movieInfo
    const newWriters = writers.filter(({id})=>id!==profileId)
    if(!newWriters.length)hideWritersModal()
    setMovieInfo({ ...movieInfo, writers: [...newWriters] });
  }

  const { title, storyLine, director, writers } = movieInfo;
  return (
    <>
      <form onSubmit={handleSubmit} className="flex space-x-3 ">
        <div className="w-[70%] space-y-5 ">
          <div>
            <Label htmlFor="title">Title</Label>
            <input
              id="title"
              type="text"
              value={title}
              name="title"
              onChange={handleChange}
              className={
                commonInputClasses + "border-b-2  font-semibold text-xl"
              }
              placeholder="Titanic"
            />
          </div>
          <div>
            <Label htmlFor="storyLine">Story Line</Label>
            <textarea
              id="storyLine"
              value={storyLine}
              name="storyLine"
              onChange={handleChange}
              className={commonInputClasses + "resize-none h-24"}
              placeholder="Movie story line..."
            ></textarea>
          </div>
          <div>
            <Label htmlFor="tags">Tags</Label>
            <TagsInput name="tags" onChange={updateTags} />
          </div>
          <div>
            <Label htmlFor="director">Director</Label>
            <LiveSearch
              name="director"
              value={director.name}
              results={results}
              placeholder="Search Profile"
              renderItem={renderItem}
              onSelect={updateDirector}
            />
          </div>
          <div>
            <div className="flex justify-between">
              <LabelWithBadge htmlFor="writers" badge={writers.length}>
                Writers
              </LabelWithBadge>
              <button
                onClick={displayWritersModal}
                className="dark:text-white text-primary hover:underline transition"
              >
                View All
              </button>
            </div>
            <LiveSearch
              name="writers"
              results={results}
              placeholder="Search Profile"
              renderItem={renderItem}
              onSelect={updateWriters}
            />
          </div>
          <CastForm/>
          <Submit value="Upload" />
        </div>
        <div className="w-[30%]"></div>
      </form>
      <WriterModals onClose={hideWritersModal} profiles={writers}  visible={showWritersModal} onRemoveClick={handleWriterRemove} />
   
    </>
  );
};

const Label = ({ children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="dark:text-dark-subtle text-light-subtle font-semibold mr-3"
    >
      {" "}
      {children}
    </label>
  );
};

const LabelWithBadge = ({ children, htmlFor, badge }) => {
  console.log("🚀 ~ file: MovieForm.jsx:179 ~ LabelWithBadge ~ badge:", badge)
  const renderBadge = () => {
   return( <span className="dark:bg-dark-subtle  bg-light-subtle text-white absolute top-0 right-0 w-5 h-5 translate-x-2 -translate-y-1 text-sm rounded-full flex justify-center items-center">
      {+badge <= 9 ? badge : "9+"}
    </span>)
  };
  return (
    <div className="relative">
      <Label htmlFor={htmlFor}>{children}</Label>
      {renderBadge()}
    </div>
  );
};
export default MovieForm;
