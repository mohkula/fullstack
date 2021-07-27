const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(express.static('build'))


let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2020-01-10T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2020-01-10T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2020-01-10T19:20:14.298Z",
      important: true
    }
  ]

  let persons =  [
    {
      "name": "Arto Hellas",
      "number": "273645363",
      "id": "Arto Hellas"
    },
    {
      "name": "Quentin Tarantino.",
      "number": "12323123",
      "id": "Quentin Tarantino"
    }
  ]

  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/notes', (req, res) => {
    res.json(notes)
  })

  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.post('/api/persons', (req,res) =>{
    const body = req.body
  
    if (!body.name || !body.number) {
      return res.status(400).json({ 
        error: 'Give a name and a number' 
      })
    }

   // if(persons.map(person => person.name === body.name)){
     // return res.status(400).json({ 
      //  error: 'Name already exists' 
     // })
 //   }
  
    const person = {
      name: body.name,
      number: body.number,
      id: body.name
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

  app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }

})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })


  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })