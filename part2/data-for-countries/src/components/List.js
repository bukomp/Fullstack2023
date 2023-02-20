const Button = ({ setFilter, name }) => {
  const changeFilter = () => {
    setFilter(name)
  }
  return <button onClick={changeFilter}>show</button>
}

const List = ({ countries, filter, setFilter }) => {

  const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (filter !== '' && filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <Button name={country.name.common} setFilter={setFilter}></Button>
          </div>
        ))}
      </div>
    );
  } else return null
};

export default List
