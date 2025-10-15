import { useState } from 'react'
import { motion } from 'framer-motion'
import { Compass, Sparkles } from 'lucide-react'

const HelpButton = ({ onStartTour }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    // Remove the completed flag to restart tour
    localStorage.removeItem('hasCompletedOnboarding')
    if (onStartTour) {
      onStartTour()
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-32 right-8 z-50 p-5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all group"
      title="Start Tour"
    >
      {/* Pulsing ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-75"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.75, 0, 0.75]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      />
      
      {/* Icon */}
      <div className="relative z-10">
        <motion.div
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Compass size={28} strokeWidth={2.5} />
        </motion.div>
      </div>

      {/* Sparkles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-300"
          style={{
            left: `${20 + i * 30}%`,
            top: `${10 + i * 20}%`
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            y: [-10, -30]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.5
          }}
        >
          <Sparkles size={12} />
        </motion.div>
      ))}
      
      {/* Tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900 dark:bg-gray-800 text-white px-5 py-3 rounded-xl whitespace-nowrap text-sm font-bold shadow-2xl border border-purple-500/30"
        >
          <div className="flex items-center space-x-2">
            <Sparkles size={16} className="text-yellow-400" />
            <span>Take the Tour Again!</span>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-3 h-3 bg-gray-900 dark:bg-gray-800 border-r border-t border-purple-500/30" />
        </motion.div>
      )}
    </motion.button>
  )
}

export default HelpButton
