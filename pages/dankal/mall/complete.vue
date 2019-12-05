<template>
  <section class="container">
    <div class="status-item">
      <img
        src="@/assets/images/pic_pay_success.png"
        alt=""
      >
      <span>支付成功</span>
    </div>
    <div class="button-item">
      <span>查看订单</span>
      <span>返回首页</span>
    </div>
    <div class="recommend-item">
      <div class="header">
        <span>为您推荐</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/variables.scss';
  @import '~@/assets/styles/mixins.scss';

.status-item {
  text-align: center;
  padding: 0.54rem 0rem 0.32rem 0rem;

  img {
    width: 1.86rem;
    margin-bottom: 0.2rem;
  }

  span {
    display: block;
    font-size: 0.36rem;
  }
}

.button-item {
  @include flex-container;

  padding: 0.24rem 0rem;
  margin-bottom: 0.2rem;
  background-color: #ffffff;

  span {
    flex-basis: 50%;

    text-align: center;
    font-size: 0.3rem;
  }

  span + span {
    border-left: 1px solid #979797;
  }
}

.recommend-item {
  background-color: #ffffff;

  .header {
    text-align: center;
    padding: 0.26rem 0rem;

    span {
      font-size: 0.28rem;
      padding: 0rem 0.3rem;
    }

    &::before,
    &::after {
      display: inline-block;
      content: '';
      width: 0.58rem;
      height: 1px;
      background-color: #484848;
      vertical-align: middle;
    }
  }
}
</style>
