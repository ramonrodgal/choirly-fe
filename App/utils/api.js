import axios from "axios";

const choirApi = axios.create({
  baseURL: "https://choirly.herokuapp.com/api",
});

export const getChoirs = (location) => {
  if (location)
    return choirApi.get(`/choirs?location=${location}`).then((res) => {
      return res.data.choirs;
    });
  return choirApi.get("/choirs").then((res) => {
    return res.data.choirs;
  });
};

export const postChoir = (body) => {
  return choirApi.post("/choirs", body).then((res) => {
    return res.data.choir;
  });
};

export const getChoirById = (choirId) => {
  return choirApi.get(`/choirs/${choirId}`).then((res) => {
    return res.data.choir;
  });
};

export const deleteChoirById = (choir_id) => {
  return choirApi.delete(`/choirs/${choir_id}`).then((res) => {
    return res.data;
  });
};

export const getEventsByChoir = (choirId) => {
  return choirApi.get(`/events/choir/${choirId}`).then((res) => {
    return res.data.events;
  });
};

export const getUserByUsername = (username) => {
  return choirApi.get(`/users/${username}`).then((res) => {
    return res.data.user;
  });
};

export const patchUser = (username, body) => {
  return choirApi.patch(`/users/${username}`, body).then((res) => {
    return res.data.user;
  });
};

export const postUser = (body) => {
  return choirApi.post("/users", body).then((res) => {
    return res.data.user;
  });
};

export const deleteUser = (username) => {
  return choirApi.delete(`/users/${username}`).then((res) => {
    return res.data;
  });
};
