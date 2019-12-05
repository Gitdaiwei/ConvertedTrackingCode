<template>
  <section class="container">
    <div class="address-block">
      <dankal-slider-group>
        <dankal-slider
          v-for="(item,index) in addressList"
          :key="index">
          <template
            slot="content"
            slot-scope="scope"
          >
            <div class="address-item-block-infos">
              <div>
                <p>
                  <span
                    v-if="item.is_default"
                    class="default">[默认]</span>
                  <span>收货人：{{ item.name }}</span>
                </p>
                <span>{{ item.mobile }}</span>
              </div>
              <p>{{ item.detail_address }}</p>
            </div>
          </template>
          <template
            slot="actions"
            slot-scope="scope"
          >
            <div class="address-item-block-action">
              <span>标为默认</span>
              <span>编辑</span>
              <span>删除</span>
            </div>
          </template>
      </dankal-slider></dankal-slider-group>
    </div>
    <div class="address-action-button">
      <span @click="()=>{$router.push('/address/detail')}">新建地址</span>
    </div>
    <dankal-modal v-model="remove">
      <div class="model-content">
        <p>是否要删除该地址？</p>
        <div>
          <span>否</span>
          <span>是</span>
        </div>
      </div>
    </dankal-modal>
  </section>
</template>

<script>
import DankalModal from '@/components/dankal/dankal-modal';
import DankalSlider from '@/components/dankal/dankal-slider';
import DankalSliderGroup from '@/components/dankal/dankal-slider-group';

import {
  getAddressList,
  deleteAddress,
  setDefaultAddress,
} from '@/api/address';

export default {
  data() {
    return {
      update: true,
      remove: false,
      addressList: [
        {
          city: '深圳市',
          county: '龙岗区',
          create_time: '2019-01-06 13:06:39',
          detail_address: '龙城大厦2305',
          is_default: 1,
          mobile: '13760237141',
          name: 'ivan',
          province: '广东省',
          uuid: '39b31abdc39f39ad6a2813e233b1c35a',
        },
        {
          city: '深圳市',
          county: '龙岗区',
          create_time: '2019-01-06 13:06:39',
          detail_address: '龙城大厦2322',
          is_default: 0,
          mobile: '13760237141',
          name: 'ivan',
          province: '广东省',
          uuid: '39b31abdc39f39ad6a2813e233b1c35a',
        },
      ],
    };
  },

  components: {
    DankalModal,
    DankalSlider,
    DankalSliderGroup,
  },

  methods: {
    handlerNavigator(path) {
      this.$router.push({
        path,
      });
    },
    network() {
      return {
        getAddressList: async () => {
          const { data } = await getAddressList();
        },
        deleteAddress: async uuid => {
          const { status } = await deleteAddress(uuid);
          if (status === 200) {
            window.toast('删除地址成功~');
            setTimeout(() => {
              this.network().getAddressList();
            }, 1000)
          }
        },
        setDefaultAddress: async (uuid) => {
          const { status } = await setDefaultAddress()
          if (status === 200) {
            window.toast('设置默认地址成功～')
          }
        },
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/variables.scss";


.address-item-block-infos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 1.8rem;

  padding: 0.24rem 0.24rem;
  background-color: #ffffff;

  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;

    span {
      display: inline-block;
      font-size: 0.28rem;
    }

    .default {
      color: $primary-color;
      margin-right: 0.2rem;
    }
  }

  p {
    font-size: 0.24rem;
  }
}

.address-item-block-action {
  height: 100%;

  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    height: 100%;

    font-size: 0.32rem;
    color: #ffffff;
    padding: 0rem 0.2rem;
  }

  span:nth-of-type(1) {
    background-color: $primary-color;
  }

  span:nth-of-type(2) {
    background-color: #c8c7cd;
  }

  span:nth-of-type(3) {
    background-color: #fe3b31;
  }
}

.address-action-button {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 0.96rem;

  font-size: 0.32rem;
  color: #ffffff;
  text-align: center;
  line-height: 0.96rem;
  background-color: $primary-color;
}

.model-content {
  width: 5.6rem;
  background: #ffffff;
  border-radius: 0.08rem;

  p {
    font-size: 0.36rem;
    text-align: center;
    padding: 0.76rem 0rem 0.64rem;
  }

  div {
    display: flex;
    align-items: center;
    border-top: 1px solid #e5e5e5;

    span {
      display: inline-block;
      flex-basis: 50%;
      font-size: 0.36rem;
      text-align: center;
      padding: 0.28rem 0rem;
    }

    span + span {
      border-left: 1px solid #e5e5e5;
    }
  }
}
</style>
