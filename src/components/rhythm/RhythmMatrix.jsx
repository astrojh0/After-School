import { motion } from 'framer-motion'
import { getWeekDates, formatDate } from '../../utils/timeUtils'
import RhythmRing from './RhythmRing'

const DAY_LABELS = {
  Mon: '周一',
  Tue: '周二',
  Wed: '周三',
  Thu: '周四',
  Fri: '周五',
  Sat: '周六',
  Sun: '周日',
}

export default function RhythmMatrix({ 
  weekStart = new Date(), 
  rhythmData = [], 
  onDateClick,
  size = 80 
}) {
  const weekDates = getWeekDates(weekStart)
  const today = formatDate(new Date(), 'YYYY-MM-DD')

  return (
    <div className="grid grid-cols-7 gap-2">
      {weekDates.map((date, index) => {
        const dateStr = formatDate(date, 'YYYY-MM-DD')
        const dayData = rhythmData.find(d => d.date === dateStr)
        const blocks = dayData?.blocks || []
        const isToday = dateStr === today
        
        const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDateClick && onDateClick(dateStr)}
            className={`
              flex flex-col items-center gap-2 p-2 rounded-2xl
              cursor-pointer transition-all duration-300
              ${isToday 
                ? 'bg-white/80 shadow-lg' 
                : 'bg-white/40 hover:bg-white/60'
              }
            `}
          >
            <p className="text-xs text-[#9a9a9a] font-jp">
              {DAY_LABELS[dayOfWeek]}
            </p>
            
            <div className="relative">
              <RhythmRing 
                blocks={blocks} 
                size={size} 
                strokeWidth={6}
              />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium text-[#3a3a3a]">
                  {date.getDate()}
                </span>
              </div>
            </div>
            
            {isToday && (
              <motion.div
                layoutId="todayIndicator"
                className="w-1.5 h-1.5 rounded-full bg-[#f5a623]"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
