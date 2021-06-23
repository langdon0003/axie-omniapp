import axios from "axios"

const client = axios.create({
    baseURL: "https://lunacia.skymavis.com/game-api",
    timeout: 5000
})

export default client