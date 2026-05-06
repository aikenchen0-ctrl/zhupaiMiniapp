const STORAGE_KEY = 'housing_search_rankings'
const HISTORY_KEY = 'housing_search_history'
const HOUSE_CARD_KEY = 'housing_user_house_card'
const svgIcon = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`

const defaultRankings = {
  hot: [
    { title: '深港湾一线海景大三房', heat: '87.5W' },
    { title: '后海总部基地精英公寓', heat: '60.4W' },
    { title: '科技园北北区温馨合租', heat: '19.2W' },
    { title: '蛇口老街文艺范小洋房', heat: '13.9W' },
    { title: '华润城润府三期精装', heat: '11.2W' },
    { title: '宝安中心区高层景观房', heat: '7.2W' },
    { title: '福田口岸过关首选公寓', heat: '6.4W' }
  ],
  live: [
    { title: '南山直播间同款阳光房', heat: '42.8W' },
    { title: '滨海客厅高层夜景房', heat: '31.6W' },
    { title: '深圳湾口碑公寓直播看房', heat: '26.3W' },
    { title: '前海青年社区合租房', heat: '15.4W' },
    { title: '宝体地铁口整租一房', heat: '9.8W' }
  ],
  shot: [
    { title: '实拍福田精装两房', heat: '58.1W' },
    { title: '南油服装城通勤公寓', heat: '35.9W' },
    { title: '西丽大学城低密小区', heat: '24.4W' },
    { title: '龙华红山近地铁复式', heat: '18.7W' },
    { title: '布吉老街高性价比单间', heat: '8.6W' }
  ],
  music: [
    { title: '通勤路上的治愈小屋', heat: '33.7W' },
    { title: '清晨原声里的南山小房', heat: '27.9W' },
    { title: '雨夜窗边氛围感公寓', heat: '16.8W' },
    { title: '江湾小屋热门原声房源', heat: '12.5W' },
    { title: '轻音乐适配的独居空间', heat: '6.9W' }
  ]
}

Page({
  data: {
    statusBarHeight: 20,
    menuSafeRight: 96,
    keyword: '',
    areaKeyword: '',
    searchHistory: ['深圳湾一号', '南山区月租房'],
    allSearchHistory: ['深圳湾一号', '南山区月租房'],
    showAllHistory: false,
    currentStayIndex: 0,
    activeStay: {},
    currentRankIndex: 0,
    hasHouseCard: false,
    pageTitle: '通勤点设置',
    selectedTags: [],
    toastText: '',
    historyFilterIcon: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M14 18h36M20 32h24M27 46h10" stroke="#222" stroke-width="5" stroke-linecap="round"/><path d="m41 43 7 7 7-7" stroke="#222" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>'),
    rankTabs: [
      { key: 'hot', name: '住拍热榜' },
      { key: 'live', name: '直播榜' },
      { key: 'shot', name: '实拍榜' },
      { key: 'music', name: '音乐榜' }
    ],
    rankings: defaultRankings,
    stayOptions: [
      {
        text: '住1年',
        keywordPlaceholder: '万象城/南山/高新园/关键词',
        tags: ['精装修', '靠近地铁', '宠物友好', '采光好', '免押金']
      },
      {
        text: '住几月',
        keywordPlaceholder: '短租区域/地铁/商圈/关键词',
        tags: ['月付', '可短租', '拎包入住', '近商圈', '可做饭']
      },
      {
        text: '住几天',
        keywordPlaceholder: '酒店民宿/景点/地址/关键词',
        tags: ['近景点', '可开发票', '安静', '有投影', '行李寄存']
      }
    ]
  },

  onLoad() {
    this.refreshPageState()
  },

  onShow() {
    this.refreshPageState()
  },

  refreshPageState() {
    const windowInfo = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()
    const { statusBarHeight = 20 } = windowInfo
    const rankings = this.loadRankings()
    const allSearchHistory = this.loadHistory()
    const houseCard = this.loadHouseCard()
    this.setData({
      statusBarHeight,
      menuSafeRight: this.getMenuSafeRight(windowInfo),
      rankings,
      allSearchHistory,
      searchHistory: allSearchHistory.slice(0, 2),
      hasHouseCard: houseCard.created,
      pageTitle: houseCard.created ? '地图找房' : '通勤点设置'
    })
    this.updateActiveStay()
  },

  loadHouseCard() {
    const stored = wx.getStorageSync(HOUSE_CARD_KEY)
    if (stored && typeof stored.created === 'boolean') return stored
    const initial = {
      created: false,
      commutePoint: '',
      updatedAt: Date.now()
    }
    wx.setStorageSync(HOUSE_CARD_KEY, initial)
    return initial
  },

  getMenuSafeRight(windowInfo) {
    if (!wx.getMenuButtonBoundingClientRect) return 96
    try {
      const menuRect = wx.getMenuButtonBoundingClientRect()
      if (!menuRect || !menuRect.left || !windowInfo.windowWidth) return 96
      return Math.max(windowInfo.windowWidth - menuRect.left + 8, 96)
    } catch (error) {
      return 96
    }
  },

  loadRankings() {
    const stored = wx.getStorageSync(STORAGE_KEY)
    if (stored && stored.hot) return stored
    wx.setStorageSync(STORAGE_KEY, defaultRankings)
    return defaultRankings
  },

  loadHistory() {
    const stored = wx.getStorageSync(HISTORY_KEY)
    if (stored && stored.length) return stored
    const initial = ['深圳湾一号', '南山区月租房']
    wx.setStorageSync(HISTORY_KEY, initial)
    return initial
  },

  updateActiveStay() {
    this.setData({
      activeStay: this.data.stayOptions[this.data.currentStayIndex] || this.data.stayOptions[0]
    })
  },

  goBack() {
    if (getCurrentPages().length > 1) {
      wx.navigateBack()
      return
    }
    wx.reLaunch({ url: '/pages/index/index' })
  },

  onScanTap() {
    if (!wx.scanCode) {
      this.showToast('当前环境不支持扫一扫')
      return
    }
    wx.scanCode({
      onlyFromCamera: false,
      success: (result) => {
        const value = result.result || '已识别二维码'
        this.setData({ keyword: value })
        this.saveHistory(value)
        this.showToast('扫码成功')
      },
      fail: () => {
        this.showToast('已取消扫一扫')
      }
    })
  },

  onHouseCardEntryTap() {
    if (this.data.hasHouseCard) {
      wx.navigateTo({ url: '/pages/map-search/map-search' })
      return
    }
    wx.navigateTo({ url: '/pages/commute-setting/commute-setting' })
  },

  onKeywordInput(event) {
    this.setData({ keyword: event.detail.value })
  },

  onAreaInput(event) {
    this.setData({ areaKeyword: event.detail.value })
  },

  submitSearch() {
    const keyword = (this.data.keyword || this.data.areaKeyword || '').trim()
    if (!keyword) {
      this.showToast('请输入搜索内容')
      return
    }
    this.saveHistory(keyword)
    wx.navigateTo({ url: `/pages/search-result/search-result?keyword=${encodeURIComponent(keyword)}&source=search` })
  },

  saveHistory(keyword) {
    const allSearchHistory = [keyword].concat(this.data.allSearchHistory.filter((item) => item !== keyword)).slice(0, 8)
    wx.setStorageSync(HISTORY_KEY, allSearchHistory)
    this.setData({
      allSearchHistory,
      searchHistory: allSearchHistory.slice(0, 2)
    })
  },

  useHistory(event) {
    const text = event.currentTarget.dataset.text
    this.setData({ keyword: text })
    this.saveHistory(text)
    this.showToast(`已选择：${text}`)
  },

  removeHistory(event) {
    const text = event.currentTarget.dataset.text
    const allSearchHistory = this.data.allSearchHistory.filter((item) => item !== text)
    wx.setStorageSync(HISTORY_KEY, allSearchHistory)
    this.setData({
      allSearchHistory,
      searchHistory: allSearchHistory.slice(0, 2)
    })
  },

  toggleHistoryPanel() {
    this.setData({ showAllHistory: !this.data.showAllHistory })
  },

  onStayTap(event) {
    const index = event.currentTarget.dataset.index
    this.setData({ currentStayIndex: index }, () => this.updateActiveStay())
  },

  useCurrentLocation() {
    this.setData({ areaKeyword: '当前位置附近' })
    this.showToast('已使用当前位置')
  },

  toggleTag(event) {
    const text = event.currentTarget.dataset.text
    const selectedTags = this.data.selectedTags.includes(text)
      ? this.data.selectedTags.filter((item) => item !== text)
      : this.data.selectedTags.concat(text)
    this.setData({ selectedTags })
    this.showToast(`已选择${text}`)
  },

  onFindTap() {
    const query = this.data.areaKeyword || this.data.keyword || '深圳市'
    this.saveHistory(query)
    wx.navigateTo({ url: `/pages/search-result/search-result?keyword=${encodeURIComponent(query)}&source=find` })
  },

  onSmartMatch() {
    const query = this.data.areaKeyword || this.data.keyword || '深圳市'
    this.saveHistory(query)
    wx.navigateTo({ url: `/pages/search-result/search-result?keyword=${encodeURIComponent(query)}&source=match` })
  },

  onRankTabTap(event) {
    this.setData({ currentRankIndex: event.currentTarget.dataset.index })
  },

  onRankSwiperChange(event) {
    this.setData({ currentRankIndex: event.detail.current })
  },

  showToast(text) {
    this.setData({ toastText: text })
    clearTimeout(this.toastTimer)
    this.toastTimer = setTimeout(() => {
      this.setData({ toastText: '' })
    }, 1400)
  }
})
