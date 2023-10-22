const blogRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  const user = request.user
  
  if (!token) {
    return response.status(401).json({ error: 'token missing or invalid' })  
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  
  response
    .status(201)
    .json(
      await savedBlog.populate('user', { username: 1, name: 1 })
    )
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const token = request.token
  const user = request.user
  
  if (!token) {
    return response.status(401).json({ error: 'token missing or invalid' })  
  }

  const blog = await Blog.findById(id)

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'unauthorized' })  
  }
})

blogRouter.put('/:id', async (request, response) => {
  const blog = request.body //has the updated property (in this case: 'Likes')
  const id = request.params.id
  
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })

  response
    .status(200)
    .json(await updatedBlog.populate('user', { username: 1, name: 1 }))
})

blogRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body
  const id = request.params.id

  const blog = await Blog.findById(id)

  blog.comments = [...blog.comments, comment]

  const updatedBlog = await blog.save()

  response
    .status(201)
    .json(
      await updatedBlog.populate('user', { username: 1, name: 1 })
    )
})

module.exports = blogRouter