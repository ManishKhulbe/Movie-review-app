import React from "react";
import { useState } from "react";
import { commonInputClasses } from "../../utils/theme";
import { useNotification } from "../hooks";
import PosterSelector from "./PosterSelector";
import Selector from "./Selector";
import { ImSpinner3 } from "react-icons/im";
import { useEffect } from "react";

const defaultActorInfo = {
  name: "",
  about: "",
  avatar: null,
  gender: "male",
};

const genderOptions = [
  { title: "Male", value: "male" },
  { title: "Female", value: "female" },
  { title: "Other", value: "other" },
];

const validateActor = ({ name, about, avatar, gender }) => {
  console.log("🚀 ~ file: ActorForm.jsx:22 ~ validateActor ~ gender:", gender);
  if (!name.trim()) return { error: "Actor name is missing" };
  if (!about.trim()) return { error: "About is missing" };
  if (!gender.trim()) return { error: "Gender is missing" };
  if (avatar && !avatar.type?.startsWith("image"))
    return { error: "Invalid image avatar file" };

  return { error: null };
};
const ActorForm = ({ title, btnTitle, busy, onSubmit, initialState }) => {
  const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo });
  const [selectedAvatarForUI, setSelectedAvatarForUI] = useState("");
  const { updateNotification } = useNotification();
  const updatePosterForUI = (poster) => {
    setSelectedAvatarForUI(URL.createObjectURL(poster));
  };
  const handleChange = ({ target }) => {
    const { value, files, name } = target;
    if (name === "avatar") {
      const file = files[0];
      updatePosterForUI(file);
      setActorInfo({ ...actorInfo, avatar: file });
    } else {
      setActorInfo({ ...actorInfo, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(actorInfo, "actorInfo");
    const { error } = validateActor(actorInfo);
    if (error) return updateNotification("error", error);
    const formData = new FormData();

    for (let key in actorInfo) {
      if (key) formData.append(key, actorInfo[key]);
    }
    onSubmit(formData);
  };

  useEffect(() => {
    if (initialState) {
      setActorInfo({ ...initialState, avatar: null });
      setSelectedAvatarForUI(initialState.avatar)
    }
  }, [initialState]);
  const { name, about, gender } = actorInfo;
  return (
    <form
      onSubmit={handleSubmit}
      className="dark:bg-primary bg-white p-3 w-[35rem]"
    >
      <div className="flex justify-between items-center mb-3 rounded">
        <h1 className="font-semibold text-xl dark:text-white text-primary">
          {title}
        </h1>
        <button
          className="h-8 w-24 bg-primary text-white dark:bg-white dark:text-primary hover:opacity-80 transition rounded flex items-center justify-center"
          type="submit"
        >
          {busy ? <ImSpinner3 className="animate-spin" /> : btnTitle}
        </button>
      </div>
      <div className="flex space-x-2 mb-3">
        <PosterSelector
          selectedPoster={selectedAvatarForUI}
          className="w-36 h-36 aspect-square object-cover"
          name="avatar"
          onChange={handleChange}
          label="Select Avatar"
          accept="image/jpg , image/jpeg , image/png"
        />
        <div className="flex-grow flex flex-col space-y-2">
          <input
            placeholder="Enter name"
            type="text"
            className={commonInputClasses + "border-b-2"}
            value={name}
            name="name"
            onChange={handleChange}
          />
          <textarea
            placeholder="About"
            className={commonInputClasses + "border-b-2 resize-none h-full"}
            value={about}
            name="about"
            onChange={handleChange}
          />
        </div>
      </div>
      <Selector
        options={genderOptions}
        label="Gender"
        value={gender}
        onChange={handleChange}
        name="gender"
      />
    </form>
  );
};

export default ActorForm;
