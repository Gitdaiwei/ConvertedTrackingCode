<template>
  <div class="container-gray container">
    <headerView/>
    <div
      class="add"
      @click="navigateTo('./addr/detail')">
      <img
        class="ic"
        src="@/assets/images/current/ic_address_add.png">
      <span>Add new address </span>
    </div>
    <div class="ul">
      <div
        class="li"
        v-for="(item,index) in addrList"
        :key="index">
        <div @click="chooseAddr(item)">
          <div
            class="default"
            v-if="item.is_default==1">[Default] </div>
          <div class="main">
            <span class="name">{{ item.full_name }}</span>
            <br>{{ item.fill_city }}, {{ item.fill_state }}
            <br v-if="item.address_line_2">{{ item.address_line_2 }}
            <br>{{ item.address_line_1 }} <br>{{ item.postal_code }}
          </div>
        </div>
        <div class="bottom">
          <div
            class="bt primary"
            @click="navigateTo('./addr/detail?uuid='+item.uuid)">Edit</div>
          <div
            v-if="item.is_default==0"
            class="bt primary"
            @click="setDefault(item.uuid)">Set default</div>
          <div
            class="bt primary"
            @click="setDelete(item.uuid)">Delete</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAddressList, deleteAddress, setDefaultAddress } from '@/api/address'
import headerView from '@/components/header'

export default {
  head() {
    return {
      title: 'Choose address ',
    };
  },
  data() {
    return {
      addrList: [],
      type: '',
    };
  },
  components: { headerView },
  mounted() {
    this.type = this.$route.query.type
    this.network().getAddressList()
  },
  methods: {
    chooseAddr(item) {
      if (this.type !== 'choose') return
      window.chooseAddrInfo = item
      this.$router.go(-1)
    },
    setDefault(uuid) {
      this.$createDialog({
        type: 'confirm',
        content: 'Are you sure you want this address as default? ',
        confirmBtn: {
          text: 'YES',
        },
        cancelBtn: {
          text: 'CANCEL',
        },
        onConfirm: () => {
          this.network().setDefaultAddress(uuid)
        },
      }).show()
    },
    setDelete(uuid) {
      this.$createDialog({
        type: 'confirm',
        content: 'Are you sure you want to delete this address?  ',
        confirmBtn: {
          text: 'DELETE',
        },
        cancelBtn: {
          text: 'CANCEL',
        },
        onConfirm: () => {
          this.network().deleteAddress(uuid)
        },
      }).show()
    },
    navigateTo(path) {
      this.$router.push(path);
    },
    network() {
      return {
        getAddressList: async () => {
          const { data } = await getAddressList()
          console.log('获取地址列表', data)
          if (data.default_address.uuid) {
            this.addrList = [data.default_address].concat(data.address_list)
          } else {
            this.addrList = data.address_list
          }
        },
        deleteAddress: async (uuid) => {
          const { data } = await deleteAddress(uuid)
          console.log('删除地址列表', data)
          this.network().getAddressList()
        },
        setDefaultAddress: async (uuid) => {
          const { data } = await setDefaultAddress({ uuid })
          console.log('设置默认地址', data)
          this.network().getAddressList()
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
    .add{
      margin-top: 0.9rem;
      height: 1.12rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color:rgba(141,153,161,1);
      font-size: 0.32rem;
      .ic{
        width: 0.38rem;
        height: 0.38rem;
        margin-right: 0.2rem;
      }
    }
    .ul{
      .li{
        width: 100%;
        background: #FFFFFF;
        padding: 0.32rem 0.4rem 0;
        .default{
          font-size: 0.32rem;
          color:rgba(252,171,50,1);
          margin-bottom: 0.05rem;
        }
        .main{
          font-size: 0.28rem;
          font-weight: 500;
          .name{
            font-weight: bolder;
          }
        }
        .bottom{
          margin-top: 0.35rem;
          border-top: 1px solid #E5E5E5;
          padding: 0.28rem 0.12rem;
          display: flex;
          justify-content:space-between;
          .bt{
            @include button(auto,0.54rem,0rem,);
            margin: 0;
            padding: 0 0.22rem;
            font-size: 0.28rem;
            border-radius: 0.28rem;
            min-width: 1.36rem;
            margin-right: 0.1rem;
            font-weight:bold;
            &.primary{
              border-color: $primary-color;
            }
            // &.secondary{
            //   color: $secondary-color;
            //   border-color: $secondary-color;
            // }
          }
        }
        &+.li{
          margin-top: 0.3rem;
        }
      }
    }
  }
</style>
