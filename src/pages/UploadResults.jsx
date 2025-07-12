import { useState, useEffect } from 'react'
import { Table, Button, Form, Modal } from 'react-bootstrap'

function UploadResults() {
  const [form, setForm] = useState({
    studentId: '',
    course: '',
    score: '',
    unit: '',
    session: '',
    lecturer: ''
  })

  const [results, setResults] = useState([])
  const [editIndex, setEditIndex] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('results')) || []
    setResults(stored)
  }, [])

  const saveToLocalStorage = (data) => {
    localStorage.setItem('results', JSON.stringify(data))
    setResults(data)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const score = parseInt(form.score)
    if (score < 0 || score > 100) {
      alert('Score must be between 0 and 100')
      return
    }

    let updatedResults = [...results]
    if (editIndex !== null) {
      updatedResults[editIndex] = form
      setEditIndex(null)
      alert('Result updated!')
    } else {
      updatedResults.push(form)
      alert('Result uploaded!')
    }

    saveToLocalStorage(updatedResults)
    setForm({ studentId: '', course: '', score: '', unit: '', session: '', lecturer: '' })
    setShowModal(false)
  }

  const handleEdit = (index) => {
    setForm(results[index])
    setEditIndex(index)
    setShowModal(true)
  }

  const handleDelete = (index) => {
    if (confirm('Are you sure you want to delete this result?')) {
      const updatedResults = [...results]
      updatedResults.splice(index, 1)
      saveToLocalStorage(updatedResults)
      alert('Result deleted.')
    }
  }

  return (
    <div className="container">
      <h3 className="mb-4">Lecturer Result Management</h3>

      <Button className="mb-3" onClick={() => {
        setForm({ studentId: '', course: '', score: '', unit: '', session: '', lecturer: '' })
        setEditIndex(null)
        setShowModal(true)
      }}>
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
            <th>Lecturer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {results.map((r, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{r.studentId}</td>
              <td>{r.course}</td>
              <td>{r.score}</td>
              <td>{r.unit}</td>
              <td>{r.session}</td>
              <td>{r.lecturer}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(i)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(i)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Upload/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Result' : 'Upload New Result'}</Modal.Title>
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

            <Form.Group className="col-md-12">
              <Form.Label>Lecturer Name</Form.Label>
              <Form.Control
                name="lecturer"
                value={form.lecturer}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="col-12 text-end mt-3">
              <Button variant="success" type="submit">
                {editIndex !== null ? 'Update' : 'Upload'}
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default UploadResults
