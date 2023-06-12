import './App.css';
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import { fetchCountries } from './services/country.service'
import { fetchWeather } from './services/weather.service'
import List from './components/List';
import Country from './components/Country';

function App() {
  const [filter, setFilter] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState(false)

  useEffect(() => {
    onPageLoad()
  }, []);

  const onPageLoad = async () => {
    setCountries(await fetchCountries())
  }

const handleFilterChange = async (event) => {
    const filteredCountriesList = countries.filter((country) => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilter(event.target.value);
    setFilteredCountries(filteredCountriesList)

    if(filteredCountriesList.length === 1){
      const capitalLat = filteredCountriesList[0].capitalInfo.latlng[0]
      const capitalLon = filteredCountriesList[0].capitalInfo.latlng[1]
      setWeather(await fetchWeather(capitalLat, capitalLon))
    }
};

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <List countries={filteredCountries} filter={filter} handleFilterChange={handleFilterChange}></List>
      <Country filteredCountries={filteredCountries} weather={weather}></Country>
    </div>
  );
}

export default App;
