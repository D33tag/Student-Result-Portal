import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
  const [userId, setUserId] = useState('')
  const [role, setRole] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Password reset link (simulated) sent for ${role} with ID: ${userId}`)
    navigate('/login', { state: { role } })
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
        <div style={{ width: '60px' }} /> {/* Spacer to center the title */}
      </nav>

      {/* Forgot Password Form */}
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
            <h4 className="fw-bold text-white">Forgot Password</h4>
            <small className="text-light">Enter your details to reset</small>
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

            <button className="btn btn-primary w-100" type="submit">
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
