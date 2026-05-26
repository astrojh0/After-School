import { motion } from 'framer-motion'
import { Settings, Flame, Clock, TrendingUp } from 'lucide-react'
import CharacterAvatar from '../components/character/CharacterAvatar'
import FloatingCard from '../components/common/FloatingCard'
import StatusCard from '../components/common/StatusCard'
import useRhythmStore from '../context/RhythmContext'

export default function MePage() {
  const { stats, activeTab, setActiveTab } = useRhythmStore()

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
        className="pt-8 pb-6 flex items-start justify-between"
      >
        <div>
          <h1 className="text-xs tracking-[0.3em] text-[#9a9a9a] font-jp mb-2">
            Profile
          </h1>
          <div className="text-2xl font-jp font-medium text-[#3a3a3a]">
            我的节奏
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveTab('settings')}
          className="p-3 rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-sm shadow-sm transition-all"
        >
          <Settings size={24} className="text-[#3a3a3a]" />
        </motion.button>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center py-8"
      >
        <CharacterAvatar state="focus" size="md" animated={false} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex-1 space-y-4 pb-24"
      >
        <FloatingCard delay={4} className="w-full">
          <div className="flex items-center gap-3 mb-4">
            <Flame size={20} className="text-[#f5a623]" />
            <span className="text-sm font-jp font-medium text-[#3a3a3a]">
              连续记录
            </span>
          </div>
          
          <div className="flex items-end gap-2">
            <span className="text-4xl font-digital font-bold text-[#f5a623]">
              {stats.currentStreak}
            </span>
            <span className="text-sm text-[#9a9a9a] mb-1">天</span>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-[#9a9a9a]">
              <span>最长连续</span>
              <span className="font-medium text-[#6a6a6a]">
                {stats.longestStreak} 天
              </span>
            </div>
          </div>
        </FloatingCard>

        <div className="grid grid-cols-2 gap-3">
          <StatusCard
            title="本周专注"
            value={`${stats.totalFocusHours}h`}
            subtitle="总计"
            color="#5a9a8a"
          />
          
          <StatusCard
            title="今日状态"
            value="良好"
            subtitle="持续优化中"
            color="#8a7aaa"
          />
        </div>

        <FloatingCard delay={6} className="w-full">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={20} className="text-[#5a9a8a]" />
            <span className="text-sm font-jp font-medium text-[#3a3a3a]">
              本周趋势
            </span>
          </div>
          
          <div className="flex items-end justify-between gap-2 h-20">
            {stats.weeklyData.map((hours, index) => {
              const maxHours = Math.max(...stats.weeklyData)
              const height = (hours / maxHours) * 100
              const days = ['一', '二', '三', '四', '五', '六', '日']
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="w-full bg-gradient-to-t from-[#5a9a8a] to-[#7aba9a] rounded-t-lg"
                    style={{ minHeight: '4px' }}
                  />
                  <span className="text-xs text-[#9a9a9a] font-jp">
                    {days[index]}
                  </span>
                </div>
              )
            })}
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-[#9a9a9a]">
              <span>日均专注</span>
              <span className="font-medium text-[#6a6a6a]">
                {Math.round(stats.weeklyData.reduce((a, b) => a + b, 0) / 7 * 10) / 10} 小时
              </span>
            </div>
          </div>
        </FloatingCard>

        <FloatingCard delay={7} className="w-full">
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-[#8a7aaa]" />
            <span className="text-sm font-jp font-medium text-[#3a3a3a]">
              使用统计
            </span>
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#9a9a9a]">总记录天数</span>
              <span className="font-medium text-[#6a6a6a]">45 天</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#9a9a9a]">完成节奏块</span>
              <span className="font-medium text-[#6a6a6a]">328 个</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#9a9a9a]">平均每日专注</span>
              <span className="font-medium text-[#6a6a6a]">5.2 小时</span>
            </div>
          </div>
        </FloatingCard>
      </motion.div>
    </motion.div>
  )
}
