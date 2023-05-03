import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { uploadMovie, uploadTrailer } from "../../api/movie";
import { useNotification } from "../hooks";
import ModalContainer from "../modals/ModalContainer";
import MovieForm from "./MovieForm";

const MovieUpload = ({ visible, onClose }) => {
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoInfo, setVideoInfo] = useState({});
  const [busy , setBusy] = useState(false)
  const { updateNotification } = useNotification();
  const handleTypeError = (error) => {
    updateNotification("error", error);
  };

  const resetState=()=>{
    setVideoSelected(false);
    setVideoUploaded(false);
    setUploadProgress(0);
    setVideoInfo({})
  }

  const handleUploadTrailer = async (formData) => {
    const { error, url, public_id } = await uploadTrailer(
      formData,
      setUploadProgress
    );
    if (error) updateNotification("error", error);
    setVideoUploaded(true);
    setVideoInfo({
      url,
      public_id,
    });
    console.log(url,
      public_id,"videoInfo")
  };

  const handleChange = (file) => {
    const formData = new FormData();
    formData.append("trailer", file);
    setVideoSelected(true);
    handleUploadTrailer(formData);
  };

  const getUploadProgressValue = () => {
    if (!videoUploaded && uploadProgress >= 100) {
      return "processing";
    }
    return `Upload progress ${uploadProgress}%`;
  };

  const handleSubmit = async (movieInfo) => {
    if (!videoInfo.url || !videoInfo.public_id)   
      return updateNotification("error", "Trailer is missing!");
      setBusy(true)
    movieInfo.append("trailer", JSON.stringify(videoInfo));
    console.log(movieInfo);
    const {error,movie} = await uploadMovie(movieInfo);
    if(error) {
      setBusy(false)
     return updateNotification('error', error)
    }
    setBusy(false)
    updateNotification('success',`Movie ${movie.title} Uploaded successfully`)
    resetState()
    onClose()
  };

  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className="mb-5">
      <UploadProgress
        visible={!videoUploaded && videoSelected}
        message={getUploadProgressValue()}
        width={uploadProgress}
      />
      </div>
      {!videoSelected ? (
        <>
          <TrailerSelector
            visible={!videoSelected}
            onTypeError={handleTypeError}
            handleChange={handleChange}
          />
        </>
      ) : (
        <MovieForm btnTitle="Upload" busy={busy} onSubmit={!busy ? handleSubmit : null } />
      )}
    </ModalContainer>
  );
};

const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
  if (!visible) return null;
  return (
    <div className="h-full flex items-center justify-center">
      <FileUploader
        handleChange={handleChange}
        onTypeError={onTypeError}
        types={["mp4", "avi"]}
      >
        <label className="w-48 h-48 border border-dashed dark:border-dark-subtle border-light-subtle rounded-full flex flex-col dark:text-dark-subtle  text-secondary  items-center justify-center cursor-pointer ">
          <AiOutlineCloudUpload size={80} />
          <p>Drop your file here</p>
        </label>
      </FileUploader>
    </div>
  );
};

const UploadProgress = ({ message, width, visible }) => {
  if (!visible) return null;
  return (
    <div className="dark:bg-secondary bg-white drop-shadow-lg rounded p-3">
      <div className="relative h-3 dark:bg-dark-subtle bg-light-subtle overflow-hidden">
        <div
          style={{ width: width + "%" }}
          className="h-full absolute dark:bg-white bg-secondary left-0"
        />
      </div>
      <p className="font-semibold dark:text-dark-subtle text-light-subtle animate-pulse mt-1">
        {message}
      </p>
    </div>
  );
};
export default MovieUpload;
