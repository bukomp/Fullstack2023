const phonebook = require('./resources/phonebook.json')

const morgan = require('morgan')
const cors = require('cors')
const express = require('express');

const app = express();

app.use(cors())
app.use(express.json());

app.use(morgan((tokens, req, res) =>  [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.method(req, res) === 'POST'?JSON.stringify(req.body):""
  ].join(' ')
));

const newPersonMiddleware = (req, res, next) => {
  if(!req.body.name || !req.body.number){
    return res.status(400).json({
      error: "name or number doesn't exist in new phonebook entry"
    })
  } else if (phonebook.some(p => p.name === req.body.name)){
    return res.status(400).json({ error: 'name must be unique' })
  }
  next()
}

app.use(express.static('./public'))

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
 
app.post('/api/persons',newPersonMiddleware, (req, res) => {
  const newPerson = req.body
  newPerson.id = Math.ceil(Math.random()*1000000)
  phonebook.push(newPerson)
  return res.json(newPerson)
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});