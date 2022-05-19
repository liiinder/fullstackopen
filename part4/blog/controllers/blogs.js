const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
        res.status(200).json(blog)
    } else {
        res.status(404).end()
    }
})

blogsRouter.post('/', userExtractor, async (req, res) => {
    const body = req.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: req.user._id
    })

    const savedBlog = await blog.save()
    req.user.blogs = req.user.blogs.concat(savedBlog._id)
    await req.user.save()

    res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
    const blog = await Blog.findById(req.params.id)

    if ( blog.user.toString() === req.user.id.toString() ) {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } else {
        res.status(401).json({ error: 'Not authorized to delete this post' })
    }
})

blogsRouter.put('/:id', userExtractor, async (req, res) => {
    const blog = await Blog.findById(req.params.id)

    if ( blog.user.toString() === req.user.id.toString() ) {
        const body = req.body
        const updatedBlog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: req.user.id,
            id: blog.id
        }

        await Blog.findByIdAndUpdate(req.params.id, updatedBlog, { new: true })
        res.status(200).json(updatedBlog)
    } else {
        res.status(401).json({ error: 'Not authorized to update this post' })
    }
})

module.exports = blogsRouter