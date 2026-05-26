import { motion } from 'framer-motion'
import { TYPE_COLORS } from '../../data/mockData'
import { getCurrentTimeString, timeToMinutes, isTimeInRange } from '../../utils/timeUtils'

export default function RhythmTimeline({ blocks = [], onBlockClick }) {
  const currentTime = getCurrentTimeString()
  const currentMinutes = timeToMinutes(currentTime)

  const getCurrentPosition = () => {
    return (currentMinutes / (24 * 60)) * 100
  }

  return (
    <div className="relative w-full h-full space-y-3 overflow-y-auto pr-2">
      {blocks.map((block, index) => {
        const isActive = isTimeInRange(currentTime, block.start, block.end)
        const color = TYPE_COLORS[block.type] || TYPE_COLORS.break
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => onBlockClick && onBlockClick(block)}
            className={`
              relative p-3 rounded-xl cursor-pointer
              transition-all duration-300
              ${isActive 
                ? 'bg-white/80 shadow-lg' 
                : 'bg-white/40 hover:bg-white/60'
              }
            `}
            style={{
              borderLeft: `4px solid ${color}`,
            }}
          >
            {isActive && (
              <motion.div
                layoutId="activeTimeline"
                className="absolute -left-1 -top-1 -bottom-1 w-1 rounded-full"
                style={{ backgroundColor: color }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-jp font-medium text-[#3a3a3a]">
                  {block.label}
                </p>
                <p className="text-xs text-[#9a9a9a] mt-1">
                  {block.start} - {block.end}
                </p>
              </div>
              
              {isActive && (
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="w-2 h-2 rounded-full mt-2"
                  style={{ backgroundColor: color }}
                />
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
