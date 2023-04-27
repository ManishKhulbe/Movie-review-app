import React, { useState } from "react";
import ModalContainer from "./ModalContainer";
import MovieForm from "../admin/MovieForm";
import { updateMovie } from "../../api/movie";
import { useNotification } from "../hooks";

const UpdateMovie = ({ visible, onSuccess, initialState, onClose }) => {
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();
  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, movie, message } = await updateMovie(initialState.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    onSuccess(movie);
    onClose()
  };
  return (
    <ModalContainer visible={visible}>
      <MovieForm
        btnTitle="Update"
        initialState={initialState}
        onSubmit={!busy ? handleSubmit : null}
        busy={busy}
      />
    </ModalContainer>
  );
};

export default UpdateMovie;
