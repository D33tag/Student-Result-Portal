import { useEffect, useState } from 'react'
import { useAuth } from '../AuthContext'
import { Badge, Card, Table } from 'react-bootstrap'

// Convert score to grade
const getGrade = (score) => {
  const s = Number(score)
  if (s >= 70) return 'A'
  if (s >= 60) return 'B'
  if (s >= 50) return 'C'
  if (s >= 45) return 'D'
  if (s >= 40) return 'E'
  return 'F'
}

// Calculate GPA
const calculateGPA = (results) => {
  const gradePoints = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 }
  const totalPoints = results.reduce((sum, r) => sum + gradePoints[getGrade(r.score)] * r.unit, 0)
  const totalUnits = results.reduce((sum, r) => sum + Number(r.unit), 0)
  return totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : '0.00'
}

function StudentDashboard() {
  const { user, token } = useAuth()
  const [session, setSession] = useState('2022/2023')
  const [semester, setSemester] = useState('First Semester') // ✅ added
  const [results, setResults] = useState([])

  // Fetch student results from backend
  const fetchResults = async () => {
    if (!token) return
    try {
      const res = await fetch(
        `http://localhost:5050/api/results/student?session=${encodeURIComponent(session)}&semester=${encodeURIComponent(semester)}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      const data = await res.json()
      if (data.success) {
        // ✅ Filter by session + semester
        const filtered = data.results.filter(
          r => r.session === session && r.semester === semester
        )
        setResults(filtered)
      }
    } catch (err) {
      console.error('Failed to fetch results:', err)
    }
  }

  useEffect(() => {
    fetchResults()
  }, [session, semester, token]) // ✅ include semester

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="fw-bold text-primary text-center mb-2">Student Dashboard</h2>
      <p className="text-muted text-center mb-4">
        Welcome, <Badge bg="dark">{user?.name}</Badge>
        <span className="ms-2 text-secondary">({user?.userId})</span>
      </p>

      <Card className="shadow-sm w-100" style={{ maxWidth: '800px' }}>
        <Card.Body>
          <div className="mb-3">
            <label className="form-label fw-semibold">Select Academic Session</label>
            <select
              className="form-select"
              value={session}
              onChange={(e) => setSession(e.target.value)}
            >
              <option value="2022/2023">2022/2023</option>
              <option value="2023/2024">2023/2024</option>
            </select>
          </div>

          {/* ✅ NEW: Semester selector */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Select Semester</label>
            <select
              className="form-select"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="First Semester">First Semester</option>
              <option value="Second Semester">Second Semester</option>
            </select>
          </div>

          {results.length === 0 ? (
            <div className="alert alert-warning text-center">
              No results found for this session/semester.
            </div>
          ) : (
            <>
              <h5 className="fw-semibold mb-3">
                Results for {session} — {semester} {/* ✅ show selection */}
              </h5>
              <Table bordered hover responsive className="text-center">
                <thead className="table-success">
                  <tr>
                    <th>Course</th>
                    <th>Lecturer</th>
                    <th>Score</th>
                    <th>Grade</th>
                    <th>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i}>
                      <td>{r.course}</td>
                      <td>{r.lecturerName}</td>
                      <td>{r.score}</td>
                      <td>
                        <Badge bg="info" className="fs-6">{r.grade}</Badge>
                      </td>
                      <td>{r.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="text-end mt-3">
                <strong className="me-2">GPA:</strong>
                <Badge bg="primary" className="fs-6">{calculateGPA(results)}</Badge>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default StudentDashboard
