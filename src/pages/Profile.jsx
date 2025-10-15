import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Award, TrendingUp, Flame, Calendar, LogOut, Edit2, Save, Trophy, Zap, Target, Star, Share2, Copy } from 'lucide-react'
import Navbar from '../components/Navbar'
import LumoAvatar from '../components/LumoAvatar'
import PlayerAvatar from '../components/PlayerAvatar'
import { useAuth } from '../contexts/AuthContext'
import { updateUserProfile } from '../services/api'
import toast from 'react-hot-toast'

const Profile = () => {
  const { userData, currentUser, logout, updateUserData } = useAuth()
  const [editing, setEditing] = useState(false)
  const [displayName, setDisplayName] = useState(userData?.display_name || '')
  const [copied, setCopied] = useState(false)

  const handleSaveProfile = async () => {
    try {
      const response = await updateUserProfile({ display_name: displayName })
      if (response.success) {
        updateUserData(response.user)
        setEditing(false)
        toast.success('Profile updated!')
      }
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  const handleShareProfile = () => {
    const profileUrl = `${window.location.origin}/profile/${userData?.id}`
    navigator.clipboard.writeText(profileUrl)
    setCopied(true)
    toast.success('Profile link copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  const xpProgress = userData ? ((userData.xp % 100) / 100) * 100 : 0
  const xpToNextLevel = 100 - (userData?.xp % 100 || 0)
  const profileCompletion = calculateProfileCompletion()

  function calculateProfileCompletion() {
    let completion = 0
    if (userData?.display_name) completion += 25
    if (userData?.photo_url) completion += 25
    if (userData?.xp > 0) completion += 25
    if (userData?.current_streak > 0) completion += 25
    return completion
  }

  const stats = [
    {
      icon: Zap,
      label: 'Total XP',
      value: userData?.xp || 0,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      iconBg: 'bg-blue-500'
    },
    {
      icon: Award,
      label: 'Level',
      value: userData?.level || 1,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-500/20 to-orange-500/20',
      iconBg: 'bg-yellow-500'
    },
    {
      icon: Flame,
      label: 'Current Streak',
      value: `${userData?.current_streak || 0}`,
      suffix: ' days',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-500/20 to-red-500/20',
      iconBg: 'bg-orange-500'
    },
    {
      icon: Target,
      label: 'Coins',
      value: userData?.coins || 0,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/20 to-emerald-500/20',
      iconBg: 'bg-green-500'
    }
  ]

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 dark:bg-purple-400/30 rounded-full"
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Hero Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8 rounded-3xl overflow-hidden"
        >
          {/* Glassmorphism card */}
          <div className="relative backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border border-white/20 dark:border-gray-700/20 shadow-2xl p-8">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center space-y-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-1">
                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                      <PlayerAvatar level={userData?.level || 1} animation="idle" />
                    </div>
                  </div>
                  {/* Level badge */}
                  <motion.div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black text-sm shadow-lg"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Level {userData?.level || 1}
                  </motion.div>
                </motion.div>

                {/* Share button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShareProfile}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  {copied ? <Copy size={18} /> : <Share2 size={18} />}
                  <span>{copied ? 'Copied!' : 'Share Profile'}</span>
                </motion.button>
              </div>

              {/* User Info Section */}
              <div className="flex-1 text-center lg:text-left space-y-4">
                {editing ? (
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border border-purple-200 dark:border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 font-bold text-lg"
                      placeholder="Your name"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSaveProfile}
                      className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg"
                    >
                      <Save size={22} />
                    </motion.button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center lg:justify-start space-x-3">
                    <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                      {userData?.display_name || 'Champion'}
                    </h1>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setEditing(true)}
                      className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
                    >
                      <Edit2 size={20} className="text-purple-600 dark:text-purple-400" />
                    </motion.button>
                  </div>
                )}
                
                <p className="text-lg text-gray-600 dark:text-gray-300 italic">
                  "Keep leveling up, champion! 💪"
                </p>

                <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-600 dark:text-gray-400">
                  <Mail size={18} />
                  <span className="font-medium">{currentUser?.email}</span>
                </div>

                {/* Profile completion */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span className="text-gray-700 dark:text-gray-300">Profile Completion</span>
                    <span className="text-purple-600 dark:text-purple-400">{profileCompletion}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${profileCompletion}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Quick stats */}
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-300/30 dark:border-blue-700/30">
                    <div className="flex items-center space-x-2">
                      <Zap className="text-blue-600 dark:text-blue-400" size={20} />
                      <span className="font-black text-blue-600 dark:text-blue-400">{userData?.xp || 0} XP</span>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-300/30 dark:border-orange-700/30">
                    <div className="flex items-center space-x-2">
                      <Flame className="text-orange-600 dark:text-orange-400" size={20} />
                      <span className="font-black text-orange-600 dark:text-orange-400">{userData?.current_streak || 0} Day Streak</span>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-300/30 dark:border-green-700/30">
                    <div className="flex items-center space-x-2">
                      <Target className="text-green-600 dark:text-green-400" size={20} />
                      <span className="font-black text-green-600 dark:text-green-400">{userData?.coins || 0} Coins</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border border-white/20 dark:border-gray-700/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all overflow-hidden"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} pointer-events-none`} />
              
              {/* Glow effect */}
              <motion.div
                className={`absolute inset-0 rounded-3xl blur-xl bg-gradient-to-br ${stat.color} opacity-20`}
                animate={{
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">
                    {stat.label}
                  </p>
                  <p className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}{stat.suffix || ''}
                  </p>
                </div>
                <motion.div
                  className={`p-4 rounded-2xl ${stat.iconBg} bg-opacity-20 backdrop-blur-sm`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className={`w-10 h-10 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} strokeWidth={2.5} />
                </motion.div>
              </div>

              {/* Sparkle effect */}
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

        {/* Progress Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border border-white/20 dark:border-gray-700/20 rounded-3xl p-8 shadow-2xl mb-8 overflow-hidden"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Progress Details
            </h2>
          
          <div className="space-y-6">
            {/* XP Progress */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">XP to Next Level</span>
                <span className="text-text-secondary dark:text-text-dark">
                  {userData?.xp || 0} / {((Math.floor((userData?.xp || 0) / 100) + 1) * 100)}
                </span>
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${((userData?.xp || 0) % 100)}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>

            {/* Daily XP */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Daily XP Earned</span>
                <span className="text-text-secondary dark:text-text-dark">
                  {userData?.daily_xp_earned || 0} / {userData?.daily_xp_limit || 100}
                </span>
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-fill bg-gradient-to-r from-success to-green-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${((userData?.daily_xp_earned || 0) / (userData?.daily_xp_limit || 100)) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>

            {/* Account Info */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-text-secondary dark:text-text-dark text-sm mb-1">
                    Member Since
                  </p>
                  <p className="font-medium flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{formatDate(userData?.created_at)}</span>
                  </p>
                </div>
                <div>
                  <p className="text-text-secondary dark:text-text-dark text-sm mb-1">
                    Last Activity
                  </p>
                  <p className="font-medium flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{formatDate(userData?.last_activity_date)}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </motion.div>

        {/* Achievements Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border border-white/20 dark:border-gray-700/20 rounded-3xl p-8 shadow-2xl overflow-hidden"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Recent Achievements
            </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🎯', name: 'First Steps', unlocked: true },
              { icon: '⭐', name: 'Rising Star', unlocked: userData?.level >= 5 },
              { icon: '🔥', name: 'On Fire', unlocked: userData?.current_streak >= 5 },
              { icon: '💎', name: 'Collector', unlocked: false }
            ].map((achievement, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`relative p-6 rounded-2xl text-center backdrop-blur-sm border transition-all ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-300/30 dark:border-yellow-700/30 shadow-lg'
                    : 'bg-gray-100/50 dark:bg-gray-800/50 border-gray-300/30 dark:border-gray-700/30 opacity-50 grayscale'
                }`}
              >
                {!achievement.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl">🔒</div>
                  </div>
                )}
                <div className={`text-5xl mb-3 ${!achievement.unlocked ? 'blur-sm' : ''}`}>{achievement.icon}</div>
                <p className="text-sm font-bold text-gray-800 dark:text-white">{achievement.name}</p>
                {achievement.unlocked && (
                  <motion.div
                    className="absolute -top-1 -right-1 text-xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✨
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          </div>
        </motion.div>
      </div>

      <LumoAvatar animation="idle" />
    </div>
  )
}

export default Profile
