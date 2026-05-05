const PAGE_SIZE = 10

const transportMap = {
  subway: '地铁',
  ebike: '电动车',
  bike: '自行车',
  walk: '步行',
  drive: '驾车'
}

const baseDistricts = [
  { key: 'luohu', name: '罗湖区', children: [{ key: 'luohu-buxin', name: '布心', rate: '12%' }, { key: 'luohu-liantang', name: '莲塘', rate: '12%' }, { key: 'luohu-diwang', name: '地王', rate: '9%' }] },
  { key: 'futian', name: '福田区', children: [{ key: 'futian-chegongmiao', name: '车公庙', rate: '18%' }, { key: 'futian-xiangmihu', name: '香蜜湖', rate: '11%' }, { key: 'futian-huanggang', name: '皇岗', rate: '8%' }] },
  { key: 'nanshan', name: '南山区', children: [{ key: 'nanshan-kejiyuan', name: '科技园', rate: '22%' }, { key: 'nanshan-houhai', name: '后海', rate: '17%' }, { key: 'nanshan-nanyou', name: '南油', rate: '13%' }] },
  { key: 'yantian', name: '盐田区', children: [{ key: 'yantian-shatoujiao', name: '沙头角', rate: '7%' }] },
  { key: 'baoan', name: '宝安区', children: [{ key: 'baoan-baoti', name: '宝体', rate: '16%' }, { key: 'baoan-xixiang', name: '西乡', rate: '10%' }] },
  { key: 'longgang', name: '龙岗区', children: [{ key: 'longgang-bantian', name: '坂田', rate: '19%' }, { key: 'longgang-dayun', name: '大运', rate: '10%' }] },
  { key: 'longhua', name: '龙华区', children: [{ key: 'longhua-hongshan', name: '红山', rate: '25%' }, { key: 'longhua-minzhi', name: '民治', rate: '20%' }] },
  { key: 'guangming', name: '光明区', children: [{ key: 'guangming-center', name: '光明中心', rate: '6%' }] },
  { key: 'pingshan', name: '坪山区', children: [{ key: 'pingshan-center', name: '坪山中心', rate: '5%' }] }
]

const subwayLines = [
  { key: 'line1', name: '1号线(罗宝线)', stations: ['深理工', '中大', '圳美'] },
  { key: 'line2', name: '2号线(8号线)', stations: ['莲塘', '仙湖路', '盐田路'] },
  { key: 'line3', name: '3号线(龙岗线)', stations: ['布吉', '大运', '双龙'] },
  { key: 'line4', name: '4号线(龙华线)', stations: ['深圳北站', '红山', '民治'] },
  { key: 'line5', name: '5号线(环中线)', stations: ['民治', '五和', '坂田'] },
  { key: 'line6', name: '6号线', stations: ['不限', '光明', '虹桥公园', '光明城'] },
  { key: 'line7', name: '7号线(西丽线)', stations: ['西丽', '茶光', '珠光'] },
  { key: 'line9', name: '9号线(梅林线)', stations: ['梅林', '下梅林', '银湖'] }
]

const titleSeed = [
  '整租3居 · 莱蒙水榭春天一期',
  '整租3居 · 莱蒙水榭春天A区6期',
  '公寓 · 星窝青年公寓 · 一年起',
  '整租2居 · 龙光玖钻',
  '合租主卧 · 红山花园',
  '整租1居 · 科技园南区',
  '整租2居 · 深圳湾花园',
  '合租单间 · 民治优选',
  '整租3居 · 香蜜湖景苑',
  '公寓 · 大运中心青年社区',
  '整租1居 · 宝体西岸',
  '整租2居 · 湖贝新村',
  '合租次卧 · 南油生活区',
  '整租3居 · 后海总部基地',
  '公寓 · 光明中心店',
  '整租2居 · 坂田北地铁口',
  '合租单间 · 布吉老街',
  '整租1居 · 沙头角海景',
  '整租2居 · 坪山中心',
  '公寓 · 前海青年社区',
  '整租3居 · 华润城润府',
  '合租主卧 · 车公庙东',
  '整租1居 · 皇岗口岸',
  '公寓 · 西丽大学城',
  '整租2居 · 蛇口老街'
]

