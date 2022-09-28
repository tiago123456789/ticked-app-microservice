import axios from "axios";
import { removeCookies } from 'cookies-next';


axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if(error.response.data.status === 403 || error.response.data.status === 401) {
        removeCookies("accessToken")
        localStorage.removeItem("accessToken")
        window.location.href = "/users/login" 
    }

    return Promise.reject(error);
});

export default axios;