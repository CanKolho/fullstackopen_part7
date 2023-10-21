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

const App = () => {
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

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

  return (
    <>
    <Routes>
      <Route path='/' element={!user ? <Login /> : <Bloglist /> }/>
      <Route path='/users' element={<AllUsers />}/>
      <Route path='/users/:id' element={<User user={matchedUser}/>}/>
    </Routes>
    </>
  )
}

export default App
