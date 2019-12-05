<template>
  <div
    class="container"
    style="z-index:1;">
    <div
      class="btn-primary bt"
      @click="submit('buy')">
      <div>
        <div>BUY NOW</div>
        <div>${{ info.current_price }}</div>
      </div>
    </div>
    <div
      class="btn-secondary bt"
      @click="submit('bargain')">
      <div>
        <div>BARGAIN</div>
        <div>${{ info.bottom_price }}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
  },
  methods: {
    submit(type) {
      localStorage.setItem('uii', type);
      this.$emit('submit', type);
    },
    navigateTo(path) {
      this.$router.push(path);
    },
    network() {
      return {
        example: async () => {
          console.log('network');
        },
      };
    },
    handler() {
      return {
        example: () => {
          console.log('handle');
        },
      };
    },
  },
};
</script>
<style lang="scss" scoped>
    @import '~@/assets/styles/mixins.scss';
  .container{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0.1rem;
    display: flex;
    justify-content: space-between;
    .bt{
      width: auto;
      flex: 1;
      font-size: 0.3rem;
      line-height: 0.42rem;
      text-align: center;
      &+.bt{
        margin-left: 0.08rem;
      }
    }
  }
</style>
