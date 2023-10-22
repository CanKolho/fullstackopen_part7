import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from './Header'

const AllUsers = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <Header/>
      <h1>Users</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>{ }</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><Link  className='btn btn-dark'to={user.id}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AllUsers