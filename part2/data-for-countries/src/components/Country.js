const Country = ({ countries, filter }) => {
  const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  if (filter !== '' && filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h2>languages:</h2>
        <ul>
          {Object.keys(country.languages).map(key =>
            <li key={key}>{country.languages[key]}</li>
          )}
        </ul>
        <img alt={`flag of ${country.name.common}`} src={country.flags.png} />

      </div>
    );
  } else return null
}

export default Country