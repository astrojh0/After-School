import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import RhythmMatrix from '../components/rhythm/RhythmMatrix'
import RhythmRing from '../components/rhythm/RhythmRing'
import FloatingCard from '../components/common/FloatingCard'
import useRhythmStore from '../context/RhythmContext'
import { WEEK_DATA } from '../data/mockData'
import { getWeekDates, formatDate } from '../utils/timeUtils'

export default function PlanPage() {
  const { selectedDate, setSelectedDate, setActiveTab } = useRhythmStore()
  
  const weekDates = getWeekDates(selectedDate)
  const weekStart = weekDates[0]
  
  const handlePrevWeek = () => {
    const prevWeek = new Date(weekStart)
    prevWeek.setDate(prevWeek.getDate() - 7)
    setSelectedDate(prevWeek)
  }
  
  const handleNextWeek = () => {
    const nextWeek = new Date(weekStart)
    nextWeek.setDate(nextWeek.getDate() + 7)
    setSelectedDate(nextWeek)
  }
  
  const handleDateClick = (dateStr) => {
    setActiveTab('today')
  }

  const todayBlocks = WEEK_DATA[0]?.blocks || []

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-8 pb-6"
      >
        <h1 className="text-xs tracking-[0.3em] text-[#9a9a9a] font-jp mb-2">
          Rhythm Matrix
        </h1>
        <div className="flex items-center justify-between">
          <div 
            className="text-2xl font-jp font-medium text-[#3a3a3a]"
          >
            本周预览
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevWeek}
              className="p-2 rounded-full bg-white/60 hover:bg-white/80 transition-colors"
            >
              <ChevronLeft size={20} className="text-[#3a3a3a]" />
            </motion.button>
            
            <span className="text-sm font-jp text-[#6a6a6a] min-w-[120px] text-center">
              {formatDate(weekStart, 'MM/DD')} - {formatDate(weekDates[6], 'MM/DD')}
            </span>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNextWeek}
              className="p-2 rounded-full bg-white/60 hover:bg-white/80 transition-colors"
            >
              <ChevronRight size={20} className="text-[#3a3a3a]" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 overflow-hidden"
      >
        <div className="space-y-6">
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
            <RhythmMatrix 
              weekStart={selectedDate}
              rhythmData={WEEK_DATA}
              onDateClick={handleDateClick}
              size={60}
            />
          </div>

          <FloatingCard delay={3} className="w-full">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-jp font-medium text-[#3a3a3a] mb-2">
                  今日节奏结构
                </h3>
                <p className="text-xs text-[#9a9a9a]">
                  点击上方日期查看详情
                </p>
              </div>
              
              <RhythmRing 
                blocks={todayBlocks} 
                size={100} 
                strokeWidth={10}
              />
            </div>
          </FloatingCard>

          <FloatingCard delay={4} className="w-full">
            <h3 className="text-sm font-jp font-medium text-[#3a3a3a] mb-3">
              图例
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#f5a623]" />
                <span className="text-xs text-[#6a6a6a] font-jp">专注 Focus</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#5a9a8a]" />
                <span className="text-xs text-[#6a6a6a] font-jp">休息 Break</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#8a7aaa]" />
                <span className="text-xs text-[#6a6a6a] font-jp">过渡 Transition</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#d94a4a]" />
                <span className="text-xs text-[#6a6a6a] font-jp">过载 Overload</span>
              </div>
            </div>
          </FloatingCard>
        </div>
      </motion.div>
    </motion.div>
  )
}
