<template>
  <transition name="bitmap">
    <section
      v-if="status"
      class="dankal-bitmap"
    >
      <img :src="icon">
      <span>{{ tips }}</span>
    </section>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      hidden: false,
      status: false,
    };
  },

  props: {
    icon: {
      type: String,
      default: '',
    },
    tips: {
      type: String,
      default: '',
    },
  },

  methods: {
    initial() {
      this.status = true;
    },

    destory() {
      this.status = false;
    },
  },
};
</script>

<style lang="scss" >
.dankal-bitmap {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 2.4rem;
    margin-bottom: 0.5rem;
  }

  span {
    color: #9b9b9b;
    font-size: 0.32rem;
  }
}

.bitmap-enter-active,
.bitmap-leave-active {
  transition: opacity 0.5s;
}

.bitmap-enter,
.bitmap-leave-to {
  opacity: 0;
}
</style>
