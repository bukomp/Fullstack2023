import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import { fetch, create, remove, update } from './services/persons.service';


const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState('')


  useEffect(() => {
    onPageLoad()
  }, []);

  const onPageLoad = async () => {
    setPersons(await fetch(toggleNotification))
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

  const toggleNotification = (message, status = 'notification' || 'error') => {
    const newNotification = { message, status }
    setNotification(newNotification)
    setTimeout(() => {
      setNotification("")
    }, 3000)
  }

  const addOrUpdatePerson = async (event) => {
    event.preventDefault();
    const personExists = persons.find((person) => person.name === newName);
    if (personExists && newNumber !== personExists.number) {
      const alertMessage = `${personExists.name} is already added to phonebook, replace the old number with a new one?`;
      if (window.confirm(alertMessage)) {
        personExists.number = newNumber;
        await update(toggleNotification, personExists.id, personExists)
        setPersons(persons.map(person => {
          if (person.id === personExists.id) {
            return personExists
          } else {
            return person
          }
        }))
        toggleNotification(`Updated ${personExists.name}`, 'notification')
      }
    } else if (personExists) {
      const alertMessage = `${newName} is already added to phonebook`;
      alert(alertMessage);
    } else {
      const newPerson = { name: newName, number: newNumber };
      setNewName('');
      setNewNumber('');
      const response = await create(toggleNotification, newPerson)
      setPersons(persons.concat(response));
      toggleNotification(`Added ${newPerson.name}`, 'notification')
    }
  };

  const deletePerson = async (id) => {
    const personToRemove = persons.find(person => person.id === id)
    await remove(toggleNotification, personToRemove)
    setPersons(persons.filter(person => person.id !== id))
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification}></Notification>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addOrUpdatePerson={addOrUpdatePerson}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} removePerson={deletePerson} filter={filter} />
    </div>
  );
};

export default App;