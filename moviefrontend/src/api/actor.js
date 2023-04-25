import { catchErrors, getToken } from "../utils/helper";
import client from "./client";

export const createActor = async (formData) => {
  const token = getToken();
  try {
    const { data } = await client.post("/actor/create", formData, {
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

export const searchActor = async (query) => {
  const token = getToken();
  try {
    const { data } = await client.get(`/actor/search?name=${query}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchErrors(error);
  }
};

export const getActor = async (pageNo, limit) => {
  const token = getToken();
  try {
    const { data } = await client.get(`/actor/actors?pageNo=${pageNo}&limit=${limit}`, {
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


export const updateMovieActor = async (id,formData) => {
  const token = getToken();
  try {
    const { data } = await client.put(`/actor/update/${id}`, formData, {
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


export const deleteActor = async (id) => {
  const token = getToken();
  try {
    const { data } = await client.delete(`/actor/${id}`, {
      headers: {
        authorization: "Bearer " + token
      },
    });
    return data;
  } catch (error) {
    return catchErrors(error);
  }
};