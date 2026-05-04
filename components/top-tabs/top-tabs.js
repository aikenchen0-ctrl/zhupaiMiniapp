Component({
  properties: {
    tabs: {
      type: Array,
      value: []
    },
    current: {
      type: Number,
      value: 2
    }
  },
  methods: {
    onTap(event) {
      const { index } = event.currentTarget.dataset
      this.triggerEvent('change', { index })
    }
  }
})