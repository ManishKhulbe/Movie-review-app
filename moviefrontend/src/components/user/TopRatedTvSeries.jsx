import { useState, useEffect } from "react";
import { getTopRatedMovies } from "../../api/movie";

import { useNotification } from "../hooks";
import MovieList from "./MovieList";

const TopRatedTvSeries = () => {
  const [movies, setMovies] = useState([]);
  const { updateNotification } = useNotification();

  const fetchMovies = async () => {
    const { error, movies } = await getTopRatedMovies('TV Series');
    if (error) return updateNotification("error", error);
    setMovies([...movies]);
  };

  useEffect(() => {
    fetchMovies();
     // eslint-disable-next-line
  }, []);

  return <MovieList movies={movies} title="Viewers choice (Web Series)" />;
};

export default TopRatedTvSeries;
