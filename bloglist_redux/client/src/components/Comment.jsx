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

  const margin = {
    marginTop: 5, 
    marginBottom: 25
  }

  return (
    <>
      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <input className="form-control" {...commentInput}/>
        <button className='btn btn-primary' style={margin} type="submit">Add comment</button>
      </form>
      <ul className="list-group">
        {blog.comments.map((comment, index) => (
          <li className='list-group-item' key={index}>
            {comment}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Comment