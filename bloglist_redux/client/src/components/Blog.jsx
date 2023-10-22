import { Link } from 'react-router-dom'

const Blog = ({ blog }) => (
    <div className="alert alert-primary">
      <Link className='btn btn-light' to={`/blogs/${blog.id}`}>{blog.title } - {blog.author}</Link>
    </div>
  )
  
export default Blog
