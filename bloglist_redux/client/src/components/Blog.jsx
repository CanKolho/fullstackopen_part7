import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, update } from '../reducers/blogReducer'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const handleLike = () => {
    const blogToUpdate = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    
    dispatch(update(blogToUpdate))
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
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
        {user.username === blog.user.username && (
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
}

export default Blog
