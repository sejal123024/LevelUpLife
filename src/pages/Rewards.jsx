import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingBag, Lock, Check, Award, User, Palette, 
  Ticket, Gift, Sparkles, Zap, Star, Share2
} from 'lucide-react'
import Navbar from '../components/Navbar'
import LumoAvatar from '../components/LumoAvatar'
import { useAuth } from '../contexts/AuthContext'
import { getRewards, purchaseReward } from '../services/api'
import { triggerConfetti } from '../utils/confetti'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'

const Rewards = () => {
  const { userData, updateUserData } = useAuth()
  const [rewards, setRewards] = useState([])
  const [userRewards, setUserRewards] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState('badge')
  const [lumoAnimation, setLumoAnimation] = useState('idle')

  useEffect(() => {
    loadRewards()
  }, [])

  const loadRewards = async () => {
    try {
      const response = await getRewards()
      if (response.success) {
        setRewards(response.rewards)
        setUserRewards(response.user_rewards)
      }
    } catch (error) {
      toast.error('Failed to load rewards')
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async (rewardId) => {
    try {
      const response = await purchaseReward(rewardId)
      
      if (response.success) {
        // Update user data
        updateUserData(response.user)
        
        // Reload rewards
        await loadRewards()
        
        // Trigger confetti
        triggerConfetti()
        setLumoAnimation('dance')
        setTimeout(() => setLumoAnimation('idle'), 3000)
        
        toast.success(`🎉 ${response.reward.name} unlocked!`, {
          duration: 4000
        })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Purchase failed')
    }
  }

  const isUnlocked = (rewardId) => {
    return userRewards.some(ur => ur.id === rewardId)
  }

  const canPurchase = (reward) => {
    return (
      !isUnlocked(reward.id) &&
      userData?.coins >= reward.coin_cost &&
      userData?.level >= reward.level_required
    )
  }

  const getRewardTypeIcon = (type) => {
    const icons = {
      badge: '🏆',
      avatar: '🐧',
      theme: '🎨',
      voucher: '🎫'
    }
    return icons[type] || '🎁'
  }

  const filteredRewards = filter === 'all' 
    ? rewards 
    : filter === 'unlocked'
    ? rewards.filter(r => isUnlocked(r.id))
    : rewards.filter(r => r.type === filter)

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Rewards Store</h1>
          <p className="text-text-secondary dark:text-text-dark">
            Spend your coins to unlock amazing rewards!
          </p>
        </div>

        {/* User Stats */}
        <div className="card mb-8 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary dark:text-text-dark mb-2">Your Balance</p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl">💰</span>
                  <span className="text-3xl font-bold text-secondary">
                    {userData?.coins || 0} Coins
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">⭐</span>
                  <span className="text-2xl font-bold text-primary">
                    Level {userData?.level || 1}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-text-secondary dark:text-text-dark mb-2">Unlocked Rewards</p>
              <p className="text-3xl font-bold text-success">
                {userRewards.length} / {rewards.length}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {['all', 'badge', 'avatar', 'theme', 'voucher', 'unlocked'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                filter === f
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Rewards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="card animate-pulse">
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : filteredRewards.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">🎁</div>
            <h3 className="text-2xl font-bold mb-2">No rewards found</h3>
            <p className="text-text-secondary dark:text-text-dark">
              Try a different filter
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.map((reward, index) => {
              const unlocked = isUnlocked(reward.id)
              const canBuy = canPurchase(reward)
              const locked = !unlocked && userData?.level < reward.level_required

              return (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`card ${unlocked ? 'ring-2 ring-success' : ''}`}
                >
                  {/* Reward Image */}
                  <div className={`h-40 rounded-lg mb-4 flex items-center justify-center text-6xl ${
                    unlocked ? 'bg-success/20' : 'bg-gray-100 dark:bg-gray-800'
                  }`}>
                    {getRewardTypeIcon(reward.type)}
                  </div>

                  {/* Reward Info */}
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold">{reward.name}</h3>
                    {unlocked && (
                      <div className="p-2 bg-success/20 rounded-lg">
                        <Check className="text-success" size={20} />
                      </div>
                    )}
                  </div>

                  <p className="text-text-secondary dark:text-text-dark text-sm mb-4">
                    {reward.description}
                  </p>

                  {/* Type Badge */}
                  <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full mb-4">
                    {reward.type.toUpperCase()}
                  </span>

                  {/* Price & Level */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">💰</span>
                      <span className="text-xl font-bold text-secondary">
                        {reward.coin_cost}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-text-secondary dark:text-text-dark">
                        Level {reward.level_required}+
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  {unlocked ? (
                    <button className="w-full btn-primary bg-success hover:bg-success/90" disabled>
                      <Check size={20} className="inline mr-2" />
                      Unlocked
                    </button>
                  ) : locked ? (
                    <button className="w-full btn-secondary opacity-50" disabled>
                      <Lock size={20} className="inline mr-2" />
                      Level {reward.level_required} Required
                    </button>
                  ) : canBuy ? (
                    <button
                      onClick={() => handlePurchase(reward.id)}
                      className="w-full btn-primary"
                    >
                      <ShoppingBag size={20} className="inline mr-2" />
                      Purchase
                    </button>
                  ) : (
                    <button className="w-full btn-secondary opacity-50" disabled>
                      Not Enough Coins
                    </button>
                  )}
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

export default Rewards
