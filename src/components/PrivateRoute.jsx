import { Navigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

function PrivateRoute({ children, roleRequired }) {
  const { role, loading } = useAuth()

  if (loading) {
    // ✅ Wait until AuthContext finishes checking localStorage
    return <div>Loading...</div>
  }

  if (!role) {
    return <Navigate to="/" replace />
  }

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" replace />
  }

  return children
}

export default PrivateRoute