Page({
  data: {
    statusBarHeight: 20,
    keyword: '',
    displayPoint: '深圳北站',
    commutePoint: '',
    transport: 'bike',
    transportName: '自行车',
    minutes: 15,
    page: 1,
    allHouses: [],
    filteredHouses: [],
    visibleHouses: [],
    hasMore: true,
    toastText: '',
    filterPanelMounted: false,
    showFilterPanel: false,
    activeFilter: '',
    regionMenu: 'district',
    selectedMiddle: 'luohu',
    regionValue: '',
    roomFilterLabel: '户型',
    rentFilterLabel: '租金',
    sortLabel: '排序',
    rentType: 'whole',
    roomCount: 'all',
    orientation: '',
    rentRange: 'all',
    rentMin: 0,
    rentMax: 15000,
    rentTitle: '0元-不限',
    sortKey: 'default',
    moreMenu: 'level',
    level: '',
    floor: '',
    selectedFeatures: [],
    selectedFeaturesMap: {},
    selectedActivities: [],
    selectedActivitiesMap: {},
    selectedFacilities: [],
    selectedFacilitiesMap: {},
    currentLocation: null,
    regionMenus: [
      { key: 'district', name: '区域' },
      { key: 'subway', name: '地铁站' },
      { key: 'commute', name: '上班通勤' }
    ],
    regionMiddleOptions: [],
    regionRightOptions: [],
    transportOptions: [
      { key: 'subway', name: '地铁' },
      { key: 'ebike', name: '电动车' },
      { key: 'bike', name: '自行车' },
      { key: 'walk', name: '步行' },
      { key: 'drive', name: '驾车' }
    ],
    rentTypeOptions: [
      { key: 'whole', name: '整租' },
      { key: 'share', name: '合租' }
    ],
    roomCountOptions: [
      { key: 'all', name: '不限' },
      { key: '1', name: '1居' },
      { key: '2', name: '2居' },
      { key: '3', name: '3居+' }
    ],
    roomFeatureOptions: [
      { key: 'private-bath', name: '主卧独卫', selected: false },
      { key: 'balcony', name: '带阳台', selected: false },
      { key: 'loft', name: 'loft/复式', selected: false },
      { key: 'no-viewing', name: '不看开间', selected: false },
      { key: 'studio', name: '开间', selected: false }
    ],
    orientationOptions: [
      { key: 'east', name: '东' },
      { key: 'west', name: '西' },
      { key: 'south', name: '南' },
      { key: 'north', name: '北' },
      { key: 'south-north', name: '南北' }
    ],
    rentOptions: [
      { key: 'all', name: '不限', min: 0, max: 999999 },
      { key: '1500', name: '≤1500元', min: 0, max: 1500 },
      { key: '1500-2500', name: '1500-2500元', min: 1500, max: 2500 },
      { key: '2500-3500', name: '2500-3500元', min: 2500, max: 3500 },
      { key: '3500-4500', name: '3500-4500元', min: 3500, max: 4500 },
      { key: '4500-6000', name: '4500-6000元', min: 4500, max: 6000 },
      { key: '6000-8000', name: '6000-8000元', min: 6000, max: 8000 },
      { key: '8000-15000', name: '8000-15000元', min: 8000, max: 15000 },
      { key: '15000', name: '≥15000元', min: 15000, max: 999999 }
    ],
    moreMenus: [
      { key: 'level', name: '好房等级' },
      { key: 'activity', name: '优惠活动' },
      { key: 'floor', name: '楼层' },
      { key: 'facility', name: '设施' }
    ],
    levelOptions: [
      { key: 'diamond', name: '钻石好房', desc: '全城房源佼佼者' },
      { key: 'gold', name: '黄金好房', desc: '卓越精品好房' },
      { key: 'silver', name: '白银好房', desc: '值得一看好房' }
    ],
    activityOptions: [
      { key: 'open', name: '开业特惠', selected: false },
      { key: 'limited', name: '限时特价', selected: false },
      { key: 'pre', name: '预签特惠', selected: false },
      { key: 'drop', name: '租金直降', selected: false }
    ],
    floorOptions: [
      { key: 'low', name: '低楼层' },
      { key: 'mid', name: '中楼层' },
      { key: 'high', name: '高楼层' },
      { key: 'not-top', name: '不看顶层' },
      { key: 'not-bottom', name: '不看底层' }
    ],
    facilityOptions: [
      { key: 'washer', name: '洗衣机', selected: false },
      { key: 'fridge', name: '冰箱', selected: false },
      { key: 'air', name: '空调', selected: false },
      { key: 'wifi', name: '宽带', selected: false },
      { key: 'gas', name: '可做饭', selected: false }
    ],
    sortOptions: [
      { key: 'default', name: '默认排序' },
      { key: 'priceAsc', name: '租金从低到高' },
      { key: 'priceDesc', name: '租金从高到低' },
      { key: 'commuteAsc', name: '通勤时间最短' },
      { key: 'hotDesc', name: '浏览热度最高' }
    ]
  },

  onLoad(options) {
    const windowInfo = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()
    const keyword = options && options.keyword ? decodeURIComponent(options.keyword) : '深圳北站'
    const commutePoint = options && options.commutePoint ? decodeURIComponent(options.commutePoint) : keyword
    const transport = options && options.transport ? options.transport : 'bike'
    const minutes = options && options.minutes ? Number(options.minutes) : 45
    const allHouses = this.buildHouses({ keyword, commutePoint, transport, minutes })
    this.setData({
      statusBarHeight: windowInfo.statusBarHeight || 20,
      keyword,
      commutePoint,
      displayPoint: commutePoint || keyword || '深圳北站',
      transport,
      transportName: transportMap[transport] || '自行车',
      minutes,
      allHouses
    }, () => {
      this.updateRegionOptions()
      this.applyFilterState()
      this.loadCurrentLocation()
    })
  },

  loadCurrentLocation() {
    if (!wx.getLocation) return
    wx.getLocation({
      type: 'gcj02',
      success: (location) => {
        this.setData({ currentLocation: location })
      },
      fail: () => {}
    })
  },

  buildHouses(params) {
    const keyword = params.keyword || '深圳'
    const commutePoint = params.commutePoint || keyword
    const minutes = params.minutes || 45
    return titleSeed.map((title, index) => {
      const price = index % 3 === 2 ? 1400 + index * 80 : 6300 + index * 120
      const isRoom = title.indexOf('合租') > -1 || title.indexOf('公寓') > -1
      return {
        id: `result-${index + 1}`,
        title,
        size: isRoom ? `${18 + index % 8}m²` : `${53 + index * 3}m²`,
        face: ['北', '南', '东南', '西南'][index % 4],
        floor: `${3 + index % 20}/${19 + index % 12}层`,
        line: `${4 + index % 3}号线`,
        station: commutePoint || '红山站',
        distance: `${841 + index * 47}m`,
        commuteMinute: Math.max(5, Math.min(60, minutes - 4 + (index % 8))),
        price,
        priceUnit: isRoom ? '元/首月' : '元/月',
        originPrice: isRoom ? `${price + 100}元/月` : '',
        rentType: isRoom ? 'share' : 'whole',
        roomCount: title.indexOf('1居') > -1 || isRoom ? '1' : title.indexOf('2居') > -1 ? '2' : '3',
        orientation: ['north', 'south', 'east', 'west', 'south-north'][index % 5],
        floorType: ['low', 'mid', 'high'][index % 3],
        level: ['diamond', 'gold', 'silver'][index % 3],
        features: [['balcony'], ['private-bath'], ['loft'], ['studio'], ['no-viewing']][index % 5],
        activities: [['drop'], ['pre'], ['limited'], ['open']][index % 4],
        facilities: [['washer', 'air'], ['fridge', 'wifi'], ['gas', 'air'], ['washer', 'fridge']][index % 4],
        goodRent: index % 4 !== 2,
        tags: this.buildTags(index),
        hotValue: 380 + index * 33,
        hotText: index % 2 ? `近7日${380 + index * 33}人浏览` : ''
      }
    }).filter((item) => this.matchKeyword(item, keyword))
  },

  buildTags(index) {
    const pools = [
      ['服务费立减768元', '预计05.26可入住', '自营'],
      ['服务费立减756元', '自营', '押一付一'],
      ['租金首月减100元', '可月付'],
      ['近地铁', '采光好', '可短租']
    ]
    return pools[index % pools.length]
  },

  matchKeyword(item, keyword) {
    if (!keyword || keyword === '深圳市') return true
    return [item.title, item.station, item.line].concat(item.tags).some((text) => text.indexOf(keyword) > -1) || keyword.length <= 2
  },

  updateRegionOptions() {
    const regionMiddleOptions = this.data.regionMenu === 'subway'
      ? subwayLines.map((item) => ({ key: item.key, name: item.name }))
      : baseDistricts.map((item) => ({ key: item.key, name: item.name }))
    const selectedMiddle = regionMiddleOptions.some((item) => item.key === this.data.selectedMiddle)
      ? this.data.selectedMiddle
      : (regionMiddleOptions[0] && regionMiddleOptions[0].key) || ''
    const regionRightOptions = this.getRightOptions(this.data.regionMenu, selectedMiddle)
    this.setData({ regionMiddleOptions, selectedMiddle, regionRightOptions })
  },

  getRightOptions(menu, selectedMiddle) {
    if (menu === 'subway') {
      const line = subwayLines.find((item) => item.key === selectedMiddle) || subwayLines[0]
      return [{ key: `${line.key}-all`, name: '不限' }].concat(line.stations.map((name) => ({ key: `${line.key}-${name}`, name })))
    }
    if (menu === 'district') {
      const district = baseDistricts.find((item) => item.key === selectedMiddle) || baseDistricts[0]
      return [{ key: `${district.key}-all`, name: '全部商圈' }].concat(district.children)
    }
    return []
  },

  resetList() {
    const visibleHouses = this.data.filteredHouses.slice(0, PAGE_SIZE)
    this.setData({
      page: 1,
      visibleHouses,
      hasMore: visibleHouses.length < this.data.filteredHouses.length
    })
  },

  goBack() {
    if (getCurrentPages().length > 1) {
      wx.navigateBack()
      return
    }
    wx.reLaunch({ url: '/pages/search/search' })
  },

  onKeywordInput(event) {
    this.setData({ keyword: event.detail.value })
  },

  submitSearch() {
    const keyword = (this.data.keyword || '').trim()
    if (!keyword) {
      this.showToast('请输入搜索内容')
      return
    }
    const allHouses = this.buildHouses({
      keyword,
      commutePoint: keyword,
      transport: this.data.transport,
      minutes: this.data.minutes
    })
    this.setData({
      allHouses,
      displayPoint: keyword,
      commutePoint: keyword
    }, () => this.applyFilterState())
  },

  loadMore() {
    if (!this.data.hasMore) return
    const nextPage = this.data.page + 1
    const nextHouses = this.data.filteredHouses.slice(0, nextPage * PAGE_SIZE)
    this.setData({
      page: nextPage,
      visibleHouses: nextHouses,
      hasMore: nextHouses.length < this.data.filteredHouses.length
    })
  },

  openFilter(event) {
    const activeFilter = event.currentTarget.dataset.key
    clearTimeout(this.filterPanelTimer)
    this.setData({ activeFilter, filterPanelMounted: true }, () => {
      if (activeFilter === 'region') this.updateRegionOptions()
      setTimeout(() => {
        this.setData({ showFilterPanel: true })
      }, 20)
    })
  },

  closeFilter() {
    clearTimeout(this.filterPanelTimer)
    this.setData({ showFilterPanel: false })
    this.filterPanelTimer = setTimeout(() => {
      this.setData({ filterPanelMounted: false, activeFilter: '' })
    }, 240)
  },

  onRegionMenuTap(event) {
    this.setData({ regionMenu: event.currentTarget.dataset.key }, () => this.updateRegionOptions())
  },

  onMiddleTap(event) {
    this.setData({ selectedMiddle: event.currentTarget.dataset.key }, () => {
      this.setData({ regionRightOptions: this.getRightOptions(this.data.regionMenu, this.data.selectedMiddle) })
    })
  },

  onRegionOptionTap(event) {
    const { key, name } = event.currentTarget.dataset
    this.setData({
      regionValue: key,
      displayPoint: name,
      keyword: name,
      commutePoint: name
    })
  },

  chooseSearchLocation() {
    if (!wx.chooseLocation) {
      this.showToast('当前环境不支持选择地点')
      return
    }
    wx.chooseLocation({
      success: (location) => {
        const name = location.name || location.address || '已选地点'
        this.setData({
          keyword: name,
          displayPoint: name,
          commutePoint: name,
          currentLocation: location
        })
      },
      fail: () => this.showToast('已取消选择地点')
    })
  },

  chooseCommutePoint() {
    if (!wx.chooseLocation) {
      this.showToast('当前环境不支持选择地点')
      return
    }
    wx.chooseLocation({
      success: (location) => {
        const name = location.name || location.address || '通勤点'
        this.setData({
          commutePoint: name,
          displayPoint: name,
          keyword: name,
          currentLocation: location
        })
      },
      fail: () => this.showToast('已取消选择地点')
    })
  },

  onTransportTap(event) {
    const transport = event.currentTarget.dataset.key
    this.setData({
      transport,
      transportName: transportMap[transport] || '自行车'
    })
  },

  onMinuteChange(event) {
    this.setData({ minutes: event.detail.value })
  },

  onRentTypeTap(event) {
    this.setData({ rentType: event.currentTarget.dataset.key })
  },

  onRoomCountTap(event) {
    this.setData({ roomCount: event.currentTarget.dataset.key })
  },

  onOrientationTap(event) {
    this.setData({ orientation: event.currentTarget.dataset.key })
  },

  toggleFeature(event) {
    const key = event.currentTarget.dataset.key
    const selectedFeatures = this.toggleArray(this.data.selectedFeatures, key)
    this.setData({
      selectedFeatures,
      selectedFeaturesMap: this.toMap(selectedFeatures),
      roomFeatureOptions: this.markSelected(this.data.roomFeatureOptions, selectedFeatures)
    })
  },

  onRentRangeTap(event) {
    const key = event.currentTarget.dataset.key
    const option = this.data.rentOptions.find((item) => item.key === key) || this.data.rentOptions[0]
    this.setData({
      rentRange: key,
      rentMin: option.min,
      rentMax: option.max >= 999999 ? 15000 : option.max,
      rentTitle: option.name
    })
  },

  onRentSliderChange(event) {
    const value = event.detail.value
    this.setData({
      rentRange: 'custom',
      rentMin: 0,
      rentMax: value,
      rentTitle: `0元-${value >= 15000 ? '不限' : `${value}元`}`
    })
  },

  onMoreMenuTap(event) {
    this.setData({ moreMenu: event.currentTarget.dataset.key })
  },

  onLevelTap(event) {
    this.setData({ level: event.currentTarget.dataset.key })
  },

  toggleActivity(event) {
    const key = event.currentTarget.dataset.key
    const selectedActivities = this.toggleArray(this.data.selectedActivities, key)
    this.setData({
      selectedActivities,
      selectedActivitiesMap: this.toMap(selectedActivities),
      activityOptions: this.markSelected(this.data.activityOptions, selectedActivities)
    })
  },

  onFloorTap(event) {
    this.setData({ floor: event.currentTarget.dataset.key })
  },

  toggleFacility(event) {
    const key = event.currentTarget.dataset.key
    const selectedFacilities = this.toggleArray(this.data.selectedFacilities, key)
    this.setData({
      selectedFacilities,
      selectedFacilitiesMap: this.toMap(selectedFacilities),
      facilityOptions: this.markSelected(this.data.facilityOptions, selectedFacilities)
    })
  },

  onSortTap(event) {
    const sortKey = event.currentTarget.dataset.key
    const option = this.data.sortOptions.find((item) => item.key === sortKey) || this.data.sortOptions[0]
    this.setData({ sortKey, sortLabel: option.name })
  },

  resetFilters() {
    this.setData({
      regionValue: '',
      rentType: 'whole',
      roomCount: 'all',
      orientation: '',
      rentRange: 'all',
      rentMin: 0,
      rentMax: 15000,
      rentTitle: '0元-不限',
      sortKey: 'default',
      sortLabel: '排序',
      level: '',
      floor: '',
      selectedFeatures: [],
      selectedFeaturesMap: {},
      selectedActivities: [],
      selectedActivitiesMap: {},
      selectedFacilities: [],
      selectedFacilitiesMap: {},
      roomFeatureOptions: this.markSelected(this.data.roomFeatureOptions, []),
      activityOptions: this.markSelected(this.data.activityOptions, []),
      facilityOptions: this.markSelected(this.data.facilityOptions, []),
      roomFilterLabel: '户型',
      rentFilterLabel: '租金'
    }, () => this.applyFilterState())
  },

  applyFilters() {
    this.applyFilterState()
    this.closeFilter()
  },

  applyFilterState() {
    let houses = this.data.allHouses.slice()
    houses = houses.filter((item) => {
      if (this.data.rentType && item.rentType !== this.data.rentType) return false
      if (this.data.roomCount !== 'all' && item.roomCount !== this.data.roomCount) return false
      if (this.data.orientation && item.orientation !== this.data.orientation) return false
      if (this.data.level && item.level !== this.data.level) return false
      if (this.data.floor && item.floorType !== this.data.floor) return false
      if (this.data.selectedFeatures.length && !this.data.selectedFeatures.every((key) => item.features.includes(key))) return false
      if (this.data.selectedActivities.length && !this.data.selectedActivities.every((key) => item.activities.includes(key))) return false
      if (this.data.selectedFacilities.length && !this.data.selectedFacilities.every((key) => item.facilities.includes(key))) return false
      if (this.data.rentRange !== 'all') {
        const option = this.data.rentOptions.find((range) => range.key === this.data.rentRange)
        if (option && (item.price < option.min || item.price > option.max)) return false
        if (this.data.rentRange === 'custom' && (item.price < this.data.rentMin || item.price > this.data.rentMax)) return false
      }
      return true
    })
    houses = this.sortHouses(houses)
    this.setData({
      filteredHouses: houses,
      roomFilterLabel: this.getRoomLabel(),
      rentFilterLabel: this.data.rentRange === 'all' ? '租金' : this.data.rentTitle
    }, () => this.resetList())
  },

  sortHouses(houses) {
    const list = houses.slice()
    if (this.data.sortKey === 'priceAsc') return list.sort((a, b) => a.price - b.price)
    if (this.data.sortKey === 'priceDesc') return list.sort((a, b) => b.price - a.price)
    if (this.data.sortKey === 'commuteAsc') return list.sort((a, b) => a.commuteMinute - b.commuteMinute)
    if (this.data.sortKey === 'hotDesc') return list.sort((a, b) => b.hotValue - a.hotValue)
    return list
  },

  getRoomLabel() {
    const rentType = this.data.rentType === 'share' ? '合租' : '整租'
    const room = this.data.roomCount === 'all' ? '' : `${this.data.roomCount}居`
    return room ? `${rentType}${room}` : '户型'
  },

  toggleArray(list, key) {
    return list.includes(key) ? list.filter((item) => item !== key) : list.concat(key)
  },

  toMap(list) {
    return list.reduce((map, key) => {
      map[key] = true
      return map
    }, {})
  },

  markSelected(options, selectedKeys) {
    return options.map((item) => ({
      ...item,
      selected: selectedKeys.includes(item.key)
    }))
  },

  showToast(text) {
    this.setData({ toastText: text })
    clearTimeout(this.toastTimer)
    this.toastTimer = setTimeout(() => {
      this.setData({ toastText: '' })
    }, 1400)
  }
})
