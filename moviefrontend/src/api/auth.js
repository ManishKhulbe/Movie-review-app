import client from "./client";

export const createUser = async (userInfo) => {
  try {
    const res = await client.post("/user/create", userInfo);
    console.log(res);
    return res.data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const verifyUserEmail = async (userInfo) => {
  try {
    const { data } = await client.post("/user/verifyEmail", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const signInUser = async (userInfo) => {
  try {
    const { data } = await client.post("/user/signIn", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const getIsAuth = async (token) => {
  try {
    const { data } = await client.get("/user/isAuth", {
      headers: {
        Authorization: "Bearer " + token,
        accept: 'application/json'
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
export const forgetPassword = async (email) => {
  try {
    const { data } = await client.post("/user/forgetPassword", {
    email
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
export const verifyPassResetToken = async (token, userId) => {
  try {
    const { data } = await client.post("/user/verifyPassResetToken", {
    token , userId
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
export const resetPassword = async (passwordInfo) => {
  try {
    const { data } = await client.post("/user/resetPassword", passwordInfo);
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const reSendEmailVerificationToken = async (userId) => {
  try {
    const { data } = await client.post("/user/resentVerifyEmailToken", {userId});
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};


