<template>
  <div class="dialog-box">
    <div
      class="last"
      v-if="step===2"
      @click="step=1"/>
    <div class="title">{{ step===1?'付款详情':'选择付款方式' }}</div>
    <div
      class="form"
      v-if="step===1">
      <div
        class="form-li"
        @click="step=2">
        <span>付款方式</span>
        <img
          class="form-li-fr"
          src="@/assets/images/payment/ic_home_enter.png">
        <div class="color-gray66 fr">{{ payType }}</div>
      </div>
      <div class="form-li">
        <span>需付款</span>
        <span class="color-gray66 size36 fr">{{ price }}元</span>
      </div>
      <div
        class="form-li-bt"
        @click="onConfirm">确认付款</div>
    </div>
    <div
      class="ul"
      v-if="step===2">
      <div
        class="li"
        @click="switchPayType('微信支付')"
        v-if="supPayType.includes('wechat_public')||supPayType.includes('wechat_h5')">
        <img
          class="li-ic"
          src="@/assets/images/payment/ic_home_pay_wechat.png">
        <span>微信支付</span>
      </div>
      <div
        class="li"
        @click="switchPayType('支付宝支付')"
        v-if="supPayType.includes('alipay_h5')||supPayType.includes('alipay_app')">
        <img
          class="li-ic"
          src="@/assets/images/payment/ic_home_pay_alipay.png">
        <span>支付宝支付</span>
      </div>
      <div
        class="li"
        @click="switchPayType('银联支付')"
        v-if="supPayType.includes('unipay_h5')">
        <img
          class="li-ic"
          src="@/assets/images/payment/ic_home_pay_unionpay.png">
        <span>银联支付</span>
      </div>
      <div
        class="li"
        @click="switchPayType('钱包支付')"
        v-if="supPayType.includes('wallet')">
        <img
          class="li-ic"
          src="@/assets/images/payment/ic_home_pay_vip.png">
        <span>钱包支付</span>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

export default {
  data() {
    return {
      step: 1,
      payType: '微信支付',
    }
  },
  created() {
  },
  props: {
    price: {
      type: String,
      default: '0.00',
    },
    /**
       * 支持的平台支付类型
       */
    supPayType: {
      type: Array,
      default: () => ['wechat_public', 'wechat_h5', 'alipay_h5', 'wechat_app', 'alipay_app', 'unipay_h5', 'wallet'],
    },
  },
  methods: {
    __currentEnv() {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) === 'micromessenger') {
        return 'wechat'
      } if (ua.match(/App/i) === 'app') {
        return 'app'
      }
      return 'browser'
    },
    switchPayType(payType) {
      this.payType = payType
      this.step = 1
    },
    onConfirm() {
      if (this.payType === '微信支付' && this.__currentEnv() === 'wechat') {
        this.$emit('on-confirm', 'wechat_public')
      } else if (this.payType === '微信支付' && this.__currentEnv() === 'browser') {
        this.$emit('on-confirm', 'wechat_h5')
      } else if (this.payType === '微信支付' && this.__currentEnv() === 'app') {
        this.$emit('on-confirm', 'wechat_app')
      } else if (this.payType === '支付宝支付' && this.__currentEnv() === 'browser') {
        this.$emit('on-confirm', 'alipay_h5')
      } else if (this.payType === '支付宝支付' && this.__currentEnv() === 'app') {
        this.$emit('on-confirm', 'alipay_app')
      } else if (this.payType === '钱包支付') {
        this.$emit('on-confirm', 'wallet')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/mixins.scss';
  .dialog-box{width:6.40rem;height: 6.55rem;}
  .title{line-height: 1rem;border-bottom:1px solid #E9E9E9;text-align: center;font-size: 0.36rem }
  .form{padding:0.22rem 0.45rem 0 }
  .form-li{line-height: 0.82rem;color: #999999;padding: 0 0.12rem}
  .form-li-fr{width: 0.12rem;margin-top: 0.3rem;margin-right: -0.28rem;float: right}
  .form-li-bt{@include btn-primary ;width:100%;height:0.8rem;margin-top: 1.8rem;}
  .last{width: 1rem;height: 1rem;position: absolute;left: 0;top:0;
    background: url(~assets/images/payment/ic_home_return.png) no-repeat center;
    background-size: 0.15rem auto}
  .ul{padding: 0 0.2rem;}
  .li{display:flex;align-items: center;
    padding: 0 0.15rem 0 0.36rem;border-bottom:1px solid #E9E9E9;
    line-height:1.10rem ;font-size: 0.3rem }
  .li-ic{width: 0.4rem;margin-right:0.25rem }
  .li-fr{float: right;width: 0.1rem;margin-top: 0.48rem}
</style>
