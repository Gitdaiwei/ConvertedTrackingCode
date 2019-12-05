<template>
  <div class="container">
    <div class="form">
      <div class="li">
        <div class="attr">Country/Region</div>
        <div class="input">[Default] Unite States </div>
      </div>
      <div class="li">
        <div class="attr">Full name</div>
        <input
          type="text"
          class="input"
          placeholder="Fill in your name "
          v-model="addrInfo.full_name">
      </div>
      <div class="li">
        <div class="attr">Address line 1 </div>
        <input
          type="text"
          class="input"
          placeholder="Fill in your address "
          v-model="addrInfo.address_line_1">
      </div>
      <div class="li">
        <div class="attr">Address line 2</div>
        <input
          type="text"
          class="input"
          placeholder="Fill in your address "
          v-model="addrInfo.address_line_2">
      </div>
      <div class="li">
        <div class="attr">Fill in your city </div>
        <input
          type="text"
          class="input"
          placeholder="Fill in the city you live "
          v-model="addrInfo.fill_city">
      </div>
      <div class="li">
        <div class="attr">Fill in your state </div>
        <input
          type="text"
          class="input"
          placeholder="Fill in the state/region you live "
          v-model="addrInfo.fill_state">
      </div>
      <div class="li">
        <div class="attr">Zip/Postal code </div>
        <input
          type="text"
          class="input"
          placeholder="Fill in your zip/postal code "
          v-model="addrInfo.postal_code">
      </div>
      <div class="li">
        <div class="attr">Phone number </div>
        <input
          type="text"
          class="input"
          placeholder="Fill in your phone number "
          v-model="addrInfo.phone_number">
      </div>
      <div class="li">
        <div class="attr">Email </div>
        <input
          type="text"
          class="input"
          placeholder="Please enter your Email"
          v-model="addrInfo.email">
      </div>
    </div>
    <div
      v-if="addrInfo.full_name&&addrInfo.address_line_1&&addrInfo.fill_city
      &&addrInfo.fill_state&&addrInfo.postal_code&&addrInfo.phone_number&&addrInfo.email"
      class="btn-primary"
      @click="saveAddress()">SAVE ADDRESS</div>
    <div
      v-else
      class="btn-disable">SAVE ADDRESS</div>
  </div>
</template>

<script>
import { createAddress, updateAddress, addressDetail } from '@/api/address'

export default {
  head() {
    return {
      title: 'My address',
    };
  },
  data() {
    return {
      uuid: '',
      addrInfo: {
        country: 'Unite States',
        full_name: '',
        address_line_1: '',
        address_line_2: '',
        fill_city: '',
        fill_state: '',
        postal_code: '',
        phone_number: '',
        email: '',
        is_default: '0',
      },
    };
  },
  mounted() {
    this.uuid = this.$route.query.uuid
    if (this.uuid) {
      this.network().getAddressDetail()
    }
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    saveAddress() {
      if (this.uuid) {
        this.network().updateAddress()
      } else {
        this.network().createAddress()
      }
    },
    network() {
      return {
        getAddressDetail: async () => {
          const { data } = await addressDetail(this.uuid)
          console.log('获取地址详情', data)
          this.addrInfo = {
            country: data.country,
            full_name: data.full_name,
            address_line_1: data.address_line_1,
            address_line_2: data.address_line_2,
            fill_city: data.fill_city,
            fill_state: data.fill_state,
            postal_code: data.postal_code,
            phone_number: data.phone_number,
            email: data.email,
            is_default: data.is_default,
          };
        },
        updateAddress: async () => {
          const { data } = await updateAddress(this.uuid, this.addrInfo)
          console.log('编辑地址', data)
          if (localStorage.getItem('addressState')) {
            this.$router.go(-2)
          } else {
            this.$router.go(-1)
          }
        },
        createAddress: async () => {
          const { data } = await createAddress(this.addrInfo)
          console.log('新增地址', data)
          if (localStorage.getItem('addressState')) {
            this.$router.go(-2)
          } else {
            this.$router.go(-1)
          }
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
  .container{
    .form{
      padding: 0 0.4rem;
      .li{
        border-bottom:1px solid rgba(229,229,229,1);
        padding: 0.25rem 0;
        font-size: 0.32rem;
        .attr{
          font-weight: bolder;
          margin-bottom: 0.05rem;
        }
        .input{
          width: 100%;
          height: 0.5rem;
          line-height: 0.5rem;
        }
      }
    }
  }
</style>
