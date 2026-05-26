import { useEffect } from 'react'
import { motion } from 'framer-motion'
import CharacterAvatar from '../components/character/CharacterAvatar'
import RhythmTimeline from '../components/rhythm/RhythmTimeline'
import StatusCard from '../components/common/StatusCard'
import FloatingCard from '../components/common/FloatingCard'
import useRhythmStore from '../context/RhythmContext'
import { RHYTHM_BLOCKS } from '../data/mockData'

export default function TodayPage() {
  const { currentBlock, updateCurrentBlock, getRemainingTime, getNextBreak } = useRhythmStore()

  useEffect(() => {
    updateCurrentBlock()
    const interval = setInterval(updateCurrentBlock, 60000)
    return () => clearInterval(interval)
  }, [updateCurrentBlock])

  const remainingTime = getRemainingTime()
  const nextBreak = getNextBreak()

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
          Today Rhythm
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-2xl">
            {currentBlock?.type === 'focus' ? '😊' : 
             currentBlock?.type === 'break' ? '😌' : 
             currentBlock?.type === 'overload' ? '😵' : '🤔'}
          </span>
          <span 
            className="text-2xl font-jp font-medium"
            style={{ 
              color: currentBlock?.type === 'focus' ? '#f5a623' :
                     currentBlock?.type === 'break' ? '#5a9a8a' :
                     currentBlock?.type === 'overload' ? '#d94a4a' : '#8a7aaa'
            }}
          >
            {currentBlock?.type === 'focus' ? 'Calm Focus' :
             currentBlock?.type === 'break' ? 'Relaxed' :
             currentBlock?.type === 'overload' ? 'Overload' : 'Shifting'}
          </span>
        </div>
      </motion.header>

      <motion.main
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex-1 flex flex-col items-center justify-center -mt-16"
      >
        <CharacterAvatar state={currentBlock?.type || 'break'} size="lg" animated={true} />

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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 w-full max-w-sm space-y-3"
        >
          {remainingTime && (
            <StatusCard
              title="当前时段剩余"
              value={remainingTime}
              color={currentBlock?.type === 'focus' ? '#f5a623' : '#5a9a8a'}
            />
          )}
          
          {nextBreak && (
            <FloatingCard delay={5}>
              <p className="text-xs text-[#9a9a9a]">下次休息</p>
              <p className="text-sm font-jp text-[#6a6a6a]">{nextBreak}</p>
            </FloatingCard>
          )}
        </motion.div>
      </motion.main>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 mb-24"
      >
        <h2 className="text-xs text-[#9a9a9a] mb-3 font-jp">Rhythm Timeline</h2>
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
          <RhythmTimeline blocks={RHYTHM_BLOCKS} />
        </div>
      </motion.div>
    </motion.div>
  )
}
