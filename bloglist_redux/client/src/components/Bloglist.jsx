import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import Blog from "./Blog"
import BlogForm from "./BlogForm"
import Notification from './Notification'


const Bloglist = () => {
  const blogs = useSelector(state => [...state.blogs])
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logout())
  }

  return (
    <>
      <h1>blogs</h1>
      <Notification />
      <p>
        {user.name} logged in {}
        <button id="logout-btn" onClick={handleLogOut}>
          logout
        </button>
      </p>
        <BlogForm />
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            username={user.username}
          />
        ))}
    </>
  )
}

export default Bloglist