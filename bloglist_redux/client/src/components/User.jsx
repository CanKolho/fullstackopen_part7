import { useSelector } from 'react-redux'
import Info from './Info'

const User = ({ user }) => {
  if (!user) return null

  const blogs = useSelector(state => state.blogs.filter(blog => blog.user.id === user.id))
 
  return (
    <div>
      <Info />
      <h1> {user.name }</h1>
      <h2>Added blogs</h2>

      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User