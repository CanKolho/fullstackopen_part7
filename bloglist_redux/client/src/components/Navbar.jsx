import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleLogOut = () => dispatch(logout())

  const style = {
    padding: 5,
    background: 'lightgrey',
    marginBottom: 5,
  }

  const padding = {
    paddingRight: 5
  }

  return (
    <div style={style}>
      <Link style={padding} to='/'>Blogs</Link>
      <Link style={padding} to='/users'>Users</Link>
      {user && 
      <span>
        {user.name} logged in {}
        <button id="logout-btn" onClick={handleLogOut}>
          logout
        </button>
      </span>}
    </div>
  )
}

export default Navbar