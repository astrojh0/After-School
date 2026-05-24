import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 角色状态配置
const CHARACTER_STATES = {
  focus: {
    emoji: '😊',
    label: 'Calm Focus',
    face: '╭(◔▽◔)╮',
    color: '#f5a623',
    bg: 'rgba(245, 166, 35, 0.15)',
    animation: 'breathe-slow',
    description: '专注中',
  },
  break: {
    emoji: '😌',
    label: 'Relaxed',
    face: '(◕‿◕)',
    color: '#5a9a8a',
    bg: 'rgba(90, 154, 138, 0.15)',
    animation: 'float',
    description: '休息中',
  },
  overload: {
    emoji: '😵',
    label: 'Overload',
    face: '(°o°)',
    color: '#d94a4a',
    bg: 'rgba(217, 74, 74, 0.15)',
    animation: 'shake',
    description: '过载了',
  },
  transition: {
    emoji: '🤔',
    label: 'Shifting',
    face: '(・_・)',
    color: '#8a7aaa',
    bg: 'rgba(138, 122, 170, 0.15)',
    animation: 'morph',
    description: '过渡中',
  },
}

// 模拟节奏数据
const RHYTHM_BLOCKS = [
  { start: '06:00', end: '06:30', label: '起床', type: 'transition' },
  { start: '06:30', end: '08:00', label: '早间准备', type: 'break' },
  { start: '08:00', end: '10:00', label: '日语学习', type: 'focus' },
  { start: '10:00', end: '10:30', label: 'coffee break', type: 'break' },
  { start: '10:30', end: '12:00', label: '深度工作', type: 'focus' },
  { start: '12:00', end: '13:00', label: '午休', type: 'break' },
  { start: '13:00', end: '15:00', label: '下午工作', type: 'focus' },
  { start: '15:00', end: '15:30', label: 'tea time', type: 'break' },
  { start: '15:30', end: '17:00', label: '收尾工作', type: 'focus' },
  { start: '17:00', end: '18:00', label: '过渡', type: 'transition' },
  { start: '18:00', end: '20:00', label: '晚间时光', type: 'break' },
  { start: '20:00', end: '22:00', label: '自由时间', type: 'break' },
  { start: '22:00', end: '23:00', label: '睡前准备', type: 'transition' },
  { start: '23:00', end: '24:00', label: '睡眠', type: 'break' },
]

function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentBlock, setCurrentBlock] = useState(null)
  const [view, setView] = useState('home')

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const now = currentTime
    const h = String(now.getHours()).padStart(2, '0')
    const m = String(now.getMinutes()).padStart(2, '0')
    const time = `${h}:${m}`

    for (const block of RHYTHM_BLOCKS) {
      if (time >= block.start && time < block.end) {
        setCurrentBlock(block)
        return
      }
    }
    setCurrentBlock({ label: '休息中', type: 'break' })
  }, [currentTime])

  const currentState = currentBlock ? CHARACTER_STATES[currentBlock.type] : CHARACTER_STATES.break

  // 计算剩余时间
  const getRemainingTime = () => {
    if (!currentBlock || currentBlock.type === 'break') return null
    
    const now = currentTime
    const endMin = timeToMinutes(currentBlock.end)
    const nowMin = now.getHours() * 60 + now.getMinutes()
    const diff = endMin - nowMin
    
    if (diff <= 0) return '0 min'
    if (diff < 60) return `${diff} min`
    return `${Math.floor(diff / 60)}h ${diff % 60}m`
  }

  // 找到下一段休息
  const getNextBreak = () => {
    const now = currentTime
    const nowMin = now.getHours() * 60 + now.getMinutes()
    
    for (const block of RHYTHM_BLOCKS) {
      const blockMin = timeToMinutes(block.start)
      if (blockMin > nowMin && block.type === 'break') {
        return block.label
      }
    }
    return null
  }

  const remainingTime = getRemainingTime()
  const nextBreak = getNextBreak()

  // 动画变体
  const getAnimationVariants = () => {
    switch (currentBlock?.type) {
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
    <div className="min-h-screen bg-[#f5f3f0] text-[#3a3a3a] overflow-hidden">
      {/* 柔和背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#e8e4df] rounded-full opacity-60 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#e0dcd7] rounded-full opacity-50 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-md mx-auto min-h-screen p-6 flex flex-col">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 pb-6"
        >
          <h1 className="text-xs tracking-[0.3em] text-[#9a9a9a] font-jp mb-2">
            Today Rhythm
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{currentState.emoji}</span>
            <span 
              className="text-2xl font-jp font-medium"
              style={{ color: currentState.color }}
            >
              {currentState.label}
            </span>
          </div>
        </motion.header>

        {/* 主角色展示卡片 */}
        <motion.main
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex-1 flex flex-col items-center justify-center"
        >
          {/* 角色球 */}
          <motion.div
            animate={getAnimationVariants().animate}
            transition={getAnimationVariants().transition}
            className="relative"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="w-48 h-48 rounded-full flex items-center justify-center text-6xl shadow-2xl"
              style={{ 
                backgroundColor: currentState.bg,
                boxShadow: `0 20px 60px ${currentState.color}30, 0 0 0 8px ${currentState.color}10`
              }}
            >
              {currentState.face}
            </motion.div>
          </motion.div>

          {/* 状态描述 */}
          <motion.div
            key={currentBlock?.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-center"
          >
            <p className="text-lg font-jp text-[#6a6a6a]">
              {currentBlock?.label || '休息中'}
            </p>
          </motion.div>

          {/* 剩余时间 & 下次休息 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 w-full space-y-3"
          >
            {remainingTime && (
              <div className="bg-white/60 rounded-2xl p-4 text-center shadow-sm">
                <p className="text-xs text-[#9a9a9a] mb-1">当前时段剩余</p>
                <p className="text-xl font-jp" style={{ color: currentState.color }}>
                  {remainingTime}
                </p>
              </div>
            )}
            
            {nextBreak && (
              <div className="bg-white/40 rounded-2xl p-3 text-center">
                <p className="text-xs text-[#9a9a9a]">下次休息</p>
                <p className="text-sm font-jp text-[#6a6a6a]">{nextBreak}</p>
              </div>
            )}
          </motion.div>
        </motion.main>

        {/* 底部导航 */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="pb-8"
        >
          <div className="flex justify-center gap-2">
            {[
              { key: 'home', label: 'Home' },
              { key: 'timeline', label: 'Timeline' },
              { key: 'stats', label: 'Stats' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setView(item.key)}
                className={`
                  px-6 py-2 rounded-full text-sm font-jp transition-all
                  ${view === item.key 
                    ? 'bg-[#3a3a3a] text-white shadow-lg' 
                    : 'bg-white/50 text-[#9a9a9a] hover:bg-white/70'}
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.nav>
      </div>
    </div>
  )
}

export default App
