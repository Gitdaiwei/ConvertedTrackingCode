<template>
  <div class="container-gray container order-detail">
    <div class="content">
      <div class="addr">
        {{ detail.address.full_name }} {{ detail.address.phone_number }} <br>
        {{ detail.address.address_line_1 }}
        {{ detail.address.address_line_2 }}
        {{ detail.address.fill_city }}
        {{ detail.address.fill_state }}
      </div>
      <div class="goods">
        <order-item :content="detail"/>
        <div
          class="price"
          v-if="detail.type==1">
          <div class="li">
            <div>bottom-line</div>
            <div>${{ detail.bottom }}</div>
          </div>
          <div class="li">
            <div>current price</div>
            <div>${{ detail.money }} </div>
          </div>
          <div class="li total">
            <div class="attr">Actual payment :</div>
            <div class="val">${{ detail.money }}</div>
          </div>
        </div>
        <div
          class="price"
          v-else>
          <div class="li total">
            <div class="attr">Actual payment :</div>
            <div class="val">${{ detail.total_price }}</div>
          </div>
        </div>
      </div>
      <div
        class="info">
        <div class="til">
          <div class="sp">Order information </div>
        </div>
        <div class="main">
          <div>order number：{{ detail.order_number }}</div>
          <div>order date：{{ detail.create_time }}</div>
          <div>state：Finish</div>
        </div>
      </div>
      <div
        class="info"
        v-if="detail.refund_address">
        <div class="til">
          <div class="sp">Return address </div>
        </div>
        <div class="main">
          {{ detail.refund_address.full_name }} <br>
          {{ detail.refund_address.city+' '+detail.refund_address.state }} <br>
          {{ detail.refund_address.address_line_2 }}
          <br v-if="detail.refund_address.address_line_2">
          <!-- <br v-if="item.address_line_2"> -->
          {{ detail.refund_address.address_line_1 }} <br>
          {{ detail.refund_address.postal_code }}
        </div>
      </div>
      <div class="guarantee">
        <div class="til">
          <img
            class="ic"
            src="@/assets/images/current/ic_order_security.png">
          <span class="tex">No Questions Asked Guarantee </span>
        </div>
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
      class="bottom"
      v-if="detail.after_info">
      <div
        v-if="detail.after_info.status==0"
        class="bt btn-primary"
        @click="cancelAfterList">CANCEL</div>
      <div
        v-if="detail.after_info.status==2"
        class="bt btn-primary"
        @click="delAfterList">DELETE</div>
    </div>
  </div>
</template>

<script>
import orderItem from '@/components/order-item'
import {
  afterDetail, delAfterList, cancelAfterList, getOurPromise,
} from '@/api/order'

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
      ourPromise: '',
    };
  },
  components: { orderItem },
  mounted() {
    this.network().afterDetail()
    this.network().getOurPromise()
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
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
        afterDetail: async () => {
          const { data } = await afterDetail(this.uuid)
          console.log('售后详情', data)
          data.total_price = (Number(data.price) * data.count).toFixed(2)
          this.detail = data
        },
        cancelAfterList: async (item) => {
          const { data } = await cancelAfterList({ order_uuid: this.uuid })
          console.log('取消售后', data)
          this.$router.go(-1)
        },
        delAfterList: async (item) => {
          const { data } = await delAfterList(this.uuid)
          console.log('删除售后', data)
          this.$router.go(-1)
        },
        getOurPromise: async () => {
          const { data } = await getOurPromise()
          console.log('我们的承诺', data)
          this.ourPromise = data.data.content
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
