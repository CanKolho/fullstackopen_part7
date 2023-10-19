import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  const blog = {
    title: 'test',
    author: 'tester',
    url: 'www.test.com',
    likes: 0,
    user: {
      username: 'testman',
      name: 'jason',
    },
  }

  let component
  const mockHandler_Likes = jest.fn()
  const mock = jest.fn() //used for props `deleteBlog` to prevent proptype error

  beforeEach(() => {
    component = render(
      <Blog
        key={blog.id}
        blog={blog}
        updateLikes={mockHandler_Likes}
        deleteBlog={mock}
        username={blog.user.username}
      />,
    )
  })

  test('renders title and author but not url or likes by default', async () => {
    const titleAndAuthor = screen.getByText(`${blog.title} - ${blog.author}`)
    const blogUrl = screen.getByText(blog.url)
    const likes = await screen.findByText(`Likes ${blog.likes}`)

    expect(titleAndAuthor).toBeDefined()
    expect(blogUrl).not.toBeVisible()
    expect(likes).not.toBeVisible()
  })

  test('renders url, likes and name when `view` is clicked ', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const blogUrl = screen.getByText(blog.url)
    const likes = await screen.findByText(`Likes ${blog.likes}`)
    const username = screen.getByText(blog.user.name)

    expect(blogUrl).toBeVisible()
    expect(likes).toBeVisible()
    expect(username).toBeVisible()
  })

  test('When the Like -button is clicked twice, the callback func is also called twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler_Likes.mock.calls).toHaveLength(2)
  })
})
