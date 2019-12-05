<template>
  <div class="container-gray container">
    <headerView/>
    <tab-control
      :options="tabList"
      v-model="tabInd"
      style="margin-top: 0.8rem"/>
    <div class="order-list">
      <div
        class="li"
        v-for="(item, index) in list"
        :key="index">
        <div class="til">
          {{ item.status==1?'In Progress':'' }}
          {{ item.status==2?'Completed':'' }}
          {{ item.status==3?'Cancelled':'' }}
        </div>
        <order-item
          :path="'./order/detail?type=bargain&uuid='+item.uuid"
          :content="item"
          :is-show-current="true"/>
        <div
          class="bottom"
          v-if="item.status==1||item.status==2">
          <div
            class="bt primary"
            @click="network().paySurplus(item)">Buy Now</div>
          <div
            class="bt secondary"
            v-if="item.status==2"
            @click="restartBargain(item)">Try Again</div>
          <div
            class="bt"
            @click="abolishBargain(item)">Give Up</div>
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
import tabControl from '@/components/tab-control'
import {
  bargainOrderList, restartBargain, paySurplus, cancelBargain, abolishBargain,
} from '@/api/order'
import headerView from '@/components/header'

export default {
  head() {
    return {
      title: 'My Bargain',
    };
  },
  data() {
    return {
      tabList: ['ALL', 'In Progress', 'Completed', 'Cancelled'],
      tabInd: -1,
      list: [],
      status: 0,
    };
  },
  components: { orderItem, tabControl, headerView },
  watch: {
    tabInd(val) {
      this.status = val
      this.network().bargainOrderList()
    },
  },
  mounted() {
    this.tabInd = 0
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    restartBargain(item) {
      this.network().restartBargain(item)
    },
    abolishBargain(item) {
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
          this.network().abolishBargain(item)
        },
      }).show()
    },
    network() {
      return {
        bargainOrderList: async () => {
          const { data } = await bargainOrderList({ status: this.status })
          console.log('砍价单列表', data)
          this.list = data.list
        },
        restartBargain: async (item) => {
          const { data } = await restartBargain({ order_uuid: item.uuid })
          console.log('重新砍价', data)
          this.network().bargainOrderList()
          this.$createToast({
            txt: 'success！',
            type: 'corrent',
            time: 1000,
          }).show();
        },
        paySurplus: async (item) => {
          const { data } = await paySurplus({ order_uuid: item.uuid })
          console.log('支付砍价订单', data)
          window.location.href = data.url
        },
        // cancelBargain: async (item) => {
        //   const { data } = await cancelBargain({ order_uuid: item.uuid })
        //   console.log('取消订单', data)
        //   this.network().bargainOrderList()
        //   this.$createToast({
        //     txt: 'success！',
        //     type: 'corrent',
        //     time: 1000,
        //   }).show();
        // },
        // 砍价取消
        abolishBargain: async () => {
          const { data } = await abolishBargain()
          console.log('砍价取消', data)
          this.$router.go(0)
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
</style>
