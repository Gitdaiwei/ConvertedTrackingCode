<template>
  <div
    class="order-item"
    @click="navigateTo(path)">
    <img
      class="img"
      :src="content.img_src | imgMapper">
    <div class="main">
      <div class="p">
        <div class="name">{{ content.product_name }}<br>Toothbrush</div>
        <div
          class="til"
          style="color:#73C9B3;"
          v-if="tabInd==4">
          {{ content.status==0?'Applying':'' }}
          {{ content.status==1?'Processing':'' }}
          {{ content.status==2?'Refunded':'' }}
        </div>
        <div
          class="til"
          style="color:#73C9B3;"
          v-else>
          {{ content.status==1?'Processing':'' }}
          {{ content.status==2?'Shipped':'' }}
          {{ content.status==3?'Completed':'' }}
        </div>
        <div class="p-money">
          <div class="num">
          <span>Qty:</span>x{{ content.count||1 }}</div>
          <!-- <div class="pri">
          <span>price:</span>${{ content.price }}</div> -->
        </div>
      </div>
      <!-- <div class="p">
        <div class="type">{{ content.standard_name }}</div>
        <div class="num">x{{ content.count||1 }}</div>
      </div> -->
      <div
        class="day"
        v-if="false">30 Days Return </div>
      <div
        v-if="isShowRefund"
        class="refunded "
        @click="clickRefunded">REFUND</div>
      <div
        v-if="isShowRestart"
        class="restart "
        @click="clickRestart">RASTART</div>
      <div
        class="p"
        v-if="isShowCurrent">
        <span class="attr">Current Price </span>
        <span class="pri secondary">${{ content.money }}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tabInd: -1,
    };
  },
  props: {
    path: {
      type: String,
      default: '',
    },
    content: {
      type: Object,
      default: () => {},
    },
    isShowCurrent: {
      type: Boolean,
      default: false,
    },
    isShowRefund: {
      type: Boolean,
      default: false,
    },
    isShowRestart: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
  },
  methods: {
    navigateTo(path) {
      if (!path) return
      this.$router.push(path);
    },
    clickRefunded() {
      this.$emit('clickRefunded', true)
    },
    clickRestart() {
      this.$emit('clickRestart', true)
    },
    network() {
      return {
        example: async () => {
          console.log('network');
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
    .order-item {
      padding: 0.25rem 0;
      display: flex;

      .img {
        width: 2.4rem;
        height: 2.4rem;
        object-fit: cover;
        margin-right: 0.18rem;
        border-radius: 0.08rem;
        background: #f5f5f5;
        border-radius: 0.1rem;
      }

      .main {
        flex: 1;

        .p {
          // @include flex-container();
          font-size: 0.26rem;
          color: rgba(141, 153, 161, 1);
          line-height: 1.54;
        }

        .name {
          font-size: 0.2rem;
          font-weight: bolder;
          color: #000;
          // width: 3rem;
          // @include line-limit-n()
        }
        .til {
          font-weight: 700;
        }
        .p-money{
          margin-top: 0.6rem;
          .pri {
          font-size: 0.2rem;
          color: rgba(115, 201, 179, 1);
          font-weight: 500;
          span{
             margin-right: 1.7rem;
           }
          &.secondary{
            color: $secondary-color;
          }
        }
        .num{
          //  color: rgba(115, 201, 179, 1);
           span{
             margin-right: 0.4rem;
           }
        }
        span{
          color: #878787;
        }
        }
        .day {
          color: rgba(141, 153, 161, 1);
          font-weight: 500;
          margin: 0.12rem 0 0.14rem;
        }
        .attr {
          font-size: 0.32rem;
          color: #000;
        }

        .refunded{
          width:1.5rem;
          line-height:0.4rem;
          border:1px solid #FCAB32;
          color:#FCAB32 ;
          text-align: center;
          float: right;
          margin-top: -0.12rem;
        }
        .restart{
          width:1.5rem;
          line-height:0.4rem;
          border:1px solid #8D99A1;
          color:#8D99A1 ;
          text-align: center;
        }
      }

    }
</style>
