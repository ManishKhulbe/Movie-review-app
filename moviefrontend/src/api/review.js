import { catchErrors, getToken } from "../utils/helper";
import client from "./client";

export const addReview = async (movieId, reviewData) => {
  const token = getToken();
  try {
    const { data } = await client.post(`/review/add/${movieId}`, reviewData, {
      headers: {
        authorization: "Bearer " + token
      },
    });
    return data;
  } catch (error) {
    return catchErrors(error);
  }
};

export const getReviewByMovie = async (movieId) => {
  try {
    const { data } = await client(`/review/get-reviews-by-movie/${movieId}`);
    return data;
  } catch (error) {
    return catchErrors(error);
  }
};


export const deleteReview = async (reviewId) => {
  const token = getToken();
  try {
    const { data } = await client.delete(`/review/${reviewId}`, {
      headers: {
        authorization: "Bearer " + token
      },
    });
    return data;
  } catch (error) {
    return catchErrors(error);
  }
};

export const updateReview = async (reviewId , reviewData) => {
  const token = getToken();
  try {
    const { data } = await client.put(`/review/${reviewId}`, reviewData,{
      headers: {
        authorization: "Bearer " + token
      },
    });
    return data;
  } catch (error) {
    return catchErrors(error);
  }
};
