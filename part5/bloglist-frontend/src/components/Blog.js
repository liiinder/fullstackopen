const Blog = ({blog}) => (
    <div>
        <hr />
        <h4>
            {blog.title}
        </h4>
        <p>
            Author: {blog.author} / Posted by: {blog.user.username}
        </p>
    </div>
)

export default Blog