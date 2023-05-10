import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { deleteActor, getActor, searchActor } from "../../api/actor";
import { useNotification, useSearch } from "../hooks/index";
import NextAndPrevButton from "../NextAndPrevButton";
import UpdateActor from "../modals/UpdateActor";
import AppSearchForm from "../form/AppSearchForm";
import NotFoundText from "../NotFoundText";
import ConfirmModal from "../modals/ConfirmModal";
let currentPageNo = 0;
let limit = 20;

const Actors = () => {
  const [actors, setActors] = useState([]);
  const [results, setResults] = useState([]);
  const [reachedToEnd, setReactToEnd] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();
  const { handleSearch, resetSearch, resultNotFound } = useSearch();

  const fetchActors = async (pageNo, limit) => {
    const { error, profiles } = await getActor(pageNo, limit);
    if (error) return updateNotification("error", error);
    if (!profiles.length) {
      currentPageNo = pageNo - 1;
      return setReactToEnd(true);
    }
    setActors([...profiles]);
  };

  const handleOnNextClick = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchActors(currentPageNo, limit);
  };
  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) {
      setReactToEnd(false);
      return;
    }
    currentPageNo -= 1;
    fetchActors(currentPageNo, limit);
  };
  const handleOnEditClick = (profile) => {
    setSelectedProfile(profile);
    setShowUpdateModal(true);
  };
  const hideUpdateModal = () => {
    setShowUpdateModal(false);
  };
  const handleOnActorUpdate = (profile) => {
    const updatedActors = actors.map((actor) => {
      if (actor.id === profile.id) {
        return profile;
      }
      return actor;
    });
    setActors([...updatedActors]);
  };

  const handleOnDeleteClick = (profile) => {
    setSelectedProfile(profile);
    setShowConfirmModal(true);
  };

  const handleOnSearchSubmit = (value) => {
    handleSearch(searchActor, value, setResults);
  };
  const handleSearchFormReset = () => {
    resetSearch();
    setResults([]);
  };
  const hideConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleOnDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteActor(selectedProfile.id);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    hideConfirmModal()
    fetchActors(currentPageNo)
  };

  useEffect(() => {
    fetchActors(currentPageNo, limit);
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="p-5">
        <div className="flex justify-end mb-5">
          <AppSearchForm
            placeholder="Search Actors.."
            onSubmit={handleOnSearchSubmit}
            showResetButton={results.length || resultNotFound}
            onReset={handleSearchFormReset}
          />
        </div>
        <NotFoundText text="Record not found" visible={resultNotFound} />
        <div className="grid grid-cols-4 gap-5">
          {results.length || resultNotFound
            ? results.map((actor) => (
                <ActorProfile
                  profile={actor}
                  key={actor.id}
                  onEditClick={() => handleOnEditClick(actor)}
                  onDeleteClick={() => handleOnDeleteClick(actor)}
                />
              ))
            : actors.map((actor) => (
                <ActorProfile
                  profile={actor}
                  key={actor.id}
                  onEditClick={() => handleOnEditClick(actor)}
                  onDeleteClick={() => handleOnDeleteClick(actor)}
                />
              ))}
        </div>

        {!results.length && !resultNotFound ? (
          <NextAndPrevButton
            className="mt-5"
            onNextClick={handleOnNextClick}
            onPrevClick={handleOnPrevClick}
          />
        ) : null}
      </div>
      <ConfirmModal
        visible={showConfirmModal}
        title="Are you sure?"
        subtitle="This action will remove this profile permanently!"
        busy={busy}
        onConfirm={handleOnDeleteConfirm}
        onCancel={hideConfirmModal}
      />
      <UpdateActor
        visible={showUpdateModal}
        onClose={hideUpdateModal}
        initialState={selectedProfile}
        onSuccess={handleOnActorUpdate}
      />
    </>
  );
};

const ActorProfile = ({ profile, onEditClick, onDeleteClick }) => {
  const [showOptions, setShowOptions] = useState(false);
  const acceptedNameLength = 15;
  const handleOnMouseEnter = () => {
    setShowOptions(true);
  };

  const handleOnMouseLeave = () => {
    setShowOptions(false);
  };

  const getName = (name) => {
    if (name.length <= acceptedNameLength) return name;
    return name.substring(0, acceptedNameLength) + "..";
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
          <h1 className="text-xl text-primary dark:text-white font-semibold whitespace-nowrap">
            {getName(name)}
          </h1>
          <p className=" text-primary dark:text-white opacity-60">
            {about.substring(0, 50)}
          </p>
        </div>
        <Options
          onEditClick={onEditClick}
          visible={showOptions}
          onDeleteClick={onDeleteClick}
        />
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
