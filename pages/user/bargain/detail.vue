<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
  <div class="container">
    <headerView/>
    <div class="padding">
      <div class="headline">{{ theTooltip.headline }}</div>
      <div class="subtitle">
        <span>{{ theTooltip.subtitle }}</span>
      </div>
      <div class="top">
        <img
          v-if="detail.info.status == 4"
          class="bg"
          src="~assets/images/current/pic_order_balloon.png">
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
              style="color: #FFC052">${{ (detail.info.price - progressPri).toFixed(2) }}
              <span
                v-show="detail.bargain_list.length"
                style="text-decoration:line-through;color: #777272;font-size:0.18rem;">
                ${{ detail.info.price }}</span>
            </div>
            <!-- <div>{{ detail.info.sale_count }} Units Sold</div> -->
          </div>
        </div>
      </div>
      <!-- 进度条 -->
      <div class="progress-money">
        <span
          style="color:#FFF;font-weight: 600;">
          Saved: ${{ (detail.info.price - detail.info.money).toFixed(2) }} ,</span>
        <span
          style="font-weight: 600;">
          &nbsp;Current price: ${{ (detail.info.price - progressPri).toFixed(2) }}</span>
      </div>
      <div class="progress-bar">
        <!-- <div class="num start">$ {{ detail.info.price }}</div>
        <div class="num end">$ {{ detail.info.bottom }}</div> -->
        <div
          class="progress"
          :style="'width: '+progressPer+'%'">
          <div class="color-bg"/>
          <!-- <div class="num">$ {{ progressPri }}</div> -->
        </div>
      </div>
      <!-- 倒计时 -->
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
        <!-- 倒计时为0 -->
        <div v-if="!this.detail.info.surplus_second">
          The bargain has {{ detail.info.status == 4?'successful':'ended' }}.
        </div>
      </div>
      <!-- 分享 -->
      <div
        v-show="sharehod && progressPer != 100"
        class="share">
        <div class="challenges-that">
          <span>
            Bargain your TruBrush as low as ${{ detail.info.bottom }} by sharing
            your link below with friends & family:
          </span>
        </div>
        <div class="share-chunk">
          <div class="share-link">
            <img src="@/assets/images/challenge-map/share_links.png">
            <div class="share-frame">{{ shareLink+shareTxt }}</div>
          </div>
          <button
            class="share-copy"
            v-clipboard:copy="shareTxt+shareLink"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">COPY</button>
        </div>
        <div class="logo">
          <a :href="`sms:&?subject=&body=`+shareTxt+shareLink">
            <!-- <a :href="'sms:body='+shareTxt+shareLink"> -->
            <img
              class="img"
              src="@/assets/images/current/ic_share_sms.png">
          </a>
          <a :href="`mailto:?subject=TRUBTUSH SONIC TOOTHBRUSH&body=`+shareTxt+shareLink">
            <img
              class="img"
              src="@/assets/images/current/ic_share_mail.png">
          </a>
          <!-- <a
            id="fbShare"
            target="_blank"
            :href="'http://www.facebook.com/sharer.php?u='+encodeURIComponent(shareLink)">
            <img
              class="img"
              src="@/assets/images/current/ic_share_facebook.png">
          </a> -->
          <a
            target="_blank"
            :href="'http://twitter.com/intent/tweet?status='+encodeURIComponent(shareTxt+shareLink)">
            <img
              class="img"
              src="@/assets/images/current/ic_share_twitter.png">
          </a>
        </div>
      </div>
      <!-- 挑战按钮 -->
      <div class="challenge-payment">
        <p style="margin: -0.7rem 0 0.2rem 0;">
          <span
            v-if="detail.bargain_list.length">
            Claim your bargain by using the button below.</span>
        <!-- <span
            v-if="detail.bargain_list.length">
            Claim you bargain to get Trubrush at reduced price.</span> -->
        </p>
        <div
          :style="!detail.bargain_list.length?'background: #A1A1A1;':''"
          class="btn-secondary"
          v-if="type=='my'&&detail.info.status==1"
          @click="onPaymentPopoutPrice">CLAIM BARGAIN</div>
        <div
          class="btn-secondary try-again"
          v-if="!sharehod"
          @click="BouncedDetails = true">TRY AGAIN</div>
        <span
          style="font-size: 0.2rem;"
          v-if="!sharehod">WARNING: By clicking Try Again will lose your entire bargain</span>
        <span
          v-if="!detail.bargain_list.length">*Unlock Claim Bargain after your first share!</span>
      </div>
      <!-- <div
        class="btn-secondary"
        v-if="type=='help'"
        @click="navigateTo('../../home/product')">BUY NOW</div>
      <div
        class="btn-secondary"
        v-if="sharehod"
        @click="isShowModal=true">SHARE</div>
      <div
        class="btn-secondary"
        v-if="type=='my'&&detail.info.status==1"
        @click="onPaymentPopoutPrice">Buy at current price</div>
      <div
        class="btn-secondary"
        v-if="!sharehod"
        @click="onsharehod">Restart Challenge</div> -->
      <div
        class="btn-secondary"
        v-if="type=='my'&&detail.info.status==2"
        @click="network().paySurplus()">BUY AT THIS PRICE</div>
      <div
        class="tips"
        v-if="type=='my'&&detail.info.status==2"
        @click="cancelBargain">give up my bargain</div>
    </div>
    <!-- 砍价明细 -->
    <div
      class="bargain-list"
      v-if="detail.bargain_list.length">
      <div class="til">BARGAIN RECORD</div>
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
    <!-- <dankalModal
      v-model="isShowModal"
      :corner-close-able="true"
      background="none">
      <template>
        <div
          class="dialog-box dialog-share">
          <div class="link-box">
            <div class="close">
              <img
                style="width: 0.6rem;height: 0.6rem"
                @click="isShowModal=false"
                src="@/assets/images/ic_del.png">
            </div>
            <img
              class="img"
              :src="detail.info.img_src | imgMapper">
            <div class="main">{{ shareTxt+shareLink }}</div>
            <button
              class="bt"
              type="button"
              v-clipboard:copy="shareTxt+shareLink"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError">COPY LINK</button>
          </div>
          <div class="logo">
            <a :href="'sms:?subject=&body='+shareTxt+shareLink">
              <img
                class="img"
                src="@/assets/images/current/ic_share_sms.png">
            </a>
            <a :href="'mailto:?subject=Trubrush&body='+shareTxt+shareLink">
              <img
                class="img"
                src="@/assets/images/current/ic_share_mail.png">
            </a>
            <a
              id="fbShare"
              target="_blank"
              :href="'http://www.facebook.com/sharer.php?u='+encodeURIComponent(shareLink)">
              <img
                class="img"
                src="@/assets/images/current/ic_share_facebook.png">
            </a>
            <a
              target="_blank"
              :href="'http://twitter.com/intent/tweet?status='+encodeURIComponent(shareLink)">
              <img
                class="img"
                src="@/assets/images/current/ic_share_twitter.png">
            </a>
          </div>
        </div>
      </template>
    </dankalModal> -->
    <!-- 支付弹框 -->
    <dankalModal
      v-model="paymentPopoutPrice"
      :corner-close-able="true"
      background="none">
      <template>
        <div
          style="padding-top: 5.2rem;"
          class="dialog-box dialog-share">
          <div class="link-box">
            <div class="close">
              <img
                style="width: 0.4rem;height: 0.4rem;"
                @click="paymentPopoutPrice=false"
                src="@/assets/images/ic_del.png">
            </div>
            <!-- <img
              class="img"
              :src="detail.info.img_src | imgMapper"> -->
            <div
              v-if="progressPer != 100"
              class="main">
              You can get it at current price
              <span style="color:#FBAF5D;">${{ progressPris }}</span><br>
              or<br>
              Keep bargain for lower Price at
              <span style="color:#FBAF5D;">${{ detail.info.bottom }}</span>
            </div>
            <div
              v-if="progressPer == 100"
              class="main">
              Congratulations!<br>You've bargained Trubrush Sonic
              Toothbrush to the Lowest Price:
              <span
                style="color:#FBAF5D;">
                ${{ progressPris }}
              </span>
            </div>
            <!-- <div class="main">OR</div>
            <div class="main">
              Keep Challenging for lower Price.
            </div> -->
            <div class="payment-btn">
              <button
                style="background:#66CBBD"
                class="bt"
                type="button"
                @click="network().paySurplus()">Buy at ${{ progressPris }}</button>
              <button
                v-if="progressPer != 100"
                style="background:#FCAB32"
                class="bt"
                @click="paymentPopoutPrice=false">Keep Challenging</button>
            </div>
          </div>
        </div>
      </template>
    </dankalModal>
    <!-- 取消订单弹框 -->
    <dankalModal
      v-model="BouncedDetails"
      :corner-close-able="true"
      background="none">
      <template>
        <div
          style="padding-top: 5.2rem;"
          class="dialog-box dialog-share">
          <div class="link-box">
            <div class="close">
              <img
                style="width: 0.4rem;height: 0.4rem;"
                @click="BouncedDetails=false"
                src="@/assets/images/ic_del.png">
            </div>
            <div class="main">
              Do you want to cancel the current bargain
              and generate new one? Your will loose your
              current bargain.
            </div>
            <div class="payment-btn">
              <button
                style="background:#66CBBD"
                class="bt"
                type="button"
                @click="onsharehod">YES</button>
              <button
                style="background:#999999;"
                class="bt"
                type="button"
                @click="BouncedDetails=false">NO</button>
            </div>
          </div>
        </div>
      </template>
    </dankalModal>
    <div
      v-if="maskLayer"
      class="loadercss">
      <div v-if="omaskLayer">
        Payment Processing...
      </div>
    </div>
  </div>
