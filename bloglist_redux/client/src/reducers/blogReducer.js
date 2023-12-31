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
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      const { id } = updatedBlog
      return state.map(blog => 
        blog.id === id ? updatedBlog : blog
      )
    }
  }
})

export const { setBlogs, addBlog, removeBlog, updateBlog } = blogSlice.actions

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

export const deleteBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch(removeBlog(id))
      dispatch(createNotification(
        'blog deleted successfully!', true, 5
      ))
    } catch ({ response }) {
      dispatch(createNotification(
        response.data.error, false, 5
      ))
    }
  }
}

export const update = (blogToUpdate) => {
  return async dispatch => {
    try {
      const { id } = blogToUpdate
      const updatedBlog = await blogService.update(id, blogToUpdate)
      dispatch(updateBlog(updatedBlog))
    } catch ({ response }) {
      dispatch(createNotification(
        response.data.error, false, 5
      ))
    }
  }
}

export const createComment = (id, comment) => {
  return async dispatch => {
    const commentedBlog = await blogService.addComment(id, comment)
    dispatch(updateBlog(commentedBlog))
  }
}

export default blogSlice.reducer