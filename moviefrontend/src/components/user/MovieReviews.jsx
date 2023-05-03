import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteReview, getReviewByMovie } from "../../api/review";
import { BsTrash, BsPencilSquare } from "react-icons/bs";
import Container from "../Container";
import CustomButtonLink from "../CustomButtonLink";
import { useNotification, useAuth } from "../hooks";
import RatingStar from "../RatingStar";
import ConfirmModal from "../modals/ConfirmModal";
import NotFoundText from "../NotFoundText";
import EditRatingModal from "../modals/EditRatingModal";

const getInitialName = (name = "") => {
  return name[0].toUpperCase();
};

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [profileOwnersReview, setProfileOwnersReview] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [busy, setBusy] = useState(false);
  const [movieTitle, setMovieTitle] = useState("");
  const { authInfo } = useAuth();
  const { movieId } = useParams();
  const profileId = authInfo.profile?.id;

  const { updateNotification } = useNotification();
  const fetchReviewsByMovie = async () => {
    const { error, movie } = await getReviewByMovie(movieId);
    if (error) return updateNotification("error", error);

    setReviews([...movie.reviews]);
    setMovieTitle(movie.title);
  };

  const findProfileOwnersReview = () => {
    if (profileOwnersReview) return setProfileOwnersReview(null);
    const matched = reviews.find((review) => review.owner.id === profileId);
    if (!matched)
      return updateNotification("error", "you don't have any review!");
    setProfileOwnersReview(matched);
  };

  const handleDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteReview(profileOwnersReview.id);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    const updatedReviews = reviews.filter(
      (r) => r.id !== profileOwnersReview.id
    );
    setReviews([...updatedReviews]);
    setProfileOwnersReview(null);
    hideConfirmModal();
  };

  const handleOnEditClick = () => {
    const { id, content, rating } = profileOwnersReview;
    setSelectedReview({
      id,
      content,
      rating,
    });
    setShowEditModal(true);
  };

  const handleOnReviewUpdate = (review) => {
    const updatedReview = {
      ...profileOwnersReview,
      rating: review.rating,
      content: review.content,
    };
    setProfileOwnersReview({ ...updatedReview });

    const newReviews = reviews.map((r) => {
      if (r.id === updatedReview.id) return updatedReview;
      return r;
    });

    setReviews([...newReviews]);
  };

  const hideConfirmModal = () => {
    setShowConfirmModal(false);
  };
  const displayConfirmModal = () => {
    setShowConfirmModal(true);
  };
  const hideEditModal = () => {
    setShowEditModal(false);
    setSelectedReview(null);
  };
  useEffect(() => {
    if (movieId) fetchReviewsByMovie();
  }, [movieId]);

  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="xl:px-0 px-2 py-8 ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold dark:text-white text-secondary">
            <span className="text-light-subtle dark:text-dark-subtle font-normal">
              Reviews for :{" "}
            </span>
            {movieTitle}
          </h1>
          {profileId && (
            <CustomButtonLink
              label={profileOwnersReview ? "View All" : "Find My Review"}
              onClick={findProfileOwnersReview}
            />
          )}
        </div>
        <NotFoundText text="No Reviews !" visible={!reviews.length} />
        <div className="space-y-3 mt-3">
          <ReviewCard review={profileOwnersReview} />
          {profileOwnersReview ? (
            <div className="flex space-x-3 dark:text-white text-primary text-xl p-3">
              <button onClick={displayConfirmModal} type="button">
                <BsTrash />
              </button>
              <button onClick={handleOnEditClick} type="button">
                <BsPencilSquare />
              </button>
            </div>
          ) : (
            reviews.map((r) => <ReviewCard review={r} key={r.id} />)
          )}
        </div>
      </Container>
      <ConfirmModal
        visible={showConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={handleDeleteConfirm}
        title="Are you sure?"
        subtitle="This action will remove this review permanently"
        busy={busy}
      />
      <EditRatingModal
        visible={showEditModal}
        inititalState={selectedReview}
        onSuccess={handleOnReviewUpdate}
        onClose={hideEditModal}
      />
    </div>
  );
};

const ReviewCard = ({ review }) => {
  if (!review) return null;
  const { owner, rating, content } = review;
  const { name } = owner;
  return (
    <div className="flex space-x-3">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-light-subtle dark:bg-dark-subtle text-white text-xl select-none">
        {getInitialName(name)}
      </div>
      <div>
        <h1 className="dark:text-white text-secondary font-semibold text-lg">
          {name}
        </h1>
        <RatingStar rating={rating} />
        <p className="text-light-subtle dark:text-dark-subtle">{content}.</p>
      </div>
    </div>
  );
};

export default MovieReviews;
