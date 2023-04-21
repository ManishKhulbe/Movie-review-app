import React from "react";
import { useRef } from "react";
import { forwardRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { commonInputClasses } from "../../utils/theme";

const LiveSearch = ({
  results = [],
  selectedResultStyle,
  resultContainerStyle,
  inputStyle,
  renderItem = null,
  value = "",
  name = "",
  onChange = null,
  placeholder = "",
  onSelect = null,

}) => {
  const [displaySearch, setDisplaySearch] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [defaultValue,setDefaultValue]=useState('')
  const handleOnFocus = () => {
    if (results.length) setDisplaySearch(true);
  };
  const handleOnBlur = () => {
    setTimeout(()=>{closeSearch()},100)
  };
  const closeSearch = () => {
    setDisplaySearch(false);
    setFocusedIndex(-1);
  };
  const handleSelection = (selectedItem) => {
    if (selectedItem) {
      onSelect(selectedItem);
      closeSearch();
    }
  };
  const handleKeyDown = ({ key }) => {
    console.log(key, "bb");
    const keys = ["ArrowDown", "ArrowUp", "Enter", "Escape"];
    let nextCount;
    if (!keys.includes(key)) return;
    if (key === "ArrowDown") {
      nextCount = (focusedIndex + 1) % results.length;
    }
    if (key === "ArrowUp") {
      nextCount = (focusedIndex + (results.length - 1)) % results.length;
    }
    if (key === "Enter") {
      return handleSelection(results[focusedIndex]);
    }
    if (key === "Escape") {
      return closeSearch();
    }
    setFocusedIndex(nextCount);
  };

  const getInputStyle = () => {
    return inputStyle
      ? inputStyle
      : commonInputClasses + "rounded border-2 p-1 text-lg";
  };

  const handleChange=(e)=>{
    setDefaultValue(e.target.value)
    onChange && onChange(e)
  }

  useEffect(()=>{
   if(results.length) return setDisplaySearch(true);
   setDisplaySearch(false)
  },[results.length])
  
  useEffect(() => {
    setDefaultValue(value);
  }, [value]);


  return (
    <div className="relative">
      <input
        type="text"
        id={name}
        name={name}
        className={getInputStyle()}
        placeholder={placeholder}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleKeyDown}
        value={defaultValue}
        onChange={handleChange}
      />
      <SearchResults
        results={results}
        visible={displaySearch}
        focusedIndex={focusedIndex}
        onSelect={handleSelection}
        renderItem={renderItem}
        resultContainerStyle={resultContainerStyle}
        selectedResultStyle={selectedResultStyle}
      />
    </div>
  );
};

const SearchResults = ({
  visible,
  results = [],
  focusedIndex,
  onSelect,
  renderItem,
  resultContainerStyle,
  selectedResultStyle,
}) => {
  const resultContainer = useRef();
  useEffect(() => {
    resultContainer.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [focusedIndex]);
  if (!visible) return null;
  return (
    <div className="absolute z-50 right-0 left-0 top-10 bg-white dark:bg-secondary shadow-md max-h-64 space-y-2 overflow-auto mt-1 custom-scroll-bar">
      {results.map((result, index) => {
        const getSelectedClass = () => {
          return selectedResultStyle
            ? selectedResultStyle
            : "dark:bg-dark-subtle bg-light-subtle";
        };
        return (
          <ResultItem
            ref={index === focusedIndex ? resultContainer : null}
            key={index.toString()}
            item={result}
            renderItem={renderItem}
            resultContainerStyle={resultContainerStyle}
            selectedResultStyle={
              index === focusedIndex ? getSelectedClass() : ""
            }
            onMouseDown={() => onSelect(result)}
            onClick={() => onSelect(result)}
          />
        );
      })}
    </div>
  );
};

const ResultItem = forwardRef((props, ref) => {
  const {
    item,
    renderItem,
    onMouseDown,
    resultContainerStyle,
    selectedResultStyle,
    onClick,
  } = props;

  const getClasses = () => {
    if (resultContainerStyle)
      return resultContainerStyle + " " + selectedResultStyle;

    return (
      selectedResultStyle +
      " cursor-pointer rounded overflow-hidden dark:hover:bg-dark-subtle hover:bg-light-subtle transition "
    );
  };
  return (
    <div
      onMouseDown={onMouseDown}
      onClick={onClick}
      ref={ref}
      className={getClasses()}
    >
      {renderItem(item)}
    </div>
  );
});

export default LiveSearch;