</template>

<script>
import {
  getBargainUserDetail, paySurplus, cancelBargain,
  spreadBargain, addBargainOrder, timerBargain,
} from '@/api/order'
import dankalModal from '@/components/dankal/dankal-modal'
import headerView from '@/components/header'
import { createAddress, getAddressList } from '@/api/address'
import { getProductInfo } from '@/api/api'

export default {
  head() {
    return {
      title: 'Bargain Details',
    };
  },
  data() {
    return {
      theTooltip: {
        headline: 'YOUR BARGAIN HAS STARTED!',
        subtitle: 'Share More, Save More!',
      },
      uuid: '',
      type: this.$route.query.type || 'my',
      detail: { bargain_list: {}, info: { price: '' } },
      progressPri: '0.00',
      progressPris: '0.00',
      progressPer: 0,
      isShowModal: false,
      response: {},
      mistake: {},
      shareLink: '',
      maskLayer: 1,
      omaskLayer: '',
      paymentPopoutPrice: false,
      BouncedDetails: false,
      swiperOption: {
        autoplay: {
          delay: 3000,
        },
        pagination: {
          el: '.swiper-pagination',
        },
      },
      startAgain: {},
      sharehod: true,
    };
  },
  components: { dankalModal, headerView },
  watch: {
    detail(detail) {
      let { price, money, bottom } = this.detail.info
      price = Number(price)
      money = Number(money)
      bottom = Number(bottom)
      this.progressPri = (price - money).toFixed(2)
      this.progressPris = (price - this.progressPri).toFixed(2)
      this.progressPer = (price - money) / (price - bottom) * 100
      // if (this.detail.bargain_list.length) {
      //   this.progressPer = (price - money - bottom) / (price - money - bottom) * 100
      // }
      console.log(this.progressPer)
      if (this.progressPer === 100) {
        this.theTooltip.headline = 'CONGRATULATIONS! YOU DID IT!'
        this.theTooltip.subtitle = 'You Bargained TruBrush To The Lowest Price!'
      }
    },

  },
  mounted() {
    this.network().spreadBargain()
    this.network().getProductInfo()
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
    shareTxt() {
      const text = "Hey! I'd like to get this awesome sonic toothbrush at $"
      const otext = 'Mind helping me get discount?'
      const olw = text + this.detail.info.bottom + otext
      return olw
    },
  },
  compiled() {
    this.omaskLayer = localStorage.getItem('uii')
  },
  methods: {
    onsharehod() {
      this.network().timerBargain()
      this.navigateTo('/')
    },
    onPaymentPopoutPrice() {
      if (this.detail.bargain_list.length) {
        if (this.sharehod) {
          this.paymentPopoutPrice = true
        } else {
          this.paymentPopoutPrice = false
          this.network().paySurplus()
        }
      }
    },
    navigateTo(path) {
      this.$router.push(path);
    },
    onCopy(e) {
      console.log(`你刚刚复制: ${e.text}`)
      this.$createToast({
        txt: 'Copy success!',
        type: 'correct',
        time: 1000,
      }).show();
    },
    onError(e) {
      console.log('无法复制文本！')
      this.$createToast({
        txt: 'Copy the failure!',
        type: 'error',
        time: 1000,
      }).show();
    },
    cancelBargain() {
      this.$createDialog({
        type: 'confirm',
        content: 'Are you sure cancel the order? ',
        confirmBtn: {
          text: 'YES',
        },
        cancelBtn: {
          text: 'NO',
        },
        onConfirm: () => {
          this.network().cancelBargain()
        },
      }).show()
    },
    network() {
      return {
        getBargainUserDetail: async () => {
          const { data } = await getBargainUserDetail(this.uuid, { type: this.type })
          console.log('砍价详情1', data)
          this.shareLink = `https://www3.trubrush.io/user/bargain/share?uuid=${this.uuid}`
          if (data.scalar === false) {
            const { odata } = await getBargainUserDetail(this.uuid, { type: this.type })
            console.log('砍价详情2', odata)
            this.detail = odata
            this.$router.go(0)
            if (this.detail.info.status === 1 && this.detail.info.surplus_second > 0) {
              setInterval(e => {
                let time = this.detail.info.surplus_second
                if (time) {
                  time -= 1
                  this.detail.info.surplus_second = time
                  // console.log('111')
                }
              }, 1000)
            } else if (this.detail.info.surplus_second <= 0) {
              this.detail.info.surplus_second = 0
            } else if (this.detail.info.status === 4) {
              this.detail.info.surplus_second = 0
            }
          } else {
            this.detail = data
            localStorage.setItem('uii', '');
            this.maskLayer = 0
            if (this.detail.info.status === 1 && this.detail.info.surplus_second > 0) {
              const interval = setInterval(e => {
                let time = this.detail.info.surplus_second
                if (time) {
                  time -= 1
                  this.detail.info.surplus_second = time
                  // console.log(time)
                } else if (time === 0) {
                  clearInterval(interval);
                  this.theTooltip.headline = "Time's Up!"
                  this.theTooltip.subtitle = 'Your Bargain Time Has Ran Out'
                  this.sharehod = false
                }
              }, 1000)
            } else if (this.detail.info.surplus_second <= 0) {
              this.detail.info.surplus_second = 0
              this.sharehod = false
              this.theTooltip.headline = "Time's Up!"
              this.theTooltip.subtitle = 'Your Bargain Time Has Ran Out'
            } else if (this.detail.info.status === 4) {
              this.detail.info.surplus_second = 0
            }
          }
        },
        paySurplus: async () => {
          const { data } = await paySurplus({ order_uuid: this.uuid })
          console.log('支付砍价订单', data)
          window.location.href = data.url
        },
        cancelBargain: async () => {
          console.log({ order_uuid: this.uuid })
          const { data } = await cancelBargain({ order_uuid: this.uuid })
          console.log('取消订单', data)
          // this.$router.go(-2)
        },
        // 查订单状态
        spreadBargain: async () => {
          const { data } = await spreadBargain()
          console.log('查订单状态', data)
          this.uuid = data.uuid
          if (!data) {
            this.network().getAddressList()
          } else {
            this.uuid = data.uuid
            this.network().getBargainUserDetail()
          }
        },
        getProductInfo: async () => {
          const { data } = await getProductInfo()
          console.log('获取产品信息', data)
          this.productInfo = data
          if (!data.standard[0].uuid) {
            this.network().getProductInfo()
          }
        },
        getAddressList: async () => {
          const { data } = await getAddressList()
          this.addrList = data
          if (!data.default_address.uuid) {
            this.network().getAddressList()
          }
          console.log('获取地址列表', data)
          this.network().addBargainOrder()
          if (data.default_address.is_default !== 1) {
            this.network().createAddress()
          }
        },
        createAddress: async () => {
          this.addrInfo = {
            country: 'country',
            full_name: 'data.full_name',
            address_line_1: 'data.address_line_1',
            address_line_2: 'data.address_line_2',
            fill_city: 'data.fill_city',
            fill_state: 'data.fill_state',
            postal_code: 'data.postal_code',
            phone_number: 'data.phone_number',
            email: '2@qq.com',
            is_default: '1',
          };
          const { data } = await createAddress(this.addrInfo)
          console.log('新增地址', data)
        },
        addBargainOrder: async () => {
          const submitParam = {
            address_uuid: this.addrList.default_address.uuid,
            standard_uuid: this.productInfo.standard[0].uuid,
          }
          const { data } = await addBargainOrder(submitParam)
          console.log('提交砍价订单', data)
          // this.uuid = data.order_uuid
          this.uuid = data.order_uuid
          this.network().getBargainUserDetail()
        },
        // 定时器
        timerBargain: async () => {
          const { data } = await timerBargain()
          console.log('获取产品信息', data)
        },
      };
    },
    handler() {
      return {
        getTwoDigits: (val) => (val < 10 ? `0${val}` : `${val}`),
      };
    },
  },
};
</script>
<style lang="scss" scoped>
    @import '~@/assets/styles/mixins.scss';
    @import '~@/assets/styles/variables.scss';
    .aaa{
      padding-top: 12rem;
    }
  .loadercss{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 7;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.7);
    color: #FFFFFF;
    font-size: 0.6rem;
    text-align:center;
    line-height:13rem;
  }
  .container{
    background: $primary-color;
    min-height: 100vh;
    padding-top: 0.98rem;
    .padding{
      padding: 0.59rem 0.42rem 0.38rem;
      position: relative;
      .headline{
        font-size: 0.37rem;
        font-weight: 600;
        color: #fff;
        text-align:center;
      }
      .subtitle{
        text-align: center;
        color: #fff;
        margin-top: 0.23rem;
      }
      .top{
        margin: 0 auto;
        width: 6.2rem;
        height: 3.3rem;
        border-radius: 0.2rem;
        background: #FFFFFF;
        text-align: center;
        padding: 0 0.25rem;
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
          font-size: 0.3rem;
          line-height: 1;
          margin-bottom: 0.2rem;
        }
        .box{
          // margin-top: 0.4rem;
          text-align: left;
          display: flex;
          .img{
            width: 1.7rem;
            height: 1.7rem;
            border-radius: 0.2rem;
            object-fit: cover;
            margin-right: 0.3rem;
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
      .count-down{
        text-align: center;
        font-size: 0.24rem;
        color: #4a4a4a;
        // padding-top: 0.1rem;
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
      .share{
        .challenges-that{
          margin: 0 auto;
          color: #fff;
          text-align: center;
          width: 5.56rem;
          font-size: 0.25rem;
        }
        .share-chunk{
          display: flex;
          justify-content:space-around;
          margin-top: 0.2rem;
          .share-link{
            width: 4.39rem;
            height: 0.73rem;
            border-radius: 0.1rem;
            background:#414140;
            display: flex;
            justify-content:space-around;
            img{
            width: 0.38rem;
            height: 0.38rem;
            margin-top:0.17rem;
          }
          .share-frame{
            white-space : nowrap;
            width: 3.58rem;
            height:0.5rem;
            overflow:hidden;
            background: #fff;
            font-size: 0.3rem;
            border-radius: 0.1rem;
            margin-top:0.11rem;
            padding: 0.03rem 0.22rem;
            border-right: #fff solid 0.21rem;
          }
          }
          .share-copy{
            width: 1.65rem;
            height: 0.75rem;
            background: #FFC052;
            color: #fff;
            font-size: 0.37rem;
            text-align: center;
            padding-top: 0.1rem;
            border-radius: 0.1rem;
          }
        }
        .logo{
            margin-top: 0.22rem;
            padding-left: 0.1rem;
            .img{
              width: 1.48rem;
              height: 0.91rem;
              margin-left: 0.51rem;
            }
        }
      }
      .challenge-payment{
        margin-top: 1.2rem;
        text-align: center;
        .btn-secondary{
          border-radius:0.2rem;
          background: #FCAB32;
          font-weight: 700;
          font-size: 0.37rem;
          letter-spacing:0.02rem;
          margin-bottom: 0.2rem;
        }
        .try-again{
          background: #8EB2A9;
        }
        span{
          color: #fff;
          font-style: italic;
        }
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
        padding: 0 0.36rem;
        background: #EEFDFD;
        // border-radius: 0.08rem;
        margin-top: 0.45rem;
        .til{
          border-bottom:1px solid rgba(115,201,179,1);
          line-height: 1.04rem;
          font-size: 0.37rem;
          text-align: center;
          font-weight: 700;
        }
        .ul{
          padding: 0.38rem 0 ;
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
  //大图轮播
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
          bottom: 0rem;
          height: 0.8rem;
          background: #FFFFFF;
        }
    }
  .dialog-share{
    .link-box{
      position: absolute;
      left: calc(50% - 3.2rem);
      bottom: 1.5rem;
      width: 6.4rem;
      background: #F1FFFF;
      border-radius: 0.2rem;
      margin: 0 auto;
      padding-bottom: 0.3rem;
      overflow: hidden;
      box-shadow:0px 0px 21px 0px rgba(0,0,0,0.36);
      text-align: center;
      padding-top: 0.3rem;
      .main{
        padding: 0.06rem 0.4rem;
        color: #546570;
        line-height: 0.42rem;
        word-wrap: break-word;
        word-break: break-all;
      }
      .payment-btn{
        margin-top: 0.58rem;
        display: flex;
        justify-content:space-between;
      .bt{
        font-weight: 700;
        font-size: 0.25rem;
        border-radius:0.1rem;
        width:3rem;
        height: 0.74rem;
        line-height: 0.48rem;
        color: #fff;
        margin: 0 auto;
        text-align: center;
        display: block;
        background: none;
      }
      }
      .close{
        display: flex;
        justify-content: flex-end;
        margin-right: 0.2rem;
        padding-bottom: 0.4rem;
      }
    }
    .logo{
      width: 7rem;
      height: 2.1rem;
      background: #FFFFFF;
      border-radius: 0.2rem;
      margin: 0 auto;
      text-align: center;
      padding-top: 0.98rem;
      box-shadow:0px 0px 21px 0px rgba(0,0,0,0.36);
      .img{
        width: 0.68rem;
        height: 0.68rem;
        vertical-align: middle;
        margin: 0 0.4rem;
      }
    }
  }
</style>
