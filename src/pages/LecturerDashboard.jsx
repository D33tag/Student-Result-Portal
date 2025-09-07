import { useEffect, useState } from 'react'
import { useAuth } from '../AuthContext'
import axios from '../utils/axiosInstance'

function LecturerDashboard() {
  const { user, token } = useAuth()
  const [lecturerName, setLecturerName] = useState('')
  const [results, setResults] = useState([])
  const [editResult, setEditResult] = useState(null)
  const [comment, setComment] = useState('')

  // Fetch lecturer profile
  useEffect(() => {
    if (!token) return
    setLecturerName(user?.name || '')
  }, [user, token])

  // Fetch lecturer's own results
  const fetchResults = async () => {
    if (!token) return
    try {
      const res = await axios.get('/api/results/lecturer', {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log("fetched results:", res.data)
      setResults(res.data.results) // ← correctly access array
    } catch (err) {
      console.error('Failed to fetch results:', err.response?.data || err.message)
    }
  }

  useEffect(() => {
    fetchResults()
  }, [token])

  // Delete a result
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this result?')) return
    try {
      await axios.delete(`/api/results/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchResults() // refresh after delete
    } catch (err) {
      console.error(err.response?.data || err.message)
    }
  }

  // Open edit modal
  const handleEdit = (result) => {
    setEditResult(result)
  }

  // Save edited result
  const saveEdit = async () => {
    try {
      await axios.put(`/api/results/${editResult._id}`, editResult, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setEditResult(null)
      fetchResults() // refresh after edit
    } catch (err) {
      console.error(err.response?.data || err.message)
    }
  }

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h2>Hello, {lecturerName}</h2>
        <p className="text-muted">Welcome to your dashboard</p>
      </div>

      <div className="card p-4 mb-4">
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

      <div className="card p-4 shadow-sm">
        <h4>Your Uploaded Results</h4>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Course</th>
              <th>Score</th>
              <th>Unit</th>
              <th>Grade</th>
              <th>Session</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map(r => (
              <tr key={r._id}>
                <td>{r.studentId}</td>
                <td>{r.course}</td>
                <td>{r.score}</td>
                <td>{r.unit}</td>
                <td>{r.grade}</td>
                <td>{r.session}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(r)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(r._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editResult && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Result</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditResult(null)}
                />
              </div>
              <div className="modal-body">
                <div className="mb-2">
                  <label>Student ID</label>
                  <input className="form-control" value={editResult.studentId} disabled />
                </div>
                <div className="mb-2">
                  <label>Course</label>
                  <input
                    className="form-control"
                    value={editResult.course}
                    onChange={(e) =>
                      setEditResult({ ...editResult, course: e.target.value })
                    }
                  />
                </div>
                <div className="mb-2">
                  <label>Score</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editResult.score}
                    onChange={(e) =>
                      setEditResult({ ...editResult, score: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="mb-2">
                  <label>Unit</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editResult.unit}
                    onChange={(e) =>
                      setEditResult({ ...editResult, unit: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="mb-2">
                  <label>Session</label>
                  <input
                    className="form-control"
                    value={editResult.session}
                    onChange={(e) =>
                      setEditResult({ ...editResult, session: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setEditResult(null)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={saveEdit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LecturerDashboard
