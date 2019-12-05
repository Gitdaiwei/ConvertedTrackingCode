<template>
  <div class="container-gray container order-detail">
    <div class="content">
      <div class="goods">
        <order-item :content="detail"/>
        <div class="price">
          <div class="li total">
            <div class="attr">Actual payment :</div>
            <div class="val">${{ detail.total_price }}</div>
          </div>
        </div>
      </div>
      <div class="refund">
        <div class="til">Refund Description： </div>
        <div class="textarea">
          <textarea
            v-model="params.description"
            maxlength="500"/>
          <div class="num">{{ params.description.length }}/500</div>
        </div>
        <dankal-image-upload
          v-model="params.img_src"
          :limit="8"
          :domain="qiniuDomain"
          :token="qiniuToken"/>
      </div>
    </div>
    <div class="bottom">
      <div
        v-if="params.description"
        class="bt btn-primary"
        @click="submit">SUBMIT</div>
      <div
        v-else
        class="bt btn-disable">SUBMIT</div>
    </div>
  </div>
</template>

<script>

import orderItem from '@/components/order-item'
import dankalImageUpload from '@/components/dankal/dankal-image-upload'
import { orderDetail, addAfterList } from '@/api/order'
import { getUploadToken } from '@/api/common'
import { imgDomain } from '@/configs/enviroment'

export default {
  head() {
    return {
      title: 'Order Details ',
    };
  },
  data() {
    return {
      qiniuDomain: imgDomain,
      qiniuToken: '',
      uuid: this.$route.query.uuid,
      detail: {},
      params: {
        img_src: [],
        description: '',
        order_uuid: this.$route.query.uuid,
      },
    };
  },
  components: { orderItem, dankalImageUpload },
  mounted() {
    this.network().orderDetail()
    this.network().getUploadToken()
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    submit() {
      this.network().addAfterList()
    },
    network() {
      return {
        orderDetail: async () => {
          const { data } = await orderDetail(this.uuid, { type: 'order' })
          console.log('订单详情', data)
          data.total_price = (Number(data.price) * data.count).toFixed(2)
          this.detail = data
        },
        getUploadToken: async () => {
          const { data } = await getUploadToken()
          console.log('七牛参数', data)
          this.qiniuToken = data.token
        },
        addAfterList: async () => {
          console.log(this.params)
          const { data } = await addAfterList(this.params)
          console.log('申请售后', data)
          this.$router.go(-2)
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
  .refund{
    margin-top: 0.2rem;
    background: #FFFFFF;
    padding: 0.28rem 0.48rem 0.58rem;
    .til{
      font-weight: 500;
    }
    .textarea{
      border:1px solid rgba(180,196,204,1);
      margin-top: 0.26rem;
      margin-bottom: 0.48rem;
      padding: 0.1rem 0.2rem ;
      textarea{
        width: 100%;
        height: 1.8rem;
      }
      .num{
        text-align: right;
        color:rgba(141,153,161,1);
        font-size: 0.26rem;
      }
    }
  }
</style>
