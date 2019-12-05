<template>
  <div class="container">
    <header-view/>
    <!-- <img
      v-if="status"
      class="succeed-img"
      src="@/assets/images/current/ic_pay_successful.png"> -->
    <div>
      <div
        class="top"
        v-if="status">
        <img src="@/assets/images/ic_order_completion.png">
        <p class="headline">
          <span>Payment Success</span>
        </p>
        <div class="subtitle">
          <p>Your payment of ${{ detail.money }} was successfully<br>completed</p>
        </div>
      </div>
      <div
        v-if="status"
        class="indent-details">
        <p>Order details</p>
        <div class="content">
          <div class="addr">
            <div>
              <img src="@/assets/images/current/location.png">
            </div>
            <div>
              {{ detail.address.full_name }} {{ detail.address.phone_number }} <br>
              {{ detail.address.address_line_1 }}
              {{ detail.address.address_line_2 }}
              {{ detail.address.fill_city }}
              {{ detail.address.fill_state }}
            </div>
          </div>
          <div class="goods">
            <order-item
              class="product"
              :content="detail"
              :is-show-refund="type=='order'&&detail.status==3&&!detail.after_uuid"
              :is-show-restart="type=='bargain'&&detail.status==2"
              @clickRefunded="navigateTo('./refund?uuid='+detail.uuid)"
              @clickRestart="clickRestart"/>
            <div
              class="price"
              v-if="type=='bargain'||detail.type==1">
              <div class="li">
                <div class="attr">Your Price</div>
                <div>${{ detail.price }}</div>
              </div>
              <div class="li total">
                <div class="attr">You Saved</div>
                <div class="val">${{ detail.money }}</div>
              </div>
            </div>
            <div
              class="info"
              v-if="type=='order'">
              <div class="til">
                <div class="sp">Order information </div>
              </div>
              <div class="main">
                <div>order number：{{ detail.order_number }}</div>
                <div>order date：{{ detail.create_time }}</div>
                <!-- <div>
                  state：
                  {{ detail.status==1?'To be shipped':'' }}
                  {{ detail.status==2?'To be received':'' }}
                  {{ detail.status==3?'Finish':'' }}
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="top"
      v-if="!status">
      <img src="@/assets/images/ic_order_failure.png">
      <p class="headline">
        <span>Payment Failed</span>
      </p>
      <div class="subtitle">
        Your payment was not succcessfully <br>
        processed. Please try again.
      </div>
    </div>
    <div
      v-if="status"
      @click="navigateTo('../../')"
      class="btn">
      Return to your account
    </div>
    <div
      v-if="!status"
      @click="this.jumpToPay(-2)"
      class="btn defeated">
      Try again
    </div>
  </div>
</template>

<script>
import { orderDetail, addTheLogistics, sendMessage } from '@/api/order'
import headerView from '@/components/header'
import orderItem from '@/components/order-item'
import { getUserInfo } from '@/api/user'

