import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Check, Zap, Flame, Trophy, Star, Sparkles, Target, Swords } from 'lucide-react'
import Navbar from '../components/Navbar'
import LumoAvatar from '../components/LumoAvatar'
import { useAuth } from '../contexts/AuthContext'
import { getTasks, createTask, completeTask, getTaskCategories } from '../services/api'
import { triggerLevelUpConfetti } from '../utils/confetti'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'

const Tasks = () => {
  const { userData, updateUserData } = useAuth()
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [lumoAnimation, setLumoAnimation] = useState('idle')
  const [comboCount, setComboCount] = useState(0)
  const [showCombo, setShowCombo] = useState(false)
  const [filter, setFilter] = useState('all')
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category_id: 1,
    xp_reward: 10,
    coin_reward: 5
  })

  useEffect(() => {
    loadTasks()
    loadCategories()
  }, [])

  const loadTasks = async () => {
    try {
      const response = await getTasks(false)
      if (response.success) {
        setTasks(response.tasks)
      }
    } catch (error) {
      toast.error('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const response = await getTaskCategories()
      if (response.success) {
        setCategories(response.categories)
      }
    } catch (error) {
      console.error('Failed to load categories')
    }
  }

  const handleAddTask = async (e) => {
    e.preventDefault()
    
    try {
      const response = await createTask(newTask)
      if (response.success) {
        setTasks([response.task, ...tasks])
        setShowAddModal(false)
        setNewTask({
          title: '',
          description: '',
          category_id: 1,
          xp_reward: 10,
          coin_reward: 5
        })
        toast.success('Task created!')
      }
    } catch (error) {
      toast.error('Failed to create task')
    }
  }

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await completeTask(taskId)
      
      if (response.success) {
        // Update tasks list
        setTasks(tasks.map(task => 
          task.id === taskId ? { ...task, is_completed: 1 } : task
        ))

        // Update user data
        updateUserData(response.user)

        // Combo system
        const newCombo = comboCount + 1
        setComboCount(newCombo)
        if (newCombo > 1) {
          setShowCombo(true)
          setTimeout(() => setShowCombo(false), 2000)
        }

        // Mini confetti burst
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        })

        // Show animations
        setLumoAnimation('clap')
        setTimeout(() => setLumoAnimation('idle'), 2000)

        // Show confetti if leveled up
        if (response.leveled_up) {
          triggerLevelUpConfetti()
          setLumoAnimation('dance')
          setTimeout(() => setLumoAnimation('idle'), 4000)
          toast.success(`🎉 LEVEL UP! You're now Level ${response.new_level}!`, {
            duration: 5000,
            icon: '⭐',
            style: {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 'bold'
            }
          })
        } else {
          toast.success(`+${response.xp_earned} XP  💰 +${response.coins_earned} Coins!`, {
            icon: '✨',
            style: {
              background: '#10b981',
              color: '#fff'
            }
          })
        }

        if (response.streak_bonus > 0) {
          toast.success(`🔥 STREAK BONUS: +${response.streak_bonus} XP!`, {
            duration: 4000,
            style: {
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: '#fff'
            }
          })
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to complete task')
    }
  }

  const getCategoryColor = (color) => {
    const colorMap = {
      '#00C851': 'bg-success/20 text-success border-success',
      '#6C63FF': 'bg-primary/20 text-primary border-primary',
      '#FFD43B': 'bg-secondary/20 text-secondary border-secondary',
      '#A78BFA': 'bg-purple-200/50 text-purple-600 border-purple-400',
      '#FF3B30': 'bg-error/20 text-error border-error'
    }
    return colorMap[color] || 'bg-gray-200 text-gray-600 border-gray-400'
  }

  const filteredTasks = filter === 'all' 
    ? tasks 
    : filter === 'completed'
    ? tasks.filter(t => t.is_completed)
    : tasks.filter(t => !t.is_completed)

  const activeTasks = tasks.filter(t => !t.is_completed).length
  const completedToday = tasks.filter(t => t.is_completed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      <Navbar />
      
      {/* Combo Counter */}
      <AnimatePresence>
        {showCombo && comboCount > 1 && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-2xl shadow-2xl border-4 border-white">
              <div className="text-6xl font-black">{comboCount}x</div>
              <div className="text-xl font-bold">COMBO!</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Epic Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                ⚔️ Quest Board
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Complete quests to level up and earn epic rewards!
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <Plus size={20} />
              <span>New Quest</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Active Quests</p>
                  <p className="text-4xl font-black">{activeTasks}</p>
                </div>
                <Target className="w-12 h-12 opacity-80" />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium mb-1">Completed Today</p>
                  <p className="text-4xl font-black">{completedToday}</p>
                </div>
                <Trophy className="w-12 h-12 opacity-80" />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium mb-1">Combo Streak</p>
                  <p className="text-4xl font-black">{comboCount}x</p>
                </div>
                <Flame className="w-12 h-12 opacity-80" />
              </div>
            </motion.div>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 bg-white dark:bg-gray-800 rounded-xl p-2 shadow-md">
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 px-4 py-3 rounded-lg font-bold transition-all ${
                  filter === f
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tasks List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 animate-pulse shadow-lg">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : filteredTasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-16 text-center shadow-2xl"
          >
            <div className="text-8xl mb-6">🗺️</div>
            <h3 className="text-3xl font-black mb-3">No Quests Available</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              {filter === 'completed' ? 'Complete some quests to see them here!' : 'Start your adventure by creating your first quest!'}
            </p>
            {filter === 'all' && (
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-primary text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <Sparkles className="inline mr-2" size={24} />
                Create First Quest
              </button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task, index) => {
              const isCompleted = task.is_completed
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: isCompleted ? 1 : 1.03, y: isCompleted ? 0 : -5 }}
                  className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all overflow-hidden ${
                    isCompleted ? 'opacity-60' : ''
                  }`}
                >
                  {/* Gradient Border Effect */}
                  {!isCompleted && (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-2xl" />
                  )}

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 ${getCategoryColor(task.category_color)} shadow-sm`}>
                        {task.category_icon} {task.category_name}
                      </span>
                      {!isCompleted ? (
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleCompleteTask(task.id)}
                          className="p-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg hover:shadow-xl transition-all"
                        >
                          <Check size={20} strokeWidth={3} />
                        </motion.button>
                      ) : (
                        <div className="p-3 rounded-xl bg-gray-200 dark:bg-gray-700">
                          <Check size={20} className="text-green-500" strokeWidth={3} />
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-black mb-2 text-gray-800 dark:text-white">
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {task.description}
                      </p>
                    )}

                    {/* Rewards Section */}
                    <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 bg-purple-100 dark:bg-purple-900/30 px-3 py-1.5 rounded-lg">
                          <Star size={16} className="text-purple-600 dark:text-purple-400" fill="currentColor" />
                          <span className="text-sm font-black text-purple-600 dark:text-purple-400">
                            {task.xp_reward}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1.5 rounded-lg">
                          <span className="text-sm">💰</span>
                          <span className="text-sm font-black text-yellow-600 dark:text-yellow-400">
                            {task.coin_reward}
                          </span>
                        </div>
                      </div>
                      {task.streak_count > 0 && (
                        <div className="flex items-center space-x-1 bg-orange-100 dark:bg-orange-900/30 px-3 py-1.5 rounded-lg">
                          <Flame size={16} className="text-orange-600 dark:text-orange-400" fill="currentColor" />
                          <span className="text-sm font-black text-orange-600 dark:text-orange-400">
                            {task.streak_count}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Completion Overlay */}
                  {isCompleted && (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-500/10 backdrop-blur-[1px] rounded-2xl">
                      <div className="bg-green-500 text-white px-6 py-3 rounded-full font-black text-lg shadow-xl">
                        ✓ COMPLETED
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Create New Task</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Drink 8 glasses of water"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="input-field"
                    rows="3"
                    placeholder="Add more details..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={newTask.category_id}
                    onChange={(e) => setNewTask({ ...newTask, category_id: parseInt(e.target.value) })}
                    className="input-field"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">XP Reward</label>
                    <input
                      type="number"
                      value={newTask.xp_reward}
                      onChange={(e) => setNewTask({ ...newTask, xp_reward: parseInt(e.target.value) })}
                      className="input-field"
                      min="1"
                      max="50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Coin Reward</label>
                    <input
                      type="number"
                      value={newTask.coin_reward}
                      onChange={(e) => setNewTask({ ...newTask, coin_reward: parseInt(e.target.value) })}
                      className="input-field"
                      min="1"
                      max="25"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button type="submit" className="btn-primary flex-1">
                    Create Task
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <LumoAvatar animation={lumoAnimation} />
    </div>
  )
}

export default Tasks
