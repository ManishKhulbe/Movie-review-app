import React from "react";
import ModalContainer from "./ModalContainer";
import RatingForm from "../form/RatingForm";
import { updateReview } from "../../api/review";
import { useNotification } from "../hooks";
import { useState } from "react";

const EditRatingModal = ({ visible, onClose, onSuccess, inititalState }) => {
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, message } = await updateReview(inititalState.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    onSuccess({ ...data });
    updateNotification("success", message);
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <RatingForm
        busy={busy}
        inititalState={inititalState}
        onsubmit={handleSubmit}
      />
    </ModalContainer>
  );
};

export default EditRatingModal;
