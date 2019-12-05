<template>
  <div class="container">
    <headerView/>
    <div class="padding">
      <div class="headline">
        <p
          v-if="!isHelp">YOUR MILLION DOLLAR SMILE</p>
        <div v-else>
          <p>THANK YOU FOR HELPING!</p>
          <p>WANT TRUBRUSH TOO?</p>
        </div>
      </div>
      <div class="subtitle">
        <span
          v-if="!isHelp">Without The Ridiculous Price Markup</span>
        <div v-else>
          <p>Bargain for your price by spreading our mission</p>
          <span>for affordable oral care for everyone:</span>
        </div>
      </div>
      <!-- 跳转按钮 -->
      <div
        class="btn-secondary"
        @click="navigateTo('/user/bargain/detail')"
        v-if="isHelp">START MY BARGAIN</div>
      <div class="top">
        <!-- <img
          v-if="detail.info.status == 4"
          class="bg"
          src="~assets/images/current/pic_order_balloon.png"> -->
        <img
          class="pic"
          :src="detail.info.avatar | imgMapper">
        <div class="name">{{ detail.info.nickname }}</div>
        <div class="box">
          <img
            class="img"
            :src="detail.info.img_src | imgMapper">
          <div class="tex">
            <div class="til">{{ detail.info.product_name }}</div>
            <div>Quantity: 1</div>
            <div>Current Price:</div>
            <div
              class="pri"
              style="color: #FFC052">${{ (detail.info.price - progressPris).toFixed(2) }}
              <span
                v-show="detail.bargain_list.length"
                style="text-decoration:line-through;color: #777272;font-size:0.18rem;">
                ${{ detail.info.price }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 进度条 -->
      <div class="progress-money">
        <span
          style="color:#FFF;">
          Saved: ${{ (detail.info.price - detail.info.money).toFixed(2) }} ,
        </span>
        <span>&nbsp;Current price: ${{ (detail.info.price - progressPris).toFixed(2) }}</span>
      </div>
      <div class="progress-bar">
        <div
          class="progress"
          :style="'width: '+progressPer+'%'">
          <div class="color-bg"/>
        </div>
      </div>
      <div class="count-down">
        <div class="box">
          <div
            class="block"
            v-for="(item,index) in timeArr"
            :key="index">
            <div
              class="num"
              v-for="(itemN,indexN) in item"
              :key="indexN">{{ itemN }}</div>
          </div>
        </div>
        <div v-if="!this.detail.info.surplus_second">
          The bargain has {{ detail.info.status == 4?'successful':'ended' }}.
        </div>
      </div>
      <div
        v-if="!isHelp"
        class="help-cut">
        <span>Lower your friend’s price by helping them bargain:</span>
        <div
          class="btn-secondary"
          @click="network().helpBargain()"
          v-if="!isHelp">HELP BARGAIN</div>
        <span style="font-style:italic;">*No purchase necessary</span>
      </div>
    </div>
    <div
      class="bargain-list"
      v-if="detail.bargain_list.length">
      <div class="til">BARGAIN RECORD </div>
      <div class="ul">
        <div
          class="li"
          v-for="(item,index) in detail.bargain_list"
          :key="index">
          <div class="index">
            <div>{{ index >= 9? index:('0'+(index+1)) }}</div>
            <img
              class="pic"
              :src="item.avatar | imgMapper">
          </div>
          <div class="name">{{ item.nickname }}</div>
          <div class="reduced">
            <span>Helped Save</span>
            <span class="pri">${{ item.bargain }}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="popUp"
      class="challenge">
      <div
        class="challenge-setting"
        @click="onpadlock"/>
      <div
        class="popUp">
        <fenter/>
      </div>
    </div>
    <homePage
      class="oym"
      v-if="isHelp"/>
    <div
      class="begin-challenge"
      v-show="paymentBounced"
      @click="navigateTo('/user/bargain/detail')">
      <p>SHOP NOW</p>
    </div>
  </div>
</template>

<script>
import { getBargainUserDetail, getBargainFirendDetail, helpBargain } from '@/api/order'
import { getUserInfo } from '@/api/user'
import headerView from '@/components/header'
import fenter from '../../login/fenter';
import utils from '@/jslibs/dk-utils';
import Axios from 'axios';
import homePage from '@/components/home-page'

export default {
  head() {
    return {
      title: 'Bargain Details',
    };
  },
  data() {
    return {
      uuid: this.$route.query.uuid,
      detail: { bargain_list: {}, info: { price: '' } },
      progressPri: '0.00',
      progressPris: '0.00',
      progressPer: 0,
      user_uuid: '',
      change: '',
      isHelp: false,
    };
  },
  components: {
    headerView, homePage, fenter,
  },
  watch: {
    // 'detail.info.price': {
    //   handler() {
    //     console.log('更新了！！！')
    //     this.refresh()
    //   },
    // },
    detail(detail) {
      let { price, money, bottom } = this.detail.info
      price = Number(price)
      money = Number(money)
      bottom = Number(bottom)
      this.progressPris = (price - money).toFixed(2)
      this.progressPri = (price - money - bottom).toFixed(2)
      this.progressPer = (price - money) / (price - bottom) * 100
      // console.log('数据', this.progressPer)
    },
  },
  computed: {
    timeArr() {
      // console.log(this.detail.info.surplus_second)
      const time = this.detail.info.surplus_second || 0
      const h = this.handler().getTwoDigits(Math.floor(time / 3600))
      const m = this.handler().getTwoDigits(Math.floor((time % 3600) / 60))
      const s = this.handler().getTwoDigits((time % 3600) % 60)
      return [h, m, s]
    },
    popUp() {
      return this.$store.state.withFacebook.popUp
    },
    paymentBounced() {
      return this.$store.state.paymentBounced
    },
  },
  mounted() {
    this.handler().getDetail()
    this.network().getUserInfo()
    this.network().getBargainFirendDetail()
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    // 关闭
    onpadlock() {
      this.$store.commit('pcondition', false)
    },
    logistics(attache) {
      Axios({
        url: 'https://api.trubrush.com/v1/app/Order/fulfillrite',
        method: 'POST',
        data: {
          Address1: attache.address_line_1,
          Address2: attache.address_line_2,
          FullName: attache.full_name,
          City: attache.fill_city,
          State: attache.fill_state,
          Country: attache.country,
          Email: attache.email,
          Phone: attache.phone_number,
          Count: attache.count,
          Zip: attache.postal_code,
          OrderNumber: attache.OrderNumber,
        },
      }).then((response) => {
        console.log('成功', this.transmit)
        console.log(response)
      }).catch((error) => {
        console.log('失败')
      })
    },
    network() {
      return {
        getUserInfo: async () => {
          const { data } = await getUserInfo()
          console.log('获取用户信息', data)
          this.userInfo = data
          this.user_uuid = data.uuid
          // this.network().getBargainFirendDetail()
        },
        getBargainFirendDetail: async () => {
          const { data } = await getBargainFirendDetail(this.uuid)
          console.log('砍价详情', data)
          this.detail = data
          if (this.detail.info.money === '0.00') {
            Axios({
              url: 'https://api.trubrush.com/v1/app/Order/getpass',
              method: 'POST',
              data: { uuid: this.detail.info.uuid },
            }).then((response) => {
              console.log(this.detail.info.uuid)
              console.log('存成功', response)
              console.log(response.data.list.OrderNumber)
              this.logistics(response.data.list)
            }).catch((error) => {
              console.log('存失败', error)
            })
          }
          if (this.user_uuid) {
            data.bargain_list.forEach(e => {
              if (e.user_uuid === this.user_uuid) {
                this.isHelp = true
                this.change = e.change
              }
            })
          }
          if (this.detail.info.status === 1 && this.detail.info.surplus_second > 0) {
            setInterval(e => {
              let time = this.detail.info.surplus_second
              if (time) {
                time -= 1
                this.detail.info.surplus_second = time
              }
            }, 1000)
          } else if (this.detail.info.surplus_second <= 0) {
            this.detail.info.surplus_second = 0
          } else if (this.detail.info.status === 4) {
            this.detail.info.surplus_second = 0
          }
        },
        // 备用
        getBargainUserDetail: async () => {
          const { data } = await getBargainUserDetail(this.uuid, { type: this.type })
          console.log('砍价详情', data)
          this.detail = data
          this.isHelp = true
          if (this.detail.info.status === 1 && this.detail.info.surplus_second > 0) {
            setInterval(e => {
              let time = this.detail.info.surplus_second
              if (time) {
                time -= 1
                this.detail.info.surplus_second = time
              }
            }, 1000)
          } else if (this.detail.info.surplus_second <= 0) {
            this.detail.info.surplus_second = 0
          } else if (this.detail.info.status === 4) {
            this.detail.info.surplus_second = 0
          }
        },
        helpBargain: async () => {
          if (!this.userInfo) {
            this.$store.commit('pcondition', true)
          } else {
            const { data } = await helpBargain({ order_uuid: this.uuid })
            console.log('帮砍', data)
            this.$createToast({
              txt: 'Success',
              type: 'txt',
              time: 1000,
            }).show()
            this.network().getBargainFirendDetail()
          }
        },
      };
    },
    handler() {
      return {
        getTwoDigits: (val) => (val < 10 ? `0${val}` : `${val}`),
        getDetail: () => {
          if (utils.getCookie('X-Access-Token')) {
            this.network().getUserInfo()
          } else {
            // this.network().getBargainFirendDetail()
          }
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
    .oym{
      margin-top: 0.1rem;
    }
    .challenge{
      display: flex;
      align-items: flex-end;
      flex-wrap:wrap-reverse;
      height: 10rem;
      width: 10rem;
      .challenge-setting{
        height: 100%;
        width: 100%;
        position:fixed;
        top: 0rem;
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
    }
    background: $primary-color;
    // min-height: 100vh;
    height: 100%;
    margin-top: 0.98rem;
    .padding{
      padding: 0.59rem 0.42rem 0.38rem;
      position: relative;
      .headline{
        p{
          font-size: 0.37rem;
          font-weight: 700;
        }
        color: #fff;
        text-align:center;
      }
      .subtitle{
        font-size: 0.25rem;
        text-align: center;
        color: #fff;
        margin-top: 0.23rem;
      }
      .top{
        margin: 0 auto;
        width: 6.2rem;
        height: 3rem;
        border-radius: 0.2rem;
        background: #FFFFFF;
        text-align: center;
        padding: 0 0.42rem;
        margin-top: 1.1rem;
        .bg{
          width: 100%;
          position: absolute;
          left: 0;
          top: -0.18rem;
        }
        .pic{
          width: 1.36rem;
          height: 1.36rem;
          border: 0.04rem solid #FFFFFF;
          border-radius: 100%;
          box-shadow:0px 2px 4px 0px rgba(115,201,179,0.8);;
          margin-top: -0.8rem;
          margin-bottom: 0.12rem;
          position: relative;
        }
        .name{
          color:rgba(102,102,102,1);
          font-size: 0.12rem;
          line-height: 1;
          margin-bottom: 0.3rem;
        }
        .box{
          // margin-top: 0.4rem;
          text-align: left;
          display: flex;
          .img{
            width: 1.52rem;
            height: 1.52rem;
            border-radius: 0.2rem;
            object-fit: cover;
            margin-right: 0.28rem;
            box-shadow:0px 2px 4px 0px rgba(0,0,0,0.2);
          }
          .tex{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            // color:rgba(141,153,161,1);
            // font-size: 0.26rem;
            div{
              font-size: 0.2rem;
            }
            .til{
              font-size: 0.3rem;
              font-weight: 800;
              color: #333;
              line-height: 0.4rem;
              margin-bottom: 0.1rem;
              @include line-limit-n(2)
            }
            .pri{
              margin-top: 0.1rem;
              color: $primary-color;
              font-weight: 500;
              font-size: 0.3rem;
              font-weight: 700;
            }
          }
        }
      }
      .progress-money{
          margin-top: 0.4rem;
          text-align: center;
          color:#FEDB9F ;
        }
      .progress-bar{
        margin: 0.2rem auto 0.4rem;
        width:6.12rem;
        height:0.24rem;
        background:rgba(245,245,245,1);
        border-radius:0.06rem;
        font-size: 0.24rem;
        color:rgba(229,229,229,1);
        position: relative;
        .num{
          position: absolute;
          top: 0.26rem;
          line-height: 0.36rem;
          &.end{
            right: 0;
          }
        }
        .progress{
          height: 100%;
          position: relative;
          .color-bg{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background:rgba(252,202,126,1);
            border-radius:0.06rem;
          }
          &:before{
            content: '';
            display: block;
            width:0.32rem;
            height:0.32rem;
            background:#fff;
            // box-shadow:0px 2px 4px 0px rgba(251,204,133,1);
            border:0.08rem solid rgba(252,202,126,1);
            border-radius: 100%;
            box-sizing: border-box;
            position: absolute;
            top: -0.04rem;
            right: -0.1rem;
            z-index: 1;
          }
          .num{
            top: -0.5rem;
            right: -1.5rem;
            color:rgba(252,202,126,1);
            font-size: 0.26rem;
            width: 3rem;
            text-align: center;
          }
        }
      }
      .gained{
        width:6.12rem;
        margin: 0 auto 0.1rem;
        color: #FCCA7E;
        font-size: 0.28rem;
        padding-top: 0.32rem;
        border-top:1px solid rgba(229,229,229,0.5);
        text-align: center;
      }
      .count-down{
        text-align: center;
        font-size: 0.24rem;
        color: #4a4a4a;
        padding-top: 0.3rem;
        margin-bottom: 0.5rem;
        .box{
          width: 100%;
          height: 0.64rem;
          line-height: 0.5rem;
          background: url("~assets/images/current/ic_bargaining_timing.png") center no-repeat;
          background-size: auto 100% !important;
          display: flex;
          justify-content: center;
          font-size: 0.41rem;
          color: #FFFFFF;
          margin-bottom: 0.1rem;
          .block{
            display: flex;
            margin: 0.08rem 0.08rem;
            .num{
              font-weight: 700;
              width: 0.48rem;
              margin: 0 0.1rem;
            }
          }
        }
      }
      .help-cut{
        color: #fff;
        text-align: center;
        font-size: 0.25rem;
      }
      .btn-secondary{
          margin-top: 0.24rem;
          border-radius:0.2rem;
          background: #FCAB32;
          font-weight: 700;
          font-size: 0.37rem;
          letter-spacing:0.02rem;
          margin-bottom: 0.2rem;
        }
      .tips{
        font-size: 0.24rem;
        color:rgba(229,229,229,1);
        margin-top: 0.2rem;
        text-align: center;
        margin-bottom: 0.8rem;
      }
    }
    .bargain-list{
        width: 100%;
        padding: 0 0.4rem;
        background: #EEFDFD;
        border-radius: 0.08rem;
        margin-top: 0.58rem;
        .til{
          border-bottom:1px solid rgba(115,201,179,1);
          line-height: 1.04rem;
          font-size: 0.32rem;
          text-align: center;
          font-weight: 700;
        }
        .ul{
          padding: 0.4rem 0 ;
          .li{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .index{
              width: 1rem;
              line-height: 0.58rem;
              font-size: 0.32rem;
              color: #FFFFFF;
              background: $primary-color;
              border-radius:0.3rem 0px 0px 0px;
              text-align: center;
              position: relative;
              padding-right: 0.25rem;
              .pic{
                width: 0.64rem;
                height: 0.64rem;
                border: 0.03rem solid #FFFFFF;
                border-radius: 100%;
                position: absolute;
                right: -0.32rem;
                top: -0.03rem;
              }
            }
            .name{
              width: 2rem;
              @include line-limit-n()
            }
            .reduced{
              color:#666666;
              font-size: 0.24rem;
              .pri{
                font-weight: 500;
                font-size: 0.3rem;
                margin-left: 0.08rem;
              }
            }
            &+.li{
              margin-top: 0.3rem;
            }
          }
        }
      }
      .begin-challenge{
      width: 100%;
      height:1rem;
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
    }
  }
</style>
