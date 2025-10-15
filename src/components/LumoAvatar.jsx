import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const LumoAvatar = ({ animation = 'idle' }) => {
  const [currentAnimation, setCurrentAnimation] = useState(animation)
  const [isBlinking, setIsBlinking] = useState(false)

  useEffect(() => {
    setCurrentAnimation(animation)
  }, [animation])

  // Random blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 200)
    }, 3000 + Math.random() * 3000)

    return () => clearInterval(blinkInterval)
  }, [])

  const animations = {
    idle: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    wave: {
      rotate: [0, 15, -15, 15, -15, 15, 0],
      transition: {
        duration: 1.5,
        repeat: 2
      }
    },
    dance: {
      rotate: [0, -15, 15, -15, 15, 0],
      y: [0, -25, 0, -25, 0],
      transition: {
        duration: 1.5,
        repeat: 3
      }
    },
    clap: {
      scale: [1, 1.15, 1, 1.15, 1],
      transition: {
        duration: 0.8,
        repeat: 3
      }
    },
    celebrate: {
      rotate: [0, -20, 20, -20, 20, 0],
      y: [0, -30, 0, -30, 0],
      scale: [1, 1.2, 1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: 2
      }
    },
    sleep: {
      rotate: [0, -25],
      opacity: [1, 0.6],
      y: [0, 10],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  }

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-40 cursor-pointer select-none"
      animate={animations[currentAnimation]}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Lumo Character - Enhanced Pixar-style */}
        <svg
          width="140"
          height="140"
          viewBox="0 0 140 140"
          className="drop-shadow-2xl relative z-10"
        >
          <defs>
            {/* Gradients for 3D effect */}
            <radialGradient id="bodyGradient" cx="40%" cy="30%">
              <stop offset="0%" stopColor="#C4B5FD" />
              <stop offset="50%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#8B7BD8" />
            </radialGradient>
            <radialGradient id="bellyGradient" cx="50%" cy="30%">
              <stop offset="0%" stopColor="#F3E8FF" />
              <stop offset="100%" stopColor="#DDD6FE" />
            </radialGradient>
            <radialGradient id="wingGradient" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#7C3AED" />
            </radialGradient>
          </defs>

          {/* Shadow */}
          <ellipse
            cx="70"
            cy="125"
            rx="40"
            ry="8"
            fill="#000000"
            opacity="0.15"
          />

          {/* Body */}
          <ellipse
            cx="70"
            cy="80"
            rx="40"
            ry="45"
            fill="url(#bodyGradient)"
          />
          
          {/* Belly */}
          <ellipse
            cx="70"
            cy="85"
            rx="28"
            ry="32"
            fill="url(#bellyGradient)"
          />
          
          {/* Head */}
          <circle
            cx="70"
            cy="45"
            r="28"
            fill="url(#bodyGradient)"
          />
          
          {/* Face highlight */}
          <ellipse
            cx="65"
            cy="38"
            rx="12"
            ry="15"
            fill="white"
            opacity="0.3"
          />

          {/* Eyes */}
          {isBlinking ? (
            <>
              <line x1="58" y1="43" x2="66" y2="43" stroke="#1C1C1E" strokeWidth="3" strokeLinecap="round" />
              <line x1="74" y1="43" x2="82" y2="43" stroke="#1C1C1E" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="62" cy="43" r="5" fill="#1C1C1E" />
              <circle cx="78" cy="43" r="5" fill="#1C1C1E" />
              <circle cx="64" cy="41" r="2.5" fill="white" />
              <circle cx="80" cy="41" r="2.5" fill="white" />
              <circle cx="63" cy="44" r="1" fill="white" opacity="0.6" />
              <circle cx="79" cy="44" r="1" fill="white" opacity="0.6" />
            </>
          )}
          
          {/* Beak */}
          <path
            d="M 70 50 L 65 55 L 75 55 Z"
            fill="#FFD43B"
          />
          <path
            d="M 70 55 Q 70 58 70 58"
            stroke="#FFA500"
            strokeWidth="1"
            fill="none"
          />
          
          {/* Smile */}
          {(currentAnimation === 'dance' || currentAnimation === 'celebrate' || currentAnimation === 'clap') && (
            <path
              d="M 62 52 Q 70 56 78 52"
              stroke="#FF69B4"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          )}
          
          {/* Wings */}
          <motion.ellipse
            cx="35"
            cy="75"
            rx="14"
            ry="25"
            fill="url(#wingGradient)"
            animate={currentAnimation === 'wave' || currentAnimation === 'clap' ? {
              rotate: [-10, 10, -10],
              x: [-2, 2, -2]
            } : {}}
            transition={{ duration: 0.5, repeat: currentAnimation === 'wave' ? 3 : 0 }}
            style={{ transformOrigin: '35px 75px' }}
          />
          <motion.ellipse
            cx="105"
            cy="75"
            rx="14"
            ry="25"
            fill="url(#wingGradient)"
            animate={currentAnimation === 'wave' || currentAnimation === 'clap' ? {
              rotate: [10, -10, 10],
              x: [2, -2, 2]
            } : {}}
            transition={{ duration: 0.5, repeat: currentAnimation === 'wave' ? 3 : 0 }}
            style={{ transformOrigin: '105px 75px' }}
          />
          
          {/* Feet */}
          <ellipse cx="60" cy="120" rx="10" ry="6" fill="#FFD43B" />
          <ellipse cx="80" cy="120" rx="10" ry="6" fill="#FFD43B" />
          
          {/* Toes */}
          <circle cx="55" cy="122" r="2" fill="#FFA500" />
          <circle cx="60" cy="123" r="2" fill="#FFA500" />
          <circle cx="65" cy="122" r="2" fill="#FFA500" />
          <circle cx="75" cy="122" r="2" fill="#FFA500" />
          <circle cx="80" cy="123" r="2" fill="#FFA500" />
          <circle cx="85" cy="122" r="2" fill="#FFA500" />
          
          {/* Blush */}
          <ellipse cx="48" cy="50" r="6" ry="4" fill="#FF69B4" opacity="0.4" />
          <ellipse cx="92" cy="50" r="6" ry="4" fill="#FF69B4" opacity="0.4" />

          {/* Sleep Z's */}
          {currentAnimation === 'sleep' && (
            <>
              <text x="95" y="30" fontSize="12" fill="#A78BFA" opacity="0.6">Z</text>
              <text x="105" y="20" fontSize="14" fill="#A78BFA" opacity="0.4">Z</text>
              <text x="115" y="10" fontSize="16" fill="#A78BFA" opacity="0.2">Z</text>
            </>
          )}
        </svg>

        {/* Sparkles and effects */}
        <AnimatePresence>
          {(currentAnimation === 'dance' || currentAnimation === 'celebrate') && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  style={{
                    left: `${10 + i * 15}%`,
                    top: `${i % 2 === 0 ? '10%' : '20%'}`
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    y: [-20, -60],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5],
                    rotate: [0, 360]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                >
                  {i % 4 === 0 ? '✨' : i % 4 === 1 ? '⭐' : i % 4 === 2 ? '💫' : '🌟'}
                </motion.div>
              ))}
            </>
          )}

          {currentAnimation === 'clap' && (
            <>
              <motion.div
                className="absolute left-1/4 top-1/3 text-xl"
                animate={{
                  x: [-10, 10],
                  opacity: [1, 0]
                }}
                transition={{ duration: 0.5, repeat: 4 }}
              >
                👏
              </motion.div>
              <motion.div
                className="absolute right-1/4 top-1/3 text-xl"
                animate={{
                  x: [10, -10],
                  opacity: [1, 0]
                }}
                transition={{ duration: 0.5, repeat: 4, delay: 0.25 }}
              >
                👏
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Speech bubble on hover */}
        <motion.div
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-4 py-2 rounded-2xl shadow-xl opacity-0 pointer-events-none"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm font-bold text-purple-600 dark:text-purple-400 whitespace-nowrap">
            {currentAnimation === 'idle' && "Hi there! 👋"}
            {currentAnimation === 'wave' && "Hello friend! 😊"}
            {currentAnimation === 'dance' && "Let's party! 🎉"}
            {currentAnimation === 'clap' && "Great job! 👏"}
            {currentAnimation === 'celebrate' && "You're amazing! ⭐"}
            {currentAnimation === 'sleep' && "Zzz... 😴"}
          </p>
          {/* Arrow */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white dark:bg-gray-800" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default LumoAvatar
