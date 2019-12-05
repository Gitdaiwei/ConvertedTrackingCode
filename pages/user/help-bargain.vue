<template>
  <div class="container-gray container">
    <headerView/>
    <div class="order-list">
      <div
        class="li"
        v-for="(item, index) in list"
        :key="index">
        <div class="til">
          {{ item.status==1?'underway':'' }}
          {{ item.status==2||item.status==3||item.status==4?'end':'' }}
        </div>
        <order-item
          :path="'./bargain/detail?type=help&uuid='+item.uuid"
          :content="item"
          :is-show-current="true"/>
        <div class="bottom">
          <div
            class="bt primary"
            @click="navigateTo('../home/product')">BUY NOW</div>
          <div
            class="bt"
            @click="delBargainUser(item)">DELETE</div>
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
import { getBargainUser, delBargainUser } from '@/api/order'
import headerView from '@/components/header'

export default {
  head() {
    return {
      title: 'Help Bargain',
    };
  },
  data() {
    return {
      list: [],
    };
  },
  components: { orderItem, headerView },
  mounted() {
    this.network().getBargainUser()
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    delBargainUser(item) {
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
          this.network().delBargainUser(item)
        },
      }).show()
    },
    network() {
      return {
        getBargainUser: async () => {
          const { data } = await getBargainUser()
          console.log('帮砍列表', data)
          this.list = data.list
        },
        delBargainUser: async (item) => {
          const { data } = await delBargainUser(item.uuid)
          console.log('删除帮砍', data)
          this.network().getBargainUser()
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
  .order-list{
    margin-top: 0.9rem;
  }
</style>
