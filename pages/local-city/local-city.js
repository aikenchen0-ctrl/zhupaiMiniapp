Page({
  data: {
    statusBarHeight: 20,
    searchValue: '',
    activeTab: 1,
    categories: [
      { name: '打车红包', tone: 'yellow', icon: 'taxi' },
      { name: '美食', tone: 'blue', icon: 'food' },
      { name: '休闲娱乐', tone: 'cyan', icon: 'fun' },
      { name: '丽人', tone: 'soft', icon: 'beauty' },
      { name: '加油红包', tone: 'yellow', icon: 'gas' },
      { name: '教育培训', tone: 'soft', icon: 'edu' },
      { name: '招聘', tone: 'soft', icon: 'job' },
      { name: '手机充值', tone: 'soft', icon: 'phone' },
      { name: '电影', tone: 'soft', icon: 'movie' },
      { name: '特价快递', tone: 'soft', icon: 'ship' },
      { name: '高价回收', tone: 'soft', icon: 'recycle' },
      { name: '亲子', tone: 'soft', icon: 'child' },
      { name: '装修保洁', tone: 'soft', icon: 'clean' },
      { name: '结婚', tone: 'soft', icon: 'heart' },
      { name: '火车票', tone: 'soft', icon: 'train' }
    ],
    groups: [
      { title: '吃喝玩乐租房拍友群', desc: '发现身边新鲜事，共享优惠攻略信息', location: '深圳' },
      { title: '闲置转让拍友群', desc: '好物低价流转，让闲置发挥余热', location: '深圳' }
    ],
    tabs: ['商超果蔬', '拍好货', '手机', '服装', '家具', '鞋包'],
    products: [
      {
        id: 1,
        title: '工厂直销厚纸杯',
        desc: '专业耐热环保材质，不渗漏，商务接待办公首选。',
        price: '19.9',
        sold: '已拍152件',
        live: true,
        tall: true,
        liked: false,
        image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=640&q=80'
      },
      {
        id: 2,
        title: '富士施乐7855',
        desc: '富士施乐7855 7833 复印机 彩色激光商用一体机。',
        price: '3200',
        sold: '已拍12件',
        live: true,
        tall: true,
        liked: false,
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=640&q=80'
      },
      {
        id: 3,
        title: '简约设计师单人沙发',
        desc: '高密度海绵填充，亲肤面料，打造舒适居家角落。',
        price: '899',
        sold: '已拍5件',
        live: false,
        tall: false,
        liked: false,
        image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=640&q=80'
      },
      {
        id: 4,
        title: '新款旗舰 5G手机',
        desc: '超感影像系统，全能旗舰性能，极速网络体验。',
        price: '5499',
        sold: '已拍28件',
        live: false,
        tall: false,
        liked: false,
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=640&q=80'
      }
    ]
  },

  onLoad() {
    const windowInfo = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()
    this.setData({ statusBarHeight: windowInfo.statusBarHeight || 20 })
  },

  onSearchInput(event) {
    this.setData({ searchValue: event.detail.value })
  },

  onBackTap() {
    const pages = getCurrentPages()
    if (pages.length > 1) {
      wx.navigateBack()
      return
    }
    wx.switchTab ? wx.switchTab({ url: '/pages/index/index' }) : wx.navigateTo({ url: '/pages/index/index' })
  },

  onCategoryTap(event) {
    const item = this.data.categories[event.currentTarget.dataset.index]
    wx.showToast({ title: `${item.name}已打开`, icon: 'none' })
  },

  onJoinGroup(event) {
    const item = this.data.groups[event.currentTarget.dataset.index]
    wx.showToast({ title: `已申请加入${item.title}`, icon: 'none' })
  },

  onTabTap(event) {
    this.setData({ activeTab: event.currentTarget.dataset.index })
  },

  onLikeTap(event) {
    const id = event.currentTarget.dataset.id
    const products = this.data.products.map((item) => {
      if (item.id !== id) return item
      return { ...item, liked: !item.liked }
    })
    this.setData({ products })
  }
})