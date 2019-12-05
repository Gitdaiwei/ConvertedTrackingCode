<template>
  <section class="container">
    <div class="detail-banner">
      <swiper :options="swiperOption">
        <swiper-slide
          v-for="(item,index) in images"
          :key="index">
          <img
            :src="item"
            class="swiper-image">
        </swiper-slide>
        <div
          class="swiper-pagination"
          slot="pagination"/>
      </swiper>
    </div>
    <div class="detail-block">
      <p class="til">3件装 MEDIHEAL美迪惠尔N.M剂 水库保湿面膜</p>
      <p class="desc">3件装 MEDIHEAL美迪惠尔N.M剂 水库保湿面膜</p>
      <p class="pri">
        <span class="cur">¥19.9</span>
        <span class="og">¥22.9</span>
        <span class="sales">月销100</span>
      </p>
    </div>
    <div
      class="detail-spec"
      @click="handlerSkuActive">
      <span>已选</span>
      <span class="val">济南柳橙12个优享装，1件</span>
    </div>
    <div
      class="detail-spec"
      @click="isShowModalParam=true">
      <span>参数</span>
      <span class="val">原产地 年份…</span>
    </div>
    <div class="detail-item">
      <div
        class="header link"
        @click="navigateTo('./comments')">
        <div class="tex">评价</div>
      </div>
      <div>
        <dankal-comment
          :comment="comment"
        />
      </div>
    </div>
    <div class="recommend">
      <div class="til">
        <div class="tex">为您推荐</div>
      </div>
      <div class="list">
        <div class="ul">
          <div class="li">
            <img
              class="img"
              src="https://cdn.idalhome.com/FtndNKAgTOrRHBhgrciFSIYaPkzR">
            <div class="name">正宗江门新会小青柑普洱茶熟…</div>
            <div class="pri">¥ 15.9</div>
          </div>
          <div class="li">
            <img
              class="img"
              src="https://cdn.idalhome.com/FtndNKAgTOrRHBhgrciFSIYaPkzR">
            <div class="name">正宗江门新会小青柑普洱茶熟…</div>
            <div class="pri">¥ 15.9</div>
          </div>
          <div class="li">
            <img
              class="img"
              src="https://cdn.idalhome.com/FtndNKAgTOrRHBhgrciFSIYaPkzR">
            <div class="name">正宗江门新会小青柑普洱茶熟…</div>
            <div class="pri">¥ 15.9</div>
          </div>
          <div class="li">
            <img
              class="img"
              src="https://cdn.idalhome.com/FtndNKAgTOrRHBhgrciFSIYaPkzR">
            <div class="name">正宗江门新会小青柑普洱茶熟…</div>
            <div class="pri">¥ 15.9</div>
          </div>
          <div class="li">
            <img
              class="img"
              src="https://cdn.idalhome.com/FtndNKAgTOrRHBhgrciFSIYaPkzR">
            <div class="name">正宗江门新会小青柑普洱茶熟…</div>
            <div class="pri">¥ 15.9</div>
          </div>
          <div class="li">
            <img
              class="img"
              src="https://cdn.idalhome.com/FtndNKAgTOrRHBhgrciFSIYaPkzR">
            <div class="name">正宗江门新会小青柑普洱茶熟…</div>
            <div class="pri">¥ 15.9</div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-item">
      <div class="header">
        <div class="tex">商品详情</div>
      </div>
      <div>
        <dankal-html :html="html" />
      </div>
    </div>
    <div class="orders-block">
      <div class="link">
        <div>
          <img
            src="@/assets/images/ic_tab_collect_unselected.png"
            class="ic">
          <div>收藏</div>
        </div>
      </div>
      <div class="link">
        <div>
          <img
            src="@/assets/images/ic_tab_shopping.png"
            class="ic">
          <div>购物车</div>
        </div>
      </div>
      <span
        class="btn-primary bt"
        @click="handlerSkuActive">加入购物车</span>
      <span class="btn-secondary bt">立即购买</span>
    </div>
    <dankal-sku
      v-model="active"
      :specification="specificationList"
    />
    <dankalModal
      v-model="isShowModalParam"
      :corner-close-able="true"
      :button-close-able="true"
      direction="bottom"
      background="none">
      <template>
        <div class="dialog-param">
          <div class="til">产品参数</div>
          <div class="ul">
            <div class="li">
              <div class="attr">产区</div>
              <div class="val">广西省</div>
            </div>
            <div class="li">
              <div class="attr">产区</div>
              <div class="val">河源省</div>
            </div>
            <div class="li">
              <div class="attr">年份</div>
              <div class="val">1986年</div>
            </div>
            <div class="li">
              <div class="attr">推荐指数</div>
              <div class="val">★ ★ ★ ★ ★</div>
            </div>
          </div>
        </div>
      </template>
    </dankalModal>
  </section>
