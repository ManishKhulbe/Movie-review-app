import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleMovie } from "../../api/movie";
import { useNotification } from "../hooks";
import { useAuth } from "../hooks";
import { Link } from "react-router-dom";
import Container from "../Container";
import RatingStar from "../RatingStar";
import RelatedMovie from "../RelatedMovie";

const convertReviewCount = (reviewCount) => {
  if (!reviewCount) return 0;
  if (reviewCount <= 999) return reviewCount;
  return parseFloat(reviewCount / 1000).toFixed(2) + "k";
};

const convertDate = (date) => {
  return date.split("T")[0];
};
const SingleMovie = () => {
  const [ready, setReady] = useState(false);
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const { updateNotification } = useNotification();
  const {isLoggedIn} = useAuth()
  const navigate = useNavigate()

  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(movieId);
    if (error) return updateNotification("error", error);
    setReady(true);
    setMovie(movie);
  };

  const handleOnRateMovie=()=>{
    if(!isLoggedIn) return navigate('/auth/signin')
  }

  useEffect(() => {
    if (movieId) fetchMovie();
    // eslint-disable-next-line
  }, [movieId]);

  if (!ready) {
    return (
      <div className="w-full h-screen flex justify-center items-center dark:bg-primary bg-white">
        <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
          Please wait...
        </p>
      </div>
    );
  }
  console.log(movie);
  const {
    trailer,
    poster,
    title,
    id,
    storyLine,
    releaseDate,
    reviews = {},
    director = {},
    writers = [],
    cast = [],
    language,
    genres,
    type,
  } = movie;
  return (
    <>
      <div className="dark:bg-primary bg-white min-h-screen pb-10">
        <Container>
          <video poster={poster} controls src={trailer} />
          <div className="flex justify-between">
            <h1 className="text-4xl  text-highlight dark:text-highlight-dark font-semibold py-3">
              {title}
            </h1>
            <div className="flex flex-col items-end ">
              {reviews.ratingAvg ? (
                <RatingStar rating={reviews.ratingAvg} />
              ) : null}
              <Link
                className="text-highlight dark:text-highlight-dark hover:underline "
                to={"/movie/reviews" + id}
              >
                {convertReviewCount(reviews.reviewCount)} Reviews
              </Link>

              <button
                className="text-highlight dark:text-highlight-dark hover:underline"
                type="button"
                onClick={handleOnRateMovie}
              >
                Rate The Movie
              </button>
            </div>
          </div>

          <div className="space-y-3 ">
            <p className="text-light-subtle dark:text-dark-subtle">
              {storyLine}
            </p>
            <div className="flex space-x-2">
              <p className="text-light-subtle dark:text-dark-subtle font-semibold">
                Director:
              </p>
              <p className="text-light-subtle dark:text-dark-subtle text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
                {director.name}
              </p>
            </div>

            <div className="flex">
              <p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
                Writers:
              </p>
              <div className="flex space-x-2">
                {writers.map((w) => (
                  <p
                    ley={w.id}
                    className="text-light-subtle dark:text-dark-subtle text-highlight dark:text-highlight-dark hover:underline cursor-pointer"
                  >
                    {w.name}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex">
              <p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
                Cast:
              </p>
              <div className="flex space-x-2">
                {cast.map((c) => {
                  return c.leadActor ? (
                    <p
                      key={c.profile.id}
                      className="text-light-subtle dark:text-dark-subtle text-highlight dark:text-highlight-dark hover:underline cursor-pointer"
                    >
                      {c.profile.name}
                    </p>
                  ) : null;
                })}
              </div>
            </div>

            <div className="flex">
              <p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
                language:
              </p>
              <p className="text-light-subtle dark:text-dark-subtle text-highlight dark:text-highlight-dark ">
                {language}
              </p>
            </div>

            <div className="flex">
              <p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
                Release Date:
              </p>
              <p className="text-light-subtle dark:text-dark-subtle text-highlight dark:text-highlight-dark ">
                {convertDate(releaseDate)}
              </p>
            </div>

            <div className="flex">
              <p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
                Genres:
              </p>
              <div className="flex space-x-2">
                {genres.map((g) => {
                  return (
                    <p
                      key={g}
                      className="text-light-subtle dark:text-dark-subtle text-highlight dark:text-highlight-dark"
                    >
                      {g}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className="flex">
              <p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
                Type:
              </p>
              <p className="text-light-subtle dark:text-dark-subtle text-highlight dark:text-highlight-dark ">
                {type}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <h1 className="text-light-subtle dark:text-dark-subtle font-semibold text-2xl mb-2">
              Cast:
            </h1>
            <div className="grid grid-cols-10 ">
              {cast.map((c) => {
                return (
                  <div
                    className="flex flex-col justify-center items-center "
                    key={c.profile.id}
                  >
                    <img
                      className="w-24 h-24 aspect-square object-cover rounded-full"
                      src={c.profile.avatar}
                      alt=""
                    />

                    <p className=" text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
                      {c?.profile?.name.split(" ").join("")}
                    </p>
                    <span className="text-light-subtle dark:text-dark-subtle text-sm">
                      as
                    </span>
                    <p className="text-light-subtle dark:text-dark-subtle hover:underline cursor-pointer">
                      {c.roleAs}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3">
            <RelatedMovie movieId={movieId} />
          </div>


        </Container>
      </div>
    </>
  );
};

export default SingleMovie;
