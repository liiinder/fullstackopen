const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helpers')
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('initial blogs', () => {
    test('Blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('All blogs are returned', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(helper.initialBlogs.length)
    })

    test('A specific blog is within the returned blogs', async () => {
        const res = await api.get('/api/blogs')
        const titles = res.body.map(r => r.title)
        expect(titles).toContain('Go To Statement Considered Harmful')
    })
})

describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
        expect(resultBlog.body).toEqual(processedBlogToView)
    })

    test('fails with status 404 if note does not exist', async () => {

    })

    test('fails with status 404 if id is invalid', async () => {

    })
})

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

describe('when there is initially one user in db', () => {

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'newuser',
            name: 'Kristoffer Linder',
            password: 'qwerty'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'qwerty'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('password needs to be atleast 3 characters long', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'linder',
            name: 'Superuser',
            password: 'qt'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Password needs to be atleast 3 characters long')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('Login with a valid user returns token', async () => {
        const result = await api
            .post('/api/login')
            .send({ username: 'root', password: 'qwerty' })
            .expect(200)

        expect(result.body.token)
    })

    test('Login that fails return right status code and error message', async () => {
        const result = await api
            .post('/api/login')
            .send({ username: 'root', password: 'fa' })
            .expect(401)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('invalid username or password')
    })
})

describe('Tests that needs a user to be logged in', () => {
    let globalResult

    beforeEach(async () => {
        globalResult = await api
            .post('/api/login')
            .send({ username: 'root', password: 'qwerty' })
            .expect(200)
    })

    test('A valid blog can be added', async () => {
        const newBlog = {
            title: 'Nonsence',
            author: 'Kristoffer Linder',
            url: 'www.facebook.com',
            likes: 10
        }

        await api
            .post('/api/blogs')
            .set('authorization', `bearer ${globalResult.body.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain('Nonsence')
        const authors = blogsAtEnd.map(b => b.author)
        expect(authors).toContain('Kristoffer Linder')
    })

    test('A blog can be added without any likes', async () => {
        const newBlog = {
            title: 'Nonsence',
            author: 'Kristoffer Linder',
            url: 'www.facebook.com',
        }
        await api
            .post('/api/blogs')
            .set('authorization', `bearer ${globalResult.body.token}`)
            .send(newBlog)
            .expect(201)

        const blogsAtEnd = await helper.blogsInDb()
        const savedBlog = blogsAtEnd[blogsAtEnd.length - 1]

        expect(savedBlog.likes).toBeDefined()
        expect(savedBlog.likes).toEqual(0)
    })

    test('Add likes to a blog', async () => {
        const blogsAtStart = await helper.blogsInDb()
        let blogToUpdate = blogsAtStart[0]
        blogToUpdate.likes += 5

        const resultBlog = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .set('authorization', `bearer ${globalResult.body.token}`)
            .expect(200)

        const processedBlogToView = JSON.parse(JSON.stringify(blogToUpdate))
        expect(resultBlog.body).toEqual(processedBlogToView)
    })

    test('Delete a blogpost', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('authorization', `bearer ${globalResult.body.token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(r => r.title)
        expect(titles).not.toContain(blogToDelete.title)
    })

    test('Check blogs for the field ID', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body[0].id).toBeDefined()
    })

    test('A blog without title cant be added', async () => {
        const newBlog = {
            author: 'Kristoffer Linder',
            url: 'www.facebook.com',
            likes: 30
        }
        await api
            .post('/api/blogs')
            .set('authorization', `bearer ${globalResult.body.token}`)
            .send(newBlog)
            .expect(400)
    })

    test('A blog without author cant be added', async () => {
        const newBlog = {
            title: 'Nonsence',
            url: 'www.facebook.com',
            likes: 30
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('authorization', `bearer ${globalResult.body.token}`)
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})