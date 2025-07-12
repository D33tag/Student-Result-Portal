import { createContext, useContext, useState, useEffect } from 'react'

// Create the context
const AuthContext = createContext()

// Provider component
export function AuthProvider({ children }) {
  const [role, setRole] = useState(null)           // 'student' or 'lecturer'
  const [userId, setUserId] = useState('')         // Student or lecturer ID

  // Login function
  const login = (id, selectedRole) => {
    setUserId(id)
    setRole(selectedRole)
    localStorage.setItem('userId', id)
    localStorage.setItem('role', selectedRole)
  }

  // Logout function
  const logout = () => {
    setUserId('')
    setRole(null)
    localStorage.removeItem('userId')
    localStorage.removeItem('role')
  }

  // Load data from localStorage on refresh
  useEffect(() => {
    const savedId = localStorage.getItem('userId')
    const savedRole = localStorage.getItem('role')
    if (savedId && savedRole) {
      setUserId(savedId)
      setRole(savedRole)
    }
  }, [])

  // Provide values to children
  return (
    <AuthContext.Provider value={{ role, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook for easy usage
export function useAuth() {
  return useContext(AuthContext)
}
