import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ArrowLeft } from 'lucide-react'
import LumoAvatar from './LumoAvatar'

const OnboardingTour = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [lumoAnimation, setLumoAnimation] = useState('wave')
  const [lumoPosition, setLumoPosition] = useState({ x: '50%', y: '30%' })
  const [highlightedElement, setHighlightedElement] = useState(null)

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedTour = localStorage.getItem('hasCompletedOnboarding')
    if (!hasCompletedTour) {
      setIsVisible(true)
    }
  }, [])

  const tourSteps = [
    {
      title: "Welcome to LevelUpLife! 🎉",
      message: "Hi there! I'm Lumo, your friendly guide! 👋 I'll fly around and show you all the cool features. Let's make this quick and fun!",
      animation: 'wave',
      lumoPosition: { x: '50%', y: '30%' },
      spotlightSize: 'large'
    },
    {
      title: "Your Stats Dashboard 📊",
      message: "See these colorful cards? They show your XP, Level, Streak, and Coins! Watch them grow as you complete tasks! 🚀",
      animation: 'dance',
      target: '.stats-grid'
    },
    {
      title: "Level Progress Bar 📈",
      message: "This shows how close you are to leveling up! Earn 100 XP to reach the next level and unlock cool rewards! 🎯",
      animation: 'clap',
      target: '.level-progress'
    },
    {
      title: "Navigation Menu 🧭",
      message: "Use the top menu to explore! Visit Quests, Challenges, Achievements, Rewards, and your Profile anytime! 🗺️",
      animation: 'wave',
      target: 'nav'
    },
    {
      title: "You're Ready! 🚀",
      message: "That's it! You're all set to start leveling up! Remember, I'm always here in the corner if you need help. Let's go! 💪",
      animation: 'celebrate',
      lumoPosition: { x: '50%', y: '50%' },
      spotlightSize: 'large'
    }
  ]

  const currentTourStep = tourSteps[currentStep]

  useEffect(() => {
    if (isVisible && currentTourStep) {
      setLumoAnimation(currentTourStep.animation)
      
      // Highlight target element
      if (currentTourStep.target) {
        setTimeout(() => {
          const element = document.querySelector(currentTourStep.target)
          if (element) {
            setHighlightedElement(element)
            // Scroll element into view smoothly
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
            
            // Calculate Lumo position - position it to the LEFT of the element
            const rect = element.getBoundingClientRect()
            
            // Keep Lumo ALWAYS visible on screen with STRICT bounds checking
            const lumoX = Math.max(100, Math.min(window.innerWidth - 100, rect.left - 120))
            // CRITICAL: Ensure Lumo never goes above 200px from top or below 150px from bottom
            const lumoY = Math.max(200, Math.min(window.innerHeight - 150, rect.top + rect.height / 2))
            
            setLumoPosition({ 
              x: `${lumoX}px`, 
              y: `${lumoY}px` 
            })
          }
        }, 100)
      } else {
        setHighlightedElement(null)
        // Use custom position if provided
        if (currentTourStep.lumoPosition) {
          setLumoPosition(currentTourStep.lumoPosition)
        }
      }
    }
  }, [currentStep, isVisible, currentTourStep])

  const handleNext = useCallback(() => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      completeTour()
    }
  }, [currentStep, tourSteps.length])

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }, [currentStep])

  const handleSkip = useCallback(() => {
    completeTour()
  }, [])

  const completeTour = useCallback(() => {
    localStorage.setItem('hasCompletedOnboarding', 'true')
    setIsVisible(false)
    if (onComplete) onComplete()
  }, [onComplete])

  if (!isVisible) return null

  return (
    <>
      {/* Dark Overlay - NO backdrop blur to keep highlighted content clear */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] pointer-events-none"
      >
        {/* Dark background WITHOUT blur */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Clear spotlight on highlighted element - cuts through the dark overlay */}
        {highlightedElement && (
          <motion.div
            className="absolute rounded-2xl pointer-events-auto"
            style={{
              left: highlightedElement.getBoundingClientRect().left - 2,
              top: highlightedElement.getBoundingClientRect().top - 8,
              width: highlightedElement.getBoundingClientRect().width + 4,
              height: highlightedElement.getBoundingClientRect().height + 16,
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 100px 50px rgba(167, 139, 250, 1), 0 0 180px 80px rgba(167, 139, 250, 0.6)',
              border: '4px solid rgba(167, 139, 250, 1)',
              background: 'transparent',
              backdropFilter: 'none'
            }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              boxShadow: [
                '0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 100px 50px rgba(167, 139, 250, 1), 0 0 180px 80px rgba(167, 139, 250, 0.6)',
                '0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 130px 60px rgba(236, 72, 153, 1), 0 0 220px 100px rgba(236, 72, 153, 0.7)',
                '0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 100px 50px rgba(167, 139, 250, 1), 0 0 180px 80px rgba(167, 139, 250, 0.6)'
              ],
              borderColor: [
                'rgba(167, 139, 250, 1)',
                'rgba(236, 72, 153, 1)',
                'rgba(59, 130, 246, 1)',
                'rgba(167, 139, 250, 1)'
              ]
            }}
            transition={{ 
              scale: { duration: 0.5 },
              opacity: { duration: 0.5 },
              boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
              borderColor: { duration: 3, repeat: Infinity, ease: "linear" }
            }}
          />
        )}
      </motion.div>

      {/* Flying Lumo - Sweet Bird Animation - Smaller for Mobile */}
      <motion.div
        className="fixed z-[110] pointer-events-none w-12 h-12 md:w-20 md:h-20"
        animate={{ 
          left: lumoPosition.x || '50%',
          top: lumoPosition.y || '50%',
          scale: 1,
          opacity: 1
        }}
        initial={false}
        transition={{ 
          duration: 0.8,
          type: "spring",
          stiffness: 80,
          damping: 20
        }}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
          {/* Flying motion - up and down like a bird */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 5, 0, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Wing flap effect */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1, 1.1, 1]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <LumoAvatar animation={lumoAnimation} />
            </motion.div>
            
            {/* Sparkle trail behind Lumo - Optimized */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-xl"
                style={{
                  left: `${50 - i * 20}%`,
                  top: `${50 + Math.sin(i) * 15}%`
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.7, 0],
                  scale: [0, 1, 0],
                  x: [-15 * i, -30 * i]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              >
                ✨
              </motion.div>
            ))}
          </motion.div>
      </motion.div>

      {/* Animated Pointer Arrow - Points FROM Lumo TO highlighted element */}
      {highlightedElement && (
        <motion.div
          className="fixed z-[110] pointer-events-none"
          initial={false}
          animate={{ 
            opacity: 1, 
            scale: 1,
            left: highlightedElement.getBoundingClientRect().left - 80,
            top: highlightedElement.getBoundingClientRect().top + highlightedElement.getBoundingClientRect().height / 2
          }}
          transition={{ duration: 0.6 }}
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <motion.div
            animate={{
              x: [0, 15, 0],
              rotate: [0, -10, 10, 0]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-6xl drop-shadow-lg"
            style={{ transform: 'rotate(-90deg)' }}
          >
            👉
          </motion.div>
          {/* Glow effect */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-yellow-400 rounded-full blur-xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity
            }}
          />
        </motion.div>
      )}

      {/* Tour Dialog - No Blur Inside - Mobile Responsive */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="fixed bottom-1 md:bottom-8 left-[2%] md:left-1/2 md:-translate-x-1/2 z-[120] w-[96%] md:w-full md:max-w-xl pointer-events-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-3xl shadow-2xl p-1.5 md:p-6 relative overflow-hidden border md:border-4 border-purple-500">
            {/* Animated gradient background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
              }}
              transition={{
                duration: 5,
                repeat: Infinity
              }}
            />
            
            {/* Close button */}
            <button
              onClick={handleSkip}
              className="absolute top-1 right-1 md:top-4 md:right-4 p-0.5 md:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors z-10"
            >
              <X size={10} className="md:w-5 md:h-5" />
            </button>

            {/* Content - Clear and readable - Mobile Responsive */}
            <div className="relative z-10">
              <h3 className="text-xs md:text-2xl font-black mb-0.5 md:mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight">
                {currentTourStep.title}
              </h3>
              <p className="text-[9px] md:text-base text-gray-700 dark:text-gray-300 mb-1.5 md:mb-6 leading-tight md:leading-relaxed">
                {currentTourStep.message}
              </p>

              {/* Progress indicator */}
              <div className="flex items-center justify-center space-x-0.5 md:space-x-2 mb-1 md:mb-6">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 md:h-2 rounded-full transition-all ${
                      index === currentStep
                        ? 'w-4 md:w-8 bg-gradient-to-r from-purple-500 to-pink-500'
                        : index < currentStep
                        ? 'w-1 md:w-2 bg-purple-300'
                        : 'w-1 md:w-2 bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation buttons - Mobile Responsive */}
              <div className="flex items-center justify-between gap-0.5 md:gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className={`flex items-center space-x-0.5 md:space-x-2 px-1 md:px-4 py-0.5 md:py-2 rounded md:rounded-xl font-bold transition-all text-[9px] md:text-base ${
                    currentStep === 0
                      ? 'opacity-50 cursor-not-allowed text-gray-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <ArrowLeft size={10} className="md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Back</span>
                </button>

                <button
                  onClick={handleSkip}
                  className="px-1 md:px-4 py-0.5 md:py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-bold transition-colors text-[9px] md:text-base"
                >
                  Skip
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center space-x-0.5 md:space-x-2 px-1.5 md:px-6 py-0.5 md:py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-black rounded md:rounded-xl hover:shadow-lg hover:scale-105 transition-all text-[9px] md:text-base"
                >
                  <span>{currentStep === tourSteps.length - 1 ? "Let's Go!" : 'Next'}</span>
                  <ArrowRight size={10} className="md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

    </>
  )
}

export default OnboardingTour
