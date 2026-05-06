const HOUSE_CARD_KEY = 'housing_user_house_card'
const COMMUTE_RECORD_KEY = 'housing_commute_records'
const {
  adjustCommuteMinutes,
  buildCalendarDays,
  clampTransportSelection,
  formatDateText,
  getNearbyMatches,
  normalizeBudgetRange
} = require('./commute-setting-utils')

const BUDGET_OPTIONS = [1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3500, 4000, 5000, 6000]

const NEARBY_MOCK_OPTIONS = [
  { key: 'subway-gaoxinyuan', name: '高新园地铁站', type: '地铁', address: '南山区深南大道', distance: '约 420 米', keywords: ['地铁', '交通', '高新园'] },
  { key: 'mall-mixc', name: '万象天地', type: '商场', address: '南山区粤海街道', distance: '约 860 米', keywords: ['商场', '购物', '餐饮'] },
  { key: 'market-keyuan', name: '科苑生鲜市场', type: '菜场', address: '科苑路附近', distance: '约 610 米', keywords: ['菜场', '买菜', '生鲜'] },
  { key: 'fitness-vanke', name: '万科云城健身房', type: '健身房', address: '留仙大道附近', distance: '约 980 米', keywords: ['健身', '运动'] },
  { key: 'hospital-sz', name: '深圳大学总医院门诊点', type: '医院', address: '学苑大道附近', distance: '约 1.6 公里', keywords: ['医院', '门诊'] },
  { key: 'park-talent', name: '深圳人才公园', type: '公园', address: '后海片区', distance: '约 2.1 公里', keywords: ['公园', '散步'] }
]

