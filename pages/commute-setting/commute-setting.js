const HOUSE_CARD_KEY = 'housing_user_house_card'
const COMMUTE_RECORD_KEY = 'housing_commute_records'

const pad = (value) => `${value}`.padStart(2, '0')

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
    selectedYear: 2027,
    selectedMonth: 10,
    selectedDay: 10,
    weekLabels: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    calendarDays: [],
    selectedTransport: 'subway',
    commuteAddress: '',
    budgetMin: 1600,
    budgetMax: 1800,
    selectedPreferenceMap: {},
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
    const selectedYear = savedCard.moveInYear || now.getFullYear() + 1
    const selectedMonth = savedCard.moveInMonth || now.getMonth() + 1
    const selectedDay = savedCard.moveInDay || now.getDate()
    const selectedPreferenceMap = (savedCard.preferences || []).reduce((result, key) => {
      result[key] = true
      return result
    }, {})
    this.setData({
      statusBarHeight: windowInfo.statusBarHeight || 20,
      menuTop,
      menuHeight,
      menuRightGap,
      selectedYear,
      selectedMonth,
      selectedDay,
      selectedTransport: savedCard.transport || 'subway',
      commuteAddress: savedCard.commuteAddress || savedCard.commutePoint || '',
      budgetMin: savedCard.budgetMin || 1600,
      budgetMax: savedCard.budgetMax || 1800,
      selectedPreferenceMap,
      selectedDateText: this.formatDateText(selectedYear, selectedMonth, selectedDay),
      calendarDays: this.buildCalendarDays(selectedYear, selectedMonth, selectedDay)
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
    if (!day) return
    this.setData({
      selectedDay: day,
      selectedDateText: this.formatDateText(this.data.selectedYear, this.data.selectedMonth, day),
      calendarDays: this.buildCalendarDays(this.data.selectedYear, this.data.selectedMonth, day)
    })
  },

  onMonthSwitch(event) {
    const delta = Number(event.currentTarget.dataset.delta)
    const base = new Date(this.data.selectedYear, this.data.selectedMonth - 1 + delta, 1)
    const selectedYear = base.getFullYear()
    const selectedMonth = base.getMonth() + 1
    const maxDay = new Date(selectedYear, selectedMonth, 0).getDate()
    const selectedDay = Math.min(this.data.selectedDay, maxDay)
    this.setData({
      selectedYear,
      selectedMonth,
      selectedDay,
      selectedDateText: this.formatDateText(selectedYear, selectedMonth, selectedDay),
      calendarDays: this.buildCalendarDays(selectedYear, selectedMonth, selectedDay)
    })
  },

  onTransportTap(event) {
    const key = event.currentTarget.dataset.key
    if (!key) return
    this.setData({ selectedTransport: key })
  },

  onAddressInput(event) {
    this.setData({ commuteAddress: event.detail.value })
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
    if (this.data.currentStep === 3 && !(this.data.commuteAddress || '').trim()) {
      this.showToast('请输入通勤位置')
      return false
    }
    if (this.data.currentStep === 5 && !this.getSelectedPreferenceKeys().length) {
      this.showToast('请选择至少一个偏好')
      return false
    }
    return true
  },

  saveHouseCard(completed) {
    const selectedTransport = this.data.transportOptions.find((item) => item.key === this.data.selectedTransport) || {}
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
      transport: this.data.selectedTransport,
      transportName: selectedTransport.name || '',
      commuteAddress: (this.data.commuteAddress || '').trim(),
      commutePoint: (this.data.commuteAddress || '').trim(),
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
        minutes: 40,
        updatedAt: Date.now()
      }])
    }
  },

  getSelectedPreferenceKeys() {
    return Object.keys(this.data.selectedPreferenceMap).filter((key) => this.data.selectedPreferenceMap[key])
  },

  buildCalendarDays(year, month, selectedDay) {
    const firstWeekday = new Date(year, month - 1, 1).getDay()
    const dayCount = new Date(year, month, 0).getDate()
    const days = []
    for (let index = 0; index < firstWeekday; index += 1) {
      days.push({ key: `empty-${index}`, day: '', empty: true, active: false })
    }
    for (let day = 1; day <= dayCount; day += 1) {
      days.push({ key: `day-${day}`, day, empty: false, active: day === selectedDay })
    }
    return days
  },

  formatDateText(year, month, day) {
    return `${year}-${pad(month)}-${pad(day)}`
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
