import React, { Children } from "react";
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
import AddRatingModal from "../modals/AddRatingModal";
import CustomButtonLink from "../CustomButtonLink";

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
  const [showRatingModal, setShowRatingModal] = useState(false);
  const { movieId } = useParams();
  const { updateNotification } = useNotification();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const navigate = useNavigate();

  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(movieId);
    if (error) return updateNotification("error", error);
    setReady(true);
    setMovie(movie);
  };

  const handleOnRateMovie = () => {
    if (!isLoggedIn) return navigate("/auth/signin");
    setShowRatingModal(true);
  };
  const hideRatingModal = () => {
    setShowRatingModal(false);
  };

  const handleOnRatingSuccess = (reviews) => {
    setMovie({ ...movie, reviews: { ...reviews } });
  };
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
        <Container className='xl:px-0 px-2 '>
          <video poster={poster} controls src={trailer} />
          <div className="flex justify-between">
            <h1 className="xl:text-4xl lg:text-3xl text-2xl  text-highlight dark:text-highlight-dark font-semibold py-3">
              {title}
            </h1>
            <div className="flex flex-col items-end ">
              {reviews.ratingAvg ? (
                <RatingStar rating={reviews.ratingAvg} />
              ) : null}

              <CustomButtonLink
                label={convertReviewCount(reviews.reviewCount) + "Reviews"}
                onClick={() => navigate("/movie/reviews/" + id)}
              />

              <CustomButtonLink
                label={"Rate The Movie"}
                onClick={handleOnRateMovie}
              />
            </div>
          </div>

          <div className="space-y-5 ">
            <p className="text-light-subtle dark:text-dark-subtle">
              {storyLine}
            </p>

            <ListWithLabel label="Director">
              <CustomButtonLink label={director.name} />
            </ListWithLabel>

            <ListWithLabel label="Writers">
              {" "}
              {writers.map((w) => (
                <CustomButtonLink key={w.id} label={w.name} />
              ))}{" "}
            </ListWithLabel>

            <ListWithLabel label="Cast">
              {" "}
              {cast.map((c) => {
                return c.leadActor ? (
                  <CustomButtonLink key={c.profile.id} label={c.profile.name} />
                ) : null;
              })}
            </ListWithLabel>

            <ListWithLabel label="language">
              <CustomButtonLink label={language} clickable={false} />
            </ListWithLabel>

            <ListWithLabel label="Release Date">
              <CustomButtonLink
                label={convertDate(releaseDate)}
                clickable={false}
              />
            </ListWithLabel>

            <ListWithLabel label="Genres">
              {genres.map((g) => {
                return <CustomButtonLink key={g} label={g} clickable={false} />;
              })}
            </ListWithLabel>

            <ListWithLabel label="Type">
              <CustomButtonLink label={type} clickable={false} />
            </ListWithLabel>

            <CastProfiles cast={cast} />
            <RelatedMovie movieId={movieId} />
          </div>
        </Container>

        <AddRatingModal
          visible={showRatingModal}
          onClose={hideRatingModal}
          onSuccess={handleOnRatingSuccess}
        />
      </div>
    </>
  );
};

const ListWithLabel = ({ label, children }) => {
  return (
    <div className="flex space-x-2">
      <p className="text-light-subtle dark:text-dark-subtle font-semibold">
        {label}:
      </p>
      {children}
    </div>
  );
};

const CastProfiles = ({ cast }) => {
  return (
    <>
      <h1 className="text-light-subtle dark:text-dark-subtle font-semibold text-2xl mb-2">
        Cast:
      </h1>
      <div className="flex flex-wrap space-x-4">
        {cast.map((c) => {
          return (
            <div
              className="basis-28 flex flex-col justify-center items-center text-center mb-4 "
              key={c.profile.id}
            >
              <img
                className="w-24 h-24 aspect-square object-cover rounded-full"
                src={c.profile.avatar}
                alt=""
              />
              <CustomButtonLink label={c?.profile?.name.split(" ").join("")} />

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
    </>
  );
};

export default SingleMovie;
