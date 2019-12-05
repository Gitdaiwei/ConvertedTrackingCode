<template>
  <section class="container">
    <cube-button @click="isShowModal=true">Modal蒙层</cube-button>
    <dankal-modal
      v-model="isShowModal">
      <template>
        <span>haha</span>
      </template>
    </dankal-modal>
    <cube-button @click="addressPicker">地址选择器</cube-button>
    <dankal-addr ref="picker"/>
    <dankal-html :html="html"/>
    <cube-button @click="isShowPayWaysModal=true">支付方式选择</cube-button>
    <dankal-modal
      v-model="isShowPayWaysModal">
      <dankal-pay-ways price="50.00"/>
    </dankal-modal>
    <p>星级选择</p>
    <dankal-star-bar
      v-model="star"
      :quantity="6"/>
    <cube-button @click="isShowSku=true">sku选择器</cube-button>
    <dankal-sku
      v-model="isShowSku"
      @buy-clicked="test"
      @add-cart="test"
      :specification="specificationList"/>
    <cube-button @click="updateHolder">显示/隐藏列表占位图</cube-button>
    <dankal-tab-bar
      class="tab-bar"
      :options="tabBarData"
      background-color="#0d1323"
      color="#ffffff"
      select-color="#dfc07e"/>
  </section>

</template>

<script>
/* eslint-disable global-require */

import DankalModal from '@/components/dankal/dankal-modal'
import DankalAddr from '@/components/dankal/dankal-address-picker'
import DankalHtml from '@/components/dankal/dankal-html'
import DankalUpload from '@/components/dankal/dankal-image-upload'
import DankalTabBar from '@/components/dankal/dankal-tabbar'
import DankalPayWays from '@/components/dankal/dankal-pay-ways'
import DankalStarBar from '@/components/dankal/dankal-star-bar'
import DankalSku from '@/components/dankal/dankal-sku'

export default {
  name: 'Sample',
  components: {
    DankalModal,
    DankalAddr,
    DankalHtml,
    DankalUpload,
    DankalTabBar,
    DankalPayWays,
    DankalStarBar,
    DankalSku,
  },
  data() {
    return {
      star: 3,
      isShowModal: false,
      isShowPayWaysModal: false,
      isShowSku: false,
      html: '<p align="center">富文本展示器</p><p><img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3478746384,2289037560&fm=27&gp=0.jpg"></p>',
      specificationList: [
        {
          name: '100克',
          img_src: 'https://cdn.idalhome.com/FtndNKAgTOrRHBhgrciFSIYaPkzR',
          originPrice: '2.00',
          price: '1.00',
          stock: 5,
          uuid: '0d55672f3a1c2e8b731cba5027956ccc',
        },
        {
          name: '200克',
          img_src: 'https://cdn.idalhome.com/FiRgP7G5wid_s26CIfWUqXYtz9gJ',
          originPrice: '4.00',
          price: '2.00',
          stock: 4,
          uuid: '0d55672f3a1c2e8b731cba5027956ddd',
        },
      ],
      tabBarData: [
        {
          router: '/', // 路由
          text: '首页', // tab名
          iconPath: require('~/assets/images/tab-bar/home.png'),
          selectedIconPath: require('~/assets/images/tab-bar/home-active.png'),
        },
        {
          router: '/user',
          text: '我的',
          iconPath: require('~/assets/images/tab-bar/home.png'),
          selectedIconPath: require('~/assets/images/tab-bar/home-active.png'),
        },
      ],
    }
  },
  methods: {
    addressPicker() {
      this.$refs.picker.showAddressPicker()
    },
    updateHolder() {
      window.vm.$emit('test')
    },
    test(obj) {
      console.log(obj)
    },
  },
}
</script>

<style lang="scss" scoped>
.container{
  height: 100%;
  overflow: auto;
  padding-bottom: 0.98rem;
  .cube-btn{
    margin: 4px!important;
  }
  .tab-bar{
    position: fixed;
    left: 0;
    bottom: 0;
  }
}
</style>
