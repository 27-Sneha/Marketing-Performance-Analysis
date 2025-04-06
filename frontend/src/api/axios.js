import axios from "axios";

console.log("env", process.env.REACT_APP_SERVER_ORIGIN);

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ORIGIN,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
