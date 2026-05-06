const districtSeed = [
  { id: 'nanshan', name: '南山区', count: 5434, latitude: 22.5333, longitude: 113.9304, left: 32, top: 63 },
  { id: 'futian', name: '福田区', count: 7610, latitude: 22.5431, longitude: 114.0579, left: 43, top: 64 },
  { id: 'luohu', name: '罗湖区', count: 4977, latitude: 22.5483, longitude: 114.1315, left: 62, top: 58 },
  { id: 'longgang', name: '龙岗区', count: 8656, latitude: 22.7209, longitude: 114.2469, left: 75, top: 49 },
  { id: 'longhua', name: '龙华区', count: 4074, latitude: 22.6967, longitude: 114.0314, left: 46, top: 45 },
  { id: 'baoan', name: '宝安区', count: 5656, latitude: 22.6847, longitude: 113.8831, left: 20, top: 52 },
  { id: 'guangming', name: '光明区', count: 341, latitude: 22.7488, longitude: 113.9362, left: 27, top: 38 },
  { id: 'yantian', name: '盐田区', count: 396, latitude: 22.557, longitude: 114.2367, left: 78, top: 63 },
  { id: 'pingshan', name: '坪山区', count: 575, latitude: 22.6917, longitude: 114.3506, left: 92, top: 50 }
]

const houseSeed = [
  { id: 'h1', districtId: 'nanshan', name: '科技园南', area: '南山区', layout: '整租一房', distance: '距地铁450m', price: '3180/月', latitude: 22.5338, longitude: 113.9455, left: 36, top: 48, tags: ['近地铁', '采光好'] },
  { id: 'h2', districtId: 'nanshan', name: '深圳湾花园', area: '南山区', layout: '两房一厅', distance: '距商圈800m', price: '5200/月', latitude: 22.5205, longitude: 113.944, left: 42, top: 56, tags: ['整租', '看海'] },
  { id: 'h3', districtId: 'nanshan', name: '南油大厦', area: '南山区', layout: '合租单间', distance: '距地铁300m', price: '1780/月', latitude: 22.5049, longitude: 113.9237, left: 30, top: 58, tags: ['月付', '可短租'] },
  { id: 'h4', districtId: 'futian', name: '车公庙东', area: '福田区', layout: '整租一房', distance: '距地铁260m', price: '3980/月', latitude: 22.5372, longitude: 114.025, left: 41, top: 50, tags: ['通勤快', '电梯房'] },
  { id: 'h5', districtId: 'futian', name: '香蜜湖', area: '福田区', layout: '两房一厅', distance: '距公园500m', price: '6100/月', latitude: 22.5534, longitude: 114.0424, left: 47, top: 44, tags: ['安静', '采光好'] },
  { id: 'h6', districtId: 'futian', name: '皇岗口岸', area: '福田区', layout: '单间公寓', distance: '距口岸700m', price: '2980/月', latitude: 22.5235, longitude: 114.0715, left: 53, top: 61, tags: ['拎包入住', '近口岸'] },
  { id: 'h7', districtId: 'luohu', name: '湖贝新村', area: '罗湖区', layout: '合租单间', distance: '距地铁200m', price: '1680/月', latitude: 22.5473, longitude: 114.1245, left: 50, top: 48, tags: ['低总价', '近地铁'] },
  { id: 'h8', districtId: 'luohu', name: '翠竹花园', area: '罗湖区', layout: '整租两房', distance: '距学校600m', price: '4300/月', latitude: 22.5668, longitude: 114.1394, left: 62, top: 40, tags: ['生活便利', '安静'] },
  { id: 'h9', districtId: 'longgang', name: '大运中心', area: '龙岗区', layout: '整租一房', distance: '距地铁550m', price: '2380/月', latitude: 22.6928, longitude: 114.2191, left: 55, top: 45, tags: ['新小区', '近地铁'] },
  { id: 'h10', districtId: 'longgang', name: '坂田北', area: '龙岗区', layout: '合租主卧', distance: '距园区900m', price: '1980/月', latitude: 22.6426, longitude: 114.0716, left: 40, top: 60, tags: ['通勤快', '可月付'] },
  { id: 'h11', districtId: 'longhua', name: '红山地铁口', area: '龙华区', layout: '复式公寓', distance: '距地铁180m', price: '3500/月', latitude: 22.6209, longitude: 114.023, left: 48, top: 52, tags: ['近地铁', '复式'] },
  { id: 'h12', districtId: 'longhua', name: '民治花园', area: '龙华区', layout: '整租两房', distance: '距商圈650m', price: '4200/月', latitude: 22.6223, longitude: 114.0443, left: 57, top: 56, tags: ['家庭房', '采光好'] },
  { id: 'h13', districtId: 'baoan', name: '宝体西岸', area: '宝安区', layout: '整租一房', distance: '距地铁380m', price: '3300/月', latitude: 22.5655, longitude: 113.887, left: 44, top: 50, tags: ['近商圈', '电梯房'] },
  { id: 'h14', districtId: 'guangming', name: '光明中心', area: '光明区', layout: '单间公寓', distance: '距地铁700m', price: '2100/月', latitude: 22.7483, longitude: 113.9358, left: 50, top: 52, tags: ['新房源', '安静'] },
  { id: 'h15', districtId: 'yantian', name: '沙头角海景', area: '盐田区', layout: '一房一厅', distance: '距海边300m', price: '3600/月', latitude: 22.5552, longitude: 114.2361, left: 52, top: 54, tags: ['看海', '整租'] },
  { id: 'h16', districtId: 'pingshan', name: '坪山中心', area: '坪山区', layout: '整租一房', distance: '距地铁600m', price: '2300/月', latitude: 22.6912, longitude: 114.348, left: 50, top: 50, tags: ['新小区', '通勤点'] }
]

