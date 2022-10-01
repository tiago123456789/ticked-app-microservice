import api from "./api"

export const create = async (data, accessToken) => {
    const response = await api.post(`http://localhost:5001/api/orders`, data, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });

    return response.data
}

export const cancel = async (id, accessToken) => {
    return api.delete(`http://localhost:5001/api/orders/${id}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });

}


export const charge = async (data, accessToken) => {
    const response = await api.post(`http://localhost:5010/api/charges`, data, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });

    return response.data
}