import { motion } from 'framer-motion'

export default function StatusCard({ title, value, subtitle, color = '#3a3a3a' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm"
    >
      {title && (
        <p className="text-xs text-[#9a9a9a] mb-1">{title}</p>
      )}
      {value && (
        <p className="text-xl font-jp font-medium" style={{ color }}>
          {value}
        </p>
      )}
      {subtitle && (
        <p className="text-sm text-[#6a6a6a] font-jp mt-1">{subtitle}</p>
      )}
    </motion.div>
  )
}
