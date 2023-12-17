import axios from "axios";
// import jwt_decode from "jwt_decode";
// import dayjs from "dayjs";

const baseURL = `http://localhost:5000`;

let authTokens = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null;

const axiosInstance = axios.create({
    baseURL,
    headers: {Authorization: `Bearer ${authTokens.accessToken}`}
})

axiosInstance.interceptors.request.use(
    async req => {
        
        return req;
    }
)

export default axiosInstance;