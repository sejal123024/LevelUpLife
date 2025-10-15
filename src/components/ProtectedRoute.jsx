import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, userData } = useAuth()

  if (!currentUser) {
    return <Navigate to="/signin" replace />
  }

  if (adminOnly && !userData?.is_admin) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default ProtectedRoute
