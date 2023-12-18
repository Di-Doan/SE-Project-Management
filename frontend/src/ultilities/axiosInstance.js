import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const baseURL = `http://localhost:8000/api`;

let authTokens = localStorage.getItem("authTokens")
  ? JSON.parse(localStorage.getItem("authTokens"))
  : null;

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${authTokens?.accessToken}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
    req.headers.Authorization = `Bearer ${authTokens?.accessToken}`;
  }

  const user = jwtDecode(authTokens.accessToken);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
  console.log("expired" ,isExpired)

  if (!isExpired) return req;

  return req;
});

export default axiosInstance;
