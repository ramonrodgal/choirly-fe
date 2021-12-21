import axios from "axios";

const choirlyApi = axios.create({
  baseURL: "https://choirly.herokuapp.com/api",
});

export const getChoirs = async (location) => {
  let path = `/choirs`;
  if (location) path += `?location=${location}`;
  const response = await choirlyApi.get(path);
  return response.data.choirs;
};

export const postChoir = (body) => {
  return choirlyApi.post("/choirs", body).then((res) => {
    return res.data.choir;
  });
};

export const getChoirById = (choirId) => {
  return choirlyApi.get(`/choirs/${choirId}`).then((res) => {
    return res.data.choir;
  });
};

export const deleteChoirById = (choir_id) => {
  return choirlyApi.delete(`/choirs/${choir_id}`).then((res) => {
    return res.data;
  });
};

export const addMemberToChoir = (username, choir_id) => {
  return choirlyApi
    .patch(`choirs/${choir_id}/users/${username}`)
    .then((res) => {
      return res.data.choir;
    });
};

export const deleteMemberFromChoir = (username, choir_id) => {
  return choirlyApi
    .delete(`choirs/${choir_id}/users/${username}`)
    .then((res) => {
      return res.data.choir;
    });
};

export const getEventsByChoir = (choirId) => {
  return choirlyApi.get(`/events/choir/${choirId}`).then((res) => {
    return res.data.events;
  });
};

export const postEventByChoir = (choir_id, body) => {
  return choirlyApi.post(`events/choir/${choir_id}`, body).then((res) => {
    return res.data.event;
  });
};

export const getEventById = (event_id) => {
  return choirlyApi.get(`events/${event_id}`).then((res) => {
    return res.data.event;
  });
};

export const addUserToEvent = (event_id, body) => {
  return choirlyApi.patch(`events/${event_id}/users`, body).then((res) => {
    return res.data.event;
  });
};

export const getUserByUsername = (username) => {
  return choirlyApi.get(`/users/${username}`).then((res) => {
    return res.data.user;
  });
};

export const patchUser = (username, body) => {
  return choirlyApi.patch(`/users/${username}`, body).then((res) => {
    return res.data.user;
  });
};

export const postUser = (body) => {
  return choirlyApi.post("/users", body).then((res) => {
    return res.data.user;
  });
};

export const deleteUser = (username) => {
  return choirlyApi.delete(`/users/${username}`).then((res) => {
    return res.data;
  });
};

export const postFileByChoir = (choir_id, body) => {
  return choirlyApi.post(`choirs/${choir_id}/files`, body).then((res) => {
    return res.data.choir;
  });
};

export const deleteFileById = (choir_id, file_id) => {
  return choirlyApi
    .delete(`choirs/${choir_id}/files/${file_id}`)
    .then((res) => {
      return res.data.choir;
    });
};

export const getNotificationByUsername = (username) => {
  return choirlyApi.get(`notifications/user/${username}/`).then((res) => {
    return res.data.notifications;
  });
};

export const postNotificationByUsername = (username, body) => {
  return choirlyApi.post(`notifications/user/${username}`, body).then((res) => {
    return res.data.notification;
  });
};

export const updateNotificationById = (notification_id, body) => {
  return choirlyApi
    .patch(`notifications/${notification_id}`, body)
    .then((res) => {
      return res.data.notification;
    });
};

export const postMessage = (body) => {
  return choirlyApi.post("messages", body).then((res) => {
    return res.data.message;
  });
};

export const getMessageByChoirId = (choir_id) => {
  return choirlyApi.get(`messages/choir/${choir_id}`).then((res) => {
    return res.data.messages;
  });
};

export const getMessageById = (message_id) => {
  return choirlyApi.get(`messages/${message_id}`).then((res) => {
    return res.data.message;
  });
};

export const postComment = (message_id, body) => {
  return choirlyApi
    .post(`messages/${message_id}/comments`, body)
    .then((res) => {
      return res.data.message;
    });
};

export const likeMessage = (message_id, username) => {
  return choirlyApi
    .patch(`messages/${message_id}/likes`, { username: username })
    .then((res) => {
      return res.data.message;
    });
};
