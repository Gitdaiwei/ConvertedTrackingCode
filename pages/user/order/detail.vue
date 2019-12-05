<template>
  <div class="container-gray container order-detail">
    <headerView/>
    <div class="content">
      <div
        v-if="type=='order'"
        class="addr">
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
          :content="detail"
          :is-show-refund="type=='order'&&detail.status==3&&!detail.after_uuid"
          :is-show-restart="type=='bargain'&&detail.status==2"
          @clickRefunded="navigateTo('./refund?uuid='+detail.uuid)"
          @clickRestart="clickRestart"/>
        <div
          class="price"
          v-if="type=='bargain'||detail.type==1">
          <!-- <div class="li">
            <div>bottom-line</div>
            <div>${{ detail.bottom }}</div>
          </div> -->
          <div class="li">
            <div>Your Price</div>
            <div>${{ detail.price }} </div>
          </div>
          <div class="li total">
            <div class="attr">You Saved :</div>
            <div class="val">${{ detail.money }}</div>
          </div>
        </div>
        <div
          class="price"
          v-else>
          <div class="li total">
            <div class="attr">You Saved :</div>
            <div class="val">${{ detail.total_price }}</div>
          </div>
        </div>
      </div>
      <div
        class="info"
        v-if="type=='bargain'">
        <div
          class="til"
          v-if="type=='bargain'&&(detail.status==1||detail.status==2)">
          <div class="sp">Bargain information </div>
          <div
            class="bt"
            @click="navigateTo('../bargain/detail?uuid='+uuid)">PROCESS</div>
        </div>
        <div class="main">
          <div>bargain number：{{ detail.order_number }}</div>
          <div>bargain date：{{ detail.create_time }}</div>
          <div>
            state：
            {{ detail.status==1?'Bargain':'' }}
            {{ detail.status==2?'Unfinished':'' }}
            {{ detail.status==3?'Canceled':'' }}
          </div>
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
          <div>
            state：
            {{ detail.status==1?'To be shipped':'' }}
            {{ detail.status==2?'To be received':'' }}
            {{ detail.status==3?'Finish':'' }}
          </div>
        </div>
      </div>
      <!-- <div
        class="info your"
        v-if="type=='order'">
        <img
          class="succeed"
          src="@/assets/images/current/oic_pay_success.png">
        Your payment was successful
      </div> -->
      <div class="guarantee">
        <!-- <div class="til">
          <img
            class="ic"
            src="@/assets/images/current/ic_order_security.png">
          <span class="tex">No Questions Asked Guarantee </span>
        </div> -->
        <div class="main ql-bubble">
          <div class="ql-snow">
            <div
              v-html="ourPromise"
              class="ql-editor"/>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="type=='order'">
      <div
        v-if="detail.status==2"
        class="bt btn-primary personal-btn"
        @click="confirmOrder(detail)">CONFIRM</div>
      <div
        v-if="detail.status==3"
        class="bt btn-primary personal-btn"
        @click="delOrder(detail)">DELETE</div>
    </div>
    <div
      v-else-if="type=='bargain'&&(detail.status==1||detail.status==2)">
      <div
        class="bt btn-primary personal-btn"
        @click="abolishBargain()">CANCEL</div>
      <div
        class="bt btn-primary personal-btn"
        @click="network().paySurplus()">PAY</div>
    </div>
    <div
      v-if="maskLayer"
      class="loadercss">
      <div v-if="omaskLayer">
        Payment Processing...
      </div>
    </div>
    <div
      class="btn-primary personal-btn"
      @click="navigateTo('..')">Return to your account</div>
  </div>
</template>

<script>
import orderItem from '@/components/order-item'
import {
  orderDetail, getOurPromise, delOrder, confirmOrder,
  restartBargain, paySurplus, abolishBargain,
} from '@/api/order'
import headerView from '@/components/header'

