import axios from 'axios'

export const fetchCountries = async () => {
    return (await axios.get("https://restcountries.com/v3.1/all")).data
}