import { useNotification } from '../hooks';
import { createActor } from '../../api/actor';
import ActorForm from '../admin/ActorForm';
import ModalContainer from "../modals/ModalContainer";
import { useState } from 'react';

const ActorModal = ({visible,onClose }) => {
const [busy , setBusy]  = useState(false)
  const {updateNotification} = useNotification()

  const handleSubmit=async (data)=>{
    setBusy(true)
    const {error , actor} = await createActor(data)
    // console.log("🚀 ~ file: ActorUploadModal.jsx:10 ~ handleSubmit ~ res:", res)
    setBusy(false)
    if(error) return updateNotification('error', error);
    updateNotification('success', "actor created successfully");
    onClose();
  }
  return (
    <ModalContainer visible={visible} onClose={onClose}>
     <ActorForm onSubmit={!busy ? handleSubmit: null} title='Create New Actor'  btnTitle='Create' busy={busy}/>
    </ModalContainer>
  )
}

export default ActorModal