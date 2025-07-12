import { useEffect, useState } from 'react'
import { useAuth } from '../AuthContext'
import axios from '../utils/axiosInstance'

function LecturerDashboard() {
  const { userId } = useAuth()
  const [lecturerName, setLecturerName] = useState('')
  const [comment, setComment] = useState('')

  useEffect(() => {
    async function fetchLecturerName() {
      try {
        const res = await axios.get(`/auth/profile/${userId}`)
        setLecturerName(res.data.name)
      } catch (err) {
        console.error('Failed to fetch lecturer name', err)
      }
    }

    fetchLecturerName()
  }, [userId])

  return (
    <div
      style={{
        background: 'linear-gradient(120deg, #f0f2f5, #e2eafc)',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="fw-bold">
            Hello, {lecturerName || userId}
          </h2>
          <p className="text-muted">Welcome to your dashboard</p>
        </div>

        <div className="card p-4 shadow-sm">
          <h5>Leave a Comment</h5>
          <textarea
            className="form-control mb-3"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your note or session summary..."
          />
          <button className="btn btn-primary">Save Comment</button>
        </div>
      </div>
    </div>
  )
}

export default LecturerDashboard
 