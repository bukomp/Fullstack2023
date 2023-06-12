
/**
 * @augments {Component<Props, State>}
 */
const Weather = ({ capitalName, temperature, icon, iconAlt, windSpeed }) => {
    return (
      <div>
        <h1>Weather in {capitalName}</h1>
        <p>temperature {temperature} Celcius</p>
        <img alt={iconAlt} src={`https://openweathermap.org/img/wn/${icon}@2x.png`}/>
        <p>wind {windSpeed} m/s</p>
      </div>
    );
  
}

export default Weather