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
        <div>
          title: {}
          <input
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
        <div>
          author: {}
          <input
            type="text"
            placeholder="author"
            value={author}
            name="author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url: {}
          <input
            type="text"
            placeholder="url"
            value={url}
            name="url"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-btn" type="submit">
          create
        </button>
      </form>
      </Togglable>
  )
}

export default BlogForm
