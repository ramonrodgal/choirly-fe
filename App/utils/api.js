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

export const addMemberToChoir = (username, choir_id) => {
  return choirApi.patch(`choirs/${choir_id}/users/${username}`).then((res) => {
    return res.data.choir;
  });
};

export const deleteMemberFromChoir = (username, choir_id) => {
  return choirApi.delete(`choirs/${choir_id}/users/${username}`).then((res) => {
    return res.data.choir;
  });
};

export const getEventsByChoir = (choirId) => {
  return choirApi.get(`/events/choir/${choirId}`).then((res) => {
    return res.data.events;
  });
};

export const postEventByChoir = (choir_id, body) => {
  return choirApi.post(`events/choir/${choir_id}`, body).then((res) => {
    return res.data.event;
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

export const postFileByChoir = (choir_id, body) => {
  return choirApi.post(`choirs/${choir_id}/files`, body).then((res) => {
    return res.data.choir;
  });
};

export const deleteFileById = (choir_id, file_id) => {
  return choirApi.delete(`choirs/${choir_id}/files/${file_id}`).then((res) => {
    return res.data.choir;
  });
};
