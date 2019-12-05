<template>
  <section class="container">
    <div class="address-item">
      <div
        v-if="!address"
        class="unselected"
      >
        <img
          src="@/assets/images/icon_address_add.png"
          alt=""
        >
        <span>请添加收货地址</span>
      </div>
      <div
        v-if="address"
        class="selected"
      >
        <div>
          <p>
            <span>收货人：ZHI</span>
            <span>13499380000</span>
          </p>
          <img
            src="@/assets/images/ic_location_enter.png"
            alt=""
          >
        </div>
        <p>
          <img
            src="@/assets/images/ic_order_location.png"
            alt=""
          >
          <span>广东省深圳市龙岗区龙城街道花样年龙年广场13a01</span>
        </p>
      </div>
    </div>
    <div class="discount-item">
      <div class="coupon">
        <p>
          <span>优惠券</span>
          <span>满10减1</span>
        </p>
        <img
          src="@/assets/images/ic_location_enter.png"
          alt=""
        >
      </div>
      <div class="integral">
        <p>
          <span>积分</span>
          <span>共1999积分，可用1000积分，抵¥10.00</span>
        </p>
        <cube-switch v-model="integral" />
      </div>
    </div>
    <div class="price-item">
      <p>
        <span>商品金额</span>
        <span>¥55.88</span>
      </p>
      <p>
        <span>运费</span>
        <span>¥7.00</span>
      </p>
    </div>
    <div class="orders-block">
      <div>
        <span>共 2 件商品</span>
        <span>合计：</span>
        <span>¥255</span>
      </div>
      <div>
        <span>提交订单</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      address: undefined,
      integral: false,
    };
  },
};
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/variables.scss';
  @import '~@/assets/styles/mixins.scss';

.address-item {
  margin-bottom: 0.2rem;
  background-color: #ffffff;

  .unselected {
    @include flex-container;
    justify-content: center;

    height: 1.65rem;

    img {
      width: 0.36rem;
    }

    span {
      font-size: 0.32rem;
      margin-left: 0.18rem;
    }
  }

  .selected {
    padding: 0rem 0.3rem;

    div {
      @include flex-container;
      margin-bottom: 0.2rem;

      p {
        flex: 1;

        span {
          margin-left: 0rem;
        }
      }

      img {
        width: 0.16rem;
        margin-left: 0.3rem;
      }
    }

    p {
      @include flex-container;
      align-items: flex-start;

      img {
        width: 0.24rem;
      }

      span {
        font-size: 0.28rem;
        line-height: 0.3rem;

        margin-left: 0.2rem;
      }
    }
  }
}

.discount-item {
  padding: 0rem 0.3rem;
  margin-bottom: 0.2rem;
  background-color: #ffffff;

  div {
    @include flex-container;
    padding: 0.26rem 0rem;
  }

  div + div {
    border-top: 1px solid #f2f2f2;
  }

  .coupon {
    span {
      font-size: 0.26rem;
    }

    img {
      width: 0.16rem;
    }
  }

  .integral {
    span {
      font-size: 0.24rem;
    }

    span + span {
      margin-left: 0.1rem;
    }
  }
}

.price-item {
  padding: 0.24rem 0.3rem;
  background-color: #ffffff;

  p {
    @include flex-container;

    span {
      font-size: 0.26rem;
    }
  }

  p + p {
    margin-top: 0.18rem;
  }
}

.orders-block {
  @include flex-container;

  position: fixed;
  bottom: 0rem;
  width: 100%;

  div {
    @include flex-container;
    justify-content: center;
    height: 0.98rem;
  }

  div:nth-of-type(1) {
    flex: 1;
    justify-content: flex-start;
    padding: 0rem 0.6rem;
    background-color: #ffffff;

    span:nth-of-type(2) {
      color: #333333;
      margin-left: 0.3rem;
    }
  }

  div:nth-of-type(2) {
    width: 2.6rem;
    color: #ffffff;
    background-color: $secondary-color;
  }
}
</style>
