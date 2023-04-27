import React from "react";
import { useEffect } from "react";
// import { useState } from "react";
// import { deleteMovie, getMovieForUpdate, getMovies } from "../../api/movie";
import { useMovies } from "../hooks";
import MovieListItems from "./MovieListItems";
import NextAndPrevButton from "../NextAndPrevButton";
// import UpdateMovie from "../modals/UpdateMovie";
// import ConfirmModal from "../modals/ConfirmModal";
let currentPageNo = 0;
// let limit = 10;
const Movies = () => {
  // const [movies, setMovies] = useState([]);
  // const [reachedToEnd, setReactToEnd] = useState(false);
  // const [showUpdateModal, setShowUpdateModal] = useState(false);
  // const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const { updateNotification } = useNotification();
  // const [selectedMovie, setSelectedMovie] = useState(null);
  // const [busy, setBusy] = useState(false);

  const {
    fetchMovies,
    movies: newMovies,
    fetchNextPage,
    fetchPrevPage,
  } = useMovies();
  // const fetchMovies = async (pageNo) => {
  //   const { error, movies } = await getMovies(pageNo, limit);
  //   if (error) updateNotification("error", error);
  //   if (!movies.length) {
  //     currentPageNo = pageNo - 1;
  //     return setReactToEnd(true);
  //   }
  //   setMovies([...movies]);
  // };

  // const handleOnNextClick = () => {
  //   if (reachedToEnd) return;
  //   currentPageNo += 1;
  //   fetchMovies(currentPageNo, limit);
  // };

  // const handleOnPrevClick = () => {
  //   if (currentPageNo <= 0) {
  //     setReactToEnd(false);
  //     return;
  //   }
  //   currentPageNo -= 1;
  //   fetchMovies(currentPageNo, limit);
  // };

  // const handleOnEditClick = async ({ id }) => {
  //   const { movie, error } = await getMovieForUpdate(id);
  //   if (error) return updateNotification("error", error);
  //   setSelectedMovie(movie);
  //   setShowUpdateModal(true);
  // };
  // const handleOnDeleteClick = (movie) => {
  //   setSelectedMovie(movie);
  //   setShowConfirmModal(true);
  // };

  // const handleOnDeleteConfirm = async () => {
  //   setBusy(true);
  //   const { error, message } = await deleteMovie(selectedMovie.id);
  //   setBusy(false);
  //   if (error) updateNotification("error", error);
  //   updateNotification("success", message);
  //   hideConfirmModal();
  //   fetchMovies(currentPageNo);
  // };

  // const handleAfterDelete = (movie) => {
  //   const updatedMovies = movies.map((m) => {
  //     if (m.id === movie.id) return movie;
  //     return m;
  //   });

  //   setMovies([...updatedMovies]);
  // };

  // const hideUpdateForm = () => {
  //   setShowUpdateModal(false);
  // };
  // const hideConfirmModal = () => {
  //   setShowConfirmModal(false);
  // };

  const handleUIUpdate=()=>{
    fetchMovies()
  }
 
  useEffect(() => {
    fetchMovies(currentPageNo);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="space-y-3 p-5">
        {newMovies.map((movie, index) => (
          <MovieListItems
            key={index}
            movie={movie}
            afterDelete={handleUIUpdate}
            afterUpdate={handleUIUpdate}
            // onEditClick={() => handleOnEditClick(movie)}
            // onDeleteClick={() => handleOnDeleteClick(movie)}
          />
        ))}

        <NextAndPrevButton
          className="mt-5"
          onNextClick={fetchNextPage}
          onPrevClick={fetchPrevPage}
        />
      </div>
      {/* <ConfirmModal
        visible={showConfirmModal}
        onConfirm={handleOnDeleteConfirm}
        onCancel={hideConfirmModal}
        title="Are you sure?"
        subtitle={"This action will remove this movie permanently"}
        busy={busy}
      />
      <UpdateMovie
        visible={showUpdateModal}
        initialState={selectedMovie}
        onSuccess={handleOnUpdate}
        onClose={hideUpdateForm}
      /> */}
    </>
  );
};

export default Movies;
