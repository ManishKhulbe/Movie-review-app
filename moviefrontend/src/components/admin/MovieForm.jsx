import React from "react";
import TagsInput from "./TagsInput";
import { commonInputClasses } from "../../utils/theme";

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
import {
  languageOptions,
  statusOptions,
  typeOptions,
} from "../../utils/options";

import Label from "../admin/Label";
import ViewAllBtn from "./ViewAllButton";
import DirectorSelector from "./DirectorSelector";
import WriterSelector from "./WriterSelector";
import LabelWithBadge from "./LabelWithBadge";
import { validateMovie } from "../../utils/validator";

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

const MovieForm = ({ onSubmit , busy}) => {
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
  const [showWritersModal, setWritersModal] = useState(false);
  const [showCastModal, setShowCastModal] = useState(false);
  const [selectedPosterForUI, setSelectedPosterForUI] = useState("");
  const [showGenresModal, setShowGenresModal] = useState(false);

  const { updateNotification } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateMovie(movieInfo);
    if (error) return updateNotification("error", error);

    const { tags, genres, cast, writers, director, poster } = movieInfo;
    const formData = new FormData();
    const finalMovieInfo = {
      ...movieInfo,
    };
    finalMovieInfo.tags = JSON.stringify(tags);
    finalMovieInfo.genres = JSON.stringify(genres);

    const finalCast = cast.map((c) => {
      return {
        actor: c.profile.id,
        roleAs:c.roleAs,
        leadActor: c.leadActor
      }
    });
    finalMovieInfo.cast = JSON.stringify(finalCast);

    if (writers.length) {
      const finalWriters = writers.map((w) => w.id);
      finalMovieInfo.writers = JSON.stringify(finalWriters);
    }
    if (director) {
      finalMovieInfo.director = JSON.stringify(director);
    }
    if (poster) finalMovieInfo.poster = poster;

    for (let key in finalMovieInfo) {
      formData.append(key, finalMovieInfo[key]);
    }
    onSubmit(formData);
  };

  const updatePosterForUI = (poster) => {
    setSelectedPosterForUI(URL.createObjectURL(poster));
  };
  const handleChange = ({ target }) => {
    const { value, name, files } = target;
    if (name === "poster") {
      const poster = files[0];
      updatePosterForUI(poster);
      return setMovieInfo({ ...movieInfo, poster });
    }
    // if (name === "writers") return setWriterName(value);
    console.log(name,value)
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
  const hideGenresModal = () => {
    setShowGenresModal(false);
  };
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

  const {
    title,
    storyLine,
    writers,
    cast,
    tags,
    genres,
    type,
    language,
    status,
  } = movieInfo;

  return (
    <>
      <div className="flex space-x-3 w-[45rem] h-[40rem] ">
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
            <DirectorSelector onSelect={updateDirector} />
          </div>
          <div>
            <div className="flex justify-between">
             {writers.length ? <LabelWithBadge htmlFor="writers" badge={writers.length}>
                Writers
              </LabelWithBadge> :  <Label htmlFor="writers">Writers</Label>}
              <ViewAllBtn
                visible={writers.length}
                onClick={displayWritersModal}
              >
                View all
              </ViewAllBtn>
            </div>
            <WriterSelector onSelect={updateWriters} />
          </div>
          <div>
            <div className="flex justify-between">
             {cast.length?  <LabelWithBadge badge={cast.length}>
                Add Cast & Crew
              </LabelWithBadge>:  <Label htmlFor="cast"> Add Cast & Crew</Label>}
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
            name="releaseDate"
          />
          <Submit busy={busy} value="Upload" onClick={handleSubmit} type="button" />
        </div>
        <div className="w-[30%] space-y-5">
          <PosterSelector
            label="Select Poster"
            name="poster"
            onChange={handleChange}
            selectedPoster={selectedPosterForUI}
            accept="image/jpg , image/jpeg , image/png"
          />
          <GenresSelector badge={genres.length} onClick={displayGenresModal}>
            Select Genres
          </GenresSelector>
          <Selector
            onChange={handleChange}
            name="type"
            value={type}
            options={typeOptions}
            label="Type"
          />
          <Selector
            onChange={handleChange}
            name="language"
            value={language}
            options={languageOptions}
            label="Language"
          />
          <Selector
            onChange={handleChange}
            name="status"
            value={status}
            options={statusOptions}
            label="Status"
          />
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
      <GenresModals
        onSubmit={updateGenres}
        visible={showGenresModal}
        onClose={hideGenresModal}
        previousSelection={genres}
      />
    </>
  );
};

export default MovieForm;
