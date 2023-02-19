import axios from 'axios'

export const fetchPersons = async () => {
    return (await axios.get('http://localhost:3001/persons')).data
}

export const createPerson = async (data) => {
    return (await axios.post(`http://localhost:3001/persons`, data)).data
}