<template>
  <div class="container-gray container order-detail">
    <headerView/>
    <div class="content">
      <div
        class="addr"
        @click="navigateTo('../addr?type=choose')">
        <div
          class="into"
          v-if="chooseAddrInfo.uuid">
          <div>
            {{ chooseAddrInfo.full_name }} {{ chooseAddrInfo.phone_number }} <br>
            {{ chooseAddrInfo.address_line_1 }}
            {{ chooseAddrInfo.address_line_2 }}
            {{ chooseAddrInfo.fill_city }}
            {{ chooseAddrInfo.fill_state }}
          </div>
        </div>
        <div
          class="add"
          v-else>
          <img
            class="ic"
            src="@/assets/images/icon_address_add.png">
          <span class="tex">Choose delivery address </span>
        </div>
      </div>
      <div class="goods">
        <order-item :content="orderItemInfo"/>
        <div class="price">
          <div
            class="li"
            v-if="type=='bargain'">
            <div>Original Price</div>
            <div>${{ productInfo.current_price }}</div>
          </div>
          <div
            class="li"
            v-if="type=='bargain'">
            <div>Bargain Price</div>
            <div>${{ productInfo.bottom_price }} </div>
          </div>
          <div class="li total">
            <div class="attr">What you pay now:</div>
            <div class="val">
              ${{ productInfo.actual_payment }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div
        class="bt btn-primary"
        @click="submit">PAY</div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import orderItem from '@/components/order-item'
import {
  addOrder, addBargainOrder, payOrder, payBargainOrder,
} from '@/api/order';
import { getAddressList } from '@/api/address'
import store from '@/store';
import headerView from '@/components/header'

export default {
  head() {
    return {
      title: 'Order Details ',
    };
  },
  data() {
    return {
      type: '',
      transmit: {},
      productInfo: {},
      orderItemInfo: {},
      chooseAddrInfo: {},
      submitParam: {},
    };
  },
  components: { orderItem, headerView },
  computed: {
  },
  mounted() {
    localStorage.setItem('addressState', '')
    console.log('确认订单信息', window.comfirmOrderInfo)
    const {
      type, count, standard, productInfo,
    } = window.comfirmOrderInfo
    this.type = type
    this.orderItemInfo = {
      img_src: productInfo.img_src,
      product_name: productInfo.name,
      standard_name: standard.name,
      price: productInfo.price,
      count,
    }
    this.productInfo = {
      original_price: (Number(productInfo.original_price) * count).toFixed(2),
      current_price: (Number(productInfo.current_price) * count).toFixed(2),
      bottom_price: productInfo.bottom_price,
      actual_payment: type === 'bargain' ? productInfo.bottom_price : (Number(productInfo.current_price) * count).toFixed(2),
    }
    this.submitParam = { standard_uuid: standard.uuid, count }
    console.log('选中地址', window.chooseAddrInfo)
    if (window.chooseAddrInfo) {
      this.chooseAddrInfo = window.chooseAddrInfo
    } else {
      this.network().getAddressList()
    }
  },
  methods: {
    navigateTo(path) {
      localStorage.setItem('addressState', 'addressState')
      this.$router.push(path);
    },
    submit() {
      this.transmit = {
        Address1: this.chooseAddrInfo.address_line_1,
        Address2: this.chooseAddrInfo.address_line_2,
        FullName: this.chooseAddrInfo.full_name,
        City: this.chooseAddrInfo.fill_city,
        State: this.chooseAddrInfo.fill_state,
        Country: this.chooseAddrInfo.country,
        Email: this.chooseAddrInfo.email,
        Phone: this.chooseAddrInfo.phone_number,
        Count: window.comfirmOrderInfo.count,
        Zip: this.chooseAddrInfo.postal_code,
        OrderNumber: '',
      }
      localStorage.setItem('oym', JSON.stringify(this.transmit));
      if (!this.chooseAddrInfo.uuid) {
        this.$createToast({
          txt: 'Please add address',
          mask: true,
          type: 'txt',
          time: 1000,
        }).show()
        return
      }
      this.submitParam = Object.assign(this.submitParam, { address_uuid: this.chooseAddrInfo.uuid })
      switch (this.type) {
        case 'buy':
          this.network().addOrder()
          break
        case 'bargain':
          this.network().addBargainOrder()
          break
        default:
      }
    },
    network() {
      return {
        getAddressList: async () => {
          const { data } = await getAddressList()
          console.log('获取地址列表', data)
          if (data.default_address.uuid) {
            this.chooseAddrInfo = data.default_address
          } else if (data.address_list.length > 0) {
            const info = data.address_list[0]
            this.chooseAddrInfo = info
          }
        },
        addOrder: async () => {
          const { data } = await addOrder(this.submitParam)
          console.log('提交普通订单', data)
          this.network().payOrder({ order_uuid: data.order_uuid })
        },
        addBargainOrder: async () => {
          const { data } = await addBargainOrder(this.submitParam)
          console.log('提交砍价订单', data)
          this.network().payBargainOrder({ order_uuid: data.order_uuid })
        },
        payOrder: async (param) => {
          const { data } = await payOrder(param)
          console.log('支付普通订单', data)
          window.location.href = data.url
        },
        payBargainOrder: async (param) => {
          const { data } = await payBargainOrder(param)
          console.log('支付砍价订单', data)
          window.location.href = data.url
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
  .content{
    margin-top: 0.9rem;
  }
    @import '~@/assets/styles/mixins.scss';
</style>
