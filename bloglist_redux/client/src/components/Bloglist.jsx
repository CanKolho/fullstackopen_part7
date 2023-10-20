import { useSelector } from 'react-redux'
import Blog from "./Blog"
import BlogForm from "./BlogForm"
import Info from './Info'
import Notification from './Notification'

const Bloglist = () => {
  const blogs = useSelector(state => [...state.blogs])
  
  return (
    <>
      <Notification />
      <Info />
      <BlogForm />
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
    </>
  )
}

export default Bloglist