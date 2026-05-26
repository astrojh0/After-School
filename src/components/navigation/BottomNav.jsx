import { motion } from 'framer-motion'
import { Home, Calendar, User } from 'lucide-react'

const tabs = [
  { key: 'today', label: 'Today', icon: Home },
  { key: 'plan', label: 'Plan', icon: Calendar },
  { key: 'me', label: 'Me', icon: User },
]

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="fixed bottom-0 left-0 right-0 pb-6 px-4 z-50"
    >
      <div className="max-w-md mx-auto">
        <div className="flex justify-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.key
            
            return (
              <motion.button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative px-6 py-2.5 rounded-full text-sm font-jp
                  transition-all duration-300 ease-out
                  flex items-center gap-2
                  ${isActive 
                    ? 'bg-[#3a3a3a] text-white shadow-lg' 
                    : 'bg-white/70 text-[#9a9a9a] hover:bg-white/90 backdrop-blur-sm'
                  }
                `}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <Icon size={18} />
                </motion.div>
                <span className={isActive ? 'font-medium' : ''}>
                  {tab.label}
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}
