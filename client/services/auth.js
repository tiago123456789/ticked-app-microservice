import api from "./api"

export const authenticate = (credentials) => {
    return api.post(`http://localhost:3000/api/users/signin`, credentials)
              .then(response => response.data)
}
