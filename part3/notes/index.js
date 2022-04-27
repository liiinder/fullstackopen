require('dotenv').config()
const { application, response } = require('express')
const express = require('express')
const cors = require('cors')
const app = express()
const Note = require('./models/note')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
})

app.get('/api/notes/:id', (req, res) => {
    console.log('req.params.id', req.params.id)
    Note.findById(req.params.id).then(note => {
        res.json(note)
    })
})

app.delete('/api/notes/:id', (req, res) => {
    notes = notes.filter(note => note.id !== id)

    res.status(204).end()
})

app.post('/api/notes', (req, res) => {
    const body = req.body

    if (!body.content) {
        return res.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save().then(savedNote => {
        res.json(savedNote)
    })
})

app.put('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    if (notes.find(note => note.id === id)) {
        notes = notes.map(n => n.id !== id ? n : req.body)
        res.json(req.body)
    } else {
        res.status(404).send(`There is no note with id #${id}`).end()
    }

})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})