import { getCookie, getCookies, removeCookies } from "cookies-next"
import api from "./api"

export const authenticate = (credentials) => {
    return api.post(`http://localhost:3000/api/users/signin`, credentials)
        .then(response => response.data)
}

export const register = (credentials) => {
    return api.post(`http://localhost:3000/api/users/signup`, credentials)
        .then(response => response.data)
}

export const getAuthenticatedUser = (token) => {
    return api.get(`http://localhost:3000/api/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
            cookie: `accessToken=${token};`
        }
    })
        .then(response => response.data)
}

export const logout = () => {
    removeCookies("accessToken")
    localStorage.removeItem("accessToken")
}

export const isAuthenticated = () => {
    const accessToken = getCookie("accessToken");
    return accessToken != null
}

export const hasAuthenticated = (accessToken, callback) => {
    if (!accessToken) {
        return {
            redirect: {
                destination: '/users/login',
            },
        };
    }

    return callback(accessToken);
}