import axios from "axios";

const choirApi = axios.create({
    baseURL: "https://choirly.herokuapp.com/api"
})

export const getChoirs = () => {
    return choirApi.get("/choirs").then((res) => {
        return res.data.choirs;
    })
}