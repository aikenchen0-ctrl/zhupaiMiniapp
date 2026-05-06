const assert = require('assert')
const {
  buildCalendarDays,
  clampTransportSelection,
  adjustCommuteMinutes,
  getNearbyMatches,
  normalizeBudgetRange
} = require('../pages/commute-setting/commute-setting-utils')

const fixedToday = new Date(2026, 4, 6)

{
  const days = buildCalendarDays(2026, 5, 6, fixedToday)
  const pastDay = days.find((item) => item.day === 5)
  const today = days.find((item) => item.day === 6)
  const futureDay = days.find((item) => item.day === 7)

  assert.strictEqual(pastDay.disabled, true)
  assert.strictEqual(today.disabled, false)
  assert.strictEqual(futureDay.disabled, false)
  assert.strictEqual(today.active, true)
}

{
  assert.deepStrictEqual(clampTransportSelection(['walk'], 'subway'), ['walk', 'subway'])
  assert.deepStrictEqual(clampTransportSelection(['walk', 'subway'], 'bike'), ['subway', 'bike'])
  assert.deepStrictEqual(clampTransportSelection(['walk', 'subway'], 'walk'), ['subway'])
  assert.deepStrictEqual(clampTransportSelection([], 'drive'), ['drive'])
}

{
  assert.strictEqual(adjustCommuteMinutes(0, -10), 0)
  assert.strictEqual(adjustCommuteMinutes(20, -10), 10)
  assert.strictEqual(adjustCommuteMinutes(20, 10), 30)
}

{
  const all = getNearbyMatches('', [
    { name: '高新园地铁站', keywords: ['地铁', '交通'] },
    { name: '万象天地', keywords: ['商场'] }
  ])
  const filtered = getNearbyMatches('地铁', all)

  assert.strictEqual(all.length, 2)
  assert.strictEqual(filtered.length, 1)
  assert.strictEqual(filtered[0].name, '高新园地铁站')
}

{
  assert.deepStrictEqual(normalizeBudgetRange(2600, 1800), { min: 1800, max: 2600 })
  assert.deepStrictEqual(normalizeBudgetRange(2200, 2200), { min: 2200, max: 2400 })
}

console.log('commute-setting-utils tests passed')
