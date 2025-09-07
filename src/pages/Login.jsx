import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import axios from 'axios'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const preselectedRole = location.state?.role || ''
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!password) return alert('Password is required')

    try {
      setLoading(true)
      const res = await axios.post('http://localhost:5050/api/auth/login', {
        userId,
        password
      })

      if (res.data.success) {
        login(res.data.user, res.data.token)

        // Redirect based on API role (ignore user input)
        if (res.data.user.role === 'student') {
          navigate('/student')
        } else if (res.data.user.role === 'lecturer') {
          navigate('/lecturer')
        }
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        backgroundImage: 'url("https://png.pngtree.com/background/20210709/original/pngtree-cartoon-education-training-cram-school-picture-image_917042.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <nav
        className="navbar fixed-top d-flex justify-content-between align-items-center px-3"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          height: '60px',
          color: 'white',
        }}
      >
        <button className="btn btn-sm btn-light" onClick={() => navigate('/')}>
          ← Back
        </button>
        <h5 className="m-0 text-white text-center flex-grow-1">RESULT PORTAL</h5>
        <div style={{ width: '60px' }} />
      </nav>

      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="card p-4 shadow text-white"
          style={{
            maxWidth: '400px',
            width: '100%',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            marginTop: '60px',
          }}
        >
          <div className="text-center mb-3">
            <h3 className="fw-bold text-white">
              {preselectedRole === 'lecturer' ? 'Lecturer Login' : 'Student Result Portal'}
            </h3>
            <small className="text-light">Login to continue</small>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-light">User ID</label>
              <input
                type="text"
                className="form-control bg-light"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>

            {/* Show role as readonly */}
            <div className="mb-3">
              <label className="form-label text-light">Role</label>
              <input
                type="text"
                className="form-control bg-light"
                value={preselectedRole}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-light">Password</label>
              <input
                type="password"
                className="form-control bg-light"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-danger">{error}</p>}

            <button className="btn btn-primary w-100" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="text-end mt-2">
              <button
                className="btn btn-link text-white text-decoration-underline p-0"
                onClick={() => navigate('/forgot-password')}
                style={{ fontSize: '0.9rem' }}
                type="button"
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
