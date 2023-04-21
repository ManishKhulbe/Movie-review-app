import React, { useState } from "react";
import { commonInputClasses } from "../../utils/theme";
import LiveSearch from "../admin/LiveSearch";
import { renderItem } from "../../utils/helper";
import { useNotification, useSearch } from "../hooks";
import { searchActor } from "../../api/actor";

const defaultCastInfo = {
  profile: {},
  roleAs: "",
  leadActor: false,
};
// const results = [
//   { id: "1", name: "mk" },
//   { id: "2", name: "km" },
// ];
const CastForm = ({onSubmit}) => {
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });
  const [profiles, setProfiles] = useState([])
  const { leadActor, profile, roleAs } = castInfo;

  const {updateNotification}= useNotification()
  const {handleSearch,resetSearch} = useSearch()
  const handleOnChange = ({target}) => {
    const {checked , name , value}= target;

    if(name ==='leadActor'){
      return setCastInfo({...castInfo , leadActor:checked })
    }
    setCastInfo({...castInfo,[name]:value});
  };

  const handleProfileSelect=(profile)=>{
    setCastInfo({...castInfo, profile });

  }
  const handleSubmit=()=>{
    const { profile, roleAs } = castInfo;
    if(!profile.name){
      return updateNotification('error','Cast profile is missing!')
    }
    if(!roleAs.trim()){
      return updateNotification('error',"Cast role is missing!")
    }
    onSubmit(castInfo);
    setCastInfo({...defaultCastInfo, profile:{name:''}});
    resetSearch()
    setProfiles([])
  }

  const handleProfileChange=({target})=>{
const {value} = target;
const {profile} = castInfo
profile.name= value;
setCastInfo({...castInfo,...profile})
console.log(profile)
handleSearch(searchActor, value, setProfiles)

  }
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="leadActor"
        className="w-4 h-4"
        checked={leadActor}
        onChange={handleOnChange}
        title= 'Set as lead actor'
      />
      <LiveSearch
        placeholder="Search profile.."
        value={profile.name}
        results={profiles}
        renderItem={renderItem}
        onSelect={handleProfileSelect}
        onChange={handleProfileChange}
      />
      <span className="dark:text-dark-subtle text-light-subtle font-semibold">
        as
      </span>
      <input
        type="text"
        className={commonInputClasses + "rounded p-1 text-lg border-2"}
        name="roleAs"
        value={roleAs}
        onChange={handleOnChange}
        placeholder="Role as"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-secondary dark:bg-white dark:text-primary text-white  p-1"
      >
        Add
      </button>
    </div>
  );
};

export default CastForm;
