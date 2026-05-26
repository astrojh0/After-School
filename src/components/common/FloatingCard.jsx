import { motion } from 'framer-motion'

export default function FloatingCard({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.4 }}
      className={`
        bg-white/60 backdrop-blur-sm 
        rounded-2xl p-4 
        shadow-lg
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}
