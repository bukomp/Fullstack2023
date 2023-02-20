const List = ({ countries, filter }) => {
  //const deletePerson = async (id, name) => {
  //    if (window.confirm(`Delete ${name}`)) {
  //        await removePerson(id)
  //    }
  //}
  const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (filter !== '' && filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
          </div>
        ))}
      </div>
    );
  } else return null
};

export default List
