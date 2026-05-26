import { create } from 'zustand'
import { RHYTHM_BLOCKS, USER_STATS, DEFAULT_SETTINGS } from '../data/mockData'
import { isTimeInRange, getCurrentTimeString } from '../utils/timeUtils'

const useRhythmStore = create((set, get) => ({
  currentDate: new Date(),
  currentBlock: null,
  settings: DEFAULT_SETTINGS,
  activeTab: 'today',
  selectedDate: new Date(),
  stats: USER_STATS,

  setActiveTab: (tab) => set({ activeTab: tab }),
  
  setSelectedDate: (date) => set({ selectedDate: date }),

  setSettings: (newSettings) => set({ settings: newSettings }),

  updateCurrentBlock: () => {
    const time = getCurrentTimeString()
    const block = RHYTHM_BLOCKS.find(b => 
      isTimeInRange(time, b.start, b.end)
    )
    set({ currentBlock: block || { label: '休息中', type: 'break' } })
  },

  getRemainingTime: () => {
    const { currentBlock } = get()
    if (!currentBlock || currentBlock.type === 'break') return null
    
    const now = new Date()
    const [endH, endM] = currentBlock.end.split(':').map(Number)
    const nowMin = now.getHours() * 60 + now.getMinutes()
    const endMin = endH * 60 + endM
    const diff = endMin - nowMin
    
    if (diff <= 0) return '0 min'
    if (diff < 60) return `${diff} min`
    return `${Math.floor(diff / 60)}h ${diff % 60}m`
  },

  getNextBreak: () => {
    const now = new Date()
    const nowMin = now.getHours() * 60 + now.getMinutes()
    
    for (const block of RHYTHM_BLOCKS) {
      const [h, m] = block.start.split(':').map(Number)
      const blockMin = h * 60 + m
      if (blockMin > nowMin && block.type === 'break') {
        return block.label
      }
    }
    return null
  },
}))

export default useRhythmStore
