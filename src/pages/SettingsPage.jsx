import { motion } from 'framer-motion'
import { ArrowLeft, Palette, Sparkles, User } from 'lucide-react'
import FloatingCard from '../components/common/FloatingCard'
import useRhythmStore from '../context/RhythmContext'

const THEME_OPTIONS = [
  { value: 'warm', label: '温暖', color: '#f5a623', description: '柔和暖色调' },
  { value: 'cool', label: '清凉', color: '#5a9a8a', description: '清新冷色调' },
  { value: 'dark', label: '深邃', color: '#8a7aaa', description: '优雅深色调' },
]

const UI_STYLE_OPTIONS = [
  { value: 'soft', label: '柔和', description: '圆角、柔软阴影' },
  { value: 'minimal', label: '极简', description: '直线、锐利边缘' },
  { value: 'playful', label: '活泼', description: '彩色、动态效果' },
]

const CHARACTER_STYLE_OPTIONS = [
  { value: 'default', label: '默认', emoji: '😊' },
  { value: 'minimal', label: '简约', emoji: '◔◔' },
  { value: 'emoji', label: '表情', emoji: '😌' },
]

export default function SettingsPage() {
  const { settings, setSettings, activeTab, setActiveTab } = useRhythmStore()

  const handleThemeChange = (theme) => {
    setSettings({ ...settings, theme })
  }

  const handleUIStyleChange = (uiStyle) => {
    setSettings({ ...settings, uiStyle })
  }

  const handleCharacterStyleChange = (characterStyle) => {
    setSettings({ ...settings, characterStyle })
  }

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
        className="pt-8 pb-6 flex items-center gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveTab('me')}
          className="p-3 rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-sm shadow-sm transition-all"
        >
          <ArrowLeft size={24} className="text-[#3a3a3a]" />
        </motion.button>
        
        <div>
          <h1 className="text-xs tracking-[0.3em] text-[#9a9a9a] font-jp mb-2">
            Settings
          </h1>
          <div className="text-2xl font-jp font-medium text-[#3a3a3a]">
            设置
          </div>
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 space-y-6 overflow-y-auto pb-24"
      >
        <FloatingCard delay={3} className="w-full">
          <div className="flex items-center gap-3 mb-4">
            <Palette size={20} className="text-[#f5a623]" />
            <span className="text-sm font-jp font-medium text-[#3a3a3a]">
              主题颜色
            </span>
          </div>
          
          <div className="space-y-3">
            {THEME_OPTIONS.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleThemeChange(option.value)}
                className={`
                  w-full p-3 rounded-xl transition-all
                  flex items-center gap-3
                  ${settings.theme === option.value 
                    ? 'bg-white/90 shadow-md' 
                    : 'bg-white/60 hover:bg-white/80'
                  }
                `}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: option.color }}
                >
                  {settings.theme === option.value && (
                    <motion.div
                      layoutId="themeCheck"
                      className="w-4 h-4 rounded-full bg-white"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-jp font-medium text-[#3a3a3a]">
                    {option.label}
                  </p>
                  <p className="text-xs text-[#9a9a9a]">
                    {option.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </FloatingCard>

        <FloatingCard delay={4} className="w-full">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles size={20} className="text-[#5a9a8a]" />
            <span className="text-sm font-jp font-medium text-[#3a3a3a]">
              UI 风格
            </span>
          </div>
          
          <div className="space-y-3">
            {UI_STYLE_OPTIONS.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleUIStyleChange(option.value)}
                className={`
                  w-full p-3 rounded-xl transition-all
                  ${settings.uiStyle === option.value 
                    ? 'bg-white/90 shadow-md' 
                    : 'bg-white/60 hover:bg-white/80'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-sm font-jp font-medium text-[#3a3a3a]">
                      {option.label}
                    </p>
                    <p className="text-xs text-[#9a9a9a]">
                      {option.description}
                    </p>
                  </div>
                  
                  {settings.uiStyle === option.value && (
                    <motion.div
                      layoutId="uiStyleCheck"
                      className="w-5 h-5 rounded-full bg-[#5a9a8a] flex items-center justify-center"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    >
                      <span className="text-white text-xs">✓</span>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </FloatingCard>

        <FloatingCard delay={5} className="w-full">
          <div className="flex items-center gap-3 mb-4">
            <User size={20} className="text-[#8a7aaa]" />
            <span className="text-sm font-jp font-medium text-[#3a3a3a]">
              角色样式
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {CHARACTER_STYLE_OPTIONS.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCharacterStyleChange(option.value)}
                className={`
                  p-4 rounded-xl transition-all flex flex-col items-center gap-2
                  ${settings.characterStyle === option.value 
                    ? 'bg-white/90 shadow-md' 
                    : 'bg-white/60 hover:bg-white/80'
                  }
                `}
              >
                <span className="text-3xl">{option.emoji}</span>
                <span className="text-xs font-jp text-[#6a6a6a]">
                  {option.label}
                </span>
              </motion.button>
            ))}
          </div>
        </FloatingCard>

        <FloatingCard delay={6} className="w-full">
          <div className="text-center py-4">
            <p className="text-xs text-[#9a9a9a] font-jp mb-1">
              Rhythm Plan System
            </p>
            <p className="text-xs text-[#9a9a9a]">
              Version 1.0.0
            </p>
            <p className="text-xs text-[#9a9a9a] mt-2">
              让节奏成为生活的一部分
            </p>
          </div>
        </FloatingCard>
      </motion.div>
    </motion.div>
  )
}
