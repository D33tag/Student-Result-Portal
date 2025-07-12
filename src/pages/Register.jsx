import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../utils/axiosInstance'

function Register() {
  const [name, setName] = useState('')
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return alert('Passwords do not match')
    }

    try {
      const res = await axios.post('/api/auth/register', {
        name,
        userId,
        password,
        role
      })

      alert('Registration successful! You can now log in.')
      navigate('/login', { state: { role } })
    } catch (err) {
      console.error(err)
      alert('Registration failed')
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
      }}
    >
      {/* Transparent Navbar */}
      <nav
        className="navbar fixed-top d-flex justify-content-between align-items-center px-3"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          height: '60px',
          color: 'white',
        }}
      >
        <button
          onClick={() => navigate('/')}
          className="btn btn-sm btn-light"
        >
          ← Back
        </button>
        <h5 className="m-0 text-white text-center flex-grow-1">
          RESULT PORTAL
        </h5>
        <div style={{ width: '60px' }} />
      </nav>

      {/* Registration Form */}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="card p-4 shadow text-white"
          style={{
            maxWidth: '500px',
            width: '100%',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            marginTop: '60px',
          }}
        >
          <div className="text-center mb-3">
            <h4 className="fw-bold text-white">Create an Account</h4>
            <small className="text-light">Register as Student or Lecturer</small>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-light">Full Name</label>
              <input
                type="text"
                className="form-control bg-light"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-light">User ID / Matric No</label>
              <input
                type="text"
                className="form-control bg-light"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-light">Role</label>
              <select
                className="form-select bg-light"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select role</option>
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
              </select>
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

            <div className="mb-3">
              <label className="form-label text-light">Confirm Password</label>
              <input
                type="password"
                className="form-control bg-light"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-success w-100" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
