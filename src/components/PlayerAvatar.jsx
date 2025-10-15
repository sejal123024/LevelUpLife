import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const PlayerAvatar = ({ level = 1, animation = 'idle', onAnimationComplete }) => {
  const [currentAnimation, setCurrentAnimation] = useState(animation)
  const [isBlinking, setIsBlinking] = useState(false)

  useEffect(() => {
    setCurrentAnimation(animation)
  }, [animation])

  // Random blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 3000 + Math.random() * 4000)

    return () => clearInterval(blinkInterval)
  }, [])

  // Determine avatar stage based on level
  const getAvatarStage = () => {
    if (level >= 11) return 'epic'
    if (level >= 6) return 'upgraded'
    return 'casual'
  }

  const stage = getAvatarStage()

  // Color schemes for different stages
  const colors = {
    casual: {
      skin: '#FFD4A3',
      skinShadow: '#E8B87D',
      outfit: '#6C63FF',
      accent: '#A78BFA',
      hair: '#3C3C3E',
      glow: 'rgba(108, 99, 255, 0.3)'
    },
    upgraded: {
      skin: '#FFD4A3',
      skinShadow: '#E8B87D',
      outfit: '#FF6B9D',
      accent: '#FFD43B',
      hair: '#3C3C3E',
      glow: 'rgba(255, 107, 157, 0.4)'
    },
    epic: {
      skin: '#FFD4A3',
      skinShadow: '#E8B87D',
      outfit: '#FF3B30',
      accent: '#FFD700',
      hair: '#3C3C3E',
      glow: 'rgba(255, 215, 0, 0.6)'
    }
  }

  const currentColors = colors[stage]

  // Animation variants
  const containerVariants = {
    idle: {
      y: [0, -8, 0],
      transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
    },
    wave: {
      rotate: [0, 5, -5, 5, -5, 0],
      transition: { duration: 1.2, ease: "easeInOut" }
    },
    flex: {
      scale: [1, 1.08, 1],
      transition: { duration: 0.8, repeat: 2 }
    },
    sleep: {
      rotate: [-3, 3, -3],
      y: [0, 5, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    },
    celebrate: {
      y: [0, -20, 0, -15, 0],
      rotate: [0, -8, 8, -5, 0],
      transition: { duration: 1.5, ease: "easeOut" }
    }
  }

  const armVariants = {
    idle: {},
    wave: {
      rotate: [0, -25, 25, -25, 25, 0],
      transition: { duration: 1.2, ease: "easeInOut" }
    },
    flex: {
      rotate: [-30, -30],
      y: [-5, -5],
      transition: { duration: 0.4 }
    },
    sleep: {},
    celebrate: {
      rotate: [0, -45, -45, 0],
      y: [0, -10, -10, 0],
      transition: { duration: 1.5 }
    }
  }

  return (
    <div className="relative">
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ backgroundColor: currentColors.glow }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Avatar Container */}
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        variants={containerVariants}
        transition={{ duration: 0.5 }}
      >
        <svg
          width="200"
          height="240"
          viewBox="0 0 200 240"
          className="drop-shadow-2xl"
        >
          {/* Background Circle */}
          <circle
            cx="100"
            cy="120"
            r="90"
            fill="url(#avatarBg)"
            opacity="0.15"
          />

          {/* Define gradients */}
          <defs>
            <linearGradient id="avatarBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentColors.outfit} />
              <stop offset="100%" stopColor={currentColors.accent} />
            </linearGradient>
            <linearGradient id="outfitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={currentColors.outfit} />
              <stop offset="100%" stopColor={currentColors.accent} />
            </linearGradient>
            <radialGradient id="skinGradient" cx="40%" cy="40%">
              <stop offset="0%" stopColor={currentColors.skin} />
              <stop offset="100%" stopColor={currentColors.skinShadow} />
            </radialGradient>
          </defs>

          {/* Shadow */}
          <ellipse
            cx="100"
            cy="225"
            rx="40"
            ry="7"
            fill="#000000"
            opacity="0.12"
          />

          {/* Legs - More natural shape */}
          <path
            d="M 88 180 Q 87 200 90 220 L 95 220 Q 93 200 92 180 Z"
            fill={currentColors.outfit}
          />
          <path
            d="M 108 180 Q 109 200 106 220 L 101 220 Q 103 200 104 180 Z"
            fill={currentColors.outfit}
          />

          {/* Shoes - Realistic sneakers */}
          <ellipse cx="92" cy="222" rx="11" ry="6" fill="#2C2C2E" />
          <ellipse cx="104" cy="222" rx="11" ry="6" fill="#2C2C2E" />
          <ellipse cx="92" cy="221" rx="9" ry="4" fill="#3C3C3E" />
          <ellipse cx="104" cy="221" rx="9" ry="4" fill="#3C3C3E" />
          {/* Shoe details */}
          <line x1="87" y1="222" x2="97" y2="222" stroke="white" strokeWidth="0.5" opacity="0.3" />
          <line x1="99" y1="222" x2="109" y2="222" stroke="white" strokeWidth="0.5" opacity="0.3" />

          {/* Body - Realistic torso with proper proportions */}
          <path
            d="M 100 105 Q 75 108 72 130 L 72 175 Q 75 182 85 182 L 85 180 L 100 185 L 111 180 L 111 182 Q 121 182 124 175 L 124 130 Q 121 108 100 105 Z"
            fill="url(#outfitGradient)"
            stroke={currentColors.accent}
            strokeWidth="1.5"
          />

          {/* Waist/Hip area */}
          <ellipse cx="100" cy="180" rx="24" ry="8" fill={currentColors.outfit} opacity="0.8" />

          {/* Neck - More realistic */}
          <path
            d="M 92 90 Q 92 95 92 100 L 104 100 Q 104 95 104 90 Z"
            fill="url(#skinGradient)"
          />

          {/* Left Arm - Properly connected with elbow joint */}
          <motion.g
            variants={armVariants}
            animate={currentAnimation}
            style={{ transformOrigin: '72px 130px' }}
          >
            {/* Upper arm (shoulder to elbow) */}
            <path
              d="M 72 120 Q 68 130 65 145"
              stroke={currentColors.outfit}
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
            />
            {/* Elbow joint */}
            <circle cx="65" cy="145" r="7" fill={currentColors.outfit} />
            
            {/* Forearm (elbow to wrist) */}
            <path
              d="M 65 145 Q 62 155 58 168"
              stroke={currentColors.outfit}
              strokeWidth="13"
              fill="none"
              strokeLinecap="round"
            />
            
            {/* Wrist */}
            <circle cx="58" cy="168" r="5" fill="url(#skinGradient)" />
            
            {/* Hand - properly connected to wrist */}
            <ellipse
              cx="55"
              cy="178"
              rx="8"
              ry="10"
              fill="url(#skinGradient)"
            />
            {/* Thumb */}
            <ellipse cx="50" cy="175" rx="3" ry="5" fill={currentColors.skin} transform="rotate(-25 50 175)" />
            {/* Fingers */}
            <ellipse cx="54" cy="186" rx="2" ry="5" fill={currentColors.skin} />
            <ellipse cx="57" cy="187" rx="2" ry="6" fill={currentColors.skin} />
            <ellipse cx="60" cy="186" rx="2" ry="5" fill={currentColors.skin} />
            <ellipse cx="63" cy="185" rx="2" ry="4" fill={currentColors.skin} />
          </motion.g>

          {/* Right Arm - Properly connected with elbow joint */}
          <motion.g
            variants={armVariants}
            animate={currentAnimation}
            style={{ transformOrigin: '124px 130px' }}
          >
            {/* Upper arm (shoulder to elbow) */}
            <path
              d="M 124 120 Q 128 130 131 145"
              stroke={currentColors.outfit}
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
            />
            {/* Elbow joint */}
            <circle cx="131" cy="145" r="7" fill={currentColors.outfit} />
            
            {/* Forearm (elbow to wrist) */}
            <path
              d="M 131 145 Q 134 155 138 168"
              stroke={currentColors.outfit}
              strokeWidth="13"
              fill="none"
              strokeLinecap="round"
            />
            
            {/* Wrist */}
            <circle cx="138" cy="168" r="5" fill="url(#skinGradient)" />
            
            {/* Hand - properly connected to wrist */}
            <ellipse
              cx="141"
              cy="178"
              rx="8"
              ry="10"
              fill="url(#skinGradient)"
            />
            {/* Thumb */}
            <ellipse cx="146" cy="175" rx="3" ry="5" fill={currentColors.skin} transform="rotate(25 146 175)" />
            {/* Fingers */}
            <ellipse cx="142" cy="186" rx="2" ry="5" fill={currentColors.skin} />
            <ellipse cx="139" cy="187" rx="2" ry="6" fill={currentColors.skin} />
            <ellipse cx="136" cy="186" rx="2" ry="5" fill={currentColors.skin} />
            <ellipse cx="133" cy="185" rx="2" ry="4" fill={currentColors.skin} />
          </motion.g>

          {/* Head - More angular/masculine shape */}
          <ellipse cx="98" cy="68" rx="23" ry="26" fill="url(#skinGradient)" />
          
          {/* Strong Jaw/Chin area - masculine */}
          <path
            d="M 78 80 Q 78 88 85 92 L 98 95 L 111 92 Q 118 88 118 80 Z"
            fill="url(#skinGradient)"
          />
          {/* Chin definition */}
          <ellipse cx="98" cy="93" rx="8" ry="6" fill={currentColors.skinShadow} opacity="0.2" />
          
          {/* Face highlight - natural lighting */}
          <ellipse
            cx="92"
            cy="60"
            rx="10"
            ry="14"
            fill="white"
            opacity="0.15"
          />

          {/* Hair - Short masculine hairstyle */}
          <path
            d="M 75 65 Q 76 48 98 44 Q 120 48 121 65 Q 121 68 118 72 Q 115 66 98 64 Q 81 66 78 72 Q 75 68 75 65"
            fill={currentColors.hair}
          />
          {/* Short sides */}
          <ellipse cx="80" cy="58" rx="7" ry="12" fill={currentColors.hair} transform="rotate(-30 80 58)" />
          <ellipse cx="116" cy="58" rx="7" ry="12" fill={currentColors.hair} transform="rotate(30 116 58)" />
          {/* Top hair - short and textured */}
          <ellipse cx="98" cy="50" rx="14" ry="8" fill={currentColors.hair} />
          <path d="M 90 48 L 92 44" stroke={currentColors.hair} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 98 46 L 98 42" stroke={currentColors.hair} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 106 48 L 104 44" stroke={currentColors.hair} strokeWidth="2.5" strokeLinecap="round" />

          {/* Ears - More realistic */}
          <ellipse cx="74" cy="72" rx="6" ry="10" fill={currentColors.skinShadow} />
          <ellipse cx="122" cy="72" rx="6" ry="10" fill={currentColors.skinShadow} />
          {/* Inner ear detail */}
          <path d="M 76 70 Q 78 72 76 74" stroke={currentColors.skinShadow} strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M 120 70 Q 118 72 120 74" stroke={currentColors.skinShadow} strokeWidth="1.5" fill="none" opacity="0.5" />

          {/* Eyebrows - Thick and masculine */}
          <path
            d="M 81 64 Q 88 61 95 63"
            stroke={currentColors.hair}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 101 63 Q 108 61 115 64"
            stroke={currentColors.hair}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Eyes - Realistic human eyes */}
          {isBlinking ? (
            <>
              <line x1="84" y1="70" x2="94" y2="70" stroke="#1C1C1E" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="102" y1="70" x2="112" y2="70" stroke="#1C1C1E" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Eye whites */}
              <ellipse cx="89" cy="70" rx="6" ry="4.5" fill="white" />
              <ellipse cx="107" cy="70" rx="6" ry="4.5" fill="white" />
              {/* Iris */}
              <circle cx="89" cy="70" r="3.5" fill="#4A90E2" />
              <circle cx="107" cy="70" r="3.5" fill="#4A90E2" />
              {/* Pupils */}
              <circle cx="89" cy="70" r="2" fill="#1C1C1E" />
              <circle cx="107" cy="70" r="2" fill="#1C1C1E" />
              {/* Eye shine/highlights */}
              <circle cx="90" cy="68.5" r="1.2" fill="white" />
              <circle cx="108" cy="68.5" r="1.2" fill="white" />
              <circle cx="88" cy="71" r="0.6" fill="white" opacity="0.7" />
              <circle cx="106" cy="71" r="0.6" fill="white" opacity="0.7" />
              {/* Upper eyelid */}
              <path d="M 83 68 Q 89 66 95 68" stroke="#1C1C1E" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
              <path d="M 101 68 Q 107 66 113 68" stroke="#1C1C1E" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
              {/* Lower eyelid */}
              <path d="M 84 72 Q 89 73 94 72" stroke="#1C1C1E" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.3" />
              <path d="M 102 72 Q 107 73 112 72" stroke="#1C1C1E" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.3" />
            </>
          )}

          {/* Nose - More defined and realistic */}
          <path
            d="M 98 76 L 98 84"
            stroke={currentColors.skinShadow}
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
          <ellipse cx="95" cy="84" rx="2.5" ry="2" fill={currentColors.skinShadow} opacity="0.3" />
          <ellipse cx="101" cy="84" rx="2.5" ry="2" fill={currentColors.skinShadow} opacity="0.3" />
          <path
            d="M 94 82 Q 98 85 102 82"
            stroke={currentColors.skinShadow}
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* Mouth/Smile - Expressive and natural */}
          {(currentAnimation === 'celebrate' || currentAnimation === 'wave') ? (
            <>
              <path
                d="M 86 90 Q 98 98 110 90"
                stroke="#D97B9D"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 88 91 Q 98 96 108 91"
                fill="#FF6B9D"
                opacity="0.3"
              />
            </>
          ) : currentAnimation === 'sleep' ? (
            <ellipse cx="98" cy="92" rx="8" ry="3" fill="#D97B9D" opacity="0.5" />
          ) : (
            <>
              <path
                d="M 88 91 Q 98 96 108 91"
                stroke="#D97B9D"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 90 92 Q 98 95 106 92"
                fill="#FF6B9D"
                opacity="0.2"
              />
            </>
          )}

          {/* Blush - Natural cheek color */}
          {(currentAnimation === 'celebrate' || currentAnimation === 'wave') && (
            <>
              <ellipse cx="78" cy="78" rx="7" ry="5" fill="#FF6B9D" opacity="0.35" />
              <ellipse cx="118" cy="78" rx="7" ry="5" fill="#FF6B9D" opacity="0.35" />
            </>
          )}

          {/* Casual Stage - Simple outfit */}
          {stage === 'casual' && (
            <>
              {/* Basic shirt collar - V-neck joining at center */}
              <path
                d="M 85 100 L 98 108 L 111 100"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
            </>
          )}

          {/* Upgraded Stage - Better outfit + accessories */}
          {stage === 'upgraded' && (
            <>
              {/* Cool jacket collar */}
              <path
                d="M 70 100 L 90 110 L 110 100"
                stroke={currentColors.accent}
                strokeWidth="3"
                fill="none"
              />
              {/* Belt */}
              <rect x="75" y="155" width="30" height="4" rx="2" fill={currentColors.accent} />
              {/* Badge on chest */}
              <circle cx="90" cy="130" r="6" fill={currentColors.accent} />
              <text x="90" y="133" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">★</text>
            </>
          )}

          {/* Epic Stage - Legendary outfit + effects */}
          {stage === 'epic' && (
            <>
              {/* Epic cape */}
              <path
                d="M 70 105 Q 50 140 60 180 L 70 175 L 70 120 Z"
                fill={currentColors.accent}
                opacity="0.8"
              />
              <path
                d="M 110 105 Q 130 140 120 180 L 110 175 L 110 120 Z"
                fill={currentColors.accent}
                opacity="0.8"
              />
              {/* Crown */}
              <path
                d="M 70 50 L 75 45 L 80 50 L 85 43 L 90 50 L 95 43 L 100 50 L 105 45 L 110 50 L 105 55 L 75 55 Z"
                fill={currentColors.accent}
                stroke="#FFD700"
                strokeWidth="2"
              />
              {/* Chest emblem */}
              <circle cx="90" cy="130" r="10" fill="#FFD700" />
              <text x="90" y="135" fontSize="12" fill={currentColors.outfit} textAnchor="middle" fontWeight="bold">⚡</text>
              {/* Shoulder pads */}
              <circle cx="70" cy="110" r="8" fill={currentColors.accent} />
              <circle cx="110" cy="110" r="8" fill={currentColors.accent} />
            </>
          )}

          {/* Level badge */}
          <circle cx="120" cy="60" r="15" fill="white" stroke={currentColors.outfit} strokeWidth="3" />
          <text x="120" y="67" fontSize="16" fill={currentColors.outfit} textAnchor="middle" fontWeight="bold">
            {level}
          </text>
        </svg>

        {/* Floating particles for epic stage */}
        {stage === 'epic' && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${20 + i * 25}%`,
                  top: `${10 + (i % 3) * 30}%`
                }}
                animate={{
                  y: [-10, -30, -10],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              >
                {i % 3 === 0 ? '✨' : i % 3 === 1 ? '⭐' : '💫'}
              </motion.div>
            ))}
          </>
        )}

        {/* Stage label */}
        <motion.div
          className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider"
          style={{
            backgroundColor: currentColors.outfit,
            color: 'white',
            boxShadow: `0 0 20px ${currentColors.glow}`
          }}
          animate={{
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          {stage === 'casual' ? '🌱 Beginner' : stage === 'upgraded' ? '⚔️ Warrior' : '👑 Legend'}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default PlayerAvatar
