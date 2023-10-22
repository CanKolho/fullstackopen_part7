import { useDispatch } from 'react-redux'
import { update } from '../reducers/blogReducer'
import Header from './Header'
import Comment from './Comment'

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

  if (!blog) return null

  return (
    <div>
      <Header />
      <h1>{blog.title} - {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes 
        <button className='btn btn-warning' id="like-btn" onClick={handleLike}>
            Like
        </button>
      </p>
      <p>added by {blog.user.username}</p>
      <Comment blog={blog} />
    </div>
  )
}

export default BlogInfo
