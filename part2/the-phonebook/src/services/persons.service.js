import axios from 'axios'

export const fetch = async () => {
    return (await axios.get('http://localhost:3001/persons')).data
}

export const create = async (data) => {
    return (await axios.post(`http://localhost:3001/persons`, data)).data
}

export const remove = async (id) => {
    return (await axios.delete(`http://localhost:3001/persons/${id}`)).data
}