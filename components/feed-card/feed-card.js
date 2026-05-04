Component({
  properties: {
    feed: {
      type: Object,
      value: {}
    },
    showToolsSpace: {
      type: Boolean,
      value: false
    },
    isActive: {
      type: Boolean,
      value: false,
      observer(value) {
        this.syncVideoState(value)
      }
    },
    blurRpx: {
      type: Number,
      value: 0
    }
  },
  lifetimes: {
    attached() {
      this.syncVideoState(this.data.isActive)
    },

    detached() {
      this.pauseVideo()
    }
  },
  methods: {
    getVideoContext() {
      if (!this.data.feed || this.data.feed.mediaType !== 'video') return null
      return wx.createVideoContext(`feed-video-${this.data.feed.id}`, this)
    },

    syncVideoState(active) {
      clearTimeout(this.videoTimer)
      this.videoTimer = setTimeout(() => {
        if (active) {
          this.playVideo()
        } else {
          this.pauseVideo()
        }
      }, active ? 80 : 0)
    },

    playVideo() {
      const context = this.getVideoContext()
      if (context) {
        context.play()
      }
    },

    pauseVideo() {
      const context = this.getVideoContext()
      if (context) {
        context.pause()
      }
    },

    onLikeTap() {
      this.triggerEvent('like', { id: this.data.feed.id })
    },

    onCommentTap() {
      this.triggerEvent('comment', { id: this.data.feed.id })
    }
  }
})
