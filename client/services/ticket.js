import api from "./api"

export const getTickets = async (accessToken) => {
    const response = await api.get(`http://localhost:5000/api/tickets`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });

    return response.data
}
