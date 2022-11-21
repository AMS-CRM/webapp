import axios from "axios";

const axiosDefault = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})


axiosDefault.interceptors.request.use(function (config) {
  const user = JSON.parse(localStorage.getItem("user"));

    // Add the header
   config.headers.Authorization = user ? `Bearer ${user.token}` : ""
    return config;
  }, function (error) {
    // Reject with error
    return Promise.reject(error);
  });

export default axiosDefault