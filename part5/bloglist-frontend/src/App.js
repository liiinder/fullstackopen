import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import loginService from './services/Login'
import blogService from './services/Blogs'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
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

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: title,
            author: author,
            url: url
        }

        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setTitle('')
                setAuthor('')
                setUrl('')
            })
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
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
            <h1>Blogs</h1>
            <Notification message={errorMessage} />

            {user === null
                ? <LoginForm
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    loginHandler={loginHandler} />
                : <div>
                    <p>{user.name} logged-in</p>
                    <button onClick={() => {
                        window.localStorage.removeItem('loggedBlogappUser')
                        setUser(null)}
                    }>
                        logout
                    </button>
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
            {username}
            <br/>
            {password}
            <h2>bloglist</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default App
