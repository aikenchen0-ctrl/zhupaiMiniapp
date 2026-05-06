const pad = (value) => `${value}`.padStart(2, '0')

const toDayStamp = (date) => {
  const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  return normalized.getTime()
}

const formatDateText = (year, month, day) => `${year}-${pad(month)}-${pad(day)}`

const buildCalendarDays = (year, month, selectedDay, today = new Date()) => {
  const firstWeekday = new Date(year, month - 1, 1).getDay()
  const dayCount = new Date(year, month, 0).getDate()
  const todayStamp = toDayStamp(today)
  const days = []

  for (let index = 0; index < firstWeekday; index += 1) {
    days.push({ key: `empty-${index}`, day: '', empty: true, active: false, disabled: true })
  }

  for (let day = 1; day <= dayCount; day += 1) {
    const currentStamp = new Date(year, month - 1, day).getTime()
    const disabled = currentStamp < todayStamp
    days.push({
      key: `day-${day}`,
      day,
      empty: false,
      active: !disabled && day === selectedDay,
      disabled
    })
  }

  return days
}

const clampTransportSelection = (selected, key, limit = 2) => {
  const current = Array.isArray(selected) ? selected.filter(Boolean) : []
  if (!key) return current.slice(0, limit)
  if (current.includes(key)) return current.filter((item) => item !== key)
  return [...current, key].slice(-limit)
}

const adjustCommuteMinutes = (value, delta) => Math.max(0, Number(value || 0) + Number(delta || 0))

const getNearbyMatches = (keyword, list) => {
  const normalizedKeyword = `${keyword || ''}`.trim().toLowerCase()
  if (!normalizedKeyword) return list
  return list.filter((item) => {
    const source = [item.name, item.address, item.type, ...(item.keywords || [])].join(' ').toLowerCase()
    return source.includes(normalizedKeyword)
  })
}

const normalizeBudgetRange = (min, max, step = 200) => {
  const minValue = Number(min)
  const maxValue = Number(max)
  if (minValue < maxValue) return { min: minValue, max: maxValue }
  return {
    min: maxValue,
    max: minValue === maxValue ? maxValue + step : minValue
  }
}

module.exports = {
  buildCalendarDays,
  clampTransportSelection,
  adjustCommuteMinutes,
  formatDateText,
  getNearbyMatches,
  normalizeBudgetRange
}
