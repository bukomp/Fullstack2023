const List = ({ countries, filter, handleFilterChange }) => {

  const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (filter !== '' && filteredCountries.length > 1) {

    return (
      <div>
        {filteredCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={handleFilterChange} value={country.name.common}>show</button>
          </div>
        ))}
      </div>
    );
  } else return null
};

export default List
