import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const blogs = useSelector(state => [...state.blogs])
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showSuccessMsg = (successMsg) =>
    dispatch(createNotification(successMsg, true, 5))

  const showErrorMsg = (ErrorMsg) =>
    dispatch(createNotification(ErrorMsg, false, 5))

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch ({ response }) {
      showErrorMsg(response.data.error)
    }
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const handleUsername = ({ target }) => {
    console.log('username', target.value)
    setUsername(target.value)
  }

  const handlePassword = ({ target }) => {
    console.log('password', target.value)
    setPassword(target.value)
  }

  const updateLikes = async (id, newBlog) => {
    try {
      const updatedBlog = await blogService.update(id, newBlog)
      const newBlogs = blogs.map((blog) =>
        blog.id === id ? updatedBlog : blog,
      )
      setBlogs(newBlogs)
    } catch ({ response }) {
      showErrorMsg(response.data.error)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      showSuccessMsg('blog deleted successfully!')
    } catch ({ response }) {
      showErrorMsg(response.data.error)
    }
  }

  const loginForm = () => (
    <Login
      handleLogin={handleLogin}
      username={username}
      password={password}
      handleUsername={handleUsername}
      handlePassword={handlePassword}
    />
  )

  const showBlogs = () => (
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
            updateLikes={updateLikes}
            deleteBlog={deleteBlog}
            username={user.username}
          />
        ))}
    </>
  )

  return <>{!user ? loginForm() : showBlogs()}</>
}

export default App
