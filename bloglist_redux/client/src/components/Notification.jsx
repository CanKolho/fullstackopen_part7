import { useSelector } from 'react-redux'

const Notification = () => {
  const { msg, type } = useSelector(state => state.notification)

  if (!msg) return null

  return <div className={type ? 'success' : 'error'}>{msg}</div>
}

export default Notification
