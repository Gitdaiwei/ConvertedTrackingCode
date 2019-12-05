<template>
  <div class="container">
    <headerView/>
    <div class="top">
      <div
        class="bt"
        :class="{'on':!isPending}"
        @click="isPending=false">Pocket Money </div>
      <div
        class="bt"
        :class="{'on':isPending}"
        @click="isPending=true">Pending Money</div>
    </div>
    <div class="money">
      <div
        v-if="!isPending"
        class="pri">${{ money }}</div>
      <div
        v-if="isPending"
        class="pri">${{ (pendingDeal.bargain + pendingDeal.order).toFixed(2) }}</div>
    </div>
    <!-- <div class="pri">${{ money }}</div> -->
    <div
      v-if="!isPending"
      class="btn-primary bt"
      @click="navigateTo('./wallet/withdraw')">WITHDRAW</div>
    <!-- <div
      class="box box1"
      v-if="isPending">
      <div class="pri">${{ (pendingDeal.bargain + pendingDeal.order).toFixed(2) }}</div>
    </div> -->
    <div
      class="box box2"
      v-if="isPending&&false">
      <div class="li">
        <div class="pri">${{ pendingDeal.bargain }}</div>
        <div class="tex"> Unfinishied order <br> income </div>
      </div>
      <div class="li">
        <div class="pri">${{ pendingDeal.order }}</div>
        <div class="tex">Finished order <br> within <br> 30days‘ income </div>
      </div>
    </div>
    <div
      class="history"
      v-if="!isPending&&deal.length">
      <div class="til">Transaction History </div>
      <div class="ul">
        <div
          class="li"
          v-for="(item,index) in deal"
          :key="index">
          <div class="main">
            <div>{{ item.type===1?'Income settlement':'Withdraw cash ' }}</div>
            <div class="time">{{ item.create_time }}</div>
          </div>
          <div class="pri">{{ item.pay_type === 1?'-':'+' }}${{ item.money }} </div>
        </div>
      </div>
    </div>
    <div
      class="history rule"
      v-if="isPending">
      <div class="til">Pending Money Rules</div>
      <div class="ul">
        <div class="li">
          You will receive pocket money when someone you helped bargain buys the product and
          the refund period is complete.
        </div><br>
        <div class="li">
          You will not receive pocket money for refunds or if someone doesn’t buy the product.
        </div><br>
        <div class="li">
          You can check how much money you could earn by going to the My Friends Bargains section.
        </div><br>
      </div>
    </div>
  </div>
</template>

<script>
import { getDeal, getPendingDeal } from '@/api/wallent'
import { getUserInfo } from '@/api/user'
import headerView from '@/components/header'

export default {
  head() {
    return {
      title: 'My Wallet',
    };
  },
  data() {
    return {
      isPending: false,
      money: '',
      deal: [],
      pendingDeal: { list: [] },
    };
  },
  components: { headerView },
  mounted() {
    this.network().getUserInfo()
    this.network().getDeal()
    this.network().getPendingDeal()
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
          this.money = data.money
        },
        getDeal: async () => {
          const { data } = await getDeal()
          console.log('获取零钱明细', data)
          this.deal = data.data
        },
        getPendingDeal: async () => {
          const { data } = await getPendingDeal()
          console.log('获取预计收益', data)
          this.pendingDeal = data
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
    @import '~@/assets/styles/variables.scss';
  .container{
    height: 100vh;
    overflow: auto;
    background: $background-color;
    .top{
      width: 110%;
      height: 5.5rem;
      padding: 1.42rem 0.42rem 0.42rem 0.42rem;
      background: url("~assets/images/current/pic_wallet_background.png") no-repeat center;
      background-size: cover;
      display: flex;
      justify-content: space-between;
      color: #FFFFFF;
      font-size: 0.34rem;
      .bt{
        color: #000;
        position: relative;
        line-height: 1;
        padding-right: 0.7rem;
        &.on{
          &:after{
            content: '';
            width: 1.6rem;
            height: 2px;
            background: #FFFFFF;
            display: block;
            position: absolute;
            left: 0;
            top: 0.5rem;
          }
        }
      }
    }
    .money{
        color: rgba(252,171,50,1);
        font-size: 0.86rem;
        position: absolute;
        top: 3rem;
        left: 2.5rem;
      }
    .box{
      width: 6.64rem;
      margin: 0 auto;
      margin-top: 1.54rem;
      background: #FFFFFF;
      border-radius: 0.08rem;
      text-align: center;
      box-shadow:0px 2px 18px 0px rgba(0,0,0,0.1);
      &.box1{
        padding: 0.8rem 0 0.5rem;
        .pri{
          color: rgba(252,171,50,1);
          font-size: 0.86rem;
          line-height: 1;
          font-weight: bolder;
          padding-bottom: 0.3rem;
        }
        .bt{
          width: 4rem;
          height: 0.7rem;
          border-radius: 0.35rem;
          background:linear-gradient(145deg,rgba(126,223,198,1) 0%,rgba(115,201,179,1) 100%);
          margin-top: 0.48rem;
        }
      }
      &.box2{
        padding: 0.4rem 0;
        display: flex;
        .li{
          flex: 1;
          padding: 0.18rem 0;
          .pri{
            color: rgba(252,171,50,1);
            font-size: 0.8rem;
            line-height: 1;
            font-weight: bolder;
            margin-bottom: 0.18rem;
          }
          .tex{
            color:rgba(141,153,161,1);
            font-size: 0.32rem;
            line-height: 0.4rem;
          }
          &+.li{
            border-left: 1px solid rgba(229,229,229,1);
          }
        }
      }
    }
    .btn-primary{
      border-radius: 0.35rem;
      width: 4.4rem;
      height: 0.8rem;
      border-radius: 0.35rem;
      background:linear-gradient(145deg,rgba(126,223,198,1) 0%,rgba(115,201,179,1) 100%);
      margin-top: 1.8rem;
    }
    .history{
      padding: 0.3rem 0.75rem 0.3rem 0.8rem;
      .til{
        padding: 0.32rem 0;
        font-size: 0.32rem;
        font-weight: bolder;
        text-align: center;
        border-bottom:1px solid rgba(115,201,179,1);
      }
      .ul{
        padding-top: 0.36rem;
        .li{
          display: flex;
          align-items: center;
          .main{
            flex: 1;
            .time{
              color:rgba(180,196,204,1);
              font-size: 0.24rem;
              margin-top: 0.06rem;
            }
          }
          .pri{
            color:rgba(252,171,50,1);
            font-size: 0.32rem;
            font-weight: bolder;
          }
          &+.li{
            margin-top: 0.24rem;
          }
        }
      }
      &.rule{
        .li{
          font-size: 0.24rem;
          line-height: 0.42rem;
          align-items: baseline;
          margin-bottom: 0;
          &:before{
            content: '';
            display: inline-block;
            vertical-align: middle;
            line-height: 0.42rem;
            min-width: 0.12rem;
            width: 0.12rem;
            height: 0.12rem;
            border-radius: 100%;
            background: #999999;
            margin-right: 0.22rem;
          }
        }
      }
    }
  }
</style>
