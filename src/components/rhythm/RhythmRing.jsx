import { motion } from 'framer-motion'
import { TYPE_COLORS } from '../../data/mockData'
import { timeToMinutes } from '../../utils/timeUtils'

export default function RhythmRing({ blocks = [], size = 200, strokeWidth = 12, showLabels = false }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  const getSegments = () => {
    let currentAngle = -90

    return blocks.map((block, index) => {
      const startMinutes = timeToMinutes(block.start)
      const endMinutes = timeToMinutes(block.end)
      const duration = endMinutes - startMinutes
      const ratio = duration / (24 * 60)
      
      const angle = ratio * 360
      const endAngle = currentAngle + angle
      
      const startRad = (currentAngle * Math.PI) / 180
      const endRad = (endAngle * Math.PI) / 180
      
      const x1 = center + radius * Math.cos(startRad)
      const y1 = center + radius * Math.sin(startRad)
      const x2 = center + radius * Math.cos(endRad)
      const y2 = center + radius * Math.sin(endRad)
      
      const largeArcFlag = angle > 180 ? 1 : 0
      
      const pathD = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`
      
      const segment = {
        path: pathD,
        color: TYPE_COLORS[block.type] || TYPE_COLORS.break,
        block,
        index,
      }
      
      currentAngle = endAngle
      
      return segment
    })
  }

  const segments = getSegments()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative inline-flex items-center justify-center"
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {segments.map((segment, index) => (
          <motion.path
            key={index}
            d={segment.path}
            fill="none"
            stroke={segment.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: 1, 
              delay: index * 0.1,
              ease: 'easeOut'
            }}
            style={{
              filter: `drop-shadow(0 2px 4px ${segment.color}40)`,
            }}
          />
        ))}
      </svg>
      
      {showLabels && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xs text-[#9a9a9a]">今日节奏</p>
          </div>
        </div>
      )}
    </motion.div>
  )
}
