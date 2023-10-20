import { useSelector } from 'react-redux'
import Info from './Info'

const AllUsers = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <Info />
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>{ }</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AllUsers