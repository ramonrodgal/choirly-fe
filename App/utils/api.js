import axios from "axios";

const choirApi = axios.create({
    baseURL: "https://choirly.herokuapp.com/api"
})

export const getChoirs = (location) => {
    if(location) return choirApi.get(`/choirs?location=${location}`).then((res) => {
        return res.data.choirs
    })
    return choirApi.get("/choirs").then((res) => {
        return res.data.choirs;
    })
}

export const getChoirById = (choirId) => {
    return choirApi.get(`/choirs/${choirId}`).then((res) => {
        return res.data.choir;
    })
}

export const getEventsByChoir = (choirId) => {
    return choirApi.get(`/events/choir/${choirId}`).then((res) => {
        return res.data.events;
    })
}
