import React, { useState } from "react";
import { updateMovieActor } from "../../api/actor";
import ActorForm from "../admin/ActorForm";
import ModalContainer from "../modals/ModalContainer";
import { useNotification } from "../hooks/index";

const UpdateActor = ({ visible, onClose, initialState , onSuccess}) => {
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true)
    const {error , actor} = await updateMovieActor(initialState.id , data)
    // console.log("🚀 ~ file: ActorUploadModal.jsx:10 ~ handleSubmit ~ res:", res)
    setBusy(false)
    if(error) return updateNotification('error', error);
    updateNotification('success', "actor updated successfully");
    onSuccess(actor)
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <ActorForm
        onSubmit={!busy ? handleSubmit : null}
        title="Update Actor"
        btnTitle="Update"
        busy={busy}
        initialState={initialState}
      />
    </ModalContainer>
  );
};

export default UpdateActor;
