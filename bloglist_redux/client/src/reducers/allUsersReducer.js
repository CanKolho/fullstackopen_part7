import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const allUserSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setAllUsers(state, action) {
      return action.payload
    }
  }
})

export const { setAllUsers } = allUserSlice.actions

export const initializeAllUser = () => {
  return async dispact => {
    const allUsers = await userService.getAll()
    dispact(setAllUsers(allUsers))
  }
}

export default allUserSlice.reducer