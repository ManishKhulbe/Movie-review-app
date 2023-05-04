import { catchErrors, getToken } from "../utils/helper";
import client from "./client";

export const uploadTrailer = async (formData, onUploadProgress) => {
  const token = getToken();
  try {
    const { data } = await client.post("/movie/upload_trailer", formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
      onUploadProgress: ({loaded, total}) => {
        if (onUploadProgress)
          onUploadProgress(Math.floor((loaded / total) * 100));
      },
    });

    return data;
  } catch (error) {
    return catchErrors(error);
  }
};

export const uploadMovie = async (formData) => {
  const token = getToken();
  try {
    const { data } = await client.post("/movie/create", formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchErrors(error);
  }
};

export const getMovieForUpdate = async (id) => {
  const token = getToken();
  try {
    const { data } = await client("/movie/for-update/"+id, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchErrors(error);
  }
};

export const updateMovie = async (id, formData) => {
  const token = getToken();
  try {
    const { data } = await client.put("/movie/update/"+id,formData ,{
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchErrors(error);
  }
};
export const getMovies = async ({pageNo , limit}) => {
  const token = getToken();
  try {
    const { data } = await client(`/movie/movies?pageNo=${pageNo}&limit=${limit}`, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchErrors(error);
  }
};


export const deleteMovie = async (id) => {
  const token = getToken();
  try {
    const { data } = await client.delete(`/movie/${id}`, {
      headers: {
        authorization: "Bearer " + token
      },
    });
    return data;
  } catch (error) {
    return catchErrors(error);
  }
};


export const searchMovieForAdmin = async (title) => {
  const token = getToken();
  try {
    const { data } = await client.get(`/movie/search?title=${title}`, {
      headers: {
        authorization: "Bearer " + token
      },
    });
    return data;
  } catch (error) {
    return catchErrors(error);
  }
};

export const getTopRatedMovies = async (type,signal) => {

  try {
    let endPoint = `/movie/top-rated`
    if(type) endPoint= `/movie/top-rated?type=${type}`
    const { data } = await client.get(endPoint ,{signal});
    return data;
  } catch (error) {
    return catchErrors(error);
  }
};

export const getLatestUploads = async (signal) => {
  try {
    const { data } = await client.get('/movie/latest-uploads',{signal});
    return data;
  } catch (error) {
    return catchErrors(error);
  }
};

export const getSingleMovie = async (id) => {
  try {
    const { data } = await client('/movie/single/'+ id);
    return data;
  } catch (error) {
    return catchErrors(error);
  }
};

export const getRelatedMovie = async (id) => {
  try {
    const { data } = await client('/movie/related/'+ id);
    return data;
  } catch (error) {
    return catchErrors(error);
  }
};

export const searchPublicMovie = async (title) => {
  try {
    const { data } = await client('/movie/search-public?title='+ title);
    return data;
  } catch (error) {
    return catchErrors(error);
  }
};