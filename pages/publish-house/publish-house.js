Page({
  data: {
    statusBarHeight: 20,
    selectedType: 'entire',
    selectedIdentity: 'agency',
    homestayEnabled: false,
    tenantFeeEnabled: false,
    tenantFeeAmount: '1250',
    tenantFeePercent: 25,
    roommateRequirement: '',
    roommateTagTabs: [
      { key: 'interest', text: '兴趣' },
      { key: 'trait', text: '个人特质' },
      { key: 'experience', text: '特殊经历' },
      { key: 'doing', text: '在做' },
      { key: 'music', text: '音乐' }
    ],
    roommateActiveTag: 'interest',
    roommateSelectedTags: ['独处的时候最开心', '运动神经满分'],
    roommateTagGroups: {
      interest: ['每年至少一次旅行', '独处的时候最开心', 'ktv歌王', '逍遥旅行者', '偶尔搓个麻将', '运动神经满分', '文字是终身热爱', '知晓中华上下五千年', '行走的美食攻略', '不戴耳机不能出门', '小众艺术爱好者', '办公室茶农', '朋友圈摄影师'],
      trait: ['爱干净', '作息规律', '边界感清晰', '安静不打扰', '沟通直接', '不抽烟', '会主动分担家务', '尊重彼此空间', '情绪稳定', '准时守约', '喜欢提前计划', '遇事好商量', '公共空间随手收拾'],
      experience: ['海外生活过', '独自搬过家', '养过宠物', '做过志愿者', '换城工作中', '长租经验丰富', '有过合租经历', '刚毕业来打拼', '正在适应新城市', '有装修避坑经验', '熟悉周边生活圈', '经常独自旅行', '租房踩坑幸存者'],
      doing: ['正在健身', '备考提升中', '远程办公', '学习做饭', '规律存钱', '周末探索城市', '下班后充电学习', '准备换工作', '尝试早睡早起', '正在断舍离', '研究通勤路线', '练习拍照剪辑', '坚持自己带饭'],
      music: ['通勤必听歌', '独立音乐爱好者', '现场演出常客', '睡前白噪音', '粤语歌收藏家', '会一点乐器', '周末听黑胶', '喜欢民谣', '电子乐充电', '老歌循环播放', 'K-pop能量站', '安静听歌不外放', '歌单分享达人']
    },
    roommateVisibleTags: [
      { text: '每年至少一次旅行', selected: false },
      { text: '独处的时候最开心', selected: true },
      { text: 'ktv歌王', selected: false },
      { text: '逍遥旅行者', selected: false },
      { text: '偶尔搓个麻将', selected: false },
      { text: '运动神经满分', selected: true },
      { text: '文字是终身热爱', selected: false },
      { text: '知晓中华上下五千年', selected: false },
      { text: '行走的美食攻略', selected: false },
      { text: '不戴耳机不能出门', selected: false },
      { text: '小众艺术爱好者', selected: false },
      { text: '办公室茶农', selected: false },
      { text: '朋友圈摄影师', selected: false }
    ],
    roommateIntroMedia: [],
    roommateGallery: [],
    form: {
      city: '深圳',
      community: '',
      address: '',
      rent: '',
      agencyName: '',
      manager: '',
      phone: '',
      landlordPhone: ''
    },
    leaseYears: ['2021', '2022', '2023', '2024', '2025'],
    leaseMonths: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    leaseDays: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    leaseDateIndexes: [2, 2, 10],
    canSignLandlord: true,
    propertyTypes: [
      {
        key: 'entire',
        title: '整套出租',
        desc: '独享整套房源，包括开间和一室户'
      },
      {
        key: 'single',
        title: '合租单间',
        desc: '独享套房中的1间，合用客厅等空间'
      },
      {
        key: 'shared',
        title: '合住房间',
        desc: '独立床位，合用卧室和客厅等空间'
      }
    ],
    identities: [
      { key: 'owner', text: '个人业主' },
      { key: 'landlord', text: '职业房东' },
      { key: 'sublet', text: '转租' },
      { key: 'agent', text: '中介' },
      { key: 'agency', text: '机构房东' },
      { key: 'roommate', text: '找室友' }
    ]
  },

  onLoad() {
    const windowInfo = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()
    this.setData({ statusBarHeight: windowInfo.statusBarHeight || 20 })
  },

  goBack() {
    if (getCurrentPages().length > 1) {
      wx.navigateBack()
      return
    }
    wx.reLaunch({ url: '/pages/index/index' })
  },

  selectType(event) {
    this.setData({ selectedType: event.currentTarget.dataset.key })
  },

  selectIdentity(event) {
    const key = event.currentTarget.dataset.key
    const update = { selectedIdentity: key }
    if (key === 'roommate') {
      update.homestayEnabled = false
      update.tenantFeeEnabled = false
    }
    this.setData(update)
  },

  toggleHomestay() {
    this.setData({ homestayEnabled: !this.data.homestayEnabled })
  },

  toggleTenantFee() {
    this.setData({ tenantFeeEnabled: !this.data.tenantFeeEnabled })
  },

  onLeaseDateChange(event) {
    this.setData({ leaseDateIndexes: event.detail.value })
  },

  toggleLandlordContract() {
    this.setData({ canSignLandlord: !this.data.canSignLandlord })
  },

  onTenantFeeInput(event) {
    const amount = event.detail.value
    const rent = Number(this.data.form.rent) || 5000
    const percent = Math.min(100, Math.round((Number(amount) || 0) / rent * 100))
    this.setData({
      tenantFeeAmount: amount,
      tenantFeePercent: percent
    })
  },

  onInput(event) {
    const field = event.currentTarget.dataset.field
    this.setData({ [`form.${field}`]: event.detail.value })
  },

  chooseCity() {
    this.showToast('城市选择开发中')
  },

  onRoommateRequirementInput(event) {
    this.setData({ roommateRequirement: event.detail.value })
  },

  switchRoommateTag(event) {
    const key = event.currentTarget.dataset.key
    this.setData({
      roommateActiveTag: key,
      roommateVisibleTags: this.buildRoommateVisibleTags(key, this.data.roommateSelectedTags)
    })
  },

  toggleRoommateTag(event) {
    const text = event.currentTarget.dataset.text
    const selectedTags = this.data.roommateSelectedTags.indexOf(text) > -1
      ? this.data.roommateSelectedTags.filter((item) => item !== text)
      : this.data.roommateSelectedTags.concat(text)

    this.setData({
      roommateSelectedTags: selectedTags,
      roommateVisibleTags: this.buildRoommateVisibleTags(this.data.roommateActiveTag, selectedTags)
    })
  },

  chooseRoommateIntroMedia() {
    wx.chooseMedia({
      count: 9,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({ roommateIntroMedia: res.tempFiles || [] })
      }
    })
  },

  chooseRoommateGallery() {
    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album'],
      success: (res) => {
        this.setData({ roommateGallery: res.tempFiles || [] })
      }
    })
  },

  buildRoommateVisibleTags(key, selectedTags) {
    return (this.data.roommateTagGroups[key] || []).map((text) => ({
      text,
      selected: selectedTags.indexOf(text) > -1
    }))
  },

  nextStep() {
    const { community, address, rent, landlordPhone } = this.data.form
    if (!community || !address || !rent) {
      this.showToast('请补充小区、地址和租金')
      return
    }
    if (this.data.selectedIdentity === 'sublet' && this.data.canSignLandlord && !landlordPhone) {
      this.showToast('请填写房东电话')
      return
    }
    this.showToast('已保存，进入下一步')
  },

  showToast(title) {
    wx.showToast({ title, icon: 'none' })
  }
})