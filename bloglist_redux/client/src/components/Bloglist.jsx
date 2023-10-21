import { useSelector } from 'react-redux'
import Blog from "./Blog"
import BlogForm from "./BlogForm"
import Header from './Header'
import Notification from './Notification'

const Bloglist = () => {
  const blogs = useSelector(state => [...state.blogs])
  
  return (
    <>
      <Notification />
      <Header />
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