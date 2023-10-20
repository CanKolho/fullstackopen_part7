import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    loginUser(state, action) {
      console.log('user', action.payload)
      return action.payload
    },
    logoutUser() {
      return null
    }
  }
})

export const { loginUser, logoutUser } = userSlice.actions

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch(loginUser(user))
      dispatch(createNotification(`${user.name} logged in!`, true, 5))
    } catch ({ response }) {
      dispatch(createNotification(response.data.error, false, 5))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.clear()
    dispatch(logoutUser())
  }
}

export default userSlice.reducer