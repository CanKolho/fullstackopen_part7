import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeAllUser } from './reducers/allUsersReducer'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'

import Bloglist from './components/Bloglist'
import Login from './components/Login'
import AllUsers from './components/AllUsers'

const App = () => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeAllUser())
  }, [])
  
  return (
    <>
    <Routes>
      <Route path='/' element={!user ? <Login /> : <Bloglist /> }/>
      <Route path='/users' element={<AllUsers />}/>
    </Routes>
    </>
  )
}

export default App
