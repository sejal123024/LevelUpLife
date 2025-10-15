import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Lock, Check, Award, User, Palette, 
  Ticket, Gift, Sparkles, Zap, Star, Share2
} from 'lucide-react'
import Navbar from '../components/Navbar'
import LumoAvatar from '../components/LumoAvatar'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'

const RewardsStore = () => {
  const { userData } = useAuth()
  const [activeCategory, setActiveCategory] = useState('badge')
  const [lumoAnimation, setLumoAnimation] = useState('idle')
  const [unlockedRewards, setUnlockedRewards] = useState([1]) // Mock: first badge unlocked

  // Sample Rewards Data with all 5 categories
  const allRewards = {
    badge: [
      {
        id: 1,
        name: 'Bronze Achiever',
        description: 'Your first step into greatness',
        xpRequired: 500,
        icon: '🥉',
        gradient: 'from-amber-600 to-amber-800',
        unlocked: true
      },
      {
        id: 2,
        name: 'Silver Seeker',
        description: 'Rising through the ranks',
        xpRequired: 1000,
        icon: '🥈',
        gradient: 'from-gray-400 to-gray-600',
        unlocked: false
      },
      {
        id: 3,
        name: 'Golden Hero',
        description: 'A true champion emerges',
        xpRequired: 2500,
        icon: '🥇',
        gradient: 'from-yellow-400 to-yellow-600',
        unlocked: false
      },
      {
        id: 4,
        name: 'Diamond Legend',
        description: 'Legendary status achieved',
        xpRequired: 5000,
        icon: '💎',
        gradient: 'from-cyan-400 to-blue-600',
        unlocked: false
      }
    ],
    avatar: [
      {
        id: 5,
        name: 'Explorer Outfit',
        description: 'Gear up for adventure',
        levelRequired: 5,
        icon: '🧭',
        gradient: 'from-green-500 to-emerald-600',
        unlocked: false
      },
      {
        id: 6,
        name: 'Warrior Outfit',
        description: 'Battle-ready armor',
        levelRequired: 10,
        icon: '⚔️',
        gradient: 'from-red-500 to-orange-600',
        unlocked: false
      },
      {
        id: 7,
        name: 'Mystic Outfit',
        description: 'Channel ancient powers',
        levelRequired: 15,
        icon: '🔮',
        gradient: 'from-purple-500 to-pink-600',
        unlocked: false
      }
    ],
    theme: [
      {
        id: 8,
        name: 'Sunrise Glow',
        description: 'Warm pink-orange gradient',
        xpRequired: 800,
        icon: '🌅',
        gradient: 'from-pink-400 via-orange-400 to-yellow-400',
        colors: ['#f472b6', '#fb923c', '#fbbf24'],
        unlocked: false
      },
      {
        id: 9,
        name: 'Ocean Calm',
        description: 'Soothing blue-green gradient',
        xpRequired: 1200,
        icon: '🌊',
        gradient: 'from-blue-400 via-cyan-400 to-teal-400',
        colors: ['#60a5fa', '#22d3ee', '#2dd4bf'],
        unlocked: false
      },
      {
        id: 10,
        name: 'Midnight Pulse',
        description: 'Dark purple elegance',
        xpRequired: 1500,
        icon: '🌙',
        gradient: 'from-indigo-900 via-purple-900 to-pink-900',
        colors: ['#312e81', '#581c87', '#831843'],
        unlocked: false
      },
      {
        id: 11,
        name: 'Aurora Dream',
        description: 'Neon pastel gradient',
        xpRequired: 2000,
        icon: '✨',
        gradient: 'from-purple-400 via-pink-400 to-cyan-400',
        colors: ['#c084fc', '#f472b6', '#22d3ee'],
        unlocked: false
      }
    ],
    voucher: [
      {
        id: 12,
        name: 'Habit Booster Token',
        description: 'Skip one daily challenge',
        xpRequired: 1000,
        icon: '🎫',
        gradient: 'from-green-500 to-emerald-600',
        unlocked: false
      },
      {
        id: 13,
        name: 'Double XP for 1 Day',
        description: 'Earn 2x XP for 24 hours',
        xpRequired: 2000,
        icon: '⚡',
        gradient: 'from-yellow-500 to-orange-600',
        unlocked: false
      },
      {
        id: 14,
        name: 'Avatar Customization Voucher',
        description: 'Unlock premium customization',
        xpRequired: 5000,
        icon: '🎨',
        gradient: 'from-purple-500 to-pink-600',
        unlocked: false
      }
    ],
    unlocked: []
  }

  // Get unlocked rewards
  allRewards.unlocked = Object.values(allRewards)
    .flat()
    .filter(reward => reward.id && unlockedRewards.includes(reward.id))

  const currentRewards = allRewards[activeCategory] || []
  const totalUnlocked = unlockedRewards.length
  const totalRewards = Object.values(allRewards).flat().filter(r => r.id).length

  const handleClaim = (reward) => {
    const userXP = userData?.total_xp || 0
    const userLevel = userData?.level || 1

    if (reward.xpRequired && userXP < reward.xpRequired) {
      toast.error(`Need ${reward.xpRequired} XP to unlock!`, { icon: '🔒' })
      return
    }

    if (reward.levelRequired && userLevel < reward.levelRequired) {
      toast.error(`Need Level ${reward.levelRequired} to unlock!`, { icon: '🔒' })
      return
    }

    setUnlockedRewards([...unlockedRewards, reward.id])

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF69B4', '#00CED1']
    })

    setLumoAnimation('dance')
    setTimeout(() => setLumoAnimation('idle'), 3000)

    toast.success(
      <div>
        <div className="font-bold text-lg mb-1">🎉 Reward Unlocked!</div>
        <div className="text-sm">{reward.name}</div>
      </div>,
      {
        duration: 4000,
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff'
        }
      }
    )
  }

  const handleShare = (reward) => {
    toast.success('Achievement shared! 🎉', { icon: '📤' })
  }

  const getCategoryIcon = (category) => {
    const icons = {
      badge: <Award className="w-5 h-5" />,
      avatar: <User className="w-5 h-5" />,
      theme: <Palette className="w-5 h-5" />,
      voucher: <Ticket className="w-5 h-5" />,
      unlocked: <Gift className="w-5 h-5" />
    }
    return icons[category]
  }

  const getCategoryLabel = (category) => {
    const labels = {
      badge: '🥇 Badges',
      avatar: '🧍 Avatar',
      theme: '🎨 Themes',
      voucher: '🎟️ Vouchers',
      unlocked: '🔓 Unlocked'
    }
    return labels[category]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Epic Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent flex items-center space-x-3">
            <Gift className="w-12 h-12 text-purple-600" />
            <span>🎁 Rewards Store</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Unlock amazing rewards as you level up and earn XP!
          </p>
        </motion.div>

        {/* Progress Summary Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-purple-400/20 animate-shimmer"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium mb-2">Your Progress</p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-6 h-6" />
                  <span className="text-2xl font-black">
                    Unlocked Rewards: {totalUnlocked} / {totalRewards}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-white/80 text-sm mb-1">Coins</p>
                  <p className="text-3xl font-black">💰 {userData?.coins || 120}</p>
                </div>
                <div>
                  <p className="text-white/80 text-sm mb-1">Level</p>
                  <p className="text-3xl font-black">⭐ {userData?.level || 4}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-lg">
          {['badge', 'avatar', 'theme', 'voucher', 'unlocked'].map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex-1 min-w-[120px] px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {getCategoryIcon(category)}
              <span>{getCategoryLabel(category)}</span>
            </button>
          ))}
        </div>

        {/* Rewards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentRewards.map((reward, index) => {
              const isUnlocked = unlockedRewards.includes(reward.id)
              const userXP = userData?.total_xp || 0
              const userLevel = userData?.level || 1
              const canClaim = reward.xpRequired 
                ? userXP >= reward.xpRequired 
                : userLevel >= (reward.levelRequired || 0)

              return (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: isUnlocked ? 1.02 : 1.05, y: -5 }}
                  className={`relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all overflow-hidden group ${
                    isUnlocked ? 'ring-4 ring-green-500' : ''
                  }`}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${reward.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}></div>

                  {/* Locked Overlay */}
                  {!isUnlocked && !canClaim && (
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm rounded-2xl flex items-center justify-center z-20">
                      <div className="text-center">
                        <Lock className="w-16 h-16 text-white mx-auto mb-2" />
                        <p className="text-white font-bold">
                          {reward.xpRequired ? `${reward.xpRequired} XP Required` : `Level ${reward.levelRequired} Required`}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Unlocked Badge */}
                  {isUnlocked && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute top-4 right-4 z-20"
                    >
                      <div className="bg-green-500 text-white p-2 rounded-full shadow-lg">
                        <Check className="w-6 h-6" strokeWidth={3} />
                      </div>
                    </motion.div>
                  )}

                  <div className="relative z-10">
                    {/* Icon/Image */}
                    <div className={`h-32 rounded-xl mb-4 flex items-center justify-center text-7xl bg-gradient-to-br ${reward.gradient} ${
                      isUnlocked ? 'shadow-xl' : ''
                    }`}>
                      {reward.icon}
                      {isUnlocked && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute"
                        >
                          <Sparkles className="w-8 h-8 text-yellow-300" />
                        </motion.div>
                      )}
                    </div>

                    {/* Theme Color Preview */}
                    {activeCategory === 'theme' && reward.colors && (
                      <div className="flex space-x-2 mb-3">
                        {reward.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full shadow-md"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                    )}

                    {/* Title & Description */}
                    <h3 className="text-xl font-black mb-2 text-gray-800 dark:text-white">
                      {reward.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {reward.description}
                    </p>

                    {/* Requirements */}
                    <div className="flex items-center space-x-2 mb-4">
                      {reward.xpRequired && (
                        <div className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-gradient-to-r ${reward.gradient} text-white text-sm font-bold shadow-md`}>
                          <Zap className="w-4 h-4" />
                          <span>{reward.xpRequired} XP</span>
                        </div>
                      )}
                      {reward.levelRequired && (
                        <div className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-gradient-to-r ${reward.gradient} text-white text-sm font-bold shadow-md`}>
                          <Star className="w-4 h-4" />
                          <span>Level {reward.levelRequired}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {isUnlocked ? (
                      <div className="space-y-2">
                        <button
                          disabled
                          className="w-full px-4 py-3 bg-green-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg"
                        >
                          <Check className="w-5 h-5" />
                          <span>Unlocked</span>
                        </button>
                        <button
                          onClick={() => handleShare(reward)}
                          className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                        >
                          <Share2 className="w-5 h-5" />
                          <span>Share Achievement</span>
                        </button>
                      </div>
                    ) : canClaim ? (
                      <button
                        onClick={() => handleClaim(reward)}
                        className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                      >
                        <Gift className="w-5 h-5" />
                        <span>Claim Reward</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full px-4 py-3 bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-xl font-bold flex items-center justify-center space-x-2 cursor-not-allowed"
                      >
                        <Lock className="w-5 h-5" />
                        <span>Locked</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <LumoAvatar animation={lumoAnimation} />
    </div>
  )
}

export default RewardsStore