export default {
  head() {
    return {
      title: 'Order Details ',
    };
  },
  data() {
    return {
      uuid: this.$route.query.uuid,
      detail: { address: {} },
      type: this.$route.query.type || 'order',
      ourPromise: '',
      transmit: {},
      maskLayer: 1,
      omaskLayer: '',
    };
  },
  components: { orderItem, headerView },
  created() {
    console.log(this.detail.address.full_name)
  },
  compiled() {
    this.omaskLayer = localStorage.getItem('uii')
  },
  mounted() {
    this.network().orderDetail()
    this.network().getOurPromise()
  },
  methods: {
    refresh() {
      if (localStorage.getItem('addressState')) {
        localStorage.setItem('addressState', '')
        this.$router.go(0)
      }
    },
    // invoking() {
    //   this.network().orderDetail()
    // },
    navigateTo(path) {
      this.$router.push(path);
    },
    delOrder(item) {
      this.$createDialog({
        type: 'confirm',
        content: 'Are you sure delete the order? ',
        confirmBtn: {
          text: 'YES',
        },
        cancelBtn: {
          text: 'NO',
        },
        onConfirm: () => {
          this.network().delOrder(item)
        },
      }).show()
    },
    confirmOrder(item) {
      this.$createDialog({
        type: 'confirm',
        content: 'Are you sure you have received the goods? ',
        confirmBtn: {
          text: 'YES',
        },
        cancelBtn: {
          text: 'NO',
        },
        onConfirm: () => {
          this.network().confirmOrder(item)
        },
      }).show()
    },
    clickRestart() {
      console.log('clickRestart')
      this.network().restartBargain()
    },
    abolishBargain() {
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
          this.network().abolishBargain()
        },
      }).show()
    },
    network() {
      localStorage.setItem('state', 'state');
      return {
        orderDetail: async () => {
          const { data } = await orderDetail(this.uuid, { type: this.type })
          console.log('订单详情', data)
          console.log(1111)
          data.total_price = (Number(data.price) * data.count).toFixed(2)
          if (data.scalar === false) {
            this.invoking()
          } else {
            console.log('刷新')
            this.detail = data
            localStorage.setItem('uii', '');
            this.maskLayer = 0
            // this.$router.go(0)
          }
          console.log(this.detail.order_number)
        },
        getOurPromise: async () => {
          const { data } = await getOurPromise()
          console.log('我们的承诺', data)
          this.ourPromise = data.data.content
        },
        delOrder: async (item) => {
          const { data } = await delOrder(item.uuid)
          console.log('删除订单', data)
          this.$router.go(-1)
        },
        confirmOrder: async (item) => {
          const { data } = await confirmOrder({ order_uuid: item.uuid })
          console.log('确认收货', data)
          this.network().orderDetail()
        },
        restartBargain: async () => {
          const { data } = await restartBargain({ order_uuid: this.uuid })
          console.log('重新砍价', data)
          this.$router.go(-1)
        },
        paySurplus: async () => {
          localStorage.setItem('uii', 'buy')
          const { data } = await paySurplus({ order_uuid: this.uuid })
          console.log('支付砍价订单', data)
          window.location.href = data.url
          this.transmit = {
            Address1: this.detail.address.address_line_1,
            Address2: this.detail.address.address_line_2,
            FullName: this.detail.address.full_name,
            City: this.detail.address.fill_city,
            State: this.detail.address.fill_state,
            Country: this.detail.address.country,
            Email: this.detail.address.email,
            Phone: this.detail.address.phone_number,
            Count: this.detail.count,
            Zip: this.detail.address.postal_code,
            OrderNumber: this.detail.order_number,
            uuid: `${this.uuid}`,
          }
        },
        // cancelBargain: async () => {
        //   const { data } = await cancelBargain({ order_uuid: this.uuid })
        //   console.log('取消订单', data)
        //   this.$router.go(-1)
        // },
        // 砍价取消
        abolishBargain: async () => {
          const { data } = await abolishBargain()
          console.log('砍价取消', data)
          this.$router.go(-1)
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
  watch: {
    'detail.address。order_number': {
      handler() {
        console.log('更新了！！')
        this.refresh()
      },
    },
  },
};
</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/mixins.scss';
  .your{
    font-size: 0.35rem;
  }
  .content{
    margin-top: 0.98rem;
  }
  .succeed{
    height: 0.7rem;
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
  .addr{
     display: flex;
     img{
       width: 0.37rem;
       height: 0.42rem;
       margin-right: 0.3rem;
       margin-top: 0.2rem;
     }
  }
  .personal-btn{
    background: #73C9B3;
    color: #FFFFFF;
    border-radius: 0.1rem;
    width: 6.5rem;
    height: 0.64rem;
    text-align: center;
    padding-top: 0.1rem;
    font-size: 0.36rem;
    margin:0 0.5rem 0.4rem 0.5rem;
  }
</style>
