import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { useState } from 'react'
import LogoutModal from './LogoutModal'

function Navbar() {
  const { role, logout } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Hide Navbar on auth-related pages
  if (['/login', '/register', '/forgot-password'].includes(location.pathname)) {
    return null
  }

  // Only show if user is logged in
  if (!role) return null

  const handleLogoutConfirm = () => {
    logout()
    navigate('/')
    setShowModal(false)
  }
  const dashboardLink = role === 'student' ? '/student' : '/lecturer'

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to={dashboardLink}>Result Portal</Link>

        <ul className="navbar-nav ms-auto">
          {role === 'student' && (
            <li className="nav-item">
              <Link className="nav-link" to="/student">Student Dashboard</Link>
            </li>
          )}
          {role === 'lecturer' && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/lecturer">Lecturer Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/lecturer/upload">Upload Result</Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <button
              className="btn btn-outline-light ms-2"
              onClick={() => setShowModal(true)}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      <LogoutModal
        show={showModal}
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowModal(false)}
      />
    </nav>
  )
}

export default Navbar
