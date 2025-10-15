import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, Flame, Trophy, Target, Play, Clock, Gift, 
  Droplet, Dumbbell, Book, Coffee, Smile, Brain, Heart,
  CheckCircle2, Circle, Award
} from 'lucide-react'
import Navbar from '../components/Navbar'
import LumoAvatar from '../components/LumoAvatar'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'

const Quests = () => {
  const { userData, updateUserData } = useAuth()
  const [lumoAnimation, setLumoAnimation] = useState('idle')
  const [activeTab, setActiveTab] = useState('daily')
  const [questStreak, setQuestStreak] = useState(3)
  const [streakMultiplier, setStreakMultiplier] = useState(1.1)

  // Sample Quests with all requested features
  const [dailyQuests, setDailyQuests] = useState([
    {
      id: 1,
      title: '🏃 Morning Motivation',
      description: 'Complete your first daily habit',
      icon: <Smile className="w-6 h-6" />,
      xpReward: 25,
      progress: 0,
      maxProgress: 1,
      status: 'active',
      category: 'daily',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: '📚 Knowledge Boost',
      description: 'Read for 30 minutes',
      icon: <Book className="w-6 h-6" />,
      xpReward: 50,
      progress: 15,
      maxProgress: 30,
      status: 'in_progress',
      category: 'daily',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: '💧 Stay Hydrated',
      description: 'Drink 8 glasses of water',
      icon: <Droplet className="w-6 h-6" />,
      xpReward: 40,
      progress: 5,
      maxProgress: 8,
      status: 'in_progress',
      category: 'daily',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      id: 4,
      title: '💪 Fitness Time',
      description: 'Exercise for 20 minutes',
      icon: <Dumbbell className="w-6 h-6" />,
      xpReward: 60,
      progress: 0,
      maxProgress: 20,
      status: 'pending',
      category: 'daily',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      title: '🧘 Mind Reset',
      description: 'Meditate for 10 minutes',
      icon: <Brain className="w-6 h-6" />,
      xpReward: 30,
      progress: 0,
      maxProgress: 10,
      status: 'pending',
      category: 'daily',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ])

  const [weeklyQuests, setWeeklyQuests] = useState([
    {
      id: 6,
      title: '🎯 Weekly Warrior',
      description: 'Complete 20 daily tasks this week',
      icon: <Target className="w-6 h-6" />,
      xpReward: 200,
      progress: 12,
      maxProgress: 20,
      status: 'in_progress',
      category: 'weekly',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      id: 7,
      title: '🏆 Achievement Hunter',
      description: 'Unlock 3 new achievements',
      icon: <Trophy className="w-6 h-6" />,
      xpReward: 150,
      progress: 1,
      maxProgress: 3,
      status: 'in_progress',
      category: 'weekly',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 8,
      title: '❤️ Self-Care Champion',
      description: 'Complete all wellness quests for 5 days',
      icon: <Heart className="w-6 h-6" />,
      xpReward: 180,
      progress: 3,
      maxProgress: 5,
      status: 'in_progress',
      category: 'weekly',
      gradient: 'from-pink-500 to-rose-500'
    }
  ])

  const allQuests = activeTab === 'daily' ? dailyQuests : weeklyQuests
  const setAllQuests = activeTab === 'daily' ? setDailyQuests : setWeeklyQuests

  // Calculate stats
  const activeQuests = allQuests.filter(q => q.status === 'active' || q.status === 'in_progress').length
  const completedToday = allQuests.filter(q => q.status === 'completed').length
  const totalCompleted = dailyQuests.filter(q => q.status === 'completed').length + 
                         weeklyQuests.filter(q => q.status === 'completed').length

  const handleStartQuest = (questId) => {
    setAllQuests(prev => prev.map(q => 
      q.id === questId ? { ...q, status: 'in_progress' } : q
    ))
    
    setLumoAnimation('wave')
    setTimeout(() => setLumoAnimation('idle'), 2000)
    
    toast.success('Quest started! Good luck! 🎯', {
      icon: '🚀',
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff'
      }
    })
  }

  const handleClaimReward = (quest) => {
    const bonusXP = Math.floor(quest.xpReward * (streakMultiplier - 1))
    const totalXP = quest.xpReward + bonusXP

    // Mark as completed
    setAllQuests(prev => prev.map(q => 
      q.id === quest.id ? { ...q, status: 'completed' } : q
    ))

    // Confetti celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })

    // Lumo celebration
    setLumoAnimation('celebrate')
    setTimeout(() => setLumoAnimation('idle'), 3000)

    // Show reward toast
    toast.success(
      <div>
        <div className="font-bold text-lg mb-1">🎉 Quest Completed!</div>
        <div className="text-sm">⚡ +{quest.xpReward} XP</div>
        {bonusXP > 0 && (
          <div className="text-sm text-yellow-300">🔥 Streak Bonus: +{bonusXP} XP</div>
        )}
      </div>,
      {
        duration: 4000,
        style: {
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: '#fff'
        }
      }
    )

    // Update streak
    if (Math.random() > 0.5) {
      setQuestStreak(prev => prev + 1)
      setStreakMultiplier(prev => Math.min(prev + 0.05, 2.0))
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="flex items-center space-x-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-bold">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>🟢 Active</span>
          </span>
        )
      case 'in_progress':
        return (
          <span className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full text-xs font-bold">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
            <span>🟡 In Progress</span>
          </span>
        )
      case 'completed':
        return (
          <span className="flex items-center space-x-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold">
            <CheckCircle2 className="w-3 h-3" />
            <span>🔵 Completed</span>
          </span>
        )
      default:
        return (
          <span className="flex items-center space-x-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs font-bold">
            <Circle className="w-3 h-3" />
            <span>⚪ Pending</span>
          </span>
        )
    }
  }

  const getActionButton = (quest) => {
    if (quest.status === 'completed') {
      return (
        <button
          disabled
          className="w-full px-4 py-3 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl font-bold flex items-center justify-center space-x-2 cursor-not-allowed"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Completed</span>
        </button>
      )
    }

    if (quest.status === 'pending') {
      return (
        <button
          onClick={() => handleStartQuest(quest.id)}
          className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          <Play className="w-5 h-5" />
          <span>Start Quest</span>
        </button>
      )
    }

    if (quest.progress >= quest.maxProgress) {
      return (
        <button
          onClick={() => handleClaimReward(quest)}
          className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all animate-pulse"
        >
          <Gift className="w-5 h-5" />
          <span>Claim Reward</span>
        </button>
      )
    }

    return (
      <button
        disabled
        className="w-full px-4 py-3 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded-xl font-bold flex items-center justify-center space-x-2 cursor-not-allowed"
      >
        <Clock className="w-5 h-5" />
        <span>In Progress</span>
      </button>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Epic Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent flex items-center space-x-3">
            <Target className="w-12 h-12 text-purple-600" />
            <span>⚔️ Quest Board</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Complete epic quests to level up and earn amazing rewards!
          </p>
        </motion.div>

        {/* Stats Bar with Vibrant Gradients */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="relative bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Active Quests</p>
                  <p className="text-4xl font-black">{activeQuests}</p>
                </div>
                <Target className="w-12 h-12 opacity-80" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium mb-1">Completed Today</p>
                  <p className="text-4xl font-black">{totalCompleted}</p>
                </div>
                <Trophy className="w-12 h-12 opacity-80" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            className="relative bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-lg overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium mb-1">Quest Streak 🔥</p>
                  <p className="text-4xl font-black">{questStreak} Days</p>
                  <p className="text-xs text-orange-100 mt-1">+{Math.round((streakMultiplier - 1) * 100)}% XP Bonus</p>
                </div>
                <Flame className="w-12 h-12 opacity-80" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
          </motion.div>
        </div>

        {/* Quest Streak Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black mb-2 flex items-center space-x-2">
                <Flame className="w-6 h-6" />
                <span>{questStreak}-Day Streak</span>
              </h3>
              <p className="text-yellow-100 text-sm">
                Keep completing quests daily to increase your XP multiplier!
              </p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-black">
                +{Math.round((streakMultiplier - 1) * 100)}%
              </div>
              <div className="text-sm text-yellow-100">XP Bonus</div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 bg-white dark:bg-gray-800 rounded-xl p-2 shadow-md mb-6">
          <button
            onClick={() => setActiveTab('daily')}
            className={`flex-1 px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'daily'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Zap className="w-5 h-5" />
            <span>Daily Quests</span>
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`flex-1 px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'weekly'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Award className="w-5 h-5" />
            <span>Weekly Quests</span>
          </button>
        </div>

        {/* Quests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allQuests.map((quest, index) => {
            const progressPercent = (quest.progress / quest.maxProgress) * 100

            return (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all overflow-hidden group ${
                  quest.status === 'completed' ? 'opacity-75' : ''
                }`}
              >
                {/* Gradient Border Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${quest.gradient} opacity-0 group-hover:opacity-20 transition-opacity rounded-2xl`}></div>
                
                {/* Animated Background Particles */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute w-32 h-32 bg-purple-500/10 rounded-full -top-10 -right-10 group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute w-24 h-24 bg-pink-500/10 rounded-full -bottom-8 -left-8 group-hover:scale-150 transition-transform duration-700"></div>
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${quest.gradient} text-white shadow-lg`}>
                      {quest.icon}
                    </div>
                    {getStatusBadge(quest.status)}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-black mb-2 text-gray-800 dark:text-white">
                    {quest.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {quest.description}
                  </p>

                  {/* XP Reward with ⚡ symbol */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className={`flex items-center space-x-1 px-4 py-2 rounded-xl bg-gradient-to-r ${quest.gradient} text-white shadow-md`}>
                      <Zap className="w-4 h-4" fill="currentColor" />
                      <span className="font-black">+{quest.xpReward} XP</span>
                    </div>
                    {streakMultiplier > 1 && quest.status !== 'completed' && (
                      <div className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md text-xs font-bold">
                        <Flame className="w-3 h-3" />
                        <span>+{Math.round((streakMultiplier - 1) * 100)}%</span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {quest.status !== 'pending' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                        <span>Progress</span>
                        <span>{quest.progress} / {quest.maxProgress}</span>
                      </div>
                      <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${quest.gradient} rounded-full`}
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  {getActionButton(quest)}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <LumoAvatar animation={lumoAnimation} />
    </div>
  )
}

export default Quests
