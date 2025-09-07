// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import StudentDashboard from './pages/StudentDashboard'
import LecturerDashboard from './pages/LecturerDashboard'
import UploadResults from './pages/UploadResults'
import LandingPage from './pages/LandingPage'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import ForgotPassword from './pages/ForgotPassword'
import Register from './pages/Register'

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<PrivateRoute roleRequired="student"><StudentDashboard /></PrivateRoute>} />
        <Route path="/lecturer" element={<PrivateRoute roleRequired="lecturer"><LecturerDashboard /></PrivateRoute>} />
        <Route path="/lecturer/upload" element={<PrivateRoute roleRequired="lecturer"><UploadResults /></PrivateRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
