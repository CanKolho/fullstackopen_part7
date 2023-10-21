import { useDispatch } from 'react-redux'
import { update } from '../reducers/blogReducer'
import Header from './Header'

const BlogInfo = ({ blog }) => {
  const dispatch = useDispatch()

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

  return (
    <div>
      <Header />
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes 
        <button id="like-btn" onClick={handleLike}>
            Like
        </button>
      </p>
      <p>added by {blog.user.username}</p>
    </div>
  )
}

export default BlogInfo
