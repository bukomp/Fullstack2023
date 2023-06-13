const phonebook = require('./resources/phonebook.json')

const express = require('express');
const app = express();

const PORT = 3001;




app.get('/api/persons', (req, res) => {
  res.json(phonebook);
});

app.get('/info', (req, res) => {
  const info = `
    Phonebook has info for ${phonebook.length} people
    <br/>
    <br/>
    ${new Date()}
  `
  res.send(info);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});