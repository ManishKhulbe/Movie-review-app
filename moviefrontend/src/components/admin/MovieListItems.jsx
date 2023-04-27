import { useState } from "react";
import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";
import ConfirmModal from "../modals/ConfirmModal";
import { useNotification } from "../hooks";
import { deleteMovie } from "../../api/movie";
import UpdateMovie from "../modals/UpdateMovie";

const MovieListItems = ({ movie, afterDelete,afterUpdate }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedMovieID, setSelectedMovieID] = useState(null)
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();

  const handleOnDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteMovie(movie.id);
    setBusy(false);
    if (error) updateNotification("error", error);
    hideConfirmModal();
    updateNotification("success", message);
    afterDelete(movie);
  };

  const displayConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const hideConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleOnEditClick=()=>{
    setShowUpdateModal(true)
    setSelectedMovieID(movie.id)
  }

    const handleOnUpdate = (movie) => {
      afterUpdate(movie)
      setShowUpdateModal(false)
      setSelectedMovieID(null)
  };

  return (
    <>
      <MovieCard movie={movie} onDeleteClick={displayConfirmModal} onEditClick={handleOnEditClick} />
      <div className="p-0">
        <ConfirmModal
          visible={showConfirmModal}
          onConfirm={handleOnDeleteConfirm}
          onCancel={hideConfirmModal}
          title="Are you sure?"
          subtitle={"This action will remove this movie permanently"}
          busy={busy}
        />
        <UpdateMovie
        visible={showUpdateModal}
        movieId={selectedMovieID}
        onSuccess={handleOnUpdate}

      />
      </div>
    </>
  );
};

const MovieCard = ({ movie, onDeleteClick, onEditClick, onOpenClick }) => {
  const { poster, title, genres = [], status } = movie;
  return (
    <table className="w-full border-b">
      <tbody>
        <tr>
          <td>
            <div className="w-24">
              <img className="w-full aspect-video" src={poster} alt={title} />
            </div>
          </td>
          <td className="w-full pl-5">
            <div>
              <h1 className=" text-lg font-semibold text-primary dark:text-white">
                {title}
              </h1>
              <div className="space-x-2">
                {genres.map((g, index) => {
                  return (
                    <span
                      key={index}
                      className="text-primary dark:text-white text-xs"
                    >
                      {g}
                    </span>
                  );
                })}
              </div>
            </div>
          </td>
          <td className="px-5">
            <p className="text-primary dark:text-white ">{status}</p>
          </td>
          <td>
            <div className="flex items-center space-x-3 text-primary dark:text-white text-lg">
              <button onClick={onDeleteClick} type="button">
                <BsTrash />
              </button>
              <button onClick={onEditClick} type="button">
                <BsPencilSquare />
              </button>
              <button onClick={onOpenClick} type="button">
                <BsBoxArrowUpRight />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MovieListItems;
