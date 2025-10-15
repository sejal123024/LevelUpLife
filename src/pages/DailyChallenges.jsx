import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Clock, Trophy, Star, Flame, CheckCircle, Circle, Droplet, Dumbbell, Book, Coffee, Smile, Send, MessageCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import LumoAvatar from '../components/LumoAvatar'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'

const DailyChallenges = () => {
  const { userData } = useAuth()
  const [challenges, setChallenges] = useState([])
  const [loading, setLoading] = useState(true)
  const [lumoAnimation, setLumoAnimation] = useState('idle')
  const [timeRemaining, setTimeRemaining] = useState('')
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [experienceRating, setExperienceRating] = useState(0)

  // Interactive Game-like Challenges
  useEffect(() => {
    setTimeout(() => {
      setChallenges([
        {
          id: 1,
          title: 'Hydration Hero',
          description: 'Drink 8 glasses of water today',
          icon: <Droplet className="w-8 h-8" />,
          emoji: '💧',
          difficulty: 'easy',
          xp_reward: 30,
          coin_reward: 15,
          bonus_multiplier: 1.2,
          progress: 3,
          requirement: 8,
          is_completed: false,
          category: 'health',
          interactive: true,
          tips: 'Track each glass you drink throughout the day!'
        },
        {
          id: 2,
          title: 'Fitness Champion',
          description: 'Complete 30 minutes of exercise',
          icon: <Dumbbell className="w-8 h-8" />,
          emoji: '💪',
          difficulty: 'medium',
          xp_reward: 50,
          coin_reward: 25,
          bonus_multiplier: 1.5,
          progress: 15,
          requirement: 30,
          is_completed: false,
          category: 'fitness',
          interactive: true,
          tips: 'Any physical activity counts - walking, yoga, gym!'
        },
        {
          id: 3,
          title: 'Reading Master',
          description: 'Read for 20 minutes',
          icon: <Book className="w-8 h-8" />,
          emoji: '📚',
          difficulty: 'easy',
          xp_reward: 25,
          coin_reward: 12,
          bonus_multiplier: 1.2,
          progress: 5,
          requirement: 20,
          is_completed: false,
          category: 'learning',
          interactive: true,
          tips: 'Books, articles, or educational content all count!'
        },
        {
          id: 4,
          title: 'Mindful Moment',
          description: 'Practice 10 minutes of meditation',
          icon: <Smile className="w-8 h-8" />,
          emoji: '🧘',
          difficulty: 'easy',
          xp_reward: 30,
          coin_reward: 15,
          bonus_multiplier: 1.3,
          progress: 0,
          requirement: 10,
          is_completed: false,
          category: 'wellness',
          interactive: true,
          tips: 'Find a quiet space and focus on your breathing'
        },
        {
          id: 5,
          title: 'Early Bird',
          description: 'Wake up before 7 AM',
          icon: <Coffee className="w-8 h-8" />,
          emoji: '🌅',
          difficulty: 'medium',
          xp_reward: 40,
          coin_reward: 20,
          bonus_multiplier: 1.4,
          progress: 0,
          requirement: 1,
          is_completed: false,
          category: 'lifestyle',
          interactive: true,
          tips: 'Set your alarm and start your day fresh!'
        },
        {
          id: 6,
          title: 'Streak Keeper',
          description: 'Maintain your daily streak',
          icon: <Flame className="w-8 h-8" />,
          emoji: '🔥',
          difficulty: 'easy',
          xp_reward: 20,
          coin_reward: 10,
          bonus_multiplier: 1.1,
          progress: userData?.current_streak > 0 ? 1 : 0,
          requirement: 1,
          is_completed: userData?.current_streak > 0,
          category: 'consistency',
          interactive: false,
          tips: 'Complete at least one task daily!'
        }
      ])
      setLoading(false)
    }, 500)

    // Update countdown timer
    const updateTimer = () => {
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setHours(24, 0, 0, 0)
      const diff = tomorrow - now
      
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [userData])

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'from-green-400 to-emerald-500',
      medium: 'from-yellow-400 to-orange-500',
      hard: 'from-red-400 to-pink-500'
    }
    return colors[difficulty] || colors.easy
  }

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    }
    return badges[difficulty] || badges.easy
  }

  const handleCompleteChallenge = (challenge) => {
    if (challenge.interactive && !challenge.is_completed) {
      setSelectedChallenge(challenge)
      setShowFeedbackModal(true)
    }
  }

  const submitFeedback = () => {
    if (!feedback.trim() || experienceRating === 0) {
      toast.error('Please rate your experience and share your thoughts!')
      return
    }

    // Update challenge as completed
    setChallenges(challenges.map(c => 
      c.id === selectedChallenge.id 
        ? { ...c, is_completed: true, progress: c.requirement }
        : c
    ))

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })

    // Show success toast
    toast.success(
      <div>
        <p className="font-bold">Challenge Completed! 🎉</p>
        <p className="text-sm">+{selectedChallenge.xp_reward} XP | +{selectedChallenge.coin_reward} Coins</p>
      </div>,
      { duration: 4000 }
    )

    // Reset and close modal
    setShowFeedbackModal(false)
    setFeedback('')
    setExperienceRating(0)
    setSelectedChallenge(null)
    setLumoAnimation('celebrate')
    setTimeout(() => setLumoAnimation('idle'), 2000)
  }

  const completedCount = challenges.filter(c => c.is_completed).length
  const totalXP = challenges.filter(c => c.is_completed).reduce((sum, c) => sum + c.xp_reward, 0)
  const totalCoins = challenges.filter(c => c.is_completed).reduce((sum, c) => sum + c.coin_reward, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-900 dark:to-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                ⚡ Daily Challenges
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Complete daily challenges for bonus rewards!
              </p>
            </div>
            
            {/* Countdown Timer */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-6 text-white shadow-xl"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">Resets in</span>
              </div>
              <div className="text-3xl font-black">{timeRemaining}</div>
            </motion.div>
          </div>

          {/* Progress Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Completed</p>
                  <p className="text-4xl font-black">{completedCount} / {challenges.length}</p>
                </div>
                <CheckCircle className="w-12 h-12 opacity-80" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium mb-1">Bonus XP Earned</p>
                  <p className="text-4xl font-black">{totalXP}</p>
                </div>
                <Star className="w-12 h-12 opacity-80" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium mb-1">Bonus Coins Earned</p>
                  <p className="text-4xl font-black">{totalCoins}</p>
                </div>
                <Trophy className="w-12 h-12 opacity-80" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Challenges List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 animate-pulse shadow-lg">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map((challenge, index) => {
              const progressPercent = Math.min((challenge.progress / challenge.requirement) * 100, 100)
              
              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: challenge.is_completed ? 1 : 1.02, y: challenge.is_completed ? 0 : -5 }}
                  className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all overflow-hidden ${
                    challenge.is_completed ? 'opacity-75' : ''
                  }`}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getDifficultyColor(challenge.difficulty)} opacity-5 rounded-2xl`} />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getDifficultyColor(challenge.difficulty)} flex items-center justify-center text-2xl shadow-lg`}>
                          {challenge.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-gray-800 dark:text-white">
                            {challenge.title}
                          </h3>
                          <span className={`inline-block px-2 py-1 rounded-lg text-xs font-bold uppercase ${getDifficultyBadge(challenge.difficulty)}`}>
                            {challenge.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      {challenge.is_completed && (
                        <div className="bg-green-500 text-white p-2 rounded-full shadow-lg">
                          <CheckCircle size={24} fill="currentColor" />
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {challenge.description}
                    </p>

                    {/* Progress Bar */}
                    {!challenge.is_completed && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <span className="font-medium">Progress</span>
                          <span className="font-bold">{challenge.progress} / {challenge.requirement}</span>
                        </div>
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className={`h-full bg-gradient-to-r ${getDifficultyColor(challenge.difficulty)} rounded-full shadow-lg`}
                          />
                        </div>
                      </div>
                    )}

                    {/* Tips */}
                    {challenge.tips && !challenge.is_completed && (
                      <div className="mb-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-3 rounded">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          💡 <strong>Tip:</strong> {challenge.tips}
                        </p>
                      </div>
                    )}

                    {/* Rewards */}
                    <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100 dark:border-gray-700">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 bg-purple-100 dark:bg-purple-900/30 px-3 py-2 rounded-lg">
                          <Star size={18} className="text-purple-600 dark:text-purple-400" fill="currentColor" />
                          <span className="text-sm font-black text-purple-600 dark:text-purple-400">
                            +{challenge.xp_reward} XP
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-2 rounded-lg">
                          <span className="text-sm">💰</span>
                          <span className="text-sm font-black text-yellow-600 dark:text-yellow-400">
                            +{challenge.coin_reward}
                          </span>
                        </div>
                      </div>
                      
                      {/* Multiplier Badge */}
                      <div className="flex items-center space-x-1 bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-2 rounded-lg shadow-md">
                        <Zap size={16} fill="currentColor" />
                        <span className="text-sm font-black">{challenge.bonus_multiplier}x</span>
                      </div>
                    </div>

                    {/* Complete Button */}
                    {challenge.interactive && !challenge.is_completed && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCompleteChallenge(challenge)}
                        className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                      >
                        <MessageCircle size={20} />
                        <span>Complete & Share Experience</span>
                      </motion.button>
                    )}
                  </div>

                  {/* Completion Overlay */}
                  {challenge.is_completed && (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-500/10 backdrop-blur-[1px] rounded-2xl">
                      <div className="bg-green-500 text-white px-8 py-3 rounded-full font-black text-xl shadow-xl">
                        ✓ COMPLETED
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <Flame size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black mb-1">Daily Challenge Streak</h3>
              <p className="text-cyan-100">
                Complete all challenges for 7 days in a row to unlock a legendary reward!
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Feedback Modal */}
      <AnimatePresence>
        {showFeedbackModal && selectedChallenge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowFeedbackModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getDifficultyColor(selectedChallenge.difficulty)} flex items-center justify-center shadow-lg`}>
                  {selectedChallenge.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-800 dark:text-white">
                    {selectedChallenge.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Share your experience to complete!
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="block text-lg font-bold text-gray-800 dark:text-white mb-3">
                  How was your experience? ⭐
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <motion.button
                      key={rating}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setExperienceRating(rating)}
                      className={`w-14 h-14 rounded-xl font-black text-2xl transition-all ${
                        experienceRating >= rating
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                      }`}
                    >
                      {rating}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Feedback Text */}
              <div className="mb-6">
                <label className="block text-lg font-bold text-gray-800 dark:text-white mb-3">
                  Tell us about your experience 💬
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="How did you complete this challenge? What did you learn? Share your thoughts..."
                  className="w-full h-32 px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                  maxLength={500}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {feedback.length}/500 characters
                </p>
              </div>

              {/* Info Box */}
              <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>🛡️ Anti-Fake Data Protection:</strong> Your feedback helps us verify genuine completions and improve the experience for everyone!
                </p>
              </div>

              {/* Rewards Preview */}
              <div className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-4">
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  You'll earn:
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Star size={20} className="text-purple-600" fill="currentColor" />
                    <span className="font-black text-purple-600">+{selectedChallenge.xp_reward} XP</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">💰</span>
                    <span className="font-black text-yellow-600">+{selectedChallenge.coin_reward} Coins</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap size={20} className="text-orange-600" fill="currentColor" />
                    <span className="font-black text-orange-600">{selectedChallenge.bonus_multiplier}x Bonus</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowFeedbackModal(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={submitFeedback}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>Submit & Complete</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <LumoAvatar animation={lumoAnimation} />
    </div>
  )
}

export default DailyChallenges
