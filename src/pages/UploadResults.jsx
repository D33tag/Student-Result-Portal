import { useState, useEffect } from 'react'
import { Table, Button, Form, Modal } from 'react-bootstrap'
import axios from '../utils/axiosInstance'
import { useAuth } from '../AuthContext'

function UploadResults() {
  const { userId } = useAuth()
  const [results, setResults] = useState([])
  const [form, setForm] = useState({
    studentId: '',
    course: '',
    score: '',
    unit: '',
    session: '',
    semester: 'First Semester'   // ✅ added
  })
  const [editId, setEditId] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const token = localStorage.getItem('token')

  // Fetch lecturer’s own results
  const fetchResults = async () => {
    try {
      const res = await axios.get('/api/results/lecturer', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setResults(res.data.results)
    } catch (err) {
      console.error('Failed to fetch results:', err.response?.data || err.message)
    }
  }

  useEffect(() => {
    if (token) fetchResults()
  }, [token])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (parseInt(form.score) < 0 || parseInt(form.score) > 100) {
      alert('Score must be between 0 and 100')
      return
    }

    try {
      if (editId) {
        // Update existing result
        await axios.put(`/api/results/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        })
        alert('Result updated!')
      } else {
        // Upload new result
        await axios.post('/api/results/upload', form, {
          headers: { Authorization: `Bearer ${token}` }
        })
        alert('Result uploaded!')
      }

      setForm({
        studentId: '',
        course: '',
        score: '',
        unit: '',
        session: '',
        semester: 'First Semester' // ✅ reset with default
      })
      setEditId(null)
      setShowModal(false)
      fetchResults()
    } catch (err) {
      console.error('Error saving result:', err.response?.data || err.message)
      alert('Failed to save result')
    }
  }

  const handleEdit = (result) => {
    setForm({
      studentId: result.studentId,
      course: result.course,
      score: result.score,
      unit: result.unit,
      session: result.session,
      semester: result.semester || 'First Semester' // ✅ include semester
    })
    setEditId(result._id)
    setShowModal(true)
  }

  const handleDelete = async (resultId) => {
    if (!window.confirm('Are you sure you want to delete this result?')) return
    try {
      await axios.delete(`/api/results/${resultId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('Result deleted!')
      fetchResults()
    } catch (err) {
      console.error('Failed to delete result:', err.response?.data || err.message)
      alert('Failed to delete result')
    }
  }

  return (
    <div className="container mt-4">
      <h3>Lecturer Result Management</h3>
      <Button
        className="mb-3"
        onClick={() => {
          setForm({
            studentId: '',
            course: '',
            score: '',
            unit: '',
            session: '',
            semester: 'First Semester' // ✅ default when opening modal
          })
          setEditId(null)
          setShowModal(true)
        }}
      >
        Upload New Result
      </Button>

      <Table bordered hover responsive>
        <thead className="table-success text-center">
          <tr>
            <th>#</th>
            <th>Student ID</th>
            <th>Course</th>
            <th>Score</th>
            <th>Unit</th>
            <th>Session</th>
            <th>Semester</th> {/* ✅ new column */}
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {results.map((r, i) => (
            <tr key={r._id}>
              <td>{i + 1}</td>
              <td>{r.studentId}</td>
              <td>{r.course}</td>
              <td>{r.score}</td>
              <td>{r.unit}</td>
              <td>{r.session}</td>
              <td>{r.semester}</td> {/* ✅ show semester */}
              <td>{r.grade}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(r)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(r._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Edit Result' : 'Upload New Result'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="row g-3">
            <Form.Group className="col-md-6">
              <Form.Label>Student ID / Matric No</Form.Label>
              <Form.Control
                name="studentId"
                value={form.studentId}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="col-md-6">
              <Form.Label>Academic Session</Form.Label>
              <Form.Select
                name="session"
                value={form.session}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="2022/2023">2022/2023</option>
                <option value="2023/2024">2023/2024</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-md-6">
              <Form.Label>Course</Form.Label>
              <Form.Control
                name="course"
                value={form.course}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="col-md-3">
              <Form.Label>Score</Form.Label>
              <Form.Control
                type="number"
                name="score"
                value={form.score}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="col-md-3">
              <Form.Label>Unit</Form.Label>
              <Form.Control
                type="number"
                name="unit"
                value={form.unit}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* ✅ NEW: Semester select */}
            <Form.Group className="col-md-6">
              <Form.Label>Semester</Form.Label>
              <Form.Select
                name="semester"
                value={form.semester}
                onChange={handleChange}
                required
              >
                <option value="First Semester">First Semester</option>
                <option value="Second Semester">Second Semester</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="col-12 text-end mt-3">
              <Button variant="success" type="submit">
                {editId ? 'Update' : 'Upload'}
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default UploadResults
