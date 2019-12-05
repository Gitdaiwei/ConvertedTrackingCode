<template>
  <div class="container-gray container">
    <headerView/>
    <!-- <tab-control
      :options="tabList"
      v-model="tabInd"
      style="margin-top: 0.8rem"/> -->
    <div class="order-list">
      <div
        class="li"
        v-for="(item, index) in list"
        :key="index">
        <!-- <div
          class="til"
          v-if="tabInd==4">
          {{ item.status==0?'Applying':'' }}
          {{ item.status==1?'Processing':'' }}
          {{ item.status==2?'Refunded':'' }}
        </div>
        <div
          class="til"
          v-else>
          {{ item.status==1?'Processing':'' }}
          {{ item.status==2?'Shipped':'' }}
          {{ item.status==3?'Completed':'' }}
        </div> -->
        <order-item
          :path="(tabInd==4?'./order/refund-detail?uuid=':'./order/detail?uuid=')+item.uuid"
          :content="item"/>
        <div class="bottom">
          <div class="bottom-time">{{ item.create_time }}</div>
          <div
            v-if="tabInd==4&&(item.status==0||item.status==2)">
            <div
              class="bt"
              v-if="item.status==0"
              @click="cancelAfterList(item)">CANCEL</div>
            <div
              class="bt"
              v-if="item.status==2"
              @click="delAfterList(item)">DELETE</div>
          </div>
          <div
            v-else-if="item.status==2||item.status==3">
            <div
              class="bt primary"
              v-if="item.status==2"
              @click="confirmOrder(item)">CONFIRM</div>
            <div
              class="bt"
              v-if="item.status==3"
              @click="delOrder(item)">DELETE</div>
          </div>
        </div>
      </div>
    </div>
    <div class="order-list">
      <div
        v-if="olist.content.length"
        class="service">{{ olist.topic }}</div>
      <div
        class="li"
        v-for="(item, index) in olist.content"
        :key="index">
        <!-- <div
          class="til"
          v-if="tabInd==4">
          {{ item.status==0?'Applying':'' }}
          {{ item.status==1?'Processing':'' }}
          {{ item.status==2?'Refunded':'' }}
        </div>
        <div
          class="til"
          v-else>
          {{ item.status==1?'Processing':'' }}
          {{ item.status==2?'Shipped':'' }}
          {{ item.status==3?'Completed':'' }}
        </div> -->
        <order-item
          :path="(tabInd==4?'./order/refund-detail?uuid=':'./order/detail?uuid=')+item.uuid"
          :content="item"/>
        <div class="bottom">
          <div class="bottom-time">{{ item.create_time }}</div>
          <div
            v-if="tabInd==4&&(item.status==0||item.status==2)">
            <div
              class="bt"
              v-if="item.status==0"
              @click="cancelAfterList(item)">CANCEL</div>
            <div
              class="bt"
              v-if="item.status==2"
              @click="delAfterList(item)">DELETE</div>
          </div>
          <div
            v-else-if="item.status==2||item.status==3">
            <div
              class="bt primary"
              v-if="item.status==2"
              @click="confirmOrder(item)">CONFIRM</div>
            <div
              class="bt"
              v-if="item.status==3"
              @click="delOrder(item)">DELETE</div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="placeholder-img"
      v-if="!list.length"/>
  </div>
</template>

<script>
import orderItem from '@/components/order-item'
// import tabControl from '@/components/tab-control'
import headerView from '@/components/header'
import {
  orderList, delOrder, confirmOrder, afterList, delAfterList, cancelAfterList,
} from '@/api/order'

export default {
  head() {
    return {
      title: 'My Order',
    };
  },
  data() {
    return {
      tabList: ['ALL', 'Processing', 'Shipped ', 'Completed', 'Customer Service'],
      tabInd: -1,
      list: [],
      olist: { topic: 'Customer Service', content: [] },
      status: 0,
    };
  },
  watch: {
    tabInd(val) {
      if (val <= 3) {
        this.status = val
        this.network().orderList()
        this.network().afterList()
      }
    },
  },
  components: { orderItem, headerView },
  mounted() {
    this.tabInd = 0
  },
  methods: {
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
    cancelAfterList(item) {
      this.$createDialog({
        type: 'confirm',
        content: 'Are you sure cancel the after sales order? ',
        confirmBtn: {
          text: 'YES',
        },
        cancelBtn: {
          text: 'NO',
        },
        onConfirm: () => {
          this.network().cancelAfterList(item)
        },
      }).show()
    },
    delAfterList(item) {
      this.$createDialog({
        type: 'confirm',
        content: 'Are you sure delete the after sales order? ',
        confirmBtn: {
          text: 'YES',
        },
        cancelBtn: {
          text: 'NO',
        },
        onConfirm: () => {
          this.network().delAfterList(item)
        },
      }).show()
    },
    network() {
      return {
        orderList: async () => {
          const { data } = await orderList({ status: this.status })
          console.log('订单列表', data)
          this.list = data.list
        },
        delOrder: async (item) => {
          const { data } = await delOrder(item.uuid)
          console.log('删除订单', data)
          this.network().orderList()
          this.$createToast({
            txt: 'success！',
            type: 'corrent',
            time: 1000,
          }).show();
        },
        confirmOrder: async (item) => {
          const { data } = await confirmOrder({ order_uuid: item.uuid })
          console.log('确认收货', data)
          this.tabInd = 3
          this.$createToast({
            txt: 'success！',
            type: 'corrent',
            time: 1000,
          }).show();
        },
        afterList: async () => {
          const { data } = await afterList()
          console.log('售后列表', data)
          this.olist.content = data.list
        },
        cancelAfterList: async (item) => {
          const { data } = await cancelAfterList({ order_uuid: item.uuid })
          console.log('取消售后', data)
          this.network().afterList()
          this.$createToast({
            txt: 'success！',
            type: 'corrent',
            time: 1000,
          }).show();
        },
        delAfterList: async (item) => {
          const { data } = await delAfterList(item.uuid)
          console.log('删除售后', data)
          this.network().afterList()
          this.$createToast({
            txt: 'success！',
            type: 'corrent',
            time: 1000,
          }).show();
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
  .service{
    font-size: 0.32rem;
    font-weight: 600;
    margin-left: 0.5rem;
    padding-bottom: 0.2rem;
  }
  .order-list{
    padding-top: 1.2rem;
    .li{
      width:6.5rem ;
      margin-left: 0.46rem;
      border-radius:3%;
      box-shadow:0 0.02rem 0.18rem 0 rgba(0,0,0,0.1);
    }
    .bottom{
      display: flex;
      justify-content:space-between;
      align-items:center;
      .bottom-time{
      color: #999999;
      font-size: 0.2rem;
      // margin-right: 1.5rem;
    }
    }
  }
</style>
