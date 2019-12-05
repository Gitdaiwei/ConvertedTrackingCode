<template>
  <section class="dankal-video">
    <video
      id="dankal-video"
      ref="video"
      controls
      crossOrigin
      :src="src"
      :poster="poster"
      preload="metadata"
      playsinline="playsinline"
      webkit-playsinline="true"
      x5-video-player-type="h5"
      x5-video-player-fullscreen
      x5-video-orientation="landscape"
      @loadeddata="handlerCaptureImage"
    />
  </section>
</template>

<script>
// X5 内核的特性，移除， BUG：#100
// x5-playsinline="true"
// x5-video-player-type="h5"
// x5-video-player-fullscreen="false"

export default {
  data() {
    return {
      image: '',
    };
  },

  props: {
    src: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '5rem',
    },
    poster: {
      type: String,
      default: '',
    },
    auto: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    // document.addEventListener('WeixinJSBridgeReady', () => {
    //   console.log('====================================');
    //   console.log('daladala');
    //   console.log('====================================');
    //   this.$refs.video.play();
    //   this.$refs.video.pause();
    //   this.$refs.video.play();
    // });
  },

  methods: {
    handlerCaptureImage(event) {
      if (!this.auto) return;

      console.log('====================================');
      console.log(event, this.$refs.video);
      console.log('====================================');

      const canvas = document.createElement('canvas');
      canvas.width = this.$refs.video.videoWidth;
      canvas.height = this.$refs.video.videoHeight;
      canvas
        .getContext('2d')
        .drawImage(this.$refs.video, 0, 0, canvas.width, canvas.height);

      this.image = canvas.toDataURL('image/png');
      this.$refs.video.attr('poster', this.image);
    },
  },
};
</script>

<style lang="scss">
  .dankal-video {
    video {
      z-index: -1;
      object-fit: cover;
      width: 100%;
      height: 5rem;
      vertical-align: middle;
    }
  }
</style>
