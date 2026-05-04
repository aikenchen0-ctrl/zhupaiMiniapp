const svgIcon = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`

const ICONS = {
  home: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M8 30 32 10l24 20" stroke="#2b261f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 28v26h32V28" stroke="#2b261f" stroke-width="4" stroke-linejoin="round"/><path d="M27 54V39h10v15" stroke="#2b261f" stroke-width="4" stroke-linejoin="round"/></svg>'),
  roommate: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><circle cx="23" cy="20" r="7" stroke="#2b261f" stroke-width="4"/><circle cx="42" cy="22" r="6" stroke="#2b261f" stroke-width="4"/><path d="M10 52c2-11 8-17 17-17s15 6 17 17" stroke="#2b261f" stroke-width="4" stroke-linecap="round"/><path d="M35 39c4-3 13-1 17 13" stroke="#2b261f" stroke-width="4" stroke-linecap="round"/></svg>'),
  hotel: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M14 54V12h24v42" stroke="#2b261f" stroke-width="4" stroke-linejoin="round"/><path d="M38 26h12v28" stroke="#2b261f" stroke-width="4" stroke-linejoin="round"/><path d="M22 22h8M22 32h8M22 42h8" stroke="#2b261f" stroke-width="4" stroke-linecap="round"/></svg>'),
  personHome: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M12 31 32 14l20 17" stroke="#2b261f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="32" cy="34" r="6" stroke="#2b261f" stroke-width="4"/><path d="M21 54c2-9 6-13 11-13s9 4 11 13" stroke="#2b261f" stroke-width="4" stroke-linecap="round"/></svg>'),
  key: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><circle cx="24" cy="32" r="11" stroke="#2b261f" stroke-width="4"/><path d="M35 32h19M47 32v8M54 32v6" stroke="#2b261f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'),
  beauty: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M23 20c0-7 4-11 9-11s9 4 9 11" stroke="#2b261f" stroke-width="4" stroke-linecap="round"/><path d="M16 20h32l-3 34H19L16 20Z" stroke="#2b261f" stroke-width="4" stroke-linejoin="round"/><path d="M25 34h14" stroke="#2b261f" stroke-width="4" stroke-linecap="round"/></svg>'),
  food: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M18 10v20M26 10v20M18 30c0 5 8 5 8 0M22 30v24" stroke="#2b261f" stroke-width="4" stroke-linecap="round"/><path d="M44 11c-6 5-8 12-7 21h10v22" stroke="#2b261f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'),
  cup: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M18 14v19c0 9 6 15 14 15s14-6 14-15V14" stroke="#2b261f" stroke-width="4" stroke-linecap="round"/><path d="M24 54h16M32 48v6" stroke="#2b261f" stroke-width="4" stroke-linecap="round"/></svg>'),
  car: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M13 35h38l-4-13H17l-4 13Z" stroke="#2b261f" stroke-width="4" stroke-linejoin="round"/><path d="M13 35v13h38V35" stroke="#2b261f" stroke-width="4" stroke-linejoin="round"/><circle cx="22" cy="49" r="4" fill="#2b261f"/><circle cx="42" cy="49" r="4" fill="#2b261f"/></svg>'),
  plane: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="m8 36 48-18-16 38-9-18-23-2Z" stroke="#2b261f" stroke-width="4" stroke-linejoin="round"/><path d="m31 38 25-20" stroke="#2b261f" stroke-width="4" stroke-linecap="round"/></svg>')
}

Page({
  data: {
    statusBarHeight: 20,
    windowHeight: 667,
    currentMainNav: 3,
    currentStayIndex: 0,
    currentFeedIndex: 0,
    transitionBlurIndex: -1,
    transitionBlurRpx: 0,
    activeFeed: {},
    showToolsForCurrentFeed: true,
    showPublishPanel: false,
    showSearchPanel: false,
    showCommentDrawer: false,
    activeFeedId: 1,
    activeComments: [],
    searchKeyword: '',
    heroToolsExpanded: true,
    mainNavs: [
      { key: 'home', name: '住处' },
      { key: 'follow', name: '关注' },
      { key: 'mall', name: '商城' },
      { key: 'match', name: '匹配' },
      { key: 'nearby', name: '附近' },
      { key: 'live', name: '直拍' }
    ],
    housingCategories: [
      { text: '整租', type: 'rent', icon: ICONS.home },
      { text: '找室友', type: 'roommate', icon: ICONS.roommate },
      { text: '民宿酒店', type: 'hotel', icon: ICONS.hotel },
      { text: '合租', type: 'share', icon: ICONS.personHome },
      { text: '出租', type: 'lease', icon: ICONS.key }
    ],
    stayOptions: [
      { text: '住1年' },
      { text: '住几月' },
      { text: '住几天' }
    ],
    services: [
      { text: '丽人/美妆', type: 'beauty', icon: ICONS.beauty },
      { text: '美食', type: 'food', icon: ICONS.food },
      { text: '休闲娱乐', type: 'play', icon: ICONS.cup },
      { text: '打车', type: 'taxi', icon: ICONS.car },
      { text: '火车票机票', type: 'train', icon: ICONS.plane }
    ],
    feeds: [
      {
        id: 1,
        author: '半岛清茶',
        location: '深圳 · 都市阳光豪宅',
        title: '半岛清茶·沿海清晨风格藏起来了',
        description: '手绘墙面、低饱和卧室、干净采光线条，适合一个人慢慢住。',
        tags: '#温馨卧室 #拍内容 #Nbc',
        mediaType: 'video',
        videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        poster: '',
        price: '2660',
        rentType: '整租/月',
        linkText: '铁姐住处',
        liked: false,
        likeCount: 155000,
        likeText: '15.5w',
        commentCount: 45000,
        commentText: '4.5w',
        comments: [
          { user: '小林', text: '这个采光很像图里那种清晨感。' },
          { user: '阿青', text: '想看衣柜和卫生间细节。' },
          { user: '住拍助手', text: '已模拟匹配到同价位 6 套。' }
        ]
      },
      {
        id: 2,
        author: '江湾小屋',
        location: '杭州 · 滨江',
        title: '一室一厅朝南，靠近地铁和江边步道',
        description: '客厅采光好，卧室安静，适合通勤和居家办公。',
        tags: '#一室一厅 #近地铁 #可短租',
        mediaType: 'video',
        videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        poster: '',
        price: '3180',
        rentType: '整租/月',
        linkText: '杭州住处',
        liked: false,
        likeCount: 74000,
        likeText: '7.4w',
        commentCount: 12800,
        commentText: '1.2w',
        comments: [
          { user: '滨江通勤', text: '离地铁口步行大概多久？' },
          { user: '房东', text: '正常步行 8 分钟，楼下有共享单车。' }
        ]
      },
      {
        id: 3,
        author: '青木合租',
        location: '广州 · 天河',
        title: '主卧带阳台，室友作息稳定',
        description: '公共区整洁，厨房可用，楼下便利店和公交站都近。',
        tags: '#找室友 #合租 #带阳台',
        mediaType: 'video',
        videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        poster: '',
        price: '1850',
        rentType: '合租/月',
        linkText: '天河住处',
        liked: false,
        likeCount: 45200,
        likeText: '4.5w',
        commentCount: 7099,
        commentText: '7099',
        comments: [
          { user: '天河上班族', text: '可以养猫吗？' },
          { user: '青木合租', text: '暂时不支持宠物，室友对猫毛敏感。' },
          { user: '木木', text: '阳台朝向看起来不错。' }
        ]
      }
    ]
  },

  onLoad() {
    const { statusBarHeight = 20, windowHeight = 667 } = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()
    this.updateActiveFeedState({ statusBarHeight, windowHeight })
  },

  onMainNavTap(event) {
    const { index } = event.currentTarget.dataset
    const name = this.data.mainNavs[index].name
    this.setData({ currentMainNav: index })
    this.showToast(`${name}频道已切换`)
  },

  onFeedChange(event) {
    this.updateActiveFeedState({
      currentFeedIndex: event.detail.current,
      heroToolsExpanded: true,
      transitionBlurIndex: -1,
      transitionBlurRpx: 0
    })
  },

  onFeedTransition(event) {
    const dy = event.detail && event.detail.dy ? event.detail.dy : 0
    const absDy = Math.abs(dy)
    if (absDy < 8) return
    const baseHeight = Math.max(this.data.windowHeight * 0.72, 1)
    const progress = Math.min(absDy / baseHeight, 1)
    const easedProgress = progress * progress * (3 - 2 * progress)
    const blurRpx = Math.min(10, Math.round(easedProgress * 10))
    if (blurRpx === 0) {
      if (this.data.transitionBlurRpx !== 0) {
        this.setData({
          transitionBlurIndex: -1,
          transitionBlurRpx: 0
        })
      }
      return
    }
    const transitionBlurIndex = this.data.currentFeedIndex
    if (transitionBlurIndex === this.data.transitionBlurIndex && blurRpx === this.data.transitionBlurRpx) return
    this.setData({
      transitionBlurIndex,
      transitionBlurRpx: blurRpx
    })
  },

  onFeedAnimationFinish() {
    if (this.data.transitionBlurRpx === 0) return
    this.setData({
      transitionBlurIndex: -1,
      transitionBlurRpx: 0
    })
  },

  updateActiveFeedState(nextData = {}) {
    const currentFeedIndex = typeof nextData.currentFeedIndex === 'number' ? nextData.currentFeedIndex : this.data.currentFeedIndex
    const activeFeed = this.data.feeds[currentFeedIndex] || {}
    this.setData({
      ...nextData,
      activeFeed,
      showToolsForCurrentFeed: currentFeedIndex === 0
    })
  },

  onStayChange(event) {
    const index = event.detail.index
    this.setData({ currentStayIndex: index })
    this.showToast(`已选择${this.data.stayOptions[index].text}`)
  },

  onSearchTap() {
    this.setData({ showSearchPanel: true })
  },

  onKeywordInput(event) {
    this.setData({ searchKeyword: event.detail.value })
  },

  closeSearchPanel() {
    this.setData({ showSearchPanel: false })
  },

  confirmSearch() {
    const keyword = this.data.searchKeyword || '深圳市 朝南 卧室'
    this.setData({ showSearchPanel: false, searchKeyword: keyword })
    this.showToast(`已模拟搜索：${keyword}`)
  },

  onFindTap() {
    const stay = this.data.stayOptions[this.data.currentStayIndex].text
    this.showToast(`${stay}查找完成，找到 23 套住处`)
  },

  onMatchTap() {
    const stay = this.data.stayOptions[this.data.currentStayIndex].text
    this.showToast(`${stay}智能匹配完成，推荐第 1 套`)
    this.setData({ currentFeedIndex: 0 })
  },

  onLikeFeed(event) {
    const { id } = event.detail
    this.toggleFeedLike(id)
  },

  onLikeActiveFeed() {
    this.toggleFeedLike(this.data.activeFeed.id)
  },

  toggleFeedLike(id) {
    const feeds = this.data.feeds.map((feed) => {
      if (feed.id !== id) return feed
      const liked = !feed.liked
      const likeCount = feed.likeCount + (liked ? 1 : -1)
      return {
        ...feed,
        liked,
        likeCount,
        likeText: this.formatCount(likeCount)
      }
    })
    const activeFeed = feeds[this.data.currentFeedIndex] || {}
    this.setData({ feeds, activeFeed })
  },

  onOpenComments(event) {
    const { id } = event.detail
    this.openCommentsByFeedId(id)
  },

  onOpenActiveComments() {
    this.openCommentsByFeedId(this.data.activeFeed.id)
  },

  openCommentsByFeedId(id) {
    const activeFeed = this.data.feeds.find((feed) => feed.id === id)
    this.setData({
      activeFeedId: id,
      activeComments: activeFeed ? activeFeed.comments : [],
      showCommentDrawer: true
    })
  },

  closeCommentDrawer() {
    this.setData({ showCommentDrawer: false })
  },

  addMockComment() {
    const feeds = this.data.feeds.map((feed) => {
      if (feed.id !== this.data.activeFeedId) return feed
      const comments = feed.comments.concat({ user: '我', text: '想进一步了解这个房源。' })
      const commentCount = feed.commentCount + 1
      return {
        ...feed,
        comments,
        commentCount,
        commentText: this.formatCount(commentCount)
      }
    })
    const activeFeed = feeds.find((feed) => feed.id === this.data.activeFeedId)
    this.setData({ feeds, activeComments: activeFeed ? activeFeed.comments : [] })
  },

  togglePublishPanel() {
    this.setData({ showPublishPanel: !this.data.showPublishPanel })
  },

  closePublishPanel() {
    this.setData({ showPublishPanel: false })
  },

  showToast(text) {
    this.setData({ toastText: text })
    clearTimeout(this.toastTimer)
    this.toastTimer = setTimeout(() => {
      this.setData({ toastText: '' })
    }, 1600)
  },

  formatCount(count) {
    if (count >= 10000) {
      const value = Math.floor(count / 1000) / 10
      return `${value}w`
    }
    return `${count}`
  }
})
