<template>
  <section class="container">
    <div class="main-title">商城模版</div>
    <div class="sub-title-list">
      <span
        v-for="(item, i) in pages"
        :key="i"
        class="sub-title navigator-block"
        @click="handlerNavigator(item.path)"
      >
        {{ item.name }}
      </span>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      name: 'ivan',
      pages: [
        {
          path: '/notice/order',
          name: 'H5订单通知',
        },
        {
          path: '/search',
          name: '商品搜索',
        },
        {
          path: '/sign',
          name: '签到',
        },
        {
          path: '/mall/detail',
          name: '商品详情',
        },
        {
          path: '/mall/cart',
          name: '购物车',
        },
        {
          path: '/address',
          name: '地址管理',
        },
      ],
    };
  },

  components: {},

  methods: {
    handlerNavigator(path) {
      this.$router.push({
        path,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixins.scss';

.container {
  min-height: 100vh;
  background-color: #ffffff;
}

.main-title {
  text-align: center;
  font-size: 0.38rem;
  font-weight: bold;
  padding: 0.2rem 0;
}

.sub-title-list {
  @include flex-container;
  flex-direction: column;
}

.sub-title {
  font-size: 0.26rem;
  padding: 0.3rem 0.2rem;
}

.navigator-block {
  width: 90vw;
  margin: auto;
  background-color: #ffffff;

  box-shadow: 0rem 0rem 0.1rem 0rem rgba($color: #000000, $alpha: 0.08);
}

.navigator-block + .navigator-block {
  margin-top: 0.1rem;
  border-radius: 0.04rem;
}
</style>