</template>

<script>
import DankalHtml from '@/components/dankal/dankal-html';
import dankalModal from '@/components/dankal/dankal-modal';
import DankalComment from '@/components/dankal/dankal-comment';
import DankalSku from '@/components/dankal/dankal-sku';

export default {
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 3000,
        },
        pagination: {
          el: '.swiper-pagination',
        },
      },
      specificationList: [
        {
          name: '100克',
          img_src: 'https://cdn.idalhome.com/FtndNKAgTOrRHBhgrciFSIYaPkzR',
          originPrice: '2.00',
          price: '1.00',
          stock: 5,
          uuid: '0d55672f3a1c2e8b731cba5027956ccc',
        },
        {
          name: '200克',
          img_src: 'https://cdn.idalhome.com/FiRgP7G5wid_s26CIfWUqXYtz9gJ',
          originPrice: '4.00',
          price: '2.00',
          stock: 4,
          uuid: '0d55672f3a1c2e8b731cba5027956ddd',
        },
      ],
      images: [
        'http://img.hb.aicdn.com/6af04574cdaa0ad06afc611fabbfde782b281f2e5539e-bkptqh',
        'http://img.hb.aicdn.com/2988863e2ea2579d1899aea4df846229f49f0d4c6bb1a-77e5tR',
        'http://img.hb.aicdn.com/4fec0a55c23b749641f457a2d4400abd9959af5663b6-vkNKEp',
      ],
      comment: {
        userName: 'ivancai',
        userAvatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3377302992,3361149372&fm=27&gp=0.jpg',
        star: 5,
        commentTime: '2018-12-10 12:00:00',
        content: '很不错',
        images: [
          'http://img.hb.aicdn.com/6af04574cdaa0ad06afc611fabbfde782b281f2e5539e-bkptqh',
          'http://img.hb.aicdn.com/2988863e2ea2579d1899aea4df846229f49f0d4c6bb1a-77e5tR',
          'http://img.hb.aicdn.com/4fec0a55c23b749641f457a2d4400abd9959af5663b6-vkNKEp',
          'http://img.hb.aicdn.com/4fec0a55c23b749641f457a2d4400abd9959af5663b6-vkNKEp',

        ],
      },
      autoplay: true,
      options: [
        {
          name: '详情',
        },
        {
          name: '评价',
        },
      ],
      active: false,
      html: '<p>商品详情</p>',
      isShowModalParam: false,
    };
  },

  components: {
    dankalModal,
    DankalHtml,
    DankalComment,
    DankalSku,
  },

  methods: {
    navigateTo(path) {
      this.$router.push({ path })
    },

    handlerSkuActive() {
      this.active = !this.active;
    },

    handlerSelectClassify(index, cindex) {
      const { commodity } = this;

      commodity.classifys[index].code = commodity.classifys[index].code.map(
        (item, i) => {
          if (i !== cindex) return Object.assign({}, item, { status: false });

          return Object.assign({}, item, { status: true });
        },
      );

      this.commodity = commodity;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/variables.scss';
  @import '~@/assets/styles/mixins.scss';

  .container {
    padding-bottom: 1rem;
    background: #F5F5F5;
    .detail-banner {
      .swiper-image {
        width: 100%;
        height: 7.5rem;
        object-fit: cover;
      }

      /deep/ .swiper-pagination-bullet {
        width: 0.1rem;
        height: 0.08rem;
        background: #fff;
        opacity: unset;
        border-radius: unset;
      }

      /deep/ .swiper-pagination-bullet-active {
        width: 0.2rem;
        background: #108EE9;
      }
    }

    .detail-block {
      padding: 0.15rem 0.3rem 0.2rem;
      background-color: #ffffff;
      .til {
        font-size: 0.34rem;
      }
      .desc {
        color: #9B9B9B;
        font-size: 0.26rem;
        margin-top: 0.12rem;
      }
      .pri {
        color: #9B9B9B;
        line-height: 0.62rem;
        margin-top: 0.08rem;
        .cur {
          color: $primary-color;
          font-size: 0.44rem;
        }
        .og {
          text-decoration: line-through;
          margin-left: 0.1rem;
        }
        .sales {
          font-size: 0.26rem;
          float: right;
        }
      }
    }

    .detail-spec {
      @include flex-container;
      @include icon-box-right;

      margin-top: 0.2rem;
      height: 1.18rem;
      padding: 0rem 0.3rem;
      background-color: #ffffff;
      color: #666666;
      .val {
        margin-right: auto;
        margin-left: 0.2rem;
        font-size: 0.32rem;
        color: #333;
        font-weight: bolder;
      }
    }

    .detail-item {
      background-color: #ffffff;
      margin-top: 0.2rem;
      .header {
        @include flex-container;
        padding: 0.24rem 0rem;
        padding-right: 0.3rem;
        line-height: 0.34rem;
        .tex {
          border-left: 0.08rem solid $primary-color;
          padding-left: 0.2rem;
          font-weight: bolder;
        }
        &.link{
          @include icon-box-right;
        }
      }
    }

    .recommend{
      margin-top: 0.2rem;
      background: #FFFFFF;
      .til{
        background: #FFFFFF;
        height: 1.18rem;
        display: flex;
        align-items: center;
        justify-content: center;
        &:after,&:before{
          content: '';
          width: 0.58rem;
          height: 1px;
          background: #333333;
          margin: 0 0.06rem;
        }
        .tex{
          display: flex;
          align-items: center;
          justify-content: center;
          &:after,&:before{
            content: '';
            width: 0.1rem;
            height: 0.1rem;
            border-radius: 100%;
            background: #333333;
          }
          &:before{margin-right: 0.2rem}
          &:after{margin-left: 0.2rem}
        }
      }
      .list{
        overflow-x: auto;
        white-space: nowrap;
        .ul{
          padding: 0 0 0.2rem;
          .li{
            width: 1.9rem;
            display: inline-block;
            vertical-align: center;
            margin-right: 0.25rem;
            &:first-child{
              margin-left: 0.25rem;
            }
            .img{
              width: 1.9rem;
              height: 1.9rem;
              object-fit: cover;
              border: 1px solid #F5F5F5;
            }
            .name{
              margin: 0.12rem 0 0.02rem;
              font-size: 0.24rem;
              white-space: initial;
              @include line-limit-n(2);
            }
            .pri{
              font-size: 0.3rem;
              font-weight: bolder;
              color: $primary-color;
            }
          }
        }
      }
    }

    .orders-block {
      @include flex-container;
      position: fixed;
      bottom: 0px;
      z-index: 1;
      width: 100%;
      height: 1rem;
      background: #333333;

      .link {
        flex: 1;
        display: flex;
        justify-content: center;
        align-content: center;
        font-size: 0.24rem;
        line-height: 1;
        color: #ffffff;
        .ic {
          display: block;
          height: 0.34rem;
          margin: 0 auto;
          margin-bottom: 0.12rem;
        }
      }

      .bt {
        width: 2.6rem;
        height: 1rem;
        border-radius: 0;
      }
    }

    .dialog-param {
      width: 100vw;
      border-radius: 20px 20px 0px 0px;
      background: #FFFFFF;
      padding: 0.8rem 0.3rem 0.54rem;
      .til {
        font-size: 0.36rem;
        font-weight: bolder;
        text-align: center;
      }
      .ul {
        margin-top: 0.32rem;
        .li {
          display: flex;
          line-height: 1rem;
          border-bottom: 1px solid #F5F5F5;
          .attr {
            color: #9B9B9B;
            width: 1.2rem;
            margin-right: 0.48rem;
          }
          .val {
            font-size: 0.26rem;
            flex: 1;
          }
        }
      }

    }
  }
</style>
