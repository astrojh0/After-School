import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// 模拟课表
const SCHEDULE = [
  { name: '第1节', start: '09:00', end: '09:45' },
  { name: '第2节', start: '09:55', end: '10:40' },
  { name: '课间', start: '10:40', end: '10:55', type: 'break' },
  { name: '第3节', start: '10:55', end: '11:40' },
  { name: '午休', start: '11:40', end: '13:00', type: 'break' },
  { name: '第4节', start: '13:00', end: '13:45' },
  { name: '第5节', start: '13:55', end: '14:40' },
  { name: '第6节', start: '14:55', end: '15:40' },
]

const DISMISSAL = '15:40'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [status, setStatus] = useState({ name: '', type: '' })

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const now = currentTime
    const day = now.getDay()
    const h = String(now.getHours()).padStart(2, '0')
    const m = String(now.getMinutes()).padStart(2, '0')
    const time = `${h}:${m}`

    if (day === 0 || day === 6) {
      setStatus({ name: '下课了', type: 'weekend' })
      return
    }

    for (const cls of SCHEDULE) {
      if (time >= cls.start && time < cls.end) {
        setStatus({ name: cls.name, type: cls.type || 'class' })
        return
      }
    }

    if (time >= DISMISSAL) {
      setStatus({ name: '放学了', type: 'dismissed' })
    } else if (time < SCHEDULE[0].start) {
      setStatus({ name: '还没上课', type: 'before' })
    } else {
      setStatus({ name: '课间', type: 'break' })
    }
  }, [currentTime])

  const formatTime = (date) => {
    const h = String(date.getHours()).padStart(2, '0')
    const m = String(date.getMinutes()).padStart(2, '0')
    const s = String(date.getSeconds()).padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
      {/* 电子屏发光层 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]" />
      
      {/* CRT 微弱光晕 */}
      <div className="absolute inset-0 bg-radial-glow opacity-40" />

      <div className="relative z-10 flex flex-col items-center justify-center">
        
        {/* 时间 - 视觉中心 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="relative"
        >
          <motion.div
            key={formatTime(currentTime)}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="
              font-digital text-7xl md:text-9xl lg:text-[12rem]
              text-accent tracking-wider
              digital-glow
              animate-breathe
            "
            style={{
              textShadow: `
                0 0 60px rgba(245, 166, 35, 0.4),
                0 0 120px rgba(245, 166, 35, 0.2),
                0 0 180px rgba(245, 166, 35, 0.1)
              `,
            }}
          >
            {formatTime(currentTime)}
          </motion.div>
        </motion.div>

        {/* 状态 - 情绪化表达 */}
        <motion.div
          key={status.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="mt-8 md:mt-12"
        >
          <div className={`
            text-2xl md:text-3xl font-jp font-light
            ${status.type === 'dismissed' ? 'text-accent' : ''}
            ${status.type === 'weekend' ? 'text-[#e8e4df]/60' : ''}
            ${status.type === 'before' ? 'text-[#9a9690]' : ''}
            ${status.type === 'break' ? 'text-accent/70' : ''}
            ${status.type === 'class' ? 'text-[#e8e4df]/40' : ''}
          `}>
            {status.name}
          </div>
        </motion.div>

        {/* 底部装饰 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 1 }}
          className="absolute bottom-12"
        >
          <div className="flex items-center gap-3">
            <div className="w-1 h-1 rounded-full bg-accent/30 animate-pulse" />
            <span className="text-[#9a9690]/20 text-xs tracking-[0.4em] font-jp">
              ADULT AFTER SCHOOL
            </span>
            <div className="w-1 h-1 rounded-full bg-accent/20" />
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default App
