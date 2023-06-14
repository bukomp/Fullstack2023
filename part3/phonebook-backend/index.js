const phonebook = require('./resources/phonebook.json')

const morgan = require('morgan')
const cors = require('cors')
const express = require('express');

const Person = require('./schemas/Person')

const app = express();

const newPersonMiddleware = async (req, res, next) => {
  if(!req.body.name || !req.body.number){
    return res.status(400).json({
      error: "name or number doesn't exist in new phonebook entry"
    })
  } else if (await Person.findOne({ name: req.body.name })){
    return res.status(400).json({ error: 'name must be unique' })
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  response.status(500).json({message:error.message})
}

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
app.use(express.static('./public'))

app.get('/api/persons/:id', async (req, res, next) => {
  Person.findOne({ _id: req.params.id }).then(person => {
    if(person){
      return res.json(person);
    } else {
      return res.status(404).end()
    }
  }).catch(error => next(error))
});

app.put('/api/persons/:id', async (req, res, next) => {
  delete req.body.id
  Person.updateOne({ _id: req.params.id }, req.body).then(person => {
    if(person){
      return res.json(person);
    } else {
      return res.status(404).end()
    }
  }).catch(error => next(error))
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.deleteOne({ _id: req.params.id }).then(person => {
    if(person){
      return res.json(person);
    } else {
      return res.status(404).end()
    }
  }).catch(error => next(error))
});
 
app.post('/api/persons',newPersonMiddleware, (req, res, next) => {
  const newPerson = req.body
  Person.create(newPerson).then(person => {
    if(person){
      return res.json(person);
    } else {
      return res.status(404).end()
    }
  }).catch(error => next(error))
});
 
app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(listOfPersons => {
    return res.json(listOfPersons)
  }).catch(error => next(error))
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

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

