import axios from 'axios'

export const fetchWeather = async (lat, lon) => {
    return (await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,daily,minutely,alerts&appid=${process.env.REACT_APP_WEATHER_API}`)).data
}