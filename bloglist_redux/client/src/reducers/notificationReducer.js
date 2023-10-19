import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {},
  reducers: {
    setNotif(state, action) {
      return action.payload
    },
  },
})

export const { setNotif } = notificationSlice.actions

export const createNotification = (msg, type, delay) => {
  return async (dispatch) => {
    dispatch(setNotif({ msg, type }))
    setTimeout(() => dispatch(setNotif({})), delay * 1000)
  }
}

export default notificationSlice.reducer