export default {
  head() {
    return {
      title: `Pay for ${this.$route.query.status === 'true' ? 'success' : 'failure'}`,
    };
  },
  data() {
    return {
      order_uuid: '',
      status: '',
      type: this.$route.query.type || 'order',
      num: 0,
      detail: { address: {} },
    };
  },
  components: {
    headerView, orderItem,
  },
  mounted() {
    this.order_uuid = this.$route.query.order_uuid
    this.status = this.$route.query.status === 'true'
    console.log(this.status, this.order_uuid)
    if (this.status) {
      this.network().orderDetail()
    }
  },
  methods: {
    jumpToPay(a) {
      this.$router.go(a)
    },
    navigateTo(path) {
      this.$router.push(path);
    },
    network() {
      return {
        orderDetail: async () => {
          const toast = this.$createToast({ txt: 'Waiting...', mask: true, time: 0 })
          toast.show()
          const { data } = await orderDetail(this.order_uuid, { type: this.type })
          toast.hide()
          console.log('订单详情', data)
          this.detail = data
          // if (!data.status && this.num < 5) {
          //   this.network().orderDetail()
          //   this.num = +1
          //   console.log(this.num)
          // }
          if (this.detail) {
            console.log(this.detail.address.address_line_1)
            this.network().addTheLogistics()
          }
        },
        addTheLogistics: async () => {
          this.addrInfo = {
            Address1: this.detail.address.address_line_1,
            Address2: this.detail.address.address_line_2,
            City: this.detail.address.fill_city,
            Count: this.detail.count,
            Country: this.detail.address.country,
            Email: this.detail.address.email,
            FullName: this.detail.address.full_name,
            OrderNumber: this.detail.order_number,
            Phone: '',
            State: this.detail.address.fill_state,
            Zip: this.detail.address.postal_code,
          };
          const { data } = await addTheLogistics(this.addrInfo)
          console.log('添加物流', data)
          this.network().getUserInfo()
        },
        getUserInfo: async () => {
          const { data } = await getUserInfo()
          console.log('获取用户信息', data)
          this.userInfo = data
          this.network().sendMessage()
        },
        sendMessage: async () => {
          this.notification = {
            user_uuid: this.detail.uuid,
            money: this.detail.money,
            order_uuid: this.userInfo.uuid,
          }
          console.log(this.notification)
          const { data } = await sendMessage(this.notification)
          console.log('推送消息', data)
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
@import '~@/assets/styles/variables.scss';
.container{
  height: 100vh;
  background-color: #fff;
  padding-top: 1rem;
  .top{
    text-align: center;
    width: 100%;
    height: 4.24rem;
    background: url("~assets/images/current/ic_personal_background.png") no-repeat center;
    img{
      width: 0.8rem;
      margin-top: 0.55rem;
      margin-bottom: 0.45rem;
    }
    .headline{
      color: #666666;
      span{
        font-size: 0.45rem;
        font-weight: 700;
      }
    }
    .subtitle{
      p{
        font-size: 0.3rem;
      }
    }
  }
  .indent-details{
    p{
      margin-top: 0.28rem;
      height: 0.8rem;
      font-size: 0.3rem;
      font-weight: 400;
      border-bottom: #F0F0F5 solid 0.16rem;
      padding-left: 0.55rem;
    }
    .content{
      .addr{
      padding: 0.27rem 0 0.2rem 0.51rem;
      // margin-left: 0.51rem;
      display: flex;
      img{
        width: 0.37rem;
        height: 0.42rem;
        margin-right: 0.3rem;
        margin-top: 0.2rem;
        }
      }
      .goods{
        .product{
          border-top: #84D4C1 dashed 0.02rem;
          padding: 0.2rem 0.5rem;
          border-bottom: #dfdede solid 0.01rem;
        }
        .price{
            padding: 0 0.4rem;
            margin-top: 0.23rem;
            border-bottom: #F0F0F5 solid 0.15rem;
          .li{
            color: #999999;
            margin-top: 0.15rem;
            display: flex;
            justify-content:space-between;
          }
          .total{
            margin-top: 0.15rem;
            padding-bottom: 0.05rem;
            .attr{
              font-weight: 500;
              color: #000;
              font-size: 0.32rem;
            }
            .val{
              font-weight: 500;
              color: #fcab32;
              font-size: 0.36rem;
            }
          }
        }
        .info{
          margin-left: 0.4rem;
          color: #999999;
          .sp{
            margin: 0.35rem 0;
            font-size: 0.26rem;
            font-weight: 400;
            color: #000;
          }
          .main{
            margin-top: -0.1rem;
            line-height: 0.34rem;
            font-size: 0.22rem;
          }
        }
      }
    }
  }

  .recommond{
    margin-top: 0.56rem;
    background-color: #fff;
    .title{
      display: flex;
      align-items: center;
      justify-content: center;
      .titletext{
        margin: 0 0.22rem;
      }
      .title-item{
        display: flex;
        align-items: center;
        .line{
          height: 0.02rem;
          width: 0.58rem;
          background: #333;
          margin: 0 0.06rem;
        }
        .dian{
          width: 0.1rem;
          height: 0.1rem;
          border-radius: 50%;
          background: #333;
        }
      }
    }
    .commodity{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        padding: 0.3rem;
      }
  }
  .btn{
    width: 5.8rem;
    height: 0.64rem;
    background: #73C9B3;
    color: #fff;
    text-align: center;
    font-size: 0.36rem;
    font-weight: 500;
    padding-top: 0.1rem;
    border-radius: 0.12rem;
    margin:0.5rem 0 0 0.73rem;
  }
  .defeated{
    margin-top: 1.57rem;
  }
}
</style>
