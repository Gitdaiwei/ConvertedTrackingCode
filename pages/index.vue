<template>
  <div class="container">
    <div v-show="fstatus">
      <header-view/>
    </div>
    <homePage/>
    <div class="content">
      <div class="footer">
        <div class="main">
          <div>@2019 Trubrush. All Rights Reserved</div>
          <div>
            <span
              class="link"
              @click="navigateTo('./home/privacy-policy')">Privacy Policy</span>
            <span> | </span>
            <span
              class="link"
              @click="navigateTo('./home/term-of-use')">Term of Use</span>
          </div>
          <div>
            <br>
            Trubrush Synervision <br>
            300 Delaware Avenue Suite 210-A <br>
            Wilmington, DE 19801
          </div>
        </div>
        <div class="challenge">
          <div
            v-show="popUp"
            class="challenge-setting"
            @click="onpadlock"/>
          <div
            v-if="popUp"
            class="popUp">
            <fenter/>
          </div>
        </div>
        <div
          class="begin-challenge"
          v-show="reveal"
          @click="onFBLogin">
          <p>SHOP NOW</p>
          <span>Click SHOP NOW to start your bargain</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable global-require */
import headerView from '@/components/header'
import homePage from '@/components/home-page'
import fenter from './login/fenter'
import utils from '@/jslibs/dk-utils'
import {
  getProductBanner, getHomeShow, getProductShow,
} from '@/api/api';
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
      token: '',
      homeBanner: [],
      homeShow: [],
      productBanner: [[], []],
      productShow: [],
    }
  },
  components: {
    headerView, fenter, homePage,
  },
  mounted() {
    this.network().getProductBanner(1)
    this.network().getHomeShow()
    this.network().getProductShow()
    this.network().getUserInfo()
    window.addEventListener('scroll', this.showIcon);
  },
  // vuex数据使用
  computed: {
    fstatus() {
      return this.$store.state.fenter
    },
    popUp() {
      return this.$store.state.withFacebook.popUp
    },
    reveal() {
      return this.$store.state.withFacebook.reveal
    },
  },
  methods: {
    onFBLogin() {
      if (!this.token) {
        this.$store.commit('pcondition', true)
      } else {
        this.$router.push('/user/bargain/detail');
      }
    },
    // 关闭
    onpadlock() {
      this.$store.commit('pcondition', false)
    },
    navigateTo(path, isskip) {
      if (isskip === 0) return
      this.$router.push(path);
    },
    navigateToOut(path) {
      if (!path) return
      window.location.href = path
    },
    network() {
      return {
        getProductBanner: async (type) => {
          const { data } = await getProductBanner({ type })
          console.log(`获取产品轮播 type=${type}`, data)
          this.token = utils.getCookie('X-Access-Token')
          if (data.data.length) {
            const ind = type - 1
            this.productBanner.splice(ind, 1, data.data)
          }
        },
        getUserInfo: async () => {
          const { data } = await getUserInfo()
          console.log('获取用户信息', data)
          this.userInfo = data
        },
        getProductShow: async () => {
          const { data } = await getProductShow()
          console.log('获取产品展示图', data)
          this.productShow = data.data
        },
        getHomeShow: async () => {
          const { data } = await getHomeShow()
          console.log('获取展示图', data)
          this.homeShow = data.data
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

  .container{
    .challenge{
      display: flex;
      align-items: flex-end;
      flex-wrap:wrap-reverse;
      .challenge-setting{
        height: 100%;
        width: 100%;
        position:fixed;
        bottom: 0rem;
        z-index: 4;
        background: #000;
        opacity:0.55;
      }
      .popUp{
        position:fixed;
        left: -0.6rem;
        bottom: -0.3rem;
        z-index: 5;
    }
    .padlock{
      width: 0.5rem;
      margin-left: 5.8rem;
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
    .content{
      .swiper{
        padding: 0.42rem 0.46rem 0.55rem;
        .swiper-container{
          padding-bottom: 0.85rem;
        }
        .swiper-image{
          width: 100%;
          height: auto;
          background: #f9f9f9;
        }
        .swiper-pagination{
          bottom: 0.4rem;
          height: 0.18rem;
        }
        .bt{
          width: 2.6rem;
          height: 0.7rem;
          border-radius: 0.35rem;
        }
      }
      .img{
        width: 100%;
      }
      .footer{
        border-top: 1px solid #f5f5f5;
        .main{
          padding: 0.48rem 0.58rem;
          color: #73C9B3;
          line-height: 0.4rem;
          padding-bottom: 1.5rem;
          .link{
            font-weight: 500;
          }
        }
      }
    }
    .begin-challenge{
      width: 100%;
      height:1.5rem;
      background: #FBAF5D;
      color: #fff;
      position:fixed;
      bottom: 0;
      text-align:center;
      z-index: 3;
      p{
        font-weight: bold;
        font-size: 0.5rem;
        padding-top: 0.15rem;
      }
        span{
          font-size: 0.2rem;
          font-weight: 700;
          font-style:oblique;
      }
    }
  }
</style>
