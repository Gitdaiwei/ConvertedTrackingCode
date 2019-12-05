<template>
  <div class="container">
    <headerView/>
    <div class="title">{{ productInfo.info.name }}</div>
    <div
      class="banner"
      v-if="productBanner[0].length">
      <swiper :options="swiperOption">
        <swiper-slide
          v-for="(item,index) in productBanner[0]"
          :key="index">
          <img
            :src="item.img_src | imgMapper"
            class="swiper-image"
            @click="navigateToOut(item.url)">
        </swiper-slide>
        <div
          class="swiper-pagination"
          slot="pagination"/>
      </swiper>
    </div>
    <!-- <div
      v-if="index<3"
      class="img-box"
      :class="{'inside':item.type==2}"
      v-for="(item,index) in productShow"
      :key="index">
      <img
        class="img"
        :src="item.img_src | imgMapper"
      >
    </div> -->
    <div
      class="swiper"
      v-if="productBanner[1].length">
      <swiper :options="swiperOption">
        <swiper-slide
          v-for="(item,index) in productBanner[1]"
          :key="index">
          <img
            :src="item.img_src | imgMapper"
            class="swiper-image"
            @click="navigateToOut(item.url)">
        </swiper-slide>
        <div
          class="swiper-pagination"
          slot="pagination"/>
      </swiper>
    </div>
    <div
      v-if="index>=3"
      class="img-box"
      :class="{'inside':item.type==2}"
      v-for="(item,index) in productShow"
      :key="index">
      <img
        class="img"
        :src="item.img_src | imgMapper"
      >
      <!-- 按钮（有循环） -->
      <!-- <product-bt
        :info="productInfo.info"
        @submit="submit"/> -->
    </div>
    <dankal-sku
      v-model="type"
      :specification="productInfo.standard"
      :productinfo="productInfo.info"
      @buy-clicked="confirm"
    />
    <product-bt
      class="oBtn"
      :info="productInfo.info"
      @submit="submit"
    />
  </div>
</template>

<script>
/* eslint-disable global-require */
import headerView from '@/components/header'
import productBt from '@/components/product-bt'
import dankalSku from '@/components/dankal/dankal-sku';
import { getProductBanner, getProductShow, getProductInfo } from '@/api/api';
import { getUserInfo } from '@/api/user'


export default {
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 3000,
        },
        pagination: {
          el: '.swiper-pagination',
        },
      },
      productBanner: [[], []],
      productShow: [],
      productInfo: { info: {}, standard: [] },
      type: '',
    };
  },
  components: {
    headerView, productBt, dankalSku,
  },
  watch: {
    type(val) {
      switch (val) {
        case 'buy':
          this.productInfo.info.price = this.productInfo.info.current_price
          break
        case 'bargain':
          this.productInfo.info.price = this.productInfo.info.bottom_price
          break
        default:
      }
    },
  },
  mounted() {
    this.network().getProductBanner(1)
    this.network().getProductBanner(2)
    this.network().getProductShow()
    this.network().getProductInfo()
    localStorage.setItem('state', '');
  },

  methods: {
    submit(type) {
      this.type = type
    },
    confirm(e) {
      if (!this.productInfo.info.stock) {
        this.$createToast({
          txt: 'No stock',
          type: 'txt',
          time: 2000,
        }).show();
        return
      }
      window.comfirmOrderInfo = {
        type: this.type,
        count: this.type === 'bargain' ? 1 : e.buyNumber,
        standard: e.selectedItem,
        productInfo: this.productInfo.info,
      }
      this.network().getUserInfo()
    },
    navigateTo(path) {
      this.$router.push(path);
    },
    navigateToOut(path) {
      if (!path) return
      window.location.href = path
    },
    network() {
      return {
        getUserInfo: async () => {
          const toast = this.$createToast({ txt: 'Loading...', mask: true, time: 0 })
          toast.show()
          const { data } = await getUserInfo()
          toast.hide()
          console.log('获取用户信息', data)
          this.navigateTo('/user/order/confirm')
        },
        getProductBanner: async (type) => {
          const { data } = await getProductBanner({ type })
          console.log(`获取产品轮播 type=${type}`, data)
          if (data.data.length) {
            const ind = type - 1
            this.productBanner.splice(ind, 1, data.data)
          }
        },
        getProductShow: async () => {
          const { data } = await getProductShow()
          console.log('获取产品展示图', data)
          this.productShow = data.data
        },
        getProductInfo: async () => {
          const { data } = await getProductInfo()
          console.log('获取产品信息', data)
          this.productInfo = data
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
    /deep/ .swiper-pagination-bullet {
      width: 0.18rem;
      height: 0.18rem;
      background: url("~assets/images/current/ic_home_banner_normal.png");
      background-size: 100% 100% !important;
      opacity: 1;
      vertical-align: top;
    }

    /deep/ .swiper-pagination-bullet-active {
      background:  url("~assets/images/current/ic_home_banner_light.png");
    }
    .container{
      padding-top: 0.98rem;
      .title{
        padding: 0.34rem 0.3rem;
        font-weight: bolder;
        font-size: 0.42rem;
        text-align: center;
      }
      .banner{
        .swiper-container{
          padding-bottom: 0.8rem;
        }
        .swiper-image{
          width: 100%;
          height: 7.14rem;
          object-fit: cover;
          background: #f9f9f9;
        }
        .swiper-pagination{
          bottom: 0.4rem;
          height: 0.18rem;
        }
      }
      .swiper{
        padding: 0rem 0.46rem 0;
        .swiper-container{
          padding-bottom: 1.75rem;
        }
        .swiper-image{
          width: 100%;
          height: auto;
          background: #f9f9f9;
        }

        .swiper-pagination{
          bottom: 0.84rem;
          height: 0.18rem;
        }
      }
      .img-box{
        position: relative;
        .img{
          width: 100%;
        }
        &.inside{
         width: 6.9rem;
          margin: 0.75rem auto;
        }
      }
      .oBtn{
        position:fixed;
      }
    }
</style>
