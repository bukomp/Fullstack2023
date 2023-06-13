const phonebook = require('./resources/phonebook.json')

const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3001;

app.get('/api/persons/:id', (req, res) => {
  if(Number(req.params.id) <= 0 || Number(req.params.id) > phonebook.length){
    return res.status(404).end()
  } else {
    return res.json(phonebook[+req.params.id-1]);
  }
});

app.delete('/api/persons/:id', (req, res) => {
  if(Number(req.params.id) <= 0 || Number(req.params.id) > phonebook.length){
    return res.status(404).end()
  } else {
    phonebook.splice(+req.params.id-1, 1)
    return res.json(phonebook);
  }
});
 
app.post('/api/persons', (req, res) => {
  const newPerson = req.body
  newPerson.id = Math.ceil(Math.random()*1000000)
  phonebook.push(newPerson)
  return res.json(phonebook)
});
 
app.get('/api/persons', (req, res) => {
  return res.json(phonebook);
}); 



app.get('/info', (req, res) => {
  const info = `
    Phonebook has info for ${phonebook.length} people
    <br/>
    <br/>
    ${new Date()}
  `
  return res.send(info);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});