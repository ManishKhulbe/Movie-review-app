import React from "react";
import GridContainer from "../GridContainer";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
const MovieList = ({ movies = [], title }) => {
  if (!movies.length) return null;
  return (
    <div>
      <h1 className="text-2xl dark:text-white text-secondary font-semibold mb-5">
        {title}
      </h1>
      <GridContainer>
        {movies.map((movie) => {
          return <MovieListItem key={movie.id} movie={movie} />;
        })}
      </GridContainer>
    </div>
  );
};

const MovieListItem = ({ movie }) => {
  const { id,title, poster, reviews } = movie;
  const trimTitle = (movieName = "") => {
    if (movieName.length <= 20) return movieName;
    return movieName.substring(0, 20) + " ...";
  };
  return (
    <Link to={`/movie/${id}`}>
      <img className="aspect-video object-cover" src={poster} alt={title}></img>
      <h1
        className="text-lg dark:text-white text-secondary font-semibold"
        title={title}
      >
        {trimTitle(title)}
      </h1>
      {reviews.ratingAvg ? (
        <p className="text-highlight dark:text-highlight-dark flex items-center space-x-1">
          <span>{reviews?.ratingAvg}</span>
          <AiFillStar />
        </p>
      ) : (
        <p className="text-highlight dark:text-highlight-dark">No reviews</p>
      )}
    </Link>
  );
};

export default MovieList;
