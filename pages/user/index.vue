<template>
  <div class="container">
    <headerView/>
    <div class="top">
      <div
        class="mess"
        @click="navigateTo('/user/message')">
        <img src="@/assets/images/current/ic_personal_pen_bell.png">
      </div>
      <div
        class="info"
        @click="navigateTo('/user/info')">
        <div class="photo">
          <img
            class="pic"
            :src="userInfo.avatar | imgMapper">
          <img
            class="write"
            src="@/assets/images/current/ic_personal_pen.png">
        </div>
        <div class="info-div">
          <p class="name">{{ userInfo.nickname }}</p>
          <p class="email">{{ userInfo.email }}</p>
        </div>
      </div>
    </div>
    <div class="plate-div">
      <div
        class="plate"
        @click="navigateTo('/user/bargain/detail')">
        <!-- <div
        class="plate"
        @click="navigateTo('/user/bargain')"> -->
        <img
          class="icon"
          src="@/assets/images/current/ic_personal_Bargain.png">
        <div class="plate-name">
          <p class="title">My Challenge</p>
        </div>
      </div>
      <div
        class="plate"
        @click="navigateTo('/user/order')">
        <img
          class="icon"
          src="@/assets/images/current/ic_personal_order.png">
        <div class="plate-name">
          <p class="title">My Orders  </p>
          <p class="num">{{ orderNum.my_order||0 }} </p>
        </div>
      </div>
      <!-- 钱包 -->
      <!-- <div
        class="plate"
        @click="navigateTo('/user/wallet')">
        <img
          class="icon"
          src="@/assets/images/current/ic_personal_wallet.png">
        <div class="plate-name">
          <p class="title">My Wallet  </p>
          <p class="num">${{ userInfo.money }} </p>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import { getUserInfo, getStatistics } from '@/api/user'
import headerView from '@/components/header'

export default {
  data() {
    return {
      userInfo: {},
      orderNum: {},
    };
  },
  mounted() {
    this.network().getUserInfo()
    this.network().getStatistics()
  },
  components: {
    headerView,
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    network() {
      return {
        getUserInfo: async () => {
          const { data } = await getUserInfo()
          console.log('获取用户信息', data)
          this.userInfo = data
        },
        getStatistics: async () => {
          const { data } = await getStatistics()
          console.log('订单统计数量', data)
          this.orderNum = data
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
.container{
  background: #fff;
  min-height: 100vh;
  padding-top: 0.98rem;
  .top{
    width: 100%;
    height: 4.24rem;
    padding: 0.22rem 0.42rem 1.2rem 0.62rem;
    background: url("~assets/images/current/ic_personal_background.png") no-repeat center;
    background-size: cover;
    .mess{
      text-align: right;
      img{
        width: 0.44rem;
        height: 0.47rem;
        object-fit: contain;
      }
    }
    .info{
      margin: auto;
      text-align: center;
      // display: flex;
      // align-items: center;
      .photo{
        position: relative;
        // .plate-name{

        // }
        .write{
          width:0.6rem;
          height:0.6rem;
          position: absolute;
          right: 2.3rem;
          bottom: 0.07rem;
          background:rgba(255,255,255,0.2);
          border-radius: 100%;
          padding: 0.08rem;
          box-sizing: border-box;
        }
        .pic{
          width:1.8rem;
          height:1.8rem;
          border-radius: 50%;
          background:rgba(255,255,255,1);
          border:0.04rem solid rgba(255,255,255,1);
          object-fit: cover;
        }
      }
      .info-div{
        color: #fff;
        margin-top: 0.2rem;
        .name{
          font-size: 0.5rem;
          line-height: 0.7rem;
          @include line-limit-n(1)
        }
        .email{
          font-size: 0.28rem;
          line-height: 0.4rem;
          @include line-limit-n(1);
        }
      }
    }
  }
  .plate-div{
    margin-top: 0.57rem;
    margin-left: 0.37rem;
    padding: 0 0.32rem;
    flex-flow: row wrap;
    .plate{
      display: flex;
      justify-content: flex-start;
      width:6.2rem;
      height:2.34rem;
      background:rgba(255,255,255,1);
      box-shadow:0 0.02rem 0.18rem 0 rgba(0,0,0,0.1);
      border-radius:0.06rem;
      margin: 0 0.53rem 0.52rem 0;
      padding: 0.3rem 0 0.2rem 0.4rem;
      .plate-name{
        margin-left: 0.38rem;
      }
      .icon{
        margin-top: 0.2rem;
        width:1.2rem;
        height:1.2rem;
      }
      .title{
        font-size: 0.28rem;
        line-height: 0.4rem;
        font-weight: 600;
        margin: 0.16rem 0;
      }
      .num{
        font-size: 0.32rem;
        line-height: 0.38rem;
        font-family:Helvetica-Bold;
        color: #FCAB32;
        font-weight: bold;
      }
    }
  }
  .list{
    padding: 0 0.43rem 0 0.54rem;
    margin-top: 0.76rem;
    .li{
      display: flex;
      @include icon-box-right;
      line-height: 0.54rem;
      margin-bottom: 0.65rem;
      .list-icon{
        width: 0.54rem;
        height: 0.54rem;
        margin-right: 0.4rem;
      }
      .main{
        flex-grow: 1;
        text-align: left;
        font-size: 0.28rem;
        font-weight: 600;
      }
    }
  }
}
</style>