Page({
  data: {
    statusBarHeight: 20,
    menuSafeRight: 96,
    keyword: '',
    mapCenter: { latitude: 22.5431, longitude: 114.0579 },
    mapScale: 10,
    mapMarkers: [],
    viewMode: 'district',
    selectedDistrict: null,
    selectedRent: '',
    selectedLayout: '',
    selectedMore: '',
    currentLocation: null,
    visibleDistricts: districtSeed,
    visibleHouses: [],
    resultHint: '点击房源可查看模拟详情',
    toastText: '',
    filters: [
      { name: '区域' },
      { name: '租金' },
      { name: '房型' },
      { name: '更多' }
    ]
  },

  onLoad(options) {
    const windowInfo = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()
    const keyword = options && options.keyword ? decodeURIComponent(options.keyword) : ''
    this.mapContext = wx.createMapContext ? wx.createMapContext('housingMap', this) : null
    this.setData({
      statusBarHeight: windowInfo.statusBarHeight || 20,
      menuSafeRight: this.getMenuSafeRight(windowInfo),
      keyword
    }, () => {
      if (keyword) {
        this.applySearch(keyword)
        return
      }
      this.showDistricts()
      this.loadCurrentLocation()
    })
  },

  loadCurrentLocation() {
    if (!wx.getLocation) return
    wx.getLocation({
      type: 'gcj02',
      success: (location) => {
        this.setData({
          currentLocation: location,
          mapCenter: {
            latitude: location.latitude,
            longitude: location.longitude
          }
        })
      },
      fail: () => {}
    })
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

  goBack() {
    if (getCurrentPages().length > 1) {
      wx.navigateBack()
      return
    }
    wx.reLaunch({ url: '/pages/search/search' })
  },

  showDistricts() {
    this.setData({
      viewMode: 'district',
      selectedDistrict: null,
      visibleDistricts: districtSeed,
      visibleHouses: [],
      mapScale: 10,
      mapCenter: { latitude: 22.5431, longitude: 114.0579 },
      mapMarkers: this.buildMarkers(districtSeed)
    })
  },

  buildMarkers(items) {
    return items.map((item, index) => ({
      id: index + 1,
      latitude: item.latitude,
      longitude: item.longitude,
      width: 1,
      height: 1,
      alpha: 0
    }))
  },

  selectDistrict(event) {
    const id = event.currentTarget.dataset.id
    const district = districtSeed.find((item) => item.id === id)
    if (!district) return
    this.openDistrict(district, '')
  },

  openDistrict(district, keyword) {
    const query = (keyword || '').trim()
    const houses = houseSeed
      .filter((item) => item.districtId === district.id)
      .filter((item) => this.matchHouse(item, query))
      .filter((item) => this.matchFilters(item))
    this.setData({
      viewMode: 'houses',
      selectedDistrict: district,
      visibleHouses: houses,
      resultHint: query ? `已筛选：${query}` : '点击房源可查看模拟详情',
      mapScale: 13,
      mapCenter: { latitude: district.latitude, longitude: district.longitude },
      mapMarkers: this.buildMarkers(houses)
    })
  },

  matchHouse(house, keyword) {
    if (!keyword) return true
    return [house.name, house.area, house.layout, house.distance].concat(house.tags).some((text) => text.indexOf(keyword) > -1)
  },

  matchFilters(house) {
    if (this.data.selectedLayout && house.layout.indexOf(this.data.selectedLayout) === -1) return false
    if (this.data.selectedMore && !house.tags.includes(this.data.selectedMore)) return false
    if (this.data.selectedRent) {
      const price = Number(String(house.price).replace(/[^0-9]/g, '')) || 0
      if (this.data.selectedRent === '3000' && price > 3000) return false
      if (this.data.selectedRent === '3000-5000' && (price < 3000 || price > 5000)) return false
      if (this.data.selectedRent === '5000' && price < 5000) return false
    }
    return true
  },

  onKeywordInput(event) {
    this.setData({ keyword: event.detail.value })
  },

  submitSearch() {
    const keyword = (this.data.keyword || '').trim()
    if (!keyword) {
      this.showDistricts()
      return
    }
    this.applySearch(keyword)
  },

  applySearch(keyword) {
    const district = districtSeed.find((item) => keyword.indexOf(item.name) > -1 || item.name.indexOf(keyword) > -1)
    if (district) {
      this.openDistrict(district, keyword)
      return
    }
    const matchedHouses = houseSeed.filter((item) => this.matchHouse(item, keyword))
    if (!matchedHouses.length) {
      this.setData({
        viewMode: 'district',
        selectedDistrict: null,
        visibleDistricts: districtSeed,
        visibleHouses: [],
        resultHint: '暂无匹配房源',
        mapMarkers: this.buildMarkers(districtSeed)
      })
      this.showToast('暂无匹配房源')
      return
    }
    const districtIds = matchedHouses.map((item) => item.districtId)
    const targetDistrict = districtSeed.find((item) => item.id === districtIds[0])
    this.openDistrict(targetDistrict, keyword)
  },

  selectHouse(event) {
    const id = event.currentTarget.dataset.id
    const house = houseSeed.find((item) => item.id === id)
    if (!house) return
    this.setData({
      mapCenter: { latitude: house.latitude, longitude: house.longitude },
      mapScale: 15
    })
    this.showToast(`${house.name} ${house.price}`)
  },

  onMarkerTap(event) {
    const index = event.detail.markerId - 1
    if (this.data.viewMode === 'district') {
      const district = this.data.visibleDistricts[index]
      if (district) this.openDistrict(district, '')
      return
    }
    const house = this.data.visibleHouses[index]
    if (house) this.selectHouse({ currentTarget: { dataset: { id: house.id } } })
  },

  onFilterTap(event) {
    const index = event.currentTarget.dataset.index
    if (index === 0) {
      this.chooseMapLocation()
      return
    }
    if (index === 1) {
      this.chooseRentFilter()
      return
    }
    if (index === 2) {
      this.chooseLayoutFilter()
      return
    }
    this.chooseMoreFilter()
  },

  chooseMapLocation() {
    if (!wx.chooseLocation) {
      this.showToast('当前环境不支持选择地点')
      return
    }
    wx.chooseLocation({
      success: (location) => {
        const keyword = location.name || location.address || ''
        this.setData({
          keyword,
          currentLocation: location,
          mapCenter: {
            latitude: location.latitude,
            longitude: location.longitude
          },
          mapScale: 13
        })
        this.applySearch(keyword)
      },
      fail: () => this.showToast('已取消选择地点')
    })
  },

  chooseRentFilter() {
    wx.showActionSheet({
      itemList: ['不限', '3000元以下', '3000-5000元', '5000元以上'],
      success: (res) => {
        const values = ['', '3000', '3000-5000', '5000']
        this.setData({ selectedRent: values[res.tapIndex] || '' }, () => this.refreshCurrentMapHouses())
      }
    })
  },

  chooseLayoutFilter() {
    wx.showActionSheet({
      itemList: ['不限', '整租', '合租', '一房', '两房'],
      success: (res) => {
        const values = ['', '整租', '合租', '一房', '两房']
        this.setData({ selectedLayout: values[res.tapIndex] || '' }, () => this.refreshCurrentMapHouses())
      }
    })
  },

  chooseMoreFilter() {
    wx.showActionSheet({
      itemList: ['不限', '近地铁', '采光好', '可短租', '安静'],
      success: (res) => {
        const values = ['', '近地铁', '采光好', '可短租', '安静']
        this.setData({ selectedMore: values[res.tapIndex] || '' }, () => this.refreshCurrentMapHouses())
      }
    })
  },

  refreshCurrentMapHouses() {
    if (this.data.selectedDistrict) {
      this.openDistrict(this.data.selectedDistrict, this.data.keyword)
      return
    }
    this.showToast('筛选已生效')
  },

  resetDistricts() {
    this.setData({ keyword: '' })
    this.showDistricts()
  },

  openListPanel() {
    if (this.data.selectedDistrict) {
      this.showToast(`${this.data.selectedDistrict.name}共${this.data.visibleHouses.length}套`)
      return
    }
    this.showToast(`当前城市共${districtSeed.length}个区`)
  },

  moveToLocation() {
    if (this.mapContext && this.mapContext.moveToLocation) {
      this.mapContext.moveToLocation()
    }
    this.showToast('已定位到当前位置')
  },

  showToast(text) {
    this.setData({ toastText: text })
    clearTimeout(this.toastTimer)
    this.toastTimer = setTimeout(() => {
      this.setData({ toastText: '' })
    }, 1400)
  }
})
