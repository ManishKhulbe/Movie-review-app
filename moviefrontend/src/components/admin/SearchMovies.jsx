import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovieForAdmin } from "../../api/movie";
import { useNotification } from "../hooks";
import NotFoundText from "../NotFoundText";
import MovieListItems from "./MovieListItems";

const SearchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams] = useSearchParams();
  const { updateNotification } = useNotification();
  const query = searchParams.get("title");

  const searchMovies = async (val) => {
    const { error, results } = await searchMovieForAdmin(val);
    if (error) updateNotification("error", error);
    setMovies([...results]);
  };

  const handleAfterDelete = (movie) => {
    const updatedMovies = movie.filter((m) => m.id !== movie.id);
    setMovies([...updatedMovies]);
  };

  const handleAfterUpdate = (movie) => {
    const updatedMovies = movies.map((m) => {
      if (m.id === movie.id) return movie;
      return m;
    });
    setMovies([...updatedMovies]);
  };
  
  useEffect(() => {
    if (query.trim()) searchMovies(query);
    // eslint-disable-next-line
  }, [query]);

  return (
    <div className="p-5 space-y-3">
      {!movies.length ? (
        <NotFoundText text="Record not found" visible={!movies.length} />
      ) : (
        movies.map((movie) => (
          <MovieListItems
            movie={movie}
            key={movie.id}
            afterUpdate={handleAfterUpdate}
            afterDelete={handleAfterDelete}
          />
        ))
      )}
    </div>
  );
};

export default SearchMovies;
