import React,{useState} from 'react'
import LiveSearch from './LiveSearch'
import { renderItem } from '../../utils/helper'
import { useSearch } from '../hooks'
import { searchActor } from "../../api/actor";
const WriterSelector = ({onSelect}) => {
    const [value, setValue] = useState("");
    const [profiles, setProfiles] = useState([]);
    const { handleSearch, resetSearch } = useSearch();
    const handleOnChange = ({ target }) => {
      const { value } = target;
      setValue(value);
      handleSearch(searchActor, value, setProfiles);
      console.log(profiles,";profilesprofilesprofiles")
    };
  
    const handleOnSelect = (profile) => {
      setValue('');
      onSelect(profile);
      setProfiles([]);
      resetSearch();
    };
  return (
    <LiveSearch
              name="writers"
              results={profiles}
              placeholder="Search Profile"
              renderItem={renderItem}
              onSelect={handleOnSelect}
              onChange ={handleOnChange}
              value={value}
            />
  )
}

export default WriterSelector
