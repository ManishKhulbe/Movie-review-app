import React, { useState } from "react";
import { useEffect } from "react";
import { getRelatedMovie } from "../api/movie";
import { useNotification } from "./hooks";
import MovieList from "./user/MovieList";

const RelatedMovie = ({ movieId }) => {
  const [movies, setMovies] = useState([]);
  const { updateNotification } = useNotification();

  const fetchRelatedMovies = async () => {
    const { error, movies } = await getRelatedMovie(movieId);
    if (error) updateNotification("error", error);
    setMovies([...movies]);
  };

  useEffect(()=>{
    if(movieId) fetchRelatedMovies();
  },[movieId])

  return <MovieList title='Related Movies' movies={movies}></MovieList>;
};

export default RelatedMovie;
