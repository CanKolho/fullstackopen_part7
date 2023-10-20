import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'

const Info = () => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const handleLogOut = () => dispatch(logout())
  
  if (!user) return null
    
  return (
    <>
    <h1>blogs app</h1>
    <p>
      {user.name} logged in {}
      <button id="logout-btn" onClick={handleLogOut}>
        logout
      </button>
    </p>
    </>

  )
}

export default Info