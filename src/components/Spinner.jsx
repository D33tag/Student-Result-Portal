// src/components/Spinner.jsx
import Spinner from 'react-bootstrap/Spinner'

function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 py-3">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loader