Page({
  data: {
    statusBarHeight: 20,
    menuTop: 20,
    menuHeight: 32,
    menuRightGap: 16,
    currentStep: 1,
    totalSteps: 5,
    toastText: '',
    showRealNameModal: false,
    selectedDateText: '',
    yearOptions: [],
    selectedYearIndex: 0,
    selectedYear: 2026,
    selectedMonth: 5,
    selectedDay: 6,
    weekLabels: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    calendarDays: [],
    selectedTransports: ['subway'],
    selectedTransportMap: { subway: true },
    selectedTransportDetails: [],
    commuteTimes: { subway: 0 },
    commuteAddress: '',
    commuteLocation: null,
    budgetMin: 1600,
    budgetMax: 1800,
    budgetOptions: BUDGET_OPTIONS.map((value) => ({ value, text: `${value}` })),
    budgetPickerValue: [3, 4],
    selectedPreferenceMap: {},
    nearbyKeyword: '',
    nearbyOptions: NEARBY_MOCK_OPTIONS,
    filteredNearbyOptions: NEARBY_MOCK_OPTIONS,
    realNameForm: {
      name: '',
      idNumber: ''
    },
    stepItems: [
      { value: 1, text: '第1步' },
      { value: 2, text: '第2步' },
      { value: 3, text: '第3步' },
      { value: 4, text: '第4步' },
      { value: 5, text: '第5步' }
    ],
    transportOptions: [
      { key: 'bike', name: '骑车', icon: 'cycle' },
      { key: 'subway', name: '公交地铁', icon: 'train' },
      { key: 'walk', name: '步行', icon: 'walk' },
      { key: 'drive', name: '乘车', icon: 'car' }
    ],
    minBudgetOptions: [
      { value: 2200, text: '2200' },
      { value: 2000, text: '2000' },
      { value: 1800, text: '1800' },
      { value: 1600, text: '1600' },
      { value: 1400, text: '1400' },
      { value: 1200, text: '1200' },
      { value: 1000, text: '1000' }
    ],
    maxBudgetOptions: [
      { value: 2400, text: '2400' },
      { value: 2200, text: '2200' },
      { value: 2000, text: '2000' },
      { value: 1800, text: '1800' },
      { value: 1600, text: '1600' },
      { value: 1400, text: '1400' },
      { value: 1200, text: '1200' }
    ],
    preferenceOptions: [
      { key: 'subway', name: '地铁', icon: 'rail' },
      { key: 'supermarket', name: '超市', icon: 'store' },
      { key: 'hospital', name: '医院', icon: 'plus' },
      { key: 'park', name: '公园', icon: 'tree' },
      { key: 'pet', name: '宠物', icon: 'pet' },
      { key: 'fitness', name: '健身房', icon: 'gym' },
      { key: 'school', name: '学校', icon: 'book' },
      { key: 'pool', name: '游泳', icon: 'wave' },
      { key: 'garage', name: '车库', icon: 'garage' },
      { key: 'mall', name: '商场', icon: 'bag' },
      { key: 'market', name: '菜场', icon: 'dish' }
    ]
  },

  onLoad() {
    const windowInfo = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()
    const menuButton = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null
    const menuRightGap = menuButton && menuButton.left
      ? Math.max(16, windowInfo.windowWidth - menuButton.left + 8)
      : 16
    const menuTop = menuButton && typeof menuButton.top === 'number' ? menuButton.top : (windowInfo.statusBarHeight || 20) + 4
    const menuHeight = menuButton && menuButton.height ? menuButton.height : 32
    const savedCard = wx.getStorageSync(HOUSE_CARD_KEY) || {}
    const now = new Date()
    const yearOptions = this.buildYearOptions(now)
    const dateState = this.normalizeSelectedDate(
      savedCard.moveInYear || now.getFullYear(),
      savedCard.moveInMonth || now.getMonth() + 1,
      savedCard.moveInDay || now.getDate(),
      now
    )
    const selectedTransports = this.normalizeSavedTransports(savedCard)
    const commuteTimes = this.normalizeCommuteTimes(savedCard.commuteTimes, selectedTransports)
    const budgetState = this.getBudgetState(savedCard.budgetMin || 1600, savedCard.budgetMax || 1800)
    const selectedPreferenceMap = (savedCard.preferences || []).reduce((result, key) => {
      result[key] = true
      return result
    }, {})
    this.setData({
      statusBarHeight: windowInfo.statusBarHeight || 20,
      menuTop,
      menuHeight,
      menuRightGap,
      yearOptions,
      selectedYearIndex: Math.max(0, yearOptions.findIndex((item) => item.value === dateState.year)),
      selectedYear: dateState.year,
      selectedMonth: dateState.month,
      selectedDay: dateState.day,
      selectedTransports,
      selectedTransportMap: this.buildSelectedTransportMap(selectedTransports),
      commuteTimes,
      selectedTransportDetails: this.getSelectedTransportDetails(selectedTransports, commuteTimes),
      commuteAddress: savedCard.commuteAddress || savedCard.commutePoint || '',
      commuteLocation: savedCard.commuteLocation || null,
      budgetMin: budgetState.min,
      budgetMax: budgetState.max,
      budgetPickerValue: budgetState.pickerValue,
      selectedPreferenceMap,
      filteredNearbyOptions: getNearbyMatches('', NEARBY_MOCK_OPTIONS),
      selectedDateText: formatDateText(dateState.year, dateState.month, dateState.day),
      calendarDays: buildCalendarDays(dateState.year, dateState.month, dateState.day, now)
    })
  },

  goBack() {
    if (this.data.currentStep > 1) {
      this.setData({ currentStep: this.data.currentStep - 1 })
      return
    }
    if (getCurrentPages().length > 1) {
      wx.navigateBack()
      return
    }
    wx.reLaunch({ url: '/pages/index/index' })
  },

  onStepTap(event) {
    const step = Number(event.currentTarget.dataset.step)
    if (!step || step > this.data.currentStep) return
    this.setData({ currentStep: step })
  },

  onCalendarDayTap(event) {
    const day = Number(event.currentTarget.dataset.day)
    const disabled = event.currentTarget.dataset.disabled === true || event.currentTarget.dataset.disabled === 'true'
    if (!day || disabled) return
    this.setData({
      selectedDay: day,
      selectedDateText: formatDateText(this.data.selectedYear, this.data.selectedMonth, day),
      calendarDays: buildCalendarDays(this.data.selectedYear, this.data.selectedMonth, day)
    })
  },

  onYearChange(event) {
    const selectedYearIndex = Number(event.detail.value)
    const selectedYear = this.data.yearOptions[selectedYearIndex].value
    const maxDay = new Date(selectedYear, this.data.selectedMonth, 0).getDate()
    const dateState = this.normalizeSelectedDate(selectedYear, this.data.selectedMonth, Math.min(this.data.selectedDay, maxDay))
    this.setData({
      selectedYearIndex,
      selectedYear: dateState.year,
      selectedMonth: dateState.month,
      selectedDay: dateState.day,
      selectedDateText: formatDateText(dateState.year, dateState.month, dateState.day),
      calendarDays: buildCalendarDays(dateState.year, dateState.month, dateState.day)
    })
  },

  onMonthSwitch(event) {
    const delta = Number(event.currentTarget.dataset.delta)
    const base = new Date(this.data.selectedYear, this.data.selectedMonth - 1 + delta, 1)
    const targetYear = base.getFullYear()
    const firstYear = this.data.yearOptions[0].value
    const lastYear = this.data.yearOptions[this.data.yearOptions.length - 1].value
    if (targetYear < firstYear || targetYear > lastYear) return
    const selectedMonth = base.getMonth() + 1
    const maxDay = new Date(targetYear, selectedMonth, 0).getDate()
    const dateState = this.normalizeSelectedDate(targetYear, selectedMonth, Math.min(this.data.selectedDay, maxDay))
    const selectedYearIndex = Math.max(0, this.data.yearOptions.findIndex((item) => item.value === dateState.year))
    this.setData({
      selectedYearIndex,
      selectedYear: dateState.year,
      selectedMonth: dateState.month,
      selectedDay: dateState.day,
      selectedDateText: formatDateText(dateState.year, dateState.month, dateState.day),
      calendarDays: buildCalendarDays(dateState.year, dateState.month, dateState.day)
    })
  },

  onTransportTap(event) {
    const key = event.currentTarget.dataset.key
    if (!key) return
    const alreadySelected = this.data.selectedTransports.includes(key)
    if (!alreadySelected && this.data.selectedTransports.length >= 2) {
      this.showToast('最多选择两种通勤方式')
      return
    }
    const selectedTransports = clampTransportSelection(this.data.selectedTransports, key, 2)
    const commuteTimes = this.normalizeCommuteTimes(this.data.commuteTimes, selectedTransports)
    this.setData({
      selectedTransports,
      selectedTransportMap: this.buildSelectedTransportMap(selectedTransports),
      commuteTimes,
      selectedTransportDetails: this.getSelectedTransportDetails(selectedTransports, commuteTimes)
    })
  },

  onAddressInput(event) {
    this.setData({ commuteAddress: event.detail.value })
  },

  chooseCommuteLocation() {
    if (!wx.chooseLocation) {
      this.showToast('当前环境不支持选择地点')
      return
    }
    wx.chooseLocation({
      success: (location) => {
        const name = location.name || location.address || '已选通勤点'
        this.setData({
          commuteAddress: name,
          commuteLocation: location
        })
      },
      fail: () => this.showToast('已取消选择地点')
    })
  },

  useCurrentLocation() {
    if (!wx.getLocation) {
      this.showToast('当前环境不支持定位')
      return
    }
    wx.getLocation({
      type: 'gcj02',
      success: (location) => {
        this.setData({
          commuteAddress: '当前位置',
          commuteLocation: location
        })
      },
      fail: () => this.showToast('定位失败，请检查授权')
    })
  },

  onTimeAdjust(event) {
    const key = event.currentTarget.dataset.key
    const delta = Number(event.currentTarget.dataset.delta)
    if (!key) return
    const commuteTimes = {
      ...this.data.commuteTimes,
      [key]: adjustCommuteMinutes(this.data.commuteTimes[key], delta)
    }
    this.setData({
      commuteTimes,
      selectedTransportDetails: this.getSelectedTransportDetails(this.data.selectedTransports, commuteTimes)
    })
  },

  onBudgetTap(event) {
    const type = event.currentTarget.dataset.type
    const value = Number(event.currentTarget.dataset.value)
    if (!type || !value) return
    if (type === 'min') {
      this.setData({ budgetMin: Math.min(value, this.data.budgetMax - 200) })
      return
    }
    this.setData({ budgetMax: Math.max(value, this.data.budgetMin + 200) })
  },

  onBudgetPickerChange(event) {
    const [minIndex, maxIndex] = event.detail.value
    const minValue = BUDGET_OPTIONS[minIndex]
    const maxValue = BUDGET_OPTIONS[maxIndex]
    const budgetState = this.getBudgetState(minValue, maxValue)
    this.setData({
      budgetMin: budgetState.min,
      budgetMax: budgetState.max,
      budgetPickerValue: budgetState.pickerValue
    })
  },

  onNearbyInput(event) {
    const nearbyKeyword = event.detail.value
    this.setData({
      nearbyKeyword,
      filteredNearbyOptions: getNearbyMatches(nearbyKeyword, this.data.nearbyOptions)
    })
  },

  onPreferenceTap(event) {
    const key = event.currentTarget.dataset.key
    if (!key) return
    this.setData({
      selectedPreferenceMap: {
        ...this.data.selectedPreferenceMap,
        [key]: !this.data.selectedPreferenceMap[key]
      }
    })
  },

  onRealNameInput(event) {
    const field = event.currentTarget.dataset.field
    if (!field) return
    this.setData({
      realNameForm: {
        ...this.data.realNameForm,
        [field]: event.detail.value
      }
    })
  },

  nextStep() {
    if (!this.validateCurrentStep()) return
    if (this.data.currentStep < this.data.totalSteps) {
      this.setData({ currentStep: this.data.currentStep + 1 })
      this.saveHouseCard(false)
      return
    }
    this.saveHouseCard(true)
    this.setData({ showRealNameModal: true })
  },

  closeRealNameModal() {
    this.setData({ showRealNameModal: false })
  },

  submitRealName() {
    const name = (this.data.realNameForm.name || '').trim()
    const idNumber = (this.data.realNameForm.idNumber || '').trim()
    if (!name || !idNumber) {
      this.showToast('请填写实名信息')
      return
    }
    const card = {
      ...(wx.getStorageSync(HOUSE_CARD_KEY) || {}),
      realNameVerified: true,
      realName: name,
      idNumber,
      updatedAt: Date.now()
    }
    wx.setStorageSync(HOUSE_CARD_KEY, card)
    this.setData({ showRealNameModal: false })
    this.showToast('实名信息已保存')
  },

  validateCurrentStep() {
    if (this.data.currentStep === 2 && !this.data.selectedTransports.length) {
      this.showToast('请至少选择一种通勤方式')
      return false
    }
    if (this.data.currentStep === 3 && !(this.data.commuteAddress || '').trim()) {
      this.showToast('请选择或输入通勤位置')
      return false
    }
    if (this.data.currentStep === 5 && !this.getSelectedPreferenceKeys().length) {
      this.showToast('请选择至少一个偏好')
      return false
    }
    return true
  },

  saveHouseCard(completed) {
    const selectedTransportDetails = this.getSelectedTransportDetails(this.data.selectedTransports, this.data.commuteTimes)
    const preferences = this.getSelectedPreferenceKeys()
    const card = {
      ...(wx.getStorageSync(HOUSE_CARD_KEY) || {}),
      created: true,
      completed,
      currentStep: this.data.currentStep,
      totalSteps: this.data.totalSteps,
      moveInYear: this.data.selectedYear,
      moveInMonth: this.data.selectedMonth,
      moveInDay: this.data.selectedDay,
      moveInDate: this.data.selectedDateText,
      transport: this.data.selectedTransports[0] || '',
      transportName: selectedTransportDetails.map((item) => item.name).join('/'),
      transports: this.data.selectedTransports,
      transportNames: selectedTransportDetails.map((item) => item.name),
      commuteTimes: this.data.commuteTimes,
      commuteAddress: (this.data.commuteAddress || '').trim(),
      commutePoint: (this.data.commuteAddress || '').trim(),
      commuteLocation: this.data.commuteLocation,
      budgetMin: this.data.budgetMin,
      budgetMax: this.data.budgetMax,
      preferences,
      updatedAt: Date.now()
    }
    wx.setStorageSync(HOUSE_CARD_KEY, card)
    if (card.commuteAddress) {
      wx.setStorageSync(COMMUTE_RECORD_KEY, [{
        id: `commute-${Date.now()}`,
        point: card.commuteAddress,
        transport: card.transport,
        transportName: card.transportName,
        transports: card.transports,
        commuteTimes: card.commuteTimes,
        minutes: selectedTransportDetails[0] ? selectedTransportDetails[0].minutes : 0,
        updatedAt: Date.now()
      }])
    }
  },

  getSelectedPreferenceKeys() {
    return Object.keys(this.data.selectedPreferenceMap).filter((key) => this.data.selectedPreferenceMap[key])
  },

  buildYearOptions(today = new Date()) {
    const startYear = today.getFullYear()
    return [0, 1, 2, 3].map((offset) => ({
      value: startYear + offset,
      text: `${startYear + offset}年`
    }))
  },

  normalizeSelectedDate(year, month, day, today = new Date()) {
    const todayValue = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const target = new Date(year, month - 1, day)
    const safeTarget = target < todayValue ? todayValue : target
    return {
      year: safeTarget.getFullYear(),
      month: safeTarget.getMonth() + 1,
      day: safeTarget.getDate()
    }
  },

  normalizeSavedTransports(savedCard) {
    if (Array.isArray(savedCard.transports) && savedCard.transports.length) {
      return savedCard.transports.slice(0, 2)
    }
    return [savedCard.transport || 'subway']
  },

  normalizeCommuteTimes(commuteTimes, selectedTransports) {
    return selectedTransports.reduce((result, key) => {
      result[key] = Math.max(0, Number(commuteTimes && commuteTimes[key] ? commuteTimes[key] : 0))
      return result
    }, {})
  },

  getSelectedTransportDetails(selectedTransports, commuteTimes) {
    return selectedTransports.map((key) => {
      const option = this.data.transportOptions.find((item) => item.key === key) || {}
      return {
        ...option,
        minutes: Math.max(0, Number(commuteTimes[key] || 0))
      }
    })
  },

  buildSelectedTransportMap(selectedTransports) {
    return selectedTransports.reduce((result, key) => {
      result[key] = true
      return result
    }, {})
  },

  getBudgetState(min, max) {
    const range = normalizeBudgetRange(min, max)
    const minIndex = this.findBudgetIndex(range.min)
    const maxIndex = this.findBudgetIndex(range.max)
    return {
      min: BUDGET_OPTIONS[minIndex] || range.min,
      max: BUDGET_OPTIONS[maxIndex] || range.max,
      pickerValue: [minIndex, maxIndex]
    }
  },

  findBudgetIndex(value) {
    const exactIndex = BUDGET_OPTIONS.indexOf(Number(value))
    if (exactIndex >= 0) return exactIndex
    const nextIndex = BUDGET_OPTIONS.findIndex((item) => item >= Number(value))
    return nextIndex >= 0 ? nextIndex : BUDGET_OPTIONS.length - 1
  },

  showToast(text) {
    this.setData({ toastText: text })
    clearTimeout(this.toastTimer)
    this.toastTimer = setTimeout(() => {
      this.setData({ toastText: '' })
    }, 1400)
  },

  onUnload() {
    clearTimeout(this.toastTimer)
  }
})
