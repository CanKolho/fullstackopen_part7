import { useSelector } from 'react-redux'

const Notification = () => {
  const { msg, type } = useSelector(state => state.notification)

  if (!msg) return null

  return <div className={type ? 'alert alert-success' : 'alert alert-danger'}>{msg}</div>
}

export default Notification
