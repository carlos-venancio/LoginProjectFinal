import axios from "axios";

const api = axios.create({
    baseURL: "https://api-login-mn7h.onrender.com",
    mode: 'cors',
    headers : { 
        "Content-Type" : "application/json",
        "Accept": "application/json"
     }
})

export default api;