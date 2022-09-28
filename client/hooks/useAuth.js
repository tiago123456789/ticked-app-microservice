import { getCookie, removeCookies, setCookies } from "cookies-next"
import { useState } from "react"
import * as authService from "./../services/auth"

export function useAuth() {
    const [accessToken, setAccessToken] = useState(null)

    const authenticate = async (credentials) => {
        const response = await authService.authenticate(credentials)
        setAccessToken(response.accessToken)
        localStorage.setItem("accessToken", response.accessToken)
        setCookies("accessToken", response.accessToken, {
            path: "/", expires: new Date(Date.now() + 9000000000000)
        })
    }

    const isAuthenticated = () => {
        return accessToken != null || getCookie("accessToken") != null
    }

    const logout = () => {
        setAccessToken(null)
        removeCookies("accessToken")
        localStorage.removeItem("accessToken")
    }

    const getAccessToken = () => {
        if (accessToken) {
            return accessToken;
        }

        return getCookie("accessToken")
    }

    return { logout, isAuthenticated, getAccessToken, authenticate, accessToken }
}