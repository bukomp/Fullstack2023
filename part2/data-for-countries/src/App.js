import './App.css';
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import { fetchCountries } from './services/country.service'
import List from './components/List';
import Country from './components/Country';

function App() {
  const [filter, setFilter] = useState('');

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    onPageLoad()
  }, []);

  const onPageLoad = async () => {
    setCountries(await fetchCountries())
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <List countries={countries} filter={filter} handleFilterChange={handleFilterChange}></List>
      <Country countries={countries} filter={filter}></Country>
    </div>
  );
}

export default App;
