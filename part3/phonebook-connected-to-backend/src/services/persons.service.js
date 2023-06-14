import axios from 'axios'

const host = process.env.NODE_ENV !== 'production' ? 'http://localhost:3001/' : '/'

export const create = async (noficationHandlerdata, data) => {
    try {
        return (await axios.post(`${host}api/persons`, data)).data
    } catch (error) {
        noficationHandlerdata(error.response.data.message || "Something went wrong when adding a new person", "error")
        throw error
    }
}

export const fetch = async (noficationHandlerdata) => {
    try {
        return (await axios.get(`${host}api/persons`)).data
    } catch (error) {
        noficationHandlerdata("Something went wrong while fetching", "error")
        throw error
    }
}

export const update = async (noficationHandlerdata, id, data) => {
    try {
        return (await axios.put(`${host}api/persons/${id}`, data)).data
    } catch (error) {
        noficationHandlerdata(`Information of the ${data.name} has already been removed from the server`, "error")
        throw error
    }
}

export const remove = async (noficationHandlerdata, data) => {
    try {
        return (await axios.delete(`${host}api/persons/${data.id}`)).data
    } catch (error) {
        noficationHandlerdata(`Information of the ${data.name} has already been removed from the server`, "error")
        throw error
    }
}