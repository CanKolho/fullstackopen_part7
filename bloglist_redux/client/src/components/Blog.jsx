import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLikes, deleteBlog, username }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const handleLike = () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    updateLikes(blog.id, blogToUpdate)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <span>
          {blog.title} - {blog.author} {}
        </span>
        <button onClick={toggleVisibility}>
          {blogVisible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showWhenVisible}>
        <p>
          <a href="">{blog.url}</a>
        </p>
        <p>
          <span>Likes {blog.likes}</span>
          <button id="like-btn" onClick={handleLike}>
            Like
          </button>
        </p>
        <p>{blog.user.name}</p>
        {username === blog.user.username && (
          <button id="remove-btn" onClick={handleDelete}>
            Remove
          </button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

export default Blog
