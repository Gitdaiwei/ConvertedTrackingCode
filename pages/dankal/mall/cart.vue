<template>
  <section class="container">
    <div class="header-item">
      <div
        class="icon-select"
        :class="{'on':status}"
        @click="handlerAllSelected"/>
      <div class="box">
        <span @click="handlerAllSelected">全选</span>
        <span @click="handlerEdited">编辑</span>
      </div>
    </div>
    <dankal-slider-group>
      <dankal-slider
        v-for="(item, i) in carts"
        :key="i">
        <template slot="content">
          <div class="cart-item">
            <div
              class="icon-select"
              :class="{'on':item.status}"
              @click="handlerSelected(i)"/>
            <div class="cart-item_commodity">
              <img
                src="@/assets/images/sign/sign_icon_gift_light.png"
                alt=""
              >
              <div class="cart-item_commodity_detail">
                <div class="cart-item_commodity_detail_title">
                  <p>{{ item.name }}</p>
                  <p>{{ item.spec }}</p>
                </div>
                <div class="cart-item_commodity_detail_price">
                  <span>￥{{ item.price }}</span>
                  <dankal-stepper
                    v-model="item.number"
                    :max="10"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
        <template slot="actions">
          <div class="cart-item_action">
            <span @click="handlerDeleted(i)">删除</span>
          </div>
        </template>
      </dankal-slider>
    </dankal-slider-group>
    <transition name="rolling">
      <div
        v-if="!edit"
        class="order-item"
      >
        <div>
          <span>合计:</span>
          <span>￥{{ info.total }}</span>
        </div>
        <div @click="handlerAdvanceOrder">
          <span>结算({{ info.count }})</span>
        </div>
      </div>
      <div
        v-if="edit"
        class="delete-item"
      >
        <div />
        <div @click="handlerBatchDeletedIntercept">
          <span>删除({{ info.count }})</span>
        </div>
      </div>
    </transition>
    <dankal-modal v-model="modal">
      <div class="modal-item">
        <p>确认将这 {{ info.count }} 个商品删除？</p>
        <div>
          <span @click="handlerBatchDeleted">是</span>
          <span @click="() => { this.modal = false; }">否</span>
        </div>
      </div>
    </dankal-modal>
  </section>
</template>

<script>
import DankalSliderGroup from '@/components/dankal/dankal-slider-group';
import DankalSlider from '@/components/dankal/dankal-slider';
import DankalStepper from '@/components/dankal/dankal-stepper';
import DankalModal from '@/components/dankal/dankal-modal';

import Select from '@/jslibs/select';

export default {
  data() {
    return {
      edit: false,
      number: 1,
      carts: [
        {
          name: '百草味 COCO家 超级美味 黑凤梨 千层星云酥',
          spec: '180克/3颗',
          number: 1,
          price: 255,
        },
      ],
      status: false,
      modal: false,
    };
  },

  components: {
    DankalSliderGroup,
    DankalSlider,
    DankalStepper,
    DankalModal,
  },

  computed: {
    info() {
      let count = 0;
      let total = 0;

      if (!this.carts || !this.carts.length) {
        return {
          count,
          total,
        };
      }

      // eslint-disable-next-line
        this.carts.filter(item => item.status).forEach(item => {
        total += Number.parseFloat(item.price, 10);
        count += item.number;
      });

      return {
        count,
        total,
      };
    },
  },

  methods: {
    handlerEdited() {
      this.edit = !this.edit;
    },

    handlerSelected(index) {
      const { carts } = this;
      this.carts = Select.multiple(carts, index);
    },

    handlerDeleted(index) {
      const { carts } = this;
      carts.splice(index, 1);
      this.carts = carts;
    },

    handlerBatchDeletedIntercept() {
      const cache = this.carts.find(item => item.status);

      if (!cache) {
        this.$toast('亲，请选择你要删除的商品~');
        return;
      }

      this.modal = true;
    },

    handlerBatchDeleted() {
      this.carts = this.carts.filter(item => !item.status);
    },

    handlerAllSelected() {
      const { carts, status } = this;
      this.status = !status;
      this.carts = Select.all(carts, !status);
    },

    handlerAdvanceOrder() {
      const cache = this.carts.find(item => item.status);

      if (!cache) {
        this.$toast('亲，请选择你要购买的商品~');
        return;
      }

      console.log('====================================');
      console.log(this.carts);
      console.log('====================================');
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/variables.scss';
  @import '~@/assets/styles/mixins.scss';
  @mixin modal-item {
    width: 5.6rem;
    border-radius: 0.08rem;

    p {
      text-align: center;
      font-size: 0.36rem;

      padding-top: 0.76rem;
      padding-bottom: 0.64rem;
    }

    div {
      @include flex-container;
      border-top: 1px solid $border-color;

      span {
        flex-basis: 50%;
        display: inline-block;
        height: 1rem;

        font-size: 0.36rem;
        text-align: center;
        line-height: 1rem;
      }

      span:nth-of-type(2) {
        color: $secondary-color;
      }

      span + span {
        border-left: 1px solid $border-color;
      }
    }
  }

  .container{
    height: 100vh;
    background-color: $background-color;
  }

  .header-item {
    @include flex-container;
    padding: 0.2rem 0.16rem;
    background-color: #ffffff;
    border-bottom: 1px solid $background-color;
    .box {
      @include flex-container;

      flex: 1;
      margin-left: 0.15rem;

      span {
        font-size: 0.24rem;
      }
    }

    span {
      font-family: 0.28rem;
    }
  }

  .cart-item {
    @include flex-container;

    width: 100%;
    height: 2.34rem;
    background-color: #ffffff;
    padding: 0.2rem 0.2rem;
    border-bottom: 1px solid $background-color;

    img {
      width: 0.4rem;
      height: 0.4rem;
    }

    .cart-item_commodity {
      @include flex-container;
      margin-left: 0.15rem;

      img {
        width: 1.8rem;
        height: 1.8rem;
      }

      .cart-item_commodity_detail {
        @include flex-container;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;

        min-height: 1.8rem;
        margin-left: 0.2rem;

        .cart-item_commodity_detail_title {
          @include flex-container;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;

          p:nth-of-type(1) {
            font-size: 0.26rem;
            margin-bottom: 0.1rem;
          }

          p:nth-of-type(2) {
            font-size: 0.22rem;
          }
        }

        .cart-item_commodity_detail_price {
          @include flex-container;
          width: 100%;

          span:nth-of-type(1) {
            font-size: 0.28rem;
            color: $secondary-color;
          }
        }
      }
    }
  }

  .cart-item_action {
    height: 100%;

    span {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      font-size: 0.28rem;
      color: #ffffff;
      padding: 0rem 0.2rem;
    }

    span:nth-of-type(1) {
      padding: 0rem 0.4rem;
      background-color: $secondary-color;
    }
  }

  .order-item,
  .delete-item {
    @include flex-container;

    position: fixed;
    bottom: 0rem;
    width: 100%;

    div {
      flex-basis: 50%;
      @include flex-container;
      justify-content: center;
      height: 0.98rem;
    }

    div:nth-of-type(1) {
      background-color: #ffffff;

      span:nth-of-type(2) {
        color: $primary-color;
        font-size: 0.36rem;
      }
    }

    div:nth-of-type(2) {
      background-color: $primary-color;
      color: #ffffff;
    }
  }

  .delete-item {
    div:nth-of-type(2) {
      background-color: $secondary-color;
      color: #ffffff;
    }
  }

  .modal-item {
    @include modal-item;
  }
</style>
