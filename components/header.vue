<template>
  <div class="header">
    <div class="box">
      <div
        class="menu"
        @click="homepage">
        <img src="@/assets/images/tab-bar/home-active.png">
      </div>
      <img
        class="logo"
        src="@/assets/images/current/ic_home_logo.png">

      <!--@/assets/images/current/ic_home_logo.png-->
      <div
        class="shop"
        @click="isShowNav=!isShowNav">
        <img
          v-if="userInfo.avatar"
          :src="userInfo.avatar | imgMapper">
        <img
          v-else
          src="@/assets/images/tab-bar/home-person.png">
      </div>
    </div>
    <div
      class="ul"
      v-if="isShowNav">
      <div class="triangle"/>
      <div class="chunk">
        <div
          v-if="!token"
          class="li"
          @click="onFBLogin">Login
        </div>
        <div
          v-if="token"
          class="li"
          @click="navigateTo">ME</div>
        <div
          v-if="token"
          class="li"
          @click="logout">LOGOUT</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLogo } from '@/api/api';
import utils from '@/jslibs/dk-utils';
import { getUserInfo } from '@/api/user'

export default {
  data() {
    return {
      isShowNav: false,
      logo: '',
      token: '',
      userInfo: {},
    };
  },
  props: {
    // value: {
    //   type: Boolean,
    //   required: true,
    // },
    basedPath: {
      type: String,
      default: '/',
    },
  },
  watch: {
    isShowNav() {
      this.token = utils.getCookie('X-Access-Token')
      // console.log('this.token', this.token)
      // vuex 改变amend的值
      // this.$store.commit('amend', this.token)
    },
  },
  mounted() {
    this.network().getLogo()
    this.network().getUserInfo()
  },
  methods: {
    onFBLogin() {
      this.isShowNav = false
      this.$store.commit('rcondition', true)
      this.$store.commit('pcondition', true)
    },
    homepage() {
      this.$router.push('/');
    },
    // 按钮ME的逻辑
    navigateTo() {
      if (this.token) {
        this.$router.push('/user');
      }
    },
    logout() {
      utils.setCookie('X-Access-Token', '')
      if (this.$route.path === '/') {
        window.location.reload()
      } else {
        this.$router.push('/');
      }
    },
    network() {
      return {
        getLogo: async () => {
          const { data } = await getLogo('home')
          console.log('获取logo', data)
          this.logo = data.logo
        },
        getUserInfo: async () => {
          const { data } = await getUserInfo()
          console.log('获取用户信息', data)
          this.userInfo = data
          if (this.userInfo) {
            this.$store.commit('amend', true)
          }
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
    .header{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 2;
      box-shadow:0px 2px 4px 0px rgba(0,0,0,0.2);
      .box{
        height: 0.98rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #73C9B3;
        font-size: 0.28rem;
        color: #FFFFFF;
        padding: 0 0.28rem;
        .logo{
          height: 0.45rem;
          max-width: 4rem;
        }
        .shop{
          width: 1.14rem;
          height: 0.44rem;
          border-radius: 0.22rem;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            width: 0.7rem;
            height: 0.7rem;
            border-radius: 0.5rem;
          }
        }
        .menu>img{
          width: 0.65rem;
        }
      }
      .ul{
        position: absolute;
        top: 0.98rem;
        left: 4.08rem;
        width: 100%;
        .triangle{
          width: 0;
          height: 0;
          margin-left: 2.3rem;
          border-right: 0.2rem solid transparent;
          border-left: 0.2rem solid transparent;
          border-bottom: 0.2rem solid #73C9B3;
        }
        .chunk{
          margin-right: 4.3rem;
          border-radius:0.2rem;
          border: #73C9B3 solid 0.1rem;
        .li{
          // border-radius:0.2rem;
          background: #73C9B3;
          border-bottom: 1px solid #E5E5E5;
          padding: 0.2rem 0.28rem;
          color: #fff;
          font-size: 0.26rem;
          display: flex;
          align-items: center;
        }
        }
      }

    }
</style>
