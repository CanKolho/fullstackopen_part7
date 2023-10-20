import { useState } from 'react'
import { login } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import Notification from './Notification'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    
    dispatch(login(username, password))
    
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h1>log in to application</h1>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username {}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          password {}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button id="login-btn" type="submit">
          login
        </button>
      </form>
    </>
  )
}

export default Login
