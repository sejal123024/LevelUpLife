import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Award, Flame, Target, Zap, Trophy, Star, ArrowRight, Sword, Gift, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import LumoAvatar from '../components/LumoAvatar'
import PlayerAvatar from '../components/PlayerAvatar'
import OnboardingTour from '../components/OnboardingTour'
import HelpButton from '../components/HelpButton'
import { useAuth } from '../contexts/AuthContext'
import { getRandomQuote } from '../services/api'
import confetti from 'canvas-confetti'

const Dashboard = () => {
  const { userData } = useAuth()
  const [quote, setQuote] = useState(null)
  const [lumoAnimation, setLumoAnimation] = useState('wave')
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    // Fetch random quote
    const fetchQuote = async () => {
      try {
        const response = await getRandomQuote()
        if (response && response.success && response.quote) {
          setQuote(response.quote)
        } else {
          // Fallback quote if API fails
          setQuote({
            quote: 'The secret of getting ahead is getting started.',
            author: 'Mark Twain'
          })
        }
      } catch (error) {
        console.error('Error fetching quote:', error)
        // Fallback quote
        setQuote({
          quote: 'Success is the sum of small efforts repeated day in and day out.',
          author: 'Robert Collier'
        })
      }
    }
    
    fetchQuote()

    // Check if this is user's first time
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding')
    if (!hasCompletedOnboarding && userData) {
      // Small delay to let dashboard load first
      setTimeout(() => setShowOnboarding(true), 1000)
    }

    // Wave animation on load
    setTimeout(() => setLumoAnimation('idle'), 3000)
  }, [userData])

  const xpProgress = userData ? ((userData.xp % 100) / 100) * 100 : 0
  const xpToNextLevel = 100 - (userData?.xp % 100 || 0)

  const stats = [
    {
      icon: Zap,
      label: 'Total XP',
      value: userData?.xp || 0,
      color: 'from-blue-500 via-purple-500 to-indigo-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      glowColor: 'rgba(139, 92, 246, 0.3)'
    },
    {
      icon: Award,
      label: 'Level',
      value: userData?.level || 1,
      color: 'from-yellow-400 via-orange-400 to-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      glowColor: 'rgba(251, 191, 36, 0.3)'
    },
    {
      icon: Flame,
      label: 'Current Streak',
      value: `${userData?.current_streak || 0} days`,
      color: 'from-orange-500 via-red-500 to-pink-600',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
      iconColor: 'text-red-600 dark:text-red-400',
      glowColor: 'rgba(239, 68, 68, 0.3)'
    },
    {
      icon: Target,
      label: 'Coins',
      value: userData?.coins || 0,
      color: 'from-emerald-400 via-green-500 to-teal-600',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400',
      glowColor: 'rgba(16, 185, 129, 0.3)'
    }
  ]

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 relative overflow-hidden">
      {/* Onboarding Tour */}
      {showOnboarding && (
        <OnboardingTour onComplete={() => setShowOnboarding(false)} />
      )}

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            {getGreeting()}, {userData?.display_name || 'Champion'}! 👋
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Ready to conquer your goals and level up today?
          </p>
        </motion.div>

        {/* Stats Grid with Enhanced Design */}
        <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`relative ${stat.bgColor} rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all overflow-hidden`}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl blur-xl"
                style={{ backgroundColor: stat.glowColor }}
                animate={{
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">
                    {stat.label}
                  </p>
                  <p className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                </div>
                <motion.div
                  className={`p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className={`w-10 h-10 ${stat.iconColor}`} strokeWidth={2.5} />
                </motion.div>
              </div>

              {/* Decorative corner sparkle */}
              <motion.div
                className="absolute top-2 right-2 text-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              >
                ✨
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="level-progress lg:col-span-3 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Level Progress
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Your journey to greatness
                </p>
              </div>
              {/* Player Avatar */}
              <div className="flex-shrink-0">
                <PlayerAvatar level={userData?.level || 1} />
              </div>
            </div>

            <div className="space-y-6">
              {/* XP Progress Bar */}
              <div className="relative">
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Level {userData?.level || 1}
                  </span>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Level {(userData?.level || 1) + 1}
                  </span>
                </div>
                <div className="relative h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"
                    initial={{ width: 0 }}
                    animate={{ width: `${xpProgress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ['-100%', '200%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </motion.div>
                  {/* XP Text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-black text-white drop-shadow-lg">
                      {userData?.xp || 0} / {((userData?.level || 1) * 100)} XP
                    </span>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <strong>{xpToNextLevel} XP</strong> until next level!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4 border-2 border-purple-200 dark:border-purple-800"
                >
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">
                    Daily XP Earned
                  </p>
                  <p className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {userData?.daily_xp_earned || 0} / {userData?.daily_xp_limit || 100}
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-4 border-2 border-orange-200 dark:border-orange-800"
                >
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">
                    Longest Streak
                  </p>
                  <p className="text-3xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    {userData?.longest_streak || 0} 🔥
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Sidebar - Daily Inspiration & Quick Actions */}
          <div className="space-y-6">
            {/* Motivational Quote - Smaller */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 rounded-2xl p-5 shadow-xl text-white"
            >
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">💡</span>
                <h2 className="text-lg font-black">Daily Inspiration</h2>
              </div>
              {quote ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium leading-relaxed line-clamp-3">
                    "{quote.quote}"
                  </p>
                  <p className="text-orange-100 font-bold text-xs">
                    — {quote.author}
                  </p>
                </div>
              ) : (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-white/30 rounded w-full"></div>
                  <div className="h-4 bg-white/30 rounded w-5/6"></div>
                  <div className="h-4 bg-white/30 rounded w-4/6"></div>
                </div>
              )}
            </motion.div>

            {/* Quick Actions Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-xl"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h2 className="text-lg font-black text-gray-800 dark:text-white">Quick Actions</h2>
              </div>
              <div className="space-y-3">
                <Link
                  to="/quests"
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 rounded-xl transition-all group"
                >
                  <div className="flex items-center space-x-2">
                    <Sword className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">View Quests</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/challenges"
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 rounded-xl transition-all group"
                >
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Challenges</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/rewards-store"
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 rounded-xl transition-all group"
                >
                  <div className="flex items-center space-x-2">
                    <Gift className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Rewards Store</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-green-600 dark:text-green-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quest Board Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Sword className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <div>
              <h2 className="text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Quest Board
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Complete quests to level up and earn epic rewards!
              </p>
            </div>
          </div>

          {/* Quest Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-bold uppercase tracking-wider mb-1">
                    🎯 Active Quests
                  </p>
                  <p className="text-4xl font-black">5</p>
                </div>
                <Target className="w-12 h-12 opacity-50" />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-bold uppercase tracking-wider mb-1">
                    🏆 Completed Today
                  </p>
                  <p className="text-4xl font-black">3</p>
                </div>
                <Trophy className="w-12 h-12 opacity-50" />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-bold uppercase tracking-wider mb-1">
                    🔥 Combo Streak
                  </p>
                  <p className="text-4xl font-black">7x</p>
                </div>
                <Flame className="w-12 h-12 opacity-50" />
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/quests">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden"
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <Sword className="w-10 h-10" />
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black mb-1">Quest Board</h3>
                  <p className="text-blue-100 text-sm">Complete epic quests</p>
                </div>
              </motion.div>
            </Link>

            <Link to="/challenges">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <Zap className="w-10 h-10" />
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black mb-1">Daily Challenges</h3>
                  <p className="text-purple-100 text-sm">Complete bonus challenges</p>
                </div>
              </motion.div>
            </Link>

            <Link to="/achievements">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <Trophy className="w-10 h-10" />
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black mb-1">Achievements</h3>
                  <p className="text-yellow-100 text-sm">Unlock epic badges</p>
                </div>
              </motion.div>
            </Link>

            <Link to="/rewards-store">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <Gift className="w-10 h-10" />
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black mb-1">Rewards Store</h3>
                  <p className="text-green-100 text-sm">Unlock amazing rewards</p>
                </div>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Rewards Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Gift className="w-8 h-8 text-pink-600 dark:text-pink-400" />
              <div>
                <h2 className="text-4xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Unlockable Rewards
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Reach milestones to unlock exclusive rewards
                </p>
              </div>
            </div>
            <Link to="/rewards">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                View All →
              </motion.button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Reward Card 1 - Unlocked */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-4 border-2 border-yellow-300 dark:border-yellow-700 shadow-lg relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative z-10">
                <div className="text-5xl mb-3 text-center">🥉</div>
                <h3 className="font-black text-center text-gray-800 dark:text-white mb-1">
                  Bronze Badge
                </h3>
                <p className="text-xs text-center text-gray-600 dark:text-gray-400 mb-2">
                  500 XP
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-2 rounded-lg text-sm"
                >
                  ✓ Unlocked
                </motion.button>
              </div>
            </motion.div>

            {/* Reward Card 2 - Locked */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-4 border-2 border-gray-300 dark:border-gray-600 shadow-lg relative"
            >
              <div className="opacity-50">
                <div className="text-5xl mb-3 text-center filter grayscale">🥈</div>
                <h3 className="font-black text-center text-gray-800 dark:text-white mb-1">
                  Silver Badge
                </h3>
                <p className="text-xs text-center text-gray-600 dark:text-gray-400 mb-2">
                  1,000 XP
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-8 h-8 text-gray-400" />
              </div>
              <button className="w-full bg-gray-400 text-white font-bold py-2 rounded-lg text-sm cursor-not-allowed">
                🔒 Locked
              </button>
            </motion.div>

            {/* Reward Card 3 - Locked */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-4 border-2 border-gray-300 dark:border-gray-600 shadow-lg relative"
            >
              <div className="opacity-50">
                <div className="text-5xl mb-3 text-center filter grayscale">🥇</div>
                <h3 className="font-black text-center text-gray-800 dark:text-white mb-1">
                  Gold Badge
                </h3>
                <p className="text-xs text-center text-gray-600 dark:text-gray-400 mb-2">
                  2,000 XP
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-8 h-8 text-gray-400" />
              </div>
              <button className="w-full bg-gray-400 text-white font-bold py-2 rounded-lg text-sm cursor-not-allowed">
                🔒 Locked
              </button>
            </motion.div>

            {/* Reward Card 4 - Locked */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-4 border-2 border-gray-300 dark:border-gray-600 shadow-lg relative"
            >
              <div className="opacity-50">
                <div className="text-5xl mb-3 text-center filter grayscale">👕</div>
                <h3 className="font-black text-center text-gray-800 dark:text-white mb-1">
                  Custom Outfit
                </h3>
                <p className="text-xs text-center text-gray-600 dark:text-gray-400 mb-2">
                  5,000 XP
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-8 h-8 text-gray-400" />
              </div>
              <button className="w-full bg-gray-400 text-white font-bold py-2 rounded-lg text-sm cursor-not-allowed">
                🔒 Locked
              </button>
            </motion.div>

            {/* Reward Card 5 - Locked */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-4 border-2 border-gray-300 dark:border-gray-600 shadow-lg relative"
            >
              <div className="opacity-50">
                <div className="text-5xl mb-3 text-center filter grayscale">🌌</div>
                <h3 className="font-black text-center text-gray-800 dark:text-white mb-1">
                  Animated BG
                </h3>
                <p className="text-xs text-center text-gray-600 dark:text-gray-400 mb-2">
                  10,000 XP
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-8 h-8 text-gray-400" />
              </div>
              <button className="w-full bg-gray-400 text-white font-bold py-2 rounded-lg text-sm cursor-not-allowed">
                🔒 Locked
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <HelpButton onStartTour={() => setShowOnboarding(true)} />
      <LumoAvatar animation={lumoAnimation} />
    </div>
  )
}

export default Dashboard
