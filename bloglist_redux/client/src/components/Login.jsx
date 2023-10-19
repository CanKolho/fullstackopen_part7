import Notification from './Notification'
import PropTypes from 'prop-types'

const Login = ({
  handleLogin,
  username,
  password,
  handleUsername,
  handlePassword,
}) => {
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
            onChange={handleUsername}
            id="username"
          />
        </div>
        <div>
          password {}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePassword}
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

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
}

export default Login
