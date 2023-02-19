import axios from 'axios'

export const fetchPersons = async () => {
    return (await axios.get('http://localhost:3001/persons')).data
}