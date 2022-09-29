import api from "./api"

export const getById = async (id, accessToken) => {
    const response = await api.get(`http://localhost:5000/api/tickets/${id}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });

    return response.data
}

export const getTickets = async (accessToken) => {
    const response = await api.get(`http://localhost:5000/api/tickets`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });

    return response.data
}

export const create = async (accessToken, data) => {
    const response = await api.post(`http://localhost:5000/api/tickets`, data, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });

    return response.data
}