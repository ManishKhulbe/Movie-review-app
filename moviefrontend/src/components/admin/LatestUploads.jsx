import React from "react";
import { useEffect } from "react";
// import { deleteMovie, getMovieForUpdate, getMovies } from "../../api/movie";
import { useMovies } from "../hooks";
// import ConfirmModal from "../modals/ConfirmModal";
// import UpdateMovie from "../modals/UpdateMovie";
import MovieListItems from "./MovieListItems";

// const pageNo = 0;
// const limit = 5;

const LatestUploads = () => {
  // const [movies, setMovies] = useState([]);
  // const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const [showUpdateModal, setShowUpdateModal] = useState(false);
  // const [busy, setBusy] = useState(false);
  // const [selectedMovie, setSelectedMovie] = useState(null);
  // const { updateNotification } = useNotification();

  // const fetchLatestUploads = async () => {
  //   const { error, movies } = await getMovies(pageNo, limit);
  //   if (error) updateNotification("error", error);
  //   setMovies([...movies]);
  // };

  const { fetchLatestUploads , latestUploads} = useMovies()


  // const handleOnDeleteClick = (movie) => {
  //   setSelectedMovie(movie);
  //   setShowConfirmModal(true);
  // };
  // const hideConfirmModal = () => {
  //   setShowConfirmModal(false);
  // };
  // const hideUpdateModal = () => {
  //   setShowUpdateModal(false);
  // };

  // const handleOnDeleteConfirm = async () => {
  //   setBusy(true);
  //   const { error, message } = await deleteMovie(selectedMovie.id);
  //   setBusy(false);
  //   if (error) updateNotification("error", error);
  //   updateNotification("success", message);
  //   fetchLatestUploads();
  //   hideConfirmModal();
  // };

  // const handleOnEditClick = async ({ id }) => {
  //   const { error, movie } = await getMovieForUpdate(id);
  //   if (error) updateNotification("error", error);
  //   setShowUpdateModal(true);
  //   setSelectedMovie(movie);
  // };

  // const handleOnUpdate = (movie) => {
  //   const updatedMovies = movies.map((m) => {
  //     if (m.id === movie.id) return movie;
  //     return m;
  //   });
  //   setMovies([...updatedMovies]);
  // };

  const handleUIUpdate=()=>fetchLatestUploads()

  useEffect(() => {
    fetchLatestUploads();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="bg-white shadow dark:bg-secondary p-5 rounded col-span-2">
        <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
          Recent Uploads
        </h1>
        <div className="space-y-3">
          {latestUploads.map((movie) => (
            <MovieListItems
              movie={movie}
              key={movie.id}
              // onDeleteClick={() => handleOnDeleteClick(movie)}
              // onEditClick={() => handleOnEditClick(movie)}
              afterDelete={handleUIUpdate}
              afterUpdate={handleUIUpdate}
            />
          ))}
        </div>
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
        onClose={hideUpdateModal}
        initialState={selectedMovie}
        onSuccess={handleOnUpdate}
      /> */}
    </>
  );
};

export default LatestUploads;
