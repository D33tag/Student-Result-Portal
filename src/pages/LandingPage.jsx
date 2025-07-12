import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        backgroundImage:
          'url("https://png.pngtree.com/background/20210709/original/pngtree-cartoon-education-training-cram-school-picture-image_917042.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}
      className="d-flex flex-column justify-content-center align-items-center text-white"
    >
      <h1 className="mb-5 fw-bold" style={{ textShadow: '1px 1px 2px #000' }}>
        Student Result Portal
      </h1>

      <div className="d-flex flex-column gap-3" style={{ width: '250px' }}>
        <button
          className="btn btn-outline-light btn-lg"
          onClick={() => navigate('/login', { state: { role: 'student' } })}
        >
          Login as Student
        </button>

        <button
          className="btn btn-outline-light btn-lg"
          onClick={() => navigate('/login', { state: { role: 'lecturer' } })}
        >
          Login as Lecturer
        </button>

        <button
          className="btn btn-primary btn-lg mt-3"
          onClick={() => navigate('/register')}
        >
          Register
        </button>
      </div>
    </div>
  )
}

export default LandingPage
