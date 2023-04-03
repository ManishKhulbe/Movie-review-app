import React from "react";
import TagsInput from "./TagsInput";
import { commonInputClasses } from "../../utils/theme";
import LiveSearch from "./LiveSearch";
import { useState } from "react";
import Submit from "../form/Submit";
import { useNotification } from "../hooks";
// import ModalContainer from "../modals/ModalContainer";
import WriterModals from "../modals/WriterModals";
import CastForm from "../form/CastForm";
import CastModal from "../modals/CastModal";
import PosterSelector from "./PosterSelector";
import GenresSelector from "./GenresSelector";
import GenresModals from "../modals/GenresModals";
import Selector from "./Selector";
import { languageOptions, statusOptions, typeOptions } from "../../utils/options";

const results = [
  { id: "1", name: "mk" },
  { id: "2", name: "km" },
];

export const renderItem = (result) => {
  return (
    <div key={result.id} className="flex space-x-2 rounded overflow-hidden">
      <img
        src={result.avatar}
        alt={result.name}
        className="w-16 h-16 object-cover"
      />
      <p className="dark:text-white font-semibold">{result.name}</p>
    </div>
  );
};

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
  const [showCastModal, setShowCastModal] = useState(false);
  const [selectedPosterForUI, setSelectedPosterForUI] = useState('')
  const [showGenresModal, setShowGenresModal] = useState(false)
  
  const { updateNotification } = useNotification();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(movieInfo);
  };

  const updatePosterForUI =(poster)=>{
    setSelectedPosterForUI(URL.createObjectURL(poster))
  }
  const handleChange = ({ target }) => {
    const { value, name,files } = target;
    if(name==='poster'){
      const poster = files[0];
      updatePosterForUI(poster)
      return setMovieInfo({ ...movieInfo,poster });
    }
    setMovieInfo({ ...movieInfo, [name]: value });
  };

  const updateTags = (tags) => {
    setMovieInfo({ ...movieInfo, tags });
  };
  const updateDirector = (profile) => {
    setMovieInfo({ ...movieInfo, director: profile });
  };
  const updateCast = (castInfo) => {
    const { cast } = movieInfo;
    setMovieInfo({ ...movieInfo, cast: [...cast, castInfo] });
  };
  const updateGenres = (genres) => {
    return setMovieInfo({ ...movieInfo, genres });
  }
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
  const hideWritersModal = () => {
    setWritersModal(false);
  };
  const displayWritersModal = () => {
    const { writers } = movieInfo;
    if (writers.length) setWritersModal(true);
  };
  const hideCastModal = () => {
    setShowCastModal(false);
  };
  const displayCastModal = () => {
    setShowCastModal(true);
  };
  const hideGenresModal=()=>{
    setShowGenresModal(false)
  }
  const displayGenresModal = () => {
    setShowGenresModal(true);
  };
  const handleWriterRemove = (profileId) => {
    const { writers } = movieInfo;
    const newWriters = writers.filter(({ id }) => id !== profileId);
    if (!newWriters.length) hideWritersModal();
    setMovieInfo({ ...movieInfo, writers: [...newWriters] });
  };
  const handleCastRemove = (profileId) => {
    const { cast } = movieInfo;
    const newCast = cast.filter(({ profile }) => profile.id !== profileId);
    if (!newCast.length) hideCastModal();
    setMovieInfo({ ...movieInfo, cast: [...newCast] });
  };

  const { title, storyLine, director, writers, cast, tags , genres, type,language, status } = movieInfo;
 
  return (
    <>
      <div className="flex space-x-3 ">
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
            <TagsInput value={tags} name="tags" onChange={updateTags} />
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
              <ViewAllBtn
                visible={writers.length}
                onClick={displayWritersModal}
              >
                View all
              </ViewAllBtn>
            </div>
            <LiveSearch
              name="writers"
              results={results}
              placeholder="Search Profile"
              renderItem={renderItem}
              onSelect={updateWriters}
            />
          </div>
          <div>
            <div className="flex justify-between">
              <LabelWithBadge badge={cast.length}>
                Add Cast & Crew
              </LabelWithBadge>
              <ViewAllBtn visible={cast.length} onClick={displayCastModal}>
                View all
              </ViewAllBtn>
            </div>

            <CastForm onSubmit={updateCast} />
          </div>
          <Label htmlFor="releaseDate">Release Date</Label>
          <input
            type="date"
            className={commonInputClasses + " border-2 rounded p-1 w-auto"}
            onChange={handleChange}
            name='releaseDate'
          />
          <Submit value="Upload" onClick={handleSubmit} type="button" />
        </div>
        <div className="w-[30%] space-y-5">
          <PosterSelector name='poster'  onChange={handleChange}  selectedPoster={selectedPosterForUI} accept='image/jpg , image/jpeg , image/png'/>
          <GenresSelector badge={genres.length} onClick={displayGenresModal}>Select Genres</GenresSelector>
          <Selector onChange={handleChange} name="type" value={type} options={typeOptions} label="Type" />
          <Selector onChange={handleChange} name="language" value={language} options={languageOptions} label="Language" />
          <Selector onChange={handleChange} name="status" value={status} options={statusOptions} label="Status" />
        </div>
      </div>
      <WriterModals
        onClose={hideWritersModal}
        profiles={writers}
        visible={showWritersModal}
        onRemoveClick={handleWriterRemove}
      />
      <CastModal
        onClose={hideCastModal}
        casts={cast}
        visible={showCastModal}
        onRemoveClick={handleCastRemove}
      />
      <GenresModals  onSubmit={updateGenres} visible={showGenresModal} onClose={hideGenresModal} previousSelection={genres}/>
   
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

const LabelWithBadge = ({ children, htmlFor, badge = 0 }) => {
  console.log("🚀 ~ file: MovieForm.jsx:179 ~ LabelWithBadge ~ badge:", badge);
  if (!badge) return null;
  const renderBadge = () => {
    return (
      <span className="dark:bg-dark-subtle  bg-light-subtle text-white absolute top-0 right-0 w-5 h-5 translate-x-2 -translate-y-1 text-sm rounded-full flex justify-center items-center">
        {+badge <= 9 ? badge : "9+"}
      </span>
    );
  };
  return (
    <div className="relative">
      <Label htmlFor={htmlFor}>{children}</Label>
      {renderBadge()}
    </div>
  );
};

const ViewAllBtn = ({ visible, children, onClick }) => {
  if (!visible) return null;
  return (
    <button
      onClick={onClick}
      type="button"
      className="dark:text-white text-primary hover:underline transition"
    >
      {children}
    </button>
  );
};
export default MovieForm;
