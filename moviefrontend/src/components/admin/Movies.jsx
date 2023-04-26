import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getMovies } from "../../api/movie";
import { useNotification } from "../hooks";
import MovieListItems from "./MovieListItems";
import NextAndPrevButton from "../NextAndPrevButton";
import UpdateMovie from "../modals/UpdateMovie";
let currentPageNo = 0;
let limit = 10;
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [reachedToEnd, setReactToEnd] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const { updateNotification } = useNotification();

  const fetchMovies = async (pageNo) => {
    const { error, movies } = await getMovies(pageNo, limit);
    if (error) updateNotification("error", error);
    if (!movies.length) {
      currentPageNo = pageNo - 1;
      return setReactToEnd(true);
    }
    setMovies([...movies]);
  };

  const handleOnNextClick = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchMovies(currentPageNo, limit);
  };

  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) {
      setReactToEnd(false);
      return;
    }
    currentPageNo -= 1;
    fetchMovies(currentPageNo, limit);
  };

  const handleOnEditClick=(movie)=>{
    setShowUpdateModal(true)
  }
  const handleOnDeleteClick=(movie)=>{

  }

  useEffect(() => {
    fetchMovies(currentPageNo);
    // eslint-disable-next-line
  }, []);

  return (
    <>
    <div className="space-y-3 p-5">
      {movies.map((movie) => (
        <MovieListItems movie={movie} onEditClick={()=>handleOnEditClick(movie)} onDeleteClick={()=>handleOnDeleteClick(movie)} />
      ))}

      <NextAndPrevButton
        className="mt-5"
        onNextClick={handleOnNextClick}
        onPrevClick={handleOnPrevClick}
      />
    </div>
    <UpdateMovie visible={showUpdateModal}/>
    </>
  );
};

export default Movies;
