import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import { fetch, create, remove } from './services/persons.service';


const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    onPageLoad()
  }, []);

  const onPageLoad = async () => {
    setPersons(await fetch())
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = async (event) => {
    event.preventDefault();
    const personExists = persons.find((person) => person.name === newName);
    if (personExists) {
      const alertMessage = `${newName} is already added to phonebook`;
      alert(alertMessage);
    } else {
      const newPerson = { name: newName, number: newNumber };
      setNewName('');
      setNewNumber('');
      const response = await create(newPerson)
      setPersons(persons.concat(response));
    }
  };

  const deletePerson = async (id) => {
    await remove(id)
    setPersons(persons.filter(person => person.id !== id))
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} removePerson={deletePerson} filter={filter} />
    </div>
  );
};

export default App;