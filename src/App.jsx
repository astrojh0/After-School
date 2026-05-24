import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 模拟数据
const RHYTHM_BLOCKS = [
  { start: '06:00', end: '06:30', label: '起床', type: 'transition' },
  { start: '06:30', end: '08:00', label: '早间准备', type: 'break' },
  { start: '08:00', end: '10:00', label: '上午工作', type: 'focus' },
  { start: '10:00', end: '10:30', label: 'coffee', type: 'break' },
  { start: '10:30', end: '12:00', label: '上午工作', type: 'focus' },
  { start: '12:00', end: '13:00', label: '午休', type: 'break' },
  { start: '13:00', end: '15:00', label: '下午工作', type: 'focus' },
  { start: '15:00', end: '15:30', label: 'tea time', type: 'break' },
  { start: '15:30', end: '17:00', label: '下午工作', type: 'focus' },
  { start: '17:00', end: '18:00', label: '过渡', type: 'transition' },
  { start: '18:00', end: '20:00', label: '晚间时光', type: 'break' },
  { start: '20:00', end: '22:00', label: '自由时间', type: 'break' },
  { start: '22:00', end: '23:00', label: '睡前准备', type: 'transition' },
  { start: '23:00', end: '24:00', label: '睡眠', type: 'break' },
]

const WEEK_DATA = [
  { day: '周一', blocks: [
    { type: 'focus', ratio: 0.6 },
    { type: 'break', ratio: 0.3 },
    { type: 'transition', ratio: 0.1 },
  ]},
  { day: '周二', blocks: [
    { type: 'focus', ratio: 0.55 },
    { type: 'break', ratio: 0.35 },
    { type: 'transition', ratio: 0.1 },
  ]},
  { day: '周三', blocks: [
    { type: 'focus', ratio: 0.65 },
    { type: 'break', ratio: 0.25 },
    { type: 'transition', ratio: 0.1 },
  ]},
  { day: '周四', blocks: [
    { type: 'focus', ratio: 0.5 },
    { type: 'break', ratio: 0.4 },
    { type: 'transition', ratio: 0.1 },
  ]},
  { day: '周五', blocks: [
    { type: 'focus', ratio: 0.45 },
    { type: 'break', ratio: 0.45 },
    { type: 'transition', ratio: 0.1 },
  ]},
  { day: '周六', blocks: [
    { type: 'focus', ratio: 0.1 },
    { type: 'break', ratio: 0.85 },
    { type: 'transition', ratio: 0.05 },
  ]},
  { day: '周日', blocks: [
    { type: 'focus', ratio: 0.05 },
    { type: 'break', ratio: 0.9 },
    { type: 'transition', ratio: 0.05 },
  ]},
]

const START_HOUR = 6
const END_HOUR = 24
const HOUR_HEIGHT = 60

