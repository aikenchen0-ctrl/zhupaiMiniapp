Component({
  data: {
    userPaused: false
  },

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
      if (!active && this.data.userPaused) {
        this.setData({ userPaused: false })
      }
      this.videoTimer = setTimeout(() => {
        if (active && !this.data.userPaused) {
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

    togglePlayback() {
      if (!this.data.isActive || !this.data.feed || this.data.feed.mediaType !== 'video') return

      const nextUserPaused = !this.data.userPaused
      this.setData({ userPaused: nextUserPaused })

      if (nextUserPaused) {
        this.pauseVideo()
      } else {
        this.playVideo()
      }
    },

    onLikeTap() {
      this.triggerEvent('like', { id: this.data.feed.id })
    },

    onCommentTap() {
      this.triggerEvent('comment', { id: this.data.feed.id })
    },

    onVideoTimeUpdate(event) {
      const { currentTime = 0, duration = 0 } = event.detail || {}
      const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0
      this.triggerEvent('progress', {
        id: this.data.feed.id,
        currentTime,
        duration,
        progress
      })
    }
  }
})
