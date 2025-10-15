import axios from 'axios'
import { auth } from '../config/firebase'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/LevelUpLife/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser
  if (user) {
    const token = await user.getIdToken()
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth APIs
export const loginUser = async (idToken) => {
  const response = await api.post('/auth/login.php', { idToken })
  return response.data
}

// User APIs
export const getUserProfile = async () => {
  const response = await api.get('/users/profile.php')
  return response.data
}

export const updateUserProfile = async (data) => {
  const response = await api.put('/users/profile.php', data)
  return response.data
}

// Task APIs
export const getTasks = async (includeCompleted = false) => {
  const response = await api.get(`/tasks/index.php?include_completed=${includeCompleted}`)
  return response.data
}

export const createTask = async (taskData) => {
  const response = await api.post('/tasks/index.php', taskData)
  return response.data
}

export const completeTask = async (taskId) => {
  const response = await api.post('/tasks/complete.php', { task_id: taskId })
  return response.data
}

export const getTaskCategories = async () => {
  const response = await api.get('/tasks/categories.php')
  return response.data
}

// Reward APIs
export const getRewards = async () => {
  const response = await api.get('/rewards/index.php')
  return response.data
}

export const purchaseReward = async (rewardId) => {
  const response = await api.post('/rewards/purchase.php', { reward_id: rewardId })
  return response.data
}

// Quote API
export const getRandomQuote = async () => {
  const response = await api.get('/quotes/random.php')
  return response.data
}

// Daily Challenges APIs
export const getDailyChallenges = async () => {
  const response = await api.get('/challenges/get.php')
  return response.data
}

export const updateChallengeProgress = async (challengeId, progress) => {
  const response = await api.post('/challenges/update.php', { 
    challenge_id: challengeId, 
    progress 
  })
  return response.data
}

// Power-Ups APIs
export const getPowerUps = async () => {
  const response = await api.get('/powerups/get.php')
  return response.data
}

export const purchasePowerUp = async (powerUpId) => {
  const response = await api.post('/powerups/purchase.php', { 
    power_up_id: powerUpId 
  })
  return response.data
}

export const getActivePowerUps = async () => {
  const response = await api.get('/powerups/active.php')
  return response.data
}

// Achievements APIs
export const getAchievements = async () => {
  const response = await api.get('/achievements/get.php')
  return response.data
}

export const getUserAchievements = async () => {
  const response = await api.get('/achievements/user.php')
  return response.data
}

export default api
