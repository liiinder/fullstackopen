import React from "react"

const BlogForm = ({
    title, setTitle,
    author, setAuthor,
    url, setUrl,
    addBlog
}) => (
    <form onSubmit={addBlog}>
        <div>
            Title
            <input
                type='text'
                value={title}
                onChange={({target}) => setTitle(target.value)}
                />
        </div>
        <div>
            Author
            <input
                type='text'
                value={author}
                onChange={({target}) => setAuthor(target.value)}
                />
        </div>
        <div>
            Url
            <input
                type='text'
                value={url}
                onChange={({target}) => setUrl(target.value)}
                />
        </div>
        <button type='submit'>Save</button>
    </form>
)

export default BlogForm