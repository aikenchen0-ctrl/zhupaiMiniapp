Component({
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
    services: {
      type: Array,
      value: []
    },
    compact: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    onStayTap(event) {
      const { index } = event.currentTarget.dataset
      this.triggerEvent('staychange', { index })
    },

    onFindTap() {
      this.triggerEvent('find')
    },

    onMatchTap() {
      this.triggerEvent('match')
    }
  }
})