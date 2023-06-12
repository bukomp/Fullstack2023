/**
 * @augments {Component<Props, State>}
 */
const List = ({ countries, filter, handleFilterChange }) => {
  if (filter !== '' && countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
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
