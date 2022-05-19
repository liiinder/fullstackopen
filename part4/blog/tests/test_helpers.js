const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        user: '6284def87dea5a129fb4b491',
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        user: '6284def87dea5a129fb4b491',
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        user: '6284def87dea5a129fb4b491',
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        user: '6284def87dea5a129fb4b491',
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        user: '6284def87dea5a129fb4b491',
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        user: '6284def87dea5a129fb4b491',
        __v: 0
    }
]

const initialUsers = [
    {
        _id: '6284def87dea5a129fb4b491',
        username: 'root',
        name: 'root',
        passwordHash: '$2b$10$PEmK6iFb29INXkI3xT9OcOEJjl3XIINngCp6RKRurnH6g6FpXirom',
        notes: [
            '5a422a851b54a676234d17f7',
            '5a422aa71b54a676234d17f8',
            '5a422b3a1b54a676234d17f9',
            '5a422b891b54a676234d17fa',
            '5a422ba71b54a676234d17fb',
            '5a422bc61b54a676234d17fc'
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
    const note = new Blog({
        title: 'New blogs are often bad',
        author: 'Kristoffer Linder',
        url: 'www.google.com',
        likes: 15
    })
    await note.save()
    await note.remve()

    return note._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

// create a user and login - return token + user

module.exports = {
    initialBlogs,
    initialUsers,
    nonExistingId,
    blogsInDb,
    usersInDb
}