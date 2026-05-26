import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BottomNav from './components/navigation/BottomNav'
import TodayPage from './pages/TodayPage'
import PlanPage from './pages/PlanPage'
import MePage from './pages/MePage'
import SettingsPage from './pages/SettingsPage'

function App() {
  const [activeTab, setActiveTab] = useState('today')

  useEffect(() => {
    const savedTab = localStorage.getItem('rhythmActiveTab')
    if (savedTab) {
      setActiveTab(savedTab)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('rhythmActiveTab', activeTab)
  }, [activeTab])

  const renderPage = () => {
    switch (activeTab) {
      case 'today':
        return <TodayPage key="today" />
      case 'plan':
        return <PlanPage key="plan" />
      case 'me':
        return <MePage key="me" />
      case 'settings':
        return <SettingsPage key="settings" />
      default:
        return <TodayPage key="today" />
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f3f0] text-[#3a3a3a] overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#e8e4df] rounded-full opacity-60 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#e0dcd7] rounded-full opacity-50 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-md mx-auto min-h-screen p-6 flex flex-col">
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        {activeTab !== 'settings' && (
          <BottomNav 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
        )}
      </div>

      <div aria-live="polite" className="sr-only">
        {activeTab === 'today' && '今日页面 - 查看当前节奏状态'}
        {activeTab === 'plan' && '计划页面 - 查看本周节奏矩阵'}
        {activeTab === 'me' && '个人页面 - 查看统计数据'}
        {activeTab === 'settings' && '设置页面 - 自定义应用设置'}
      </div>
    </div>
  )
}

export default App
