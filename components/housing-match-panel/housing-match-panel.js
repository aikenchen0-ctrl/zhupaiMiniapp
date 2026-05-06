Component({
  data: {
    activeStay: {}
  },

  properties: {
    housingCategories: {
      type: Array,
      value: []
    },
    stayOptions: {
      type: Array,
      value: []
    },
    currentStayIndex: {
      type: Number,
      value: 0
    },
    keyword: {
      type: String,
      value: ''
    }
  },

  observers: {
    'stayOptions,currentStayIndex': function () {
      this.updateActiveStay()
    }
  },

  lifetimes: {
    attached() {
      this.updateActiveStay()
    }
  },

  methods: {
    updateActiveStay() {
      const { stayOptions = [], currentStayIndex = 0 } = this.data
      this.setData({
        activeStay: stayOptions[currentStayIndex] || stayOptions[0] || {}
      })
    },

    onStayTap(event) {
      const { index } = event.currentTarget.dataset
      this.triggerEvent('staychange', { index })
    },

    onHousingCategoryTap(event) {
      this.triggerEvent('categorytap', { type: event.currentTarget.dataset.type })
    },

    onKeywordInput(event) {
      this.triggerEvent('keywordinput', { value: event.detail.value })
    },

    onFindTap() {
      this.triggerEvent('find')
    },

    onMatchTap() {
      this.triggerEvent('match')
    }
  }
})
