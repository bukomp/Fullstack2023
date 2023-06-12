import Weather from './Weather'

/**
 * @augments {Component<Props, State>}
 */
const Country = ({ filteredCountries, weather }) => {
  if (filteredCountries.length === 1) {

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
       {weather && <Weather 
        capitalName={country.capital[0]} 
        icon={weather.current.weather[0].icon} 
        iconAlt={weather.current.weather[0].description} 
        temperature={weather.current.temp}
        windSpeed={weather.current.wind_speed}
        >
        </Weather>}
      </div>
    );
  } else return null
}

export default Country