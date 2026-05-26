import { motion } from 'framer-motion'
import { CHARACTER_STATES } from '../../data/mockData'

const sizeClasses = {
  sm: 'w-24 h-24 text-4xl',
  md: 'w-36 h-36 text-5xl',
  lg: 'w-48 h-48 text-6xl',
}

export default function CharacterAvatar({ state = 'break', size = 'lg', animated = true }) {
  const stateConfig = CHARACTER_STATES[state] || CHARACTER_STATES.break
  const sizeClass = sizeClasses[size] || sizeClasses.lg

  const getAnimationVariants = () => {
    if (!animated) return {}
    
    switch (state) {
      case 'focus':
        return {
          animate: { scale: [1, 1.02, 1] },
          transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }
      case 'break':
        return {
          animate: { y: [0, -8, 0] },
          transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
      case 'overload':
        return {
          animate: { x: [-2, 2, -2, 2, 0] },
          transition: { duration: 0.3, repeat: Infinity }
        }
      case 'transition':
        return {
          animate: { rotate: [0, 3, -3, 0] },
          transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }
      default:
        return {}
    }
  }

  return (
    <motion.div
      animate={animated ? getAnimationVariants().animate : {}}
      transition={animated ? getAnimationVariants().transition : {}}
      className="relative"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className={`
          ${sizeClass} 
          rounded-full flex items-center justify-center 
          shadow-2xl will-change-transform
        `}
        style={{ 
          backgroundColor: stateConfig.bg,
          boxShadow: `0 20px 60px ${stateConfig.color}30, 0 0 0 8px ${stateConfig.color}10`
        }}
      >
        <span className="select-none">{stateConfig.face}</span>
      </motion.div>
    </motion.div>
  )
}
