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
  plane: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="m8 36 48-18-16 38-9-18-23-2Z" stroke="#2b261f" stroke-width="4" stroke-linejoin="round"/><path d="m31 38 25-20" stroke="#2b261f" stroke-width="4" stroke-linecap="round"/></svg>'),
  user: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="20" r="10" stroke="#111111" stroke-width="4"/><path d="M14 54c3-13 9-20 18-20s15 7 18 20" stroke="#111111" stroke-width="4" stroke-linecap="round"/></svg>'),
  like: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M32 53S12 40 12 24c0-8 5-13 12-13 4 0 7 2 8 5 1-3 4-5 8-5 7 0 12 5 12 13 0 16-20 29-20 29Z" stroke="#111111" stroke-width="5" stroke-linejoin="round"/></svg>'),
  likeActive: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 53S12 40 12 24c0-8 5-13 12-13 4 0 7 2 8 5 1-3 4-5 8-5 7 0 12 5 12 13 0 16-20 29-20 29Z" fill="#ff2f55"/></svg>'),
  comment: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M13 18c0-5 4-9 9-9h20c5 0 9 4 9 9v15c0 5-4 9-9 9H29L17 54v-13c-3-2-4-5-4-8V18Z" stroke="#111111" stroke-width="4" stroke-linejoin="round"/></svg>'),
  share: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M18 34v15h28V34" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 43V10m0 0L20 22m12-12 12 12" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'),
  color: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 32V5a27 27 0 0 1 23.4 13.5L32 32Z" fill="#ff4141"/><path d="m32 32 23.4-13.5A27 27 0 0 1 59 32H32Z" fill="#ffc928"/><path d="M32 32h27a27 27 0 0 1-9 20.1L32 32Z" fill="#30c96f"/><path d="m32 32 18 20.1A27 27 0 0 1 32 59V32Z" fill="#24a3ff"/><path d="M32 32v27a27 27 0 0 1-23.4-13.5L32 32Z" fill="#6a56ff"/><path d="M32 32 8.6 45.5A27 27 0 0 1 5 32h27Z" fill="#ff8a2b"/><path d="M32 32H5a27 27 0 0 1 9-20.1L32 32Z" fill="#29c778"/><path d="M32 32 14 11.9A27 27 0 0 1 32 5v27Z" fill="#ffe13c"/></svg>')
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
    matchToolsOffsetRpx: 0,
    matchToolsCollapsed: false,
    topNavLight: true,
    topNavHidden: false,
    feedTouchLocked: false,
    activeMusicTitle: '',
    activeMusicScroll: false,
    activeFeedProgressPercent: 0,
    activeFeedProgressText: '0:00 / 0:00',
    feedProgressMap: {},
    cityTabText: '同城',
    showToolsForCurrentFeed: true,
    showPublishPanel: false,
    showSearchPanel: false,
    showCommentDrawer: false,
    commentDrawerVisible: false,
    activeFeedId: 1,
    activeComments: [],
    commentPanelMap: {
      gift: [
        { id: 'gift-1', user: '礼物榜用户', userInitial: '礼', text: '送出阳光小屋礼物，觉得这个房源很有生活感。', timeText: '刚刚 礼物贡献', likeCount: 26, liked: false, replyText: '' },
        { id: 'gift-2', user: '住拍会员', userInitial: '住', text: '连续支持 3 次，想看更多同小区房源。', timeText: '12分钟前 礼物贡献', likeCount: 18, liked: false, replyText: '' }
      ],
      favor: [
        { id: 'favor-1', user: '喜欢采光的人', userInitial: '喜', text: '给采光和卧室布局点赞，真实视频比图片直观。', timeText: '2小时前 粉丝给赞', likeCount: 88, liked: true, replyText: '展开3条回复' },
        { id: 'favor-2', user: '通勤优先', userInitial: '通', text: '近地铁这一点很加分。', timeText: '4小时前 粉丝给赞', likeCount: 37, liked: false, replyText: '' }
      ],
      score: [
        { id: 'score-1', user: '实看用户', userInitial: '实', text: '环境 4.8，交通 4.7，视频和实地基本一致。', timeText: '昨天 用户评价', likeCount: 19, liked: false, replyText: '展开2条回复' },
        { id: 'score-2', user: '租房观察员', userInitial: '租', text: '价格展示清楚，建议补充水电和物业说明。', timeText: '昨天 用户评价', likeCount: 12, liked: false, replyText: '' }
      ]
    },
    commentTabs: [
      { key: 'comment', name: '评论', count: 0 },
      { key: 'gift', name: '礼物贡献', count: '' },
      { key: 'favor', name: '粉丝给赞', count: '' },
      { key: 'score', name: '评价', count: 0 }
    ],
    currentCommentTab: 0,
    commentToolIcons: {
      at: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="22" stroke="#222" stroke-width="5"/><circle cx="31" cy="31" r="8" stroke="#222" stroke-width="5"/><path d="M39 24v12c0 4 3 6 7 4" stroke="#222" stroke-width="5" stroke-linecap="round"/></svg>'),
      face: svgIcon('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="23" stroke="#222" stroke-width="5"/><path d="M23 26h.1M41 26h.1" stroke="#222" stroke-width="7" stroke-linecap="round"/><path d="M22 38c5 7 15 7 20 0" stroke="#222" stroke-width="5" stroke-linecap="round"/></svg>')
    },
    showPlacePanel: false,
    placeDetail: {
      address: '深圳市南山区高新园地铁站附近 500 米',
      score: '4.8',
      environment: '4.9',
      traffic: '4.7',
      reality: '4.8',
      reviews: [
        { user: '看房用户A', text: '位置和视频描述一致，周边吃饭和通勤都方便。' },
        { user: '租客小林', text: '采光不错，晚上比较安静，适合长期住。' }
      ]
    },
    activeCollection: {},
    hiddenCollectionEntryMap: {},
    showCollectionEntry: false,
    showCollectionDrawer: false,
    commentDraft: '',
    searchKeyword: '',
    matchKeyword: '',
    socialIcons: {
      user: ICONS.user,
      like: ICONS.like,
      likeActive: ICONS.likeActive,
      comment: ICONS.comment,
      share: ICONS.share,
      color: ICONS.color
    },
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
      {
        text: '住1年',
        periodText: '租期一年',
        peopleText: '1人入住',
        keywordPlaceholder: '公司/地址/地标/关键词',
        tags: ['商业区', '靠近公司', '地铁站', '带家具', '宠物友好', '...']
      },
      {
        text: '住几月',
        periodText: '11月10日 - 12月10日',
        peopleText: '1人入住',
        keywordPlaceholder: '公司/地址/地标/关键词',
        tags: ['地铁站', '带家具']
      },
      {
        text: '住几天',
        periodText: '11月10日 - 11月15日',
        peopleText: '1人入住',
        keywordPlaceholder: '公司/地址/地标/关键词',
        tags: ['宠物友好', '商业区']
      }
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
        musicTitle: '半岛清茶的原声',
        liked: false,
        likeCount: 155000,
        likeText: '15.5w',
        commentCount: 45000,
        commentText: '4.5w',
        shareCount: 12000,
        shareText: '1.2w',
        colorCountText: '7099',
        collection: {
          title: '反诈骗搞笑对话',
          items: [
            {
              id: 'fraud-1',
              title: '因欺负女人竟被活埋！',
              cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=480&q=80',
              likeText: '172.8w',
              episodeText: '第1/3集'
            },
            {
              id: 'fraud-2',
              title: '骗局揭秘后续反转',
              cover: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=480&q=80',
              likeText: '39.1w',
              episodeText: '第2/3集'
            },
            {
              id: 'fraud-3',
              title: '最后一集高能收尾',
              cover: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=480&q=80',
              likeText: '35.9w',
              episodeText: '第3/3集'
            },
            {
              id: 'fraud-extra',
              title: '幕后花絮合集',
              cover: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=480&q=80',
              likeText: '12.6w',
              episodeText: '花絮'
            }
          ]
        },
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
        musicTitle: '江湾小屋的原声',
        liked: false,
        likeCount: 74000,
        likeText: '7.4w',
        commentCount: 12800,
        commentText: '1.2w',
        shareCount: 7400,
        shareText: '7400',
        colorCountText: '7099',
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
        musicTitle: '青木合租的原声',
        liked: false,
        likeCount: 45200,
        likeText: '4.5w',
        commentCount: 7099,
        commentText: '7099',
        shareCount: 4520,
        shareText: '4520',
        colorCountText: '7099',
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
    if (wx.showShareMenu) {
      wx.showShareMenu({ withShareTicket: true, menus: ['shareAppMessage'] })
    }
    this.updateActiveFeedState({
      statusBarHeight,
      windowHeight
    })
    this.requestUserDistrict()
  },

  onMainNavTap(event) {
    const { index } = event.currentTarget.dataset
    const name = this.data.mainNavs[index].name
    this.setData({ currentMainNav: index })
    this.showToast(`${name}频道已切换`)
  },

  onFeedChange(event) {
    const currentFeedIndex = event.detail.current
    const matchToolsCollapsed = currentFeedIndex !== 0
    this.updateActiveFeedState({
      currentFeedIndex,
      matchToolsCollapsed,
      matchToolsOffsetRpx: matchToolsCollapsed ? 760 : 0,
      topNavLight: currentFeedIndex === 0 && !matchToolsCollapsed,
      topNavHidden: matchToolsCollapsed,
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
    const shouldMoveTools = this.data.currentFeedIndex === 0 && this.data.showToolsForCurrentFeed
    const matchToolsOffsetRpx = shouldMoveTools ? Math.round(easedProgress * 760) : this.data.matchToolsOffsetRpx
    const topNavLight = shouldMoveTools ? easedProgress < 0.45 : this.data.topNavLight
    const topNavHidden = shouldMoveTools ? easedProgress >= 0.72 : this.data.topNavHidden
    if (blurRpx === 0) {
      if (this.data.transitionBlurRpx !== 0) {
        this.setData({
          transitionBlurIndex: -1,
          transitionBlurRpx: 0,
          matchToolsOffsetRpx: this.data.matchToolsCollapsed || this.data.currentFeedIndex !== 0 ? 760 : 0,
          topNavLight: this.data.currentFeedIndex === 0 && !this.data.matchToolsCollapsed,
          topNavHidden: this.data.matchToolsCollapsed || this.data.currentFeedIndex !== 0
        })
      }
      return
    }
    const transitionBlurIndex = this.data.currentFeedIndex
    if (
      transitionBlurIndex === this.data.transitionBlurIndex
      && blurRpx === this.data.transitionBlurRpx
      && matchToolsOffsetRpx === this.data.matchToolsOffsetRpx
      && topNavLight === this.data.topNavLight
    ) return
    this.setData({
      transitionBlurIndex,
      transitionBlurRpx: blurRpx,
      matchToolsOffsetRpx,
      topNavLight,
      topNavHidden,
      feedTouchLocked: shouldMoveTools && easedProgress < 0.98,
      showToolsForCurrentFeed: shouldMoveTools && easedProgress < 0.62
    })
  },

  onFeedAnimationFinish() {
    const isFirstFeed = this.data.currentFeedIndex === 0
    const matchToolsCollapsed = !isFirstFeed
    this.setData({
      transitionBlurIndex: -1,
      transitionBlurRpx: 0,
      matchToolsOffsetRpx: matchToolsCollapsed ? 760 : 0,
      topNavLight: isFirstFeed && !matchToolsCollapsed,
      topNavHidden: matchToolsCollapsed,
      showToolsForCurrentFeed: isFirstFeed && !matchToolsCollapsed,
      feedTouchLocked: false
    })
  },

  updateActiveFeedState(nextData = {}) {
    const currentFeedIndex = typeof nextData.currentFeedIndex === 'number' ? nextData.currentFeedIndex : this.data.currentFeedIndex
    const matchToolsCollapsed = typeof nextData.matchToolsCollapsed === 'boolean' ? nextData.matchToolsCollapsed : this.data.matchToolsCollapsed
    const activeFeed = this.data.feeds[currentFeedIndex] || {}
    const activeCollection = activeFeed.collection || {}
    const hiddenCollectionEntryMap = nextData.hiddenCollectionEntryMap || this.data.hiddenCollectionEntryMap || {}
    const hasCollection = !!(activeCollection.items && activeCollection.items.length)
    const showCollectionEntry = currentFeedIndex === 0 && matchToolsCollapsed && hasCollection && !hiddenCollectionEntryMap[activeFeed.id]
    const progressInfo = this.data.feedProgressMap[activeFeed.id] || {}
    const activeMusicTitle = activeFeed.musicTitle || `${activeFeed.author || '用户'}的原声`
    this.setData({
      ...nextData,
      activeFeed,
      activeCollection,
      showCollectionEntry,
      activeMusicTitle,
      activeMusicScroll: activeMusicTitle.length > 16,
      activeFeedProgressPercent: Math.round((progressInfo.progress || 0) * 1000) / 10,
      activeFeedProgressText: this.formatVideoTimeText(progressInfo.currentTime || 0, progressInfo.duration || 0),
      topNavHidden: currentFeedIndex !== 0 || matchToolsCollapsed,
      feedTouchLocked: false,
      showToolsForCurrentFeed: currentFeedIndex === 0 && !matchToolsCollapsed && (typeof nextData.matchToolsOffsetRpx === 'number' ? nextData.matchToolsOffsetRpx < 470 : this.data.matchToolsOffsetRpx < 470)
    })
  },

  onMatchToolsTouchStart(event) {
    if (this.data.currentFeedIndex !== 0 || this.data.matchToolsCollapsed) return
    const touch = event.touches && event.touches[0]
    if (!touch) return
    this.matchToolsStartY = touch.clientY
    this.matchToolsStartOffsetRpx = this.data.matchToolsOffsetRpx || 0
  },

  onMatchToolsTouchMove(event) {
    if (this.data.currentFeedIndex !== 0 || this.data.matchToolsCollapsed) return
    const touch = event.touches && event.touches[0]
    if (!touch || typeof this.matchToolsStartY !== 'number') return
    const deltaY = this.matchToolsStartY - touch.clientY
    const offset = Math.max(0, Math.min(760, Math.round(this.matchToolsStartOffsetRpx + deltaY * 1.55)))
    const progress = Math.min(offset / 760, 1)
    this.setData({
      matchToolsOffsetRpx: offset,
      topNavLight: progress < 0.45,
      topNavHidden: progress >= 0.72
    })
  },

  onMatchToolsTouchEnd() {
    if (this.data.currentFeedIndex !== 0 || this.data.matchToolsCollapsed) return
    const shouldCollapse = this.data.matchToolsOffsetRpx >= 360
    const hasCollection = !!(this.data.activeCollection && this.data.activeCollection.items && this.data.activeCollection.items.length)
    const collectionHidden = !!(this.data.hiddenCollectionEntryMap && this.data.hiddenCollectionEntryMap[this.data.activeFeed.id])
    this.setData({
      matchToolsOffsetRpx: shouldCollapse ? 760 : 0,
      matchToolsCollapsed: shouldCollapse,
      showToolsForCurrentFeed: !shouldCollapse,
      showCollectionEntry: shouldCollapse && hasCollection && !collectionHidden,
      feedTouchLocked: false,
      topNavLight: !shouldCollapse,
      topNavHidden: shouldCollapse,
      transitionBlurIndex: -1,
      transitionBlurRpx: 0
    })
    this.matchToolsStartY = null
    this.matchToolsStartOffsetRpx = 0
    this.feedSwipeStartY = null
    this.feedSwipeRestoringTools = false
  },

  onFeedSwipeTouchStart(event) {
    if (this.data.currentFeedIndex !== 0 || !this.data.matchToolsCollapsed || this.data.showToolsForCurrentFeed) return
    const touch = event.touches && event.touches[0]
    if (!touch) return
    this.feedSwipeStartY = touch.clientY
    this.feedSwipeRestoringTools = false
  },

  onFeedSwipeTouchMove(event) {
    if (this.data.currentFeedIndex !== 0 || typeof this.feedSwipeStartY !== 'number') return
    if (!this.data.matchToolsCollapsed && !this.feedSwipeRestoringTools) return
    const touch = event.touches && event.touches[0]
    if (!touch) return
    const deltaY = touch.clientY - this.feedSwipeStartY
    if (deltaY <= 12 && !this.feedSwipeRestoringTools) return
    const offset = Math.max(0, Math.min(760, Math.round(760 - deltaY * 1.55)))
    const progress = Math.min(offset / 760, 1)
    this.feedSwipeRestoringTools = true
    this.setData({
      matchToolsOffsetRpx: offset,
      matchToolsCollapsed: false,
      showToolsForCurrentFeed: true,
      showCollectionEntry: false,
      feedTouchLocked: true,
      topNavLight: progress < 0.45,
      topNavHidden: progress >= 0.72,
      transitionBlurIndex: -1,
      transitionBlurRpx: 0
    })
  },

  onFeedSwipeTouchEnd() {
    if (!this.feedSwipeRestoringTools) {
      this.feedSwipeStartY = null
      return
    }
    const shouldExpand = this.data.matchToolsOffsetRpx <= 360
    this.setData({
      matchToolsOffsetRpx: shouldExpand ? 0 : 760,
      matchToolsCollapsed: !shouldExpand,
      showToolsForCurrentFeed: shouldExpand,
      showCollectionEntry: false,
      feedTouchLocked: false,
      topNavLight: shouldExpand,
      topNavHidden: !shouldExpand,
      transitionBlurIndex: -1,
      transitionBlurRpx: 0
    })
    this.feedSwipeStartY = null
    this.feedSwipeRestoringTools = false
  },

  onFeedLockTouchStart(event) {
    if (this.data.showToolsForCurrentFeed) {
      this.onMatchToolsTouchStart(event)
      return
    }
    this.onFeedSwipeTouchStart(event)
  },

  onFeedLockTouchMove(event) {
    if (this.data.showToolsForCurrentFeed && !this.feedSwipeRestoringTools) {
      this.onMatchToolsTouchMove(event)
      return
    }
    this.onFeedSwipeTouchMove(event)
  },

  onFeedLockTouchEnd() {
    if (this.feedSwipeRestoringTools) {
      this.onFeedSwipeTouchEnd()
      return
    }
    this.onMatchToolsTouchEnd()
  },

  onStayChange(event) {
    const index = event.detail.index
    this.setData({ currentStayIndex: index })
    this.showToast(`已选择${this.data.stayOptions[index].text}`)
  },

  onMatchKeywordInput(event) {
    this.setData({ matchKeyword: event.detail.value })
  },

  onSearchTap() {
    wx.navigateTo({ url: '/pages/search/search' })
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
    const keyword = this.data.matchKeyword ? `：${this.data.matchKeyword}` : ''
    this.showToast(`${stay}查找完成${keyword}`)
  },

  onMatchTap() {
    const stay = this.data.stayOptions[this.data.currentStayIndex].text
    const keyword = this.data.matchKeyword ? `：${this.data.matchKeyword}` : ''
    this.showToast(`${stay}智能匹配完成${keyword}`)
    this.updateActiveFeedState({
      currentFeedIndex: 0,
      matchToolsCollapsed: false,
      matchToolsOffsetRpx: 0,
      showToolsForCurrentFeed: true,
      feedTouchLocked: false,
      topNavLight: true,
      topNavHidden: false,
      transitionBlurIndex: -1,
      transitionBlurRpx: 0
    })
  },

  openCollectionDrawer() {
    if (!this.data.activeCollection || !this.data.activeCollection.items || !this.data.activeCollection.items.length) return
    this.setData({
      showCollectionDrawer: true,
      showCommentDrawer: false,
      showPublishPanel: false
    })
  },

  hideCollectionEntry() {
    const activeFeedId = this.data.activeFeed && this.data.activeFeed.id
    if (!activeFeedId) return
    this.setData({
      hiddenCollectionEntryMap: {
        ...this.data.hiddenCollectionEntryMap,
        [activeFeedId]: true
      },
      showCollectionEntry: false,
      showCollectionDrawer: false
    })
  },

  closeCollectionDrawer() {
    this.setData({ showCollectionDrawer: false })
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

  onFeedProgress(event) {
    const { id, currentTime = 0, duration = 0, progress = 0 } = event.detail || {}
    if (!id) return
    const feedProgressMap = {
      ...this.data.feedProgressMap,
      [id]: { currentTime, duration, progress }
    }
    const nextData = { feedProgressMap }
    if (this.data.activeFeed && this.data.activeFeed.id === id) {
      nextData.activeFeedProgressPercent = Math.round(progress * 1000) / 10
      nextData.activeFeedProgressText = this.formatVideoTimeText(currentTime, duration)
    }
    this.setData(nextData)
  },

  openCommentsByFeedId(id) {
    const activeFeed = this.data.feeds.find((feed) => feed.id === id)
    const activeComments = this.normalizeComments(activeFeed ? activeFeed.comments : [])
    clearTimeout(this.commentDrawerTimer)
    this.setData({
      activeFeedId: id,
      activeComments,
      commentTabs: this.data.commentTabs.map((tab, index) => ({
        ...tab,
        count: index === 0 ? activeComments.length : tab.count
      })),
      currentCommentTab: 0,
      commentDraft: '',
      showCommentDrawer: true,
      commentDrawerVisible: false
    }, () => {
      setTimeout(() => {
        if (this.data.showCommentDrawer) {
          this.setData({ commentDrawerVisible: true })
        }
      }, 30)
    })
  },

  closeCommentDrawer() {
    if (!this.data.showCommentDrawer) return
    clearTimeout(this.commentDrawerTimer)
    this.setData({ commentDrawerVisible: false })
    this.commentDrawerTimer = setTimeout(() => {
      this.setData({ showCommentDrawer: false })
    }, 260)
  },

  onCommentDraftInput(event) {
    this.setData({ commentDraft: event.detail.value })
  },

  onCommentTabTap(event) {
    const currentCommentTab = Number(event.currentTarget.dataset.index)
    this.setData({
      currentCommentTab,
      activeComments: this.getCommentsForTab(currentCommentTab)
    })
  },

  getCommentsForTab(index) {
    const tab = this.data.commentTabs[index] || this.data.commentTabs[0]
    if (tab.key === 'comment') {
      const activeFeed = this.data.feeds.find((feed) => feed.id === this.data.activeFeedId)
      return this.normalizeComments(activeFeed ? activeFeed.comments : [])
    }
    return this.normalizeComments(this.data.commentPanelMap[tab.key] || [])
  },

  normalizeComments(comments = []) {
    return comments.map((comment, index) => {
      const user = comment.user || '用户'
      return {
        id: comment.id || `${user}-${index}-${comment.text}`,
        user,
        userInitial: user.slice(0, 1),
        text: comment.text || '',
        avatar: comment.avatar || '',
        timeText: comment.timeText || `${index + 1}小时前 福建`,
        likeCount: typeof comment.likeCount === 'number' ? comment.likeCount : Math.max(12, 96 - index * 14),
        liked: !!comment.liked,
        replyCount: comment.replyCount || Math.max(1, 17 - index * 4),
        replyText: comment.replyText || `展开${Math.max(1, 17 - index * 4)}条回复`
      }
    })
  },

  replyComment(event) {
    const comment = this.data.activeComments[event.currentTarget.dataset.index]
    if (!comment) return
    this.setData({ commentDraft: `回复 ${comment.user}：` })
  },

  toggleCommentLike(event) {
    const index = Number(event.currentTarget.dataset.index)
    const activeComments = this.data.activeComments.map((comment, commentIndex) => {
      if (commentIndex !== index) return comment
      const liked = !comment.liked
      return {
        ...comment,
        liked,
        likeCount: Math.max(0, comment.likeCount + (liked ? 1 : -1))
      }
    })
    const currentTab = this.data.commentTabs[this.data.currentCommentTab] || this.data.commentTabs[0]
    if (currentTab.key !== 'comment') {
      this.setData({ activeComments })
      return
    }
    const feeds = this.data.feeds.map((feed) => {
      if (feed.id !== this.data.activeFeedId) return feed
      return { ...feed, comments: activeComments }
    })
    this.setData({ activeComments, feeds })
  },

  openPlacePanel() {
    this.setData({ showPlacePanel: true })
  },

  closePlacePanel() {
    this.setData({ showPlacePanel: false })
  },

  submitComment() {
    const text = this.data.commentDraft.trim()
    if (!text) {
      this.showToast('请输入评论内容')
      return
    }
    const feeds = this.data.feeds.map((feed) => {
      if (feed.id !== this.data.activeFeedId) return feed
      const comments = this.normalizeComments(feed.comments).concat({
        id: `me-${Date.now()}`,
        user: '我',
        userInitial: '我',
        text,
        avatar: '',
        timeText: '刚刚 深圳',
        likeCount: 0,
        liked: false,
        replyCount: 0,
        replyText: ''
      })
      const commentCount = feed.commentCount + 1
      return {
        ...feed,
        comments,
        commentCount,
        commentText: this.formatCount(commentCount)
      }
    })
    const activeFeed = feeds.find((feed) => feed.id === this.data.activeFeedId)
    const currentActiveFeed = feeds[this.data.currentFeedIndex] || {}
    this.setData({
      feeds,
      activeFeed: currentActiveFeed,
      activeComments: activeFeed ? activeFeed.comments : [],
      commentTabs: this.data.commentTabs.map((tab, index) => ({
        ...tab,
        count: index === 0 && activeFeed ? activeFeed.comments.length : tab.count
      })),
      commentDraft: ''
    })
  },

  addMockComment() {
    this.submitComment()
  },

  onShareFeed() {
    const id = this.data.activeFeed.id
    const feeds = this.data.feeds.map((feed) => {
      if (feed.id !== id) return feed
      const shareCount = feed.shareCount + 1
      return {
        ...feed,
        shareCount,
        shareText: this.formatCount(shareCount)
      }
    })
    const activeFeed = feeds[this.data.currentFeedIndex] || {}
    this.setData({ feeds, activeFeed })
  },

  onFollowActiveFeed() {
    this.showToast(`已关注 ${this.data.activeFeed.author}`)
  },

  onColorToolTap() {
    this.showToast('已打开色彩匹配入口')
  },

  onShareAppMessage() {
    const feed = this.data.activeFeed || {}
    return {
      title: feed.title || '住拍房源视频',
      path: `/pages/index/index?feedId=${feed.id || 1}`
    }
  },

  togglePublishPanel() {
    this.setData({ showPublishPanel: !this.data.showPublishPanel })
  },

  closePublishPanel() {
    this.setData({ showPublishPanel: false })
  },

  requestUserDistrict() {
    if (!wx.getLocation) return
    wx.getLocation({
      type: 'gcj02',
      success: (location) => {
        const district = this.pickDistrictName(location)
        if (district && district.length <= 2) {
          this.setData({ cityTabText: district })
        }
      }
    })
  },

  pickDistrictName(location = {}) {
    const address = location.address || location.address_component || location.addressComponent || {}
    const candidates = [
      location.district,
      address.district,
      address.ad_level_3,
      address.region
    ].filter(Boolean)
    const district = candidates[0] || ''
    return district.replace(/区$|县$|市$/g, '')
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
  },

  formatVideoTimeText(currentTime, duration) {
    return `${this.formatVideoTime(currentTime)} / ${this.formatVideoTime(duration)}`
  },

  formatVideoTime(value) {
    const totalSeconds = Math.max(0, Math.floor(value || 0))
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }
})
