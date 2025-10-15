import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Lock, Star, Flame, Target, Award, Crown, Zap } from 'lucide-react'
import Navbar from '../components/Navbar'
import LumoAvatar from '../components/LumoAvatar'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'

const Achievements = () => {
  const { userData } = useAuth()
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [lumoAnimation, setLumoAnimation] = useState('idle')

  // Mock achievements data (replace with API call)
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAchievements([
        {
          id: 1,
          name: 'First Steps',
          description: 'Complete your first task',
          icon: '🎯',
          requirement_type: 'tasks_completed',
          requirement_value: 1,
          reward_coins: 10,
          unlocked: true,
          progress: 1,
          rarity: 'common'
        },
        {
          id: 2,
          name: 'Getting Started',
          description: 'Reach Level 2',
          icon: '⭐',
          requirement_type: 'level',
          requirement_value: 2,
          reward_coins: 20,
          unlocked: userData?.level >= 2,
          progress: userData?.level || 1,
          rarity: 'common'
        },
        {
          id: 3,
          name: 'Dedicated',
          description: 'Maintain a 5-day streak',
          icon: '🔥',
          requirement_type: 'streak',
          requirement_value: 5,
          reward_coins: 50,
          unlocked: (userData?.current_streak || 0) >= 5,
          progress: userData?.current_streak || 0,
          rarity: 'rare'
        },
        {
          id: 4,
          name: 'Committed',
          description: 'Maintain a 10-day streak',
          icon: '🔥',
          requirement_type: 'streak',
          requirement_value: 10,
          reward_coins: 100,
          unlocked: (userData?.current_streak || 0) >= 10,
          progress: userData?.current_streak || 0,
          rarity: 'rare'
        },
        {
          id: 5,
          name: 'Unstoppable',
          description: 'Maintain a 30-day streak',
          icon: '🔥',
          requirement_type: 'streak',
          requirement_value: 30,
          reward_coins: 300,
          unlocked: (userData?.longest_streak || 0) >= 30,
          progress: userData?.longest_streak || 0,
          rarity: 'legendary'
        },
        {
          id: 6,
          name: 'Rising Star',
          description: 'Reach Level 5',
          icon: '⭐',
          requirement_type: 'level',
          requirement_value: 5,
          reward_coins: 100,
          unlocked: (userData?.level || 1) >= 5,
          progress: userData?.level || 1,
          rarity: 'rare'
        },
        {
          id: 7,
          name: 'Expert',
          description: 'Reach Level 10',
          icon: '⭐',
          requirement_type: 'level',
          requirement_value: 10,
          reward_coins: 250,
          unlocked: (userData?.level || 1) >= 10,
          progress: userData?.level || 1,
          rarity: 'epic'
        },
        {
          id: 8,
          name: 'Master',
          description: 'Reach Level 20',
          icon: '⭐',
          requirement_type: 'level',
          requirement_value: 20,
          reward_coins: 500,
          unlocked: (userData?.level || 1) >= 20,
          progress: userData?.level || 1,
          rarity: 'legendary'
        },
        {
          id: 9,
          name: 'Task Warrior',
          description: 'Complete 50 tasks',
          icon: '⚔️',
          requirement_type: 'tasks_completed',
          requirement_value: 50,
          reward_coins: 150,
          unlocked: false,
          progress: 12,
          rarity: 'epic'
        },
        {
          id: 10,
          name: 'Task Legend',
          description: 'Complete 100 tasks',
          icon: '⚔️',
          requirement_type: 'tasks_completed',
          requirement_value: 100,
          reward_coins: 300,
          unlocked: false,
          progress: 12,
          rarity: 'legendary'
        }
      ])
      setLoading(false)
    }, 500)
  }, [userData])

  const getRarityColor = (rarity) => {
    const colors = {
      common: 'from-gray-400 to-gray-500',
      rare: 'from-blue-400 to-blue-600',
      epic: 'from-purple-400 to-purple-600',
      legendary: 'from-yellow-400 to-orange-500'
    }
    return colors[rarity] || colors.common
  }

  const getRarityBorder = (rarity) => {
    const borders = {
      common: 'border-gray-400',
      rare: 'border-blue-500',
      epic: 'border-purple-500',
      legendary: 'border-yellow-500'
    }
    return borders[rarity] || borders.common
  }

  const getRarityGlow = (rarity) => {
    const glows = {
      common: 'shadow-gray-400/50',
      rare: 'shadow-blue-500/50',
      epic: 'shadow-purple-500/50',
      legendary: 'shadow-yellow-500/50'
    }
    return glows[rarity] || glows.common
  }

  const filteredAchievements = filter === 'all'
    ? achievements
    : filter === 'unlocked'
    ? achievements.filter(a => a.unlocked)
    : achievements.filter(a => !a.unlocked)

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalCoinsEarned = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.reward_coins, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-indigo-900 dark:to-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            🏆 Hall of Achievements
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Unlock legendary achievements and prove your worth!
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium mb-1">Achievements Unlocked</p>
                <p className="text-4xl font-black">{unlockedCount} / {achievements.length}</p>
              </div>
              <Trophy className="w-16 h-16 opacity-80" />
            </div>
            <div className="mt-4 bg-white/20 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Total Coins Earned</p>
                <p className="text-4xl font-black">{totalCoinsEarned}</p>
              </div>
              <Award className="w-16 h-16 opacity-80" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm font-medium mb-1">Completion Rate</p>
                <p className="text-4xl font-black">{Math.round((unlockedCount / achievements.length) * 100)}%</p>
              </div>
              <Crown className="w-16 h-16 opacity-80" />
            </div>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 bg-white dark:bg-gray-800 rounded-xl p-2 shadow-md mb-8">
          {['all', 'unlocked', 'locked'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 px-4 py-3 rounded-lg font-bold transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 animate-pulse shadow-lg">
                <div className="h-20 w-20 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement, index) => {
              const progressPercent = Math.min((achievement.progress / achievement.requirement_value) * 100, 100)
              
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: achievement.unlocked ? 1.05 : 1.02, y: -5 }}
                  className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all overflow-hidden border-2 ${
                    achievement.unlocked 
                      ? `${getRarityBorder(achievement.rarity)} shadow-xl ${getRarityGlow(achievement.rarity)}`
                      : 'border-gray-200 dark:border-gray-700 opacity-75'
                  }`}
                >
                  {/* Rarity Glow Effect */}
                  {achievement.unlocked && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(achievement.rarity)} opacity-10 rounded-2xl`} />
                  )}

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div className={`relative w-24 h-24 rounded-full flex items-center justify-center text-5xl ${
                        achievement.unlocked
                          ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)} shadow-lg`
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}>
                        {achievement.unlocked ? (
                          <span>{achievement.icon}</span>
                        ) : (
                          <Lock className="text-gray-400" size={32} />
                        )}
                      </div>
                    </div>

                    {/* Rarity Badge */}
                    <div className="flex justify-center mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white shadow-md`}>
                        {achievement.rarity}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-black text-center mb-2 text-gray-800 dark:text-white">
                      {achievement.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-4">
                      {achievement.description}
                    </p>

                    {/* Progress Bar */}
                    {!achievement.unlocked && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress} / {achievement.requirement_value}</span>
                        </div>
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 1, delay: index * 0.05 }}
                            className={`h-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} rounded-full`}
                          />
                        </div>
                      </div>
                    )}

                    {/* Reward */}
                    <div className={`flex items-center justify-center space-x-2 pt-4 border-t-2 ${
                      achievement.unlocked ? 'border-gray-200 dark:border-gray-700' : 'border-gray-100 dark:border-gray-800'
                    }`}>
                      <span className="text-2xl">💰</span>
                      <span className="text-lg font-black text-yellow-600 dark:text-yellow-400">
                        {achievement.reward_coins} Coins
                      </span>
                    </div>

                    {/* Unlocked Badge */}
                    {achievement.unlocked && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-green-500 text-white p-2 rounded-full shadow-lg">
                          <Star size={20} fill="currentColor" />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      <LumoAvatar animation={lumoAnimation} />
    </div>
  )
}

export default Achievements