function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function App() {
  const [view, setView] = useState('day')
  const [currentTime, setCurrentTime] = useState(new Date())
  const timelineRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  // 自动滚动到当前时间
  useEffect(() => {
    if (view === 'day' && timelineRef.current) {
      const now = currentTime
      const minutes = now.getHours() * 60 + now.getMinutes()
      const scrollTop = (minutes - START_HOUR * 60) * (HOUR_HEIGHT / 60) - window.innerHeight / 2 + 100
      timelineRef.current.scrollTop = Math.max(0, scrollTop)
    }
  }, [view, currentTime])

  const getCurrentBlock = () => {
    const now = currentTime
    const h = String(now.getHours()).padStart(2, '0')
    const m = String(now.getMinutes()).padStart(2, '0')
    const time = `${h}:${m}`

    for (const block of RHYTHM_BLOCKS) {
      if (time >= block.start && time < block.end) {
        return block
      }
    }
    return null
  }

  const currentBlock = getCurrentBlock()
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()
  const currentTimeY = (currentMinutes - START_HOUR * 60) * (HOUR_HEIGHT / 60)

  const renderBlock = (block, index) => {
    const startMin = timeToMinutes(block.start)
    const endMin = timeToMinutes(block.end)
    const top = (startMin - START_HOUR * 60) * (HOUR_HEIGHT / 60)
    const height = (endMin - startMin) * (HOUR_HEIGHT / 60)
    const isActive = block === currentBlock

    const blockStyles = {
      focus: {
        bg: '#f5a623',
        text: '#0a0a0a',
        border: 'none',
      },
      break: {
        bg: 'rgba(58, 90, 74, 0.5)',
        text: '#9a9a9a',
        border: 'none',
      },
      transition: {
        bg: 'linear-gradient(180deg, #5a4a6a 0%, rgba(90, 74, 106, 0.2) 100%)',
        text: '#b0a0b0',
        border: 'none',
      },
    }

    const style = blockStyles[block.type] || blockStyles.focus

    return (
      <motion.div
        key={`${block.start}-${index}`}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          ...(block.type === 'break' ? { filter: 'blur(0px)' } : {})
        }}
        exit={{ 
          opacity: block.type === 'focus' ? 0.5 : 1,
          transition: { duration: 0.5 }
        }}
        transition={{ 
          duration: block.type === 'focus' ? 0.3 : 0.8,
          ease: 'easeOut'
        }}
        className={`
          absolute left-16 right-4 rounded
          flex items-center px-3 overflow-hidden
          ${block.type === 'break' ? 'animate-breathe' : ''}
        `}
        style={{
          top,
          height,
          background: style.bg,
          color: style.text,
          border: isActive ? '2px solid rgba(245, 166, 35, 0.5)' : style.border,
          boxShadow: isActive ? '0 0 20px rgba(245, 166, 35, 0.3)' : 'none',
        }}
      >
        <span className="text-sm font-jp truncate">
          {block.label}
        </span>
      </motion.div>
    )
  }

  const renderTimeAxis = () => {
    const hours = []
    for (let h = START_HOUR; h <= END_HOUR; h++) {
      hours.push(h)
    }
    return hours.map(h => (
      <div
        key={h}
        className="absolute left-0 w-14 flex justify-end pr-2 text-[11px] font-digital text-[#4a4a4a]"
        style={{ top: (h - START_HOUR) * HOUR_HEIGHT }}
      >
        {String(h).padStart(2, '0')}
      </div>
    ))
  }

  const renderDayView = () => (
    <div 
      ref={timelineRef}
      className="relative h-screen overflow-y-auto scrollbar-hide"
    >
      <div 
        className="relative"
        style={{ height: (END_HOUR - START_HOUR) * HOUR_HEIGHT }}
      >
        {/* 时间轴 */}
        <div className="absolute left-0 top-0 bottom-0 w-14 bg-[#111111]">
          {renderTimeAxis()}
        </div>

        {/* 网格线 */}
        {Array.from({ length: END_HOUR - START_HOUR + 1 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-14 right-0 border-t border-[#1a1a1a]"
            style={{ top: i * HOUR_HEIGHT }}
          />
        ))}

        {/* Rhythm Blocks */}
        <AnimatePresence>
          {RHYTHM_BLOCKS.map((block, i) => renderBlock(block, i))}
        </AnimatePresence>

        {/* 当前时间线 */}
        {currentTimeY >= 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute left-14 right-0 h-[2px] bg-[#f5a623]"
            style={{ 
              top: currentTimeY,
              boxShadow: '0 0 10px #f5a623, 0 0 20px #f5a623',
            }}
          >
            <div className="absolute -left-1 -top-[3px] w-2 h-2 rounded-full bg-[#f5a623]" />
          </motion.div>
        )}
      </div>
    </div>
  )

  const renderWeekView = () => (
    <div className="h-screen overflow-y-auto p-6">
      <div className="grid grid-cols-7 gap-2 h-full">
        {WEEK_DATA.map((day, i) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`
              flex flex-col rounded-lg overflow-hidden
              ${i === new Date().getDay() - 1 ? 'ring-1 ring-[#f5a623]/30' : ''}
            `}
          >
            {/* 日期标签 */}
            <div className={`
              text-center py-2 text-xs font-jp
              ${i === new Date().getDay() - 1 ? 'text-[#f5a623]' : 'text-[#6a6a6a]'}
            `}>
              {day.day}
            </div>
            
            {/* Rhythm Density */}
            <div className="flex-1 flex flex-col rounded-lg overflow-hidden">
              {day.blocks.map((b, j) => (
                <motion.div
                  key={j}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: i * 0.05 + j * 0.02, duration: 0.3 }}
                  style={{ 
                    flex: b.ratio,
                    backgroundColor: b.type === 'focus' ? '#f5a623' : 
                                    b.type === 'break' ? '#3a5a4a' : '#5a4a6a',
                  }}
                  className="origin-left"
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e4df]">
      {/* View Switcher */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex gap-4">
        {['day', 'week'].map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`
              px-4 py-1.5 text-sm font-jp rounded-full transition-all
              ${view === v 
                ? 'text-[#f5a623] bg-[#f5a623]/10' 
                : 'text-[#4a4a4a] hover:text-[#8a8a8a]'}
            `}
          >
            {v === 'day' ? 'Day' : 'Week'}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {view === 'day' ? renderDayView() : renderWeekView()}
        </motion.div>
      </AnimatePresence>

      {/* 底部装饰 */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
        <span className="text-[#3a3a3a] text-xs tracking-[0.3em] font-jp">
          RHYTHM
        </span>
      </div>
    </div>
  )
}

export default App
