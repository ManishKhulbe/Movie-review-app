
import { createActor } from '../../api/actor';
import ActorForm from '../admin/ActorForm';
import ModalContainer from "../modals/ModalContainer";

const ActorModal = ({visible,onClose }) => {

  const handleSubmit=async (data)=>{

    const res = await createActor(data)
    console.log("🚀 ~ file: ActorUploadModal.jsx:10 ~ handleSubmit ~ res:", res)
    
  }
  return (
    <ModalContainer visible={visible} onClose={onClose}>
     <ActorForm onSubmit={handleSubmit} title='Create New Actor'  btnTitle='Create'/>
    </ModalContainer>
  )
}

export default ActorModal