const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
    {
        _id: '6283f9bcfb539731af0d7743',
        content: 'HTML is easy',
        date: new Date(),
        important: false,
        user: '6283f9bcfb539731af0d7747'
    },
    {
        _id: '6283f9bcfb539731af0d7744',
        content: 'Browser can execute only Javascript',
        date: new Date(),
        important: true,
        user: '6283f9bcfb539731af0d7747'
    },
    {
        _id: '6283fbcf505cf46e3b1dfcda',
        content: 'Single page Apps use token auth',
        date: new Date(),
        important: true,
        user: '6283f9bcfb539731af0d7747'
    }
]

const initialUsers = [
    {
        _id: '6283f9bcfb539731af0d7747',
        username: 'root',
        name: 'root',
        passwordHash: '$2b$10$PEmK6iFb29INXkI3xT9OcOEJjl3XIINngCp6RKRurnH6g6FpXirom',
        notes: [
            '6283f9bcfb539731af0d7743',
            '6283f9bcfb539731af0d7744',
            '6283fbcf505cf46e3b1dfcda'
        ],
        __v :0
    },
    {
        _id: '6284d9c7c69a87e7f2f5b903',
        username: 'liiinder',
        name: 'Kristoffer Linder',
        passwordHash: '$2b$10$Q0rQMhszZG.3KW1RCPrvjOTMRntY2DKZDVbal85bfgqjeqhXcvIkm',
        notes: [],
        __v: 0
    }
]

const nonExistingId = async () => {
    const note = new Note({ content: 'willremovethissoon', date: new Date() })
    await note.save()
    await note.remove()

    return note._id.toString()
}

const notesInDb = async () => {
    const notes = await Note.find({})
    return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialNotes,
    nonExistingId,
    notesInDb,
    usersInDb,
    initialUsers
}