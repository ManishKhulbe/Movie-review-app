import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getMostRated } from "../api/admin";
import { convertReviewCount } from "../utils/helper";
import { useNotification } from "./hooks";
import RatingStar from './RatingStar'

const MostRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const { updateNotification } = useNotification();

  const fetchMostRatedMovies = async () => {
    const { error, movies } = await getMostRated();
    console.log("🚀 ~ file: MostRatedMovies.jsx:14 ~ fetchMostRatedMovies ~ movies:", movies)
    if (error) return updateNotification("error", error);
    setMovies([...movies]);
  };
  useEffect(() => {
    fetchMostRatedMovies();
  }, []);


  return (
    <div className="bg-white shadow dark:bg-secondary rounded ">
      <h1 className="text-primary dark:text-white font-semibold text-2xl mb-2">
        Most Rated Movies
      </h1>
      <ul className="space-y-3">
      {movies.map((movie) => {
        return (
            <li key={movie.id} >
                <h1 className="text-secondary dark:text-white font-semibold">{movie.title}</h1>
                <div className="flex space-x-2">
                <RatingStar rating={movie.reviews?.ratingAvg}/>
                <p className="text-light-subtle dark:text-dark-subtle font-semibold">{convertReviewCount(movie.reviews?.reviewCount) } Reviews</p>
                </div>
            </li>
        )
      })}
      </ul>
    </div>
  );
};

export default MostRatedMovies;
