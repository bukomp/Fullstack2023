const Persons = ({ persons, removePerson, filter }) => {
    const deletePerson = async (id, name) => {
        if (window.confirm(`Delete ${name}`)) {
            await removePerson(id)
        }
    }

    return (
        <div>
            {persons
                .filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
                .map((person) => (
                    <div key={person.name}>
                        {person.name} {person.number} <button onClick={() => { deletePerson(person.id, person.name) }}>delete</button>
                    </div>
                ))}
        </div>
    );
};

export default Persons
