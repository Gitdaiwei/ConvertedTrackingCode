<template>
  <section class="container">
    <div class="select-block">
      <div
        v-for="(item, i) in options"
        :key="i"
        class="select-item"
        @click="handlerNavigator(item.path)">
        <div>
          <!-- <image mode="widthFix" /> -->
          <span>{{ item.name }}</span>
        </div>
        <img src="@/assets/images/ic_location_enter.png">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          // icon: require(''),
          name: '我的优惠劵',
          path: '/coupon',
        },
        {
          // icon: require(''),
          name: '我的地址',
          path: '/address',
        },
        {
          name: '意见反馈',
          path: '/user/feedback',
        },
      ],
    }
  },

  methods: {
    handlerNavigator(path) {
      this.$router.push({
        path,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'template';

.select-block {
  background-color: #ffffff;
  padding: 0rem 0.48rem;

  .select-item {
    @include flex-container;
    padding: 0.36rem;

    div {
      img {
        display: none;
        width: 0.32rem;
      }

      text {
        font-size: 0.28rem;
      }
    }

    & > img {
      width: 0.08rem;
      height: 0.16rem;
    }
  }

  .select-item + .select-item {
    border-top: 1px solid#F1F1F1;
  }
}
</style>
