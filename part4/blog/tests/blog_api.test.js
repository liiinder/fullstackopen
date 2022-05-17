const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helpers')
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

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

test('A valid blog can be added', async () => {
    const newBlog = {
        title: 'Nonsence',
        author: 'Kristoffer Linder',
        url: 'www.facebook.com',
        likes: 10
    }

    await api
        .post('/api/blogs')
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

describe('Validation', () => {
    test('Check blogs for the field ID', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body[0].id).toBeDefined()
    })

    test('A blog can be added without any likes', async () => {
        const newBlog = {
            title: 'Nonsence',
            author: 'Kristoffer Linder',
            url: 'www.facebook.com',
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)

        const blogsAtEnd = await helper.blogsInDb()
        const savedBlog = blogsAtEnd[blogsAtEnd.length - 1]

        expect(savedBlog.likes).toBeDefined()
        expect(savedBlog.likes).toEqual(0)
    })

    test('A blog without title cant be added', async () => {
        const newBlog = {
            author: 'Kristoffer Linder',
            url: 'www.facebook.com',
            likes: 30
        }
        await api
            .post('/api/blogs')
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
            .expect(400)
    })
})

describe('Deletion of a blog', () => {
    test('succeeds with satus code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(r => r.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('Update a blog', () => {
    test('Add likes to a blog', async () => {
        const blogsAtStart = await helper.blogsInDb()
        let blogToUpdate = blogsAtStart[0]

        blogToUpdate.likes += 5

        const resultBlog = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)

        const processedBlogToView = JSON.parse(JSON.stringify(blogToUpdate))
        expect(resultBlog.body).toEqual(processedBlogToView)
    })
})

afterAll(() => {
    mongoose.connection.close()
})