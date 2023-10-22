import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeAllUser } from './reducers/allUsersReducer'
import { Routes, Route, useMatch } from 'react-router-dom'

import Bloglist from './components/Bloglist'
import Login from './components/Login'
import AllUsers from './components/AllUsers'
import User from './components/User'
import BlogInfo from './components/BlogInfo'
import Navbar from './components/Navbar'

const App = () => {
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeAllUser())
  }, [])

  const match = useMatch('/users/:id')
  const matchedUser = match
    ? users.find(user => user.id === match.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const matchedblog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id) 
    : null

  return (
    <>
    <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={!user ? <Login /> : <Bloglist /> }/>
          <Route path='/users' element={<AllUsers />}/>
          <Route path='/users/:id' element={<User user={matchedUser}/>}/>
          <Route path='blogs/:id' element={<BlogInfo blog={matchedblog}/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
