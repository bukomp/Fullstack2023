import axios from 'axios'

export const create = async (noficationHandlerdata, data) => {
    try {
        return (await axios.post(`http://localhost:3001/persons`, data)).data
    } catch (error) {
        noficationHandlerdata("Something went wrong when adding a new person", "error")
    }
}

export const fetch = async (noficationHandlerdata) => {
    try {
        return (await axios.get('http://localhost:3001/persons')).data
    } catch (error) {
        noficationHandlerdata("Something went wrong while fetching", "error")
    }
}

export const update = async (noficationHandlerdata, id, data) => {
    try {
        return (await axios.put(`http://localhost:3001/persons/${id}`, data)).data
    } catch (error) {
        noficationHandlerdata(`Information of the ${data.name} has already been removed from the server`, "error")
    }
}

export const remove = async (noficationHandlerdata, data) => {
    try {
        return (await axios.delete(`http://localhost:3001/persons/${data.id}`)).data
    } catch (error) {
        noficationHandlerdata(`Information of the ${data.name} has already been removed from the server`, "error")
    }
}