import { useField } from "../hooks"
import { useDispatch } from 'react-redux'
import { createComment } from "../reducers/blogReducer"

const Comment = ({ blog }) => {
  const {reset, ...commentInput }= useField('text')

  const dispatch = useDispatch()

  const handleComment = async (event) => {
    event.preventDefault()
    dispatch(createComment(blog.id, commentInput.value))
    reset()
  }

  return (
    <>
      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <input {...commentInput}/>
        <button type="submit">Add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>
            {comment}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Comment