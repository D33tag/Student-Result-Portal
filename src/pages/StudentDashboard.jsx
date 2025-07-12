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
  const { userId } = useAuth()
  const [session, setSession] = useState('2022/2023')
  const [results, setResults] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('results')) || []
    const studentResults = stored.filter(
      r => r.studentId === userId && r.session === session
    )
    setResults(studentResults)
  }, [userId, session])

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="fw-bold text-primary text-center mb-2">Student Dashboard</h2>
      <p className="text-muted text-center mb-4">
        Welcome, <Badge bg="dark">{userId}</Badge>
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

          {results.length === 0 ? (
            <div className="alert alert-warning text-center">
              No results found for this session.
            </div>
          ) : (
            <>
              <h5 className="fw-semibold mb-3">Results for {session}</h5>
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
                      <td>{r.lecturer}</td>
                      <td>{r.score}</td>
                      <td>
                        <Badge bg="info" className="fs-6">{getGrade(r.score)}</Badge>
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
