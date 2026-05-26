export function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

export function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export function timeDifference(start, end) {
  return timeToMinutes(end) - timeToMinutes(start)
}

export function isTimeInRange(time, start, end) {
  const t = timeToMinutes(time)
  const s = timeToMinutes(start)
  const e = timeToMinutes(end)
  return t >= s && t < e
}

export function calculateRatio(start, end) {
  const duration = timeDifference(start, end)
  return duration / (24 * 60)
}

export function formatRemainingTime(minutes) {
  if (minutes <= 0) return '0 min'
  if (minutes < 60) return `${minutes} min`
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`
}

export function getWeekDates(date) {
  const week = []
  const start = getMonday(date)
  
  for (let i = 0; i < 7; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    week.push(d)
  }
  
  return week
}

export function getMonday(date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  return d
}

export function formatDate(date, format = 'YYYY-MM-DD') {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  
  return format
    .replace('YYYY', y)
    .replace('MM', m)
    .replace('DD', d)
}

export function getCurrentTimeString() {
  const now = new Date()
  const h = String(now.getHours()).padStart(2, '0')
  const m = String(now.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}
