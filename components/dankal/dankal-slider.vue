<template>
  <section class="dankal-slider">
    <div
      class="dankal-slider-content"
      ref="content"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <slot name="content" />
    </div>
    <div
      ref="action"
      class="dankal-slider-actions"
    >
      <slot name="actions" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      startX: 0,
      startY: 0,
      range: 0,
    };
  },

  props: {
    direction: {
      type: String,
      default: 'left',
    },
  },

  mounted() {
    this.range = this.$refs.action.clientWidth;
  },

  methods: {
    onTouchStart(event) {
      if (this.$parent.onSliderRstore) {
        this.$parent.onSliderRstore();
      }

      const { pageX, pageY } = event.changedTouches[0];
      this.startX = pageX;
      this.startY = pageY;
    },

    onTouchMove(event) {
      const { direction } = this;

      switch (direction) {
        case 'left':
          this.handlerLeft(event);
          break;
        case 'right':
          this.handlerRight(event);
          break;
        case 'up':
          this.handlerUp(event);
          break;
        case 'down':
          this.handlerDown(event);
          break;
        default:
      }
    },

    // eslint-disable-next-line
    onTouchEnd(event) {
      const { direction } = this;

      switch (direction) {
        case 'left':
          this.handlerLeftEnd(event);
          break;
        case 'right':
          this.handlerRightEnd(event);
          break;
        default:
      }
    },

    // eslint-disable-next-line
    handlerRestone(element) {
      this.$refs.content.style.transform = 'inherit';
    },

    handlerLeft(event) {
      const { pageX } = event.changedTouches[0];
      const { startX, range } = this;

      const distanceX = Math.abs(pageX - startX);

      if (pageX < startX && distanceX < range) {
        this.$refs.content.style.transform = `translate(-${distanceX}px)`;
      }

      if (pageX > startX && distanceX < range) {
        this.$refs.content.style.transform = `translate(${distanceX}px)`;
      }
    },

    handlerLeftEnd(event) {
      const { pageX } = event.changedTouches[0];
      const { startX, range } = this;
      const distanceX = Math.abs(pageX - startX);

      if (distanceX > range / 2 && pageX < startX) {
        this.$refs.content.style.transform = `translate(-${range}px)`;
        return;
      }

      this.$refs.content.style.transform = 'inherit';
    },

    handlerRight(event) {
      const { pageX } = event.changedTouches[0];
      const { startX, range } = this;

      const distanceX = Math.abs(pageX - startX);

      if (pageX > startX && distanceX < range) {
        this.$refs.content.style.transform = `translate(${distanceX}px)`;
      }

      if (pageX < startX && distanceX < range) {
        this.$refs.content.style.transform = `translate(-${distanceX}px)`;
      }
    },

    handlerRightEnd(event) {
      const { pageX } = event.changedTouches[0];
      const { startX, range } = this;
      const distanceX = Math.abs(pageX - startX);

      if (distanceX > range / 2 && pageX > startX) {
        this.$refs.content.style.transform = `translate(${range}px)`;
        return;
      }

      this.$refs.content.style.transform = 'inherit';
    },

    handlerUp(event) {
      const { pageY } = event.changedTouches[0];
      const { startY, range } = this;

      const distanceY = Math.abs(pageY - startY);

      if (pageY > startY && distanceY < range) {
        this.$refs.content.style.transform = `translate(0px, ${distanceY}px)`;
      }

      if (pageY < startY && distanceY < range) {
        this.$refs.content.style.transform = `translate(0px, -${distanceY}px)`;
      }
    },

    handlerUpEnd(event) {
      const { pageY } = event.changedTouches[0];
      const { startY, range } = this;
      const distanceY = Math.abs(pageY - startY);

      if (distanceY > range / 2 && pageY < startY) {
        this.$refs.content.style.transform = `translate(0px, -${range}px)`;
        return;
      }

      this.$refs.content.style.transform = 'inherit';
    },

    handlerDown(event) {
      const { pageY } = event.changedTouches[0];
      const { startY, range } = this;

      const distanceY = Math.abs(pageY - startY);

      if (pageY < startY && distanceY < range) {
        this.$refs.content.style.transform = `translate(0px, -${distanceY}px)`;
      }

      if (pageY > startY && distanceY < range) {
        this.$refs.content.style.transform = `translate(0px, ${distanceY}px)`;
      }
    },

    handlerDownEnd(event) {
      const { pageY } = event.changedTouches[0];
      const { startY, range } = this;
      const distanceY = Math.abs(pageY - startY);

      if (distanceY > range / 2 && pageY > startY) {
        this.$refs.content.style.transform = `translate(0px, ${range}px)`;
        return;
      }

      this.$refs.content.style.transform = 'inherit';
    },
  },
};
</script>

<style lang="scss" >
.dankal-slider {
  position: relative;
  overflow: hidden;

  .dankal-slider-content {
    position: relative;
    z-index: 1;
    transition: all 0.2s ease-in-out;
  }

  .dankal-slider-actions {
    position: absolute;
    top: 0rem;
    right: 0rem;

    height: 100%;
  }
}
</style>
