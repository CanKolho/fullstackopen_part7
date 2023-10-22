import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const handleCreate = async (event) => {
      event.preventDefault()
      blogFormRef.current.toggleVisibility()

      console.log('sending', { title, author, url })
      dispatch(createBlog({ title, author, url }))
      
      setTitle('')
      setAuthor('')
      setUrl('')
  }

  return (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <h1>create new</h1>
      <form onSubmit={handleCreate}>
        <div className="form-group">
          <label>title</label>
          <input
            className="form-control"
            type="text"
            placeholder="title"
            value={title}
            name="title"
            id="title"
            onChange={({ target }) => {
              setTitle(target.value)
            }}
          />
        </div>
        <div className="form-group">
          <label>author</label>
          <input
            className="form-control"
            type="text"
            placeholder="author"
            value={author}
            name="author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className="form-group">
        <label>url</label>
          <input
            className="form-control"
            type="text"
            placeholder="url"
            value={url}
            name="url"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-btn" className='btn btn-success' type="submit" style={{ marginTop: 5, marginBottom: 5 }}>
          create
        </button>
      </form>
      </Togglable>
  )
}

export default BlogForm
