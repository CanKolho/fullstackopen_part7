import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const Navba = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleLogOut = () => dispatch(logout())

  const padding = {
    paddingRight: 5
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to='/'>Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to='/users'>Users</Link>
          </Nav.Link>
          {user && 
          <span>
            {user.name} logged in {}
            <button  className='btn btn-outline-primary' id="logout-btn" onClick={handleLogOut}>
              logout
            </button>
          </span>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navba