import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      console.log('blogs payload', action.payload)
      return action.payload
    },
    addBlog(state, action) {
      return [...state, action.payload]
    }
  }
})

export const { setBlogs, addBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    console.log('from server', blogs)
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    try {
      const newObj = await blogService.create(newBlog)
      dispatch(addBlog(newObj))
      dispatch(createNotification(
        `a new blog '${newBlog.title}' by ${newObj.author} added`, true, 5
      ))
    } catch ({ response }) {
      dispatch(createNotification(
        response.data.error, false, 5
      ))
    }
    
  }
}

export default blogSlice.reducer