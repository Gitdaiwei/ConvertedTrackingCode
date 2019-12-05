<template>
  <section class="container">
    <div class="dankal-order-block">
      <div class="dankal-order-block-head">
        <span class="label">付款金额</span>
        <span class="value">￥{{ order_pay_amount }}</span>
      </div>
      <div class="dankal-order-block-body">
        <div class="dankal-order-block-body-item">
          <span class="label">订单编号</span>
          <span class="value">{{ order_uuid }}</span>
        </div>
        <div class="dankal-order-block-body-item">
          <span class="label">购买用户</span>
          <span class="value">{{ user }}</span>
        </div>
        <div class="dankal-order-block-body-item">
          <span class="label">当前状态</span>
          <span class="value">{{ status }}</span>
        </div>
        <div class="dankal-order-block-body-item">
          <span class="label">支付方式</span>
          <span class="value">{{ method }}</span>
        </div>
        <div class="dankal-order-block-body-item">
          <span class="label">交易时间</span>
          <span class="value">{{ order_pay_time }}</span>
        </div>
        <!-- 上面是统一的通用字段，以此为分界线，下面是每个项目的订单商品及相关说明 -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // 模板固定参数
      order_uuid: '12171891013415092821068076',
      user: 'OUYANG',
      order_pay_status: 1,
      order_pay_amount: '210',
      order_pay_time: '2015-09-14 01:02:21',
      order_pay_method: 1,
      // 非固定参数
      order_products: [],
      order_refund_reason: '',
    };
  },

  computed: {
    status() {
      return this.order_pay_status ? '支付成功' : '支付失败';
    },

    method() {
      return this.order_pay_method ? '微信支付' : '积分支付';
    },
  },

  created() {
    // eslint-disable-next-line
    const { uuid: order_uuid } = this.$route.query || this.$route.params;
    // eslint-disable-next-line
    if (!order_uuid) {
      /* eslint-disable */
      console.log('====================================');
      console.error('注意，访问链接中缺乏订单编号');
      console.log('====================================');
      /* eslint-disable */
    }
    // eslint-disable-next-line
    this.order_uuid = order_uuid;
    this.network().getOrderDatail(order_uuid);
  },

  methods: {
    network() {
      const self = this;

      return {
        async getOrderDatail() {
          /* eslint-disable */
          console.log('====================================');
          console.log(self);
          console.log('====================================');
          /* eslint-disable */
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixins.scss';

.dankal-order-block {
  background-color: #ffffff;
  margin-top: 0.4rem;
  padding: 0.4rem 0.5rem 0.4rem;

  .dankal-order-block-head {
    @include flex-container;
    padding-bottom: 0.4rem;
    margin-bottom: 0.4rem;
    border-bottom: 1px solid #e8e8e8;

    span {
      display: inline-block;

      @include font;
    }

    .label {
      font-size: 0.3rem;
      color: #888888;
    }

    .value {
      font-size: 0.48rem;
      color: #000000;
    }
  }

  .dankal-order-block-body {
    .dankal-order-block-body-item {
      @include flex-container($align-items: flex-start);

      span {
        font-size: 0.28rem;
        color: #888888;
      }

      .value {
        flex: 1;
        text-align: right;
      }
    }

    .dankal-order-block-body-item + .dankal-order-block-body-item {
      margin-top: 0.2rem;
    }
  }
}
</style>
