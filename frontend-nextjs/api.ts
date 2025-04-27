// base axios config
import axios from "axios";


const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    //baseURL: "http://127.0.0.1:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

export default instance;
