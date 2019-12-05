<template>
  <section class="dankal-roller">
    <img
      src="~assets/images/ic_location_enter.png"
      alt=""
    >
    <div
      class="container"
      ref="container"
      @scroll="handlerScrollDistance"
    >
      <slot />
    </div>
    <img
      src="~assets/images/ic_location_enter.png"
      alt=""
    >
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    handlerScrollDistance() {
      // eslint-disable-next-line
      console.log("====================================");
      console.log(
        this.$refs.container.scrollWidth,
        this.$refs.container.scrollLeft,
      );
      console.log('====================================');
    },
  },
};
</script>

<style lang="scss" >
.dankal-roller {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & > img {
    width: 0.16rem;
  }

  & > img:nth-of-type(1) {
    margin-right: 0.2rem;
    transform: rotate(-180deg);
  }

  & > img:nth-of-type(2) {
    margin-left: 0.2rem;
  }

  .container {
    flex: 1;
    overflow-x: auto;
  }
}
</style>
