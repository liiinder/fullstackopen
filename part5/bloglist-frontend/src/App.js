import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import loginService from './services/Login'
import blogService from './services/Blogs'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        blogService
            .getAll()
            .then(blogs =>
                setBlogs( blogs )
        )
    }, [])


    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])
    const setMessageFunc = (message) => {
        setMessage(message)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }
    const addBlog = async (event) => {
        event.preventDefault()
        const blogObject = {
            title: title,
            author: author,
            url: url
        }

        try {
            const blog = await blogService.create(blogObject)
            setBlogs(blogs.concat(blog))
            setMessageFunc([`${title} by ${author} added`])
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (exception) {
            setMessageFunc([`${exception}`, 'error'])
        }
    }

    const loginHandler = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setMessageFunc([`${user.username} successfully logged in`])
        } catch (exception) {
            setMessageFunc(['wrong username or password', 'error'])
        }
    }

    return (
        <div>
            <h1>Blogs</h1>
            <Notification message={message} />

            {user === null
                ? <LoginForm
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    loginHandler={loginHandler} />
                : <div>
                    <p>
                        {user.name}
                        <button onClick={() => {
                            window.localStorage.removeItem('loggedBlogappUser')
                            setMessageFunc([`${user.username} successfully logged out`])
                            setUser(null)
                        }
                        }>
                            logout
                        </button>
                    </p>
                    {<BlogForm 
                        title={title}
                        setTitle={setTitle}
                        author={author}
                        setAuthor={setAuthor}
                        url={url}
                        setUrl={setUrl}
                        addBlog={addBlog}
                    />}
                </div>
            }
            <h2>bloglist</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default App
