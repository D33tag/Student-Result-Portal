import { Navigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

function PrivateRoute({ children, roleRequired }) {
  const { role } = useAuth()

  if (!role) {
    // Not logged in
    return <Navigate to="/" replace />
  }

  if (roleRequired && role !== roleRequired) {
    // Logged in but wrong role
    return <Navigate to="/" replace />
  }

  return children
}

export default PrivateRoute
