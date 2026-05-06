const svgIcon = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`

const icons = {
  home: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M8 30 32 10l24 20" stroke="#2b261f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 28v26h32V28" stroke="#2b261f" stroke-width="4" stroke-linejoin="round"/><path d="M27 54V39h10v15" stroke="#2b261f" stroke-width="4" stroke-linejoin="round"/></svg>'),
  roommate: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><circle cx="23" cy="20" r="7" stroke="#2b261f" stroke-width="4"/><circle cx="42" cy="22" r="6" stroke="#2b261f" stroke-width="4"/><path d="M10 52c2-11 8-17 17-17s15 6 17 17" stroke="#2b261f" stroke-width="4" stroke-linecap="round"/><path d="M35 39c4-3 13-1 17 13" stroke="#2b261f" stroke-width="4" stroke-linecap="round"/></svg>'),
  hotel: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M14 54V12h24v42" stroke="#2b261f" stroke-width="4" stroke-linejoin="round"/><path d="M38 26h12v28" stroke="#2b261f" stroke-width="4" stroke-linejoin="round"/><path d="M22 22h8M22 32h8M22 42h8" stroke="#2b261f" stroke-width="4" stroke-linecap="round"/></svg>'),
  personHome: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M12 31 32 14l20 17" stroke="#2b261f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="32" cy="34" r="6" stroke="#2b261f" stroke-width="4"/><path d="M21 54c2-9 6-13 11-13s9 4 11 13" stroke="#2b261f" stroke-width="4" stroke-linecap="round"/></svg>'),
  key: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><circle cx="24" cy="32" r="11" stroke="#2b261f" stroke-width="4"/><path d="M35 32h19M47 32v8M54 32v6" stroke="#2b261f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'),
  shield: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M32 8 52 16v15c0 13-8 21-20 26C20 52 12 44 12 31V16l20-8Z" stroke="#2b261f" stroke-width="4" stroke-linejoin="round"/><path d="m23 32 6 6 13-15" stroke="#2b261f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'),
  map: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="m10 16 14-5 16 6 14-5v36l-14 5-16-6-14 5V16Z" stroke="#2b261f" stroke-width="4" stroke-linejoin="round"/><path d="M24 11v36M40 17v36" stroke="#2b261f" stroke-width="4"/></svg>'),
  card: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M14 14h36v36H14z" stroke="#2b261f" stroke-width="4" stroke-linejoin="round"/><path d="M23 26h18M23 36h14" stroke="#2b261f" stroke-width="4" stroke-linecap="round"/></svg>'),
  shop: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M13 27h38l-4-14H17l-4 14Z" stroke="#2b261f" stroke-width="4" stroke-linejoin="round"/><path d="M17 27v25h30V27" stroke="#2b261f" stroke-width="4" stroke-linejoin="round"/><path d="M25 52V39h14v13" stroke="#2b261f" stroke-width="4"/></svg>'),
  rotate: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M52 30a20 20 0 1 0-6 15" stroke="#2b261f" stroke-width="4" stroke-linecap="round"/><path d="M52 14v16H36" stroke="#2b261f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'),
  badge: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M32 8 39 22l15 2-11 11 3 15-14-8-14 8 3-15L10 24l15-2 7-14Z" stroke="#8c8c8c" stroke-width="4" stroke-linejoin="round"/></svg>'),
  trust: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M18 33c5-5 10-5 14 0l3 3c4 4 8 4 12 0" stroke="#8c8c8c" stroke-width="4" stroke-linecap="round"/><path d="M15 31 9 37l12 12 6-6M49 31l6 6-12 12-6-6" stroke="#8c8c8c" stroke-width="4" stroke-linejoin="round"/></svg>'),
  live: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><rect x="13" y="18" width="34" height="26" rx="4" stroke="#8c8c8c" stroke-width="4"/><path d="m47 27 9-6v20l-9-6" stroke="#8c8c8c" stroke-width="4" stroke-linejoin="round"/></svg>')
}

Page({
  data: {
    statusBarHeight: 20,
    currentStayIndex: 0,
    keyword: '',
    toastText: '',
    currentRankIndex: 0,
    activeRank: {},
    housingCategories: [
      { text: '整租', type: 'rent', icon: icons.home },
      { text: '找室友', type: 'roommate', icon: icons.roommate },
      { text: '民宿酒店', type: 'hotel', icon: icons.hotel },
      { text: '合租', type: 'share', icon: icons.personHome },
      { text: '出租', type: 'lease', icon: icons.key }
    ],
    stayOptions: [
      {
        text: '住1年',
        periodText: '租期一年',
        peopleText: '1人入住',
        keywordPlaceholder: '公司/地址/地标/关键词',
        tags: ['商业区', '靠近公司', '地铁站', '带家具', '宠物友好', '...']
      },
      {
        text: '住几月',
        periodText: '灵活月租',
        peopleText: '1人入住',
        keywordPlaceholder: '公司/地址/地标/关键词',
        tags: ['月付', '拎包入住', '短租优先']
      },
      {
        text: '住几天',
        periodText: '短住几天',
        peopleText: '1人入住',
        keywordPlaceholder: '商圈/景点/地址/关键词',
        tags: ['民宿', '可开发票', '行李寄存']
      }
    ],
    tools: [
      { text: '押金宝', type: 'deposit', icon: icons.shield },
      { text: '地图找房', type: 'map', icon: icons.map },
      { text: '找房卡', type: 'card', icon: icons.card },
      { text: '商铺办公', type: 'office', icon: icons.shop },
      { text: '转租', type: 'sublet', icon: icons.rotate }
    ],
    rankTabs: [
      { key: 'recommend', name: '推荐', icon: icons.badge, title: '为你推荐附近优质房源', desc: '根据住期、通勤和预算生成个性化找房线索' },
      { key: 'score', name: '评分榜', icon: icons.badge, title: '评分榜精选', desc: '优先展示高评分、低投诉、实看反馈稳定房源' },
      { key: 'trust', name: '信任榜', icon: icons.trust, title: '信任榜房源', desc: '偏向认证房东、自营和历史履约更稳定房源' },
      { key: 'live', name: '直播榜', icon: icons.live, title: '直播看房热榜', desc: '正在直播或近期热视频表现较好的房源' }
    ]
  },

  onLoad() {
    const windowInfo = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()
    this.setData({
      statusBarHeight: windowInfo.statusBarHeight || 20,
      activeRank: this.data.rankTabs[0]
    })
  },

  onStayChange(event) {
    this.setData({ currentStayIndex: event.detail.index })
  },

  onKeywordInput(event) {
    this.setData({ keyword: event.detail.value })
  },

  onFindTap() {
    const keyword = this.data.keyword || '深圳市'
    wx.navigateTo({ url: `/pages/search-result/search-result?keyword=${encodeURIComponent(keyword)}&source=housing_find` })
  },

  onMatchTap() {
    const keyword = this.data.keyword || '深圳市'
    wx.navigateTo({ url: `/pages/search-result/search-result?keyword=${encodeURIComponent(keyword)}&source=housing_match` })
  },

  onToolTap(event) {
    const type = event.currentTarget.dataset.type
    if (type === 'map') {
      wx.navigateTo({ url: '/pages/map-search/map-search' })
      return
    }
    if (type === 'card') {
      wx.navigateTo({ url: '/pages/commute-setting/commute-setting' })
      return
    }
    const textMap = {
      deposit: '押金宝服务已打开',
      office: '商铺办公房源筛选中',
      sublet: '转租入口已打开'
    }
    this.showToast(textMap[type] || '功能已打开')
  },

  onSloganTap() {
    this.showToast('已为你生成找房建议')
  },

  onBonusTap() {
    this.showToast('有奖免费住活动已打开')
  },

  onRankTap(event) {
    const index = event.currentTarget.dataset.index
    this.setData({
      currentRankIndex: index,
      activeRank: this.data.rankTabs[index]
    })
  },

  showToast(text) {
    this.setData({ toastText: text })
    clearTimeout(this.toastTimer)
    this.toastTimer = setTimeout(() => {
      this.setData({ toastText: '' })
    }, 1400)
  }
})
