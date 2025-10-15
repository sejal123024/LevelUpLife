import { createContext, useContext, useState, useEffect } from 'react'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase'
import { loginUser } from '../services/api'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  const syncUserWithBackend = async (firebaseUser) => {
    try {
      const idToken = await firebaseUser.getIdToken()
      const response = await loginUser(idToken)
      
      if (response.success) {
        setUserData(response.user)
        localStorage.setItem('userData', JSON.stringify(response.user))
      }
    } catch (error) {
      console.error('Error syncing user:', error)
      // Demo mode: Create mock user data if backend is unavailable
      const mockUserData = {
        id: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || 'User',
        display_name: firebaseUser.displayName || 'User',
        xp: 0,
        level: 1,
        coins: 0,
        current_streak: 0,
        longest_streak: 0,
        profile_picture: firebaseUser.photoURL || null
      }
      setUserData(mockUserData)
      localStorage.setItem('userData', JSON.stringify(mockUserData))
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      
      if (user) {
        await syncUserWithBackend(user)
      } else {
        setUserData(null)
        localStorage.removeItem('userData')
      }
      
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signup = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await syncUserWithBackend(result.user)
      toast.success('Account created successfully!')
      return result
    } catch (error) {
      toast.error(error.message)
      throw error
    }
  }

  const signin = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      await syncUserWithBackend(result.user)
      toast.success('Welcome back!')
      return result
    } catch (error) {
      toast.error('Invalid email or password')
      throw error
    }
  }

  const signinWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      await syncUserWithBackend(result.user)
      toast.success('Signed in with Google!')
      return result
    } catch (error) {
      toast.error('Google sign-in failed')
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUserData(null)
      localStorage.removeItem('userData')
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Logout failed')
      throw error
    }
  }

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      toast.success('Password reset email sent!')
    } catch (error) {
      toast.error('Failed to send reset email')
      throw error
    }
  }

  const updateUserData = (newData) => {
    setUserData(newData)
    localStorage.setItem('userData', JSON.stringify(newData))
  }

  const value = {
    currentUser,
    userData,
    signup,
    signin,
    signinWithGoogle,
    logout,
    resetPassword,
    updateUserData,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
