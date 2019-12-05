<template>
  <section class="dankal-sku">
    <transition name="fide">
      <div
        v-if="value"
        class="dankal-sku_background"
        @click="handlerSelectClose"
      />
    </transition>
    <transition
      v-if="value=='buy'"
      name="bubbing">
      <section
        v-if="value"
        class="dankal-sku_content">
        <div
          class="content-top">
          <div class="header-item">
            <img
              :preview="activeIndex"
              :src="productinfo.img_src | imgMapper"
              alt="">
            <div>
              <p>
                <span>$ {{ productinfo.price }}</span>
                <!-- <del>${{ productinfo.original_price }}</del> -->
              </p>
              <span>Stock {{ productinfo.stock }}</span>
            </div>
          </div>
          <img
            class="close-item"
            src="@/assets/images/ic_close.png"
            alt=""
            @click="handlerSelectClose">
          <div
            class="classify-list">
            <!-- <div
              class="classify-item">
              <span class="type">Type</span>
              <div>
                <div name="classify">
                  <div class="classify-list">
                    <span
                      v-for="(item, index) in specification"
                      :key="index"
                      :class="{active: index==activeIndex}"
                      @click="activeIndex=index">
                      {{ item.name }}
                    </span>
                  </div>
                </div>
              </div>
            </divclass="classify-list"> -->
            <div>
              <img
                class="largeIcon"
                v-if="value=='buy'"
                src="@/assets/images/sign/sign_pic_sign_success.png">
            </div>
            <div
              class="classify-item stepper"
              v-if="value=='buy'">
              <span>Number</span>
              <dankal-stepper
                style="margin-left:4rem"
                v-model="buyNumber"
                :max="selectedItem.stock"
                v-if="value=='buy'"/>
              <span v-else>1</span>
            </div>
          </div>
          <div
            v-if="value!='buy'"
            class="oclassify-list">
            <!-- <div
              class="classify-item">
              <span class="type">Type</span>
              <div>
                <div name="classify">
                  <div class="classify-list">
                    <span
                      v-for="(item, index) in specification"
                      :key="index"
                      :class="{active: index==activeIndex}"
                      @click="activeIndex=index">
                      {{ item.name }}
                    </span>
                  </div>
                </div>
              </div>
            </divclass="classify-list"> -->
            <div>
              <img
                v-if="value!='buy'"
                class="olargeIcon"
                src="@/assets/images/sign/sign_pic_sign_success.png">
            </div>
            <div
              class="classify-item stepper"
              v-if="value=='buy'">
              <span>Number</span>
              <dankal-stepper
                style="margin-left:4rem"
                v-model="buyNumber"
                :max="selectedItem.stock"
                v-if="value=='buy'"/>
              <span v-else>1</span>
            </div>
          </div>
        </div>
        <div
          class="btn-primary"
          @click="onBuyClicked">CONFIRM</div>
      </section>
    </transition>
    <!-- 不同 -->
    <transition
      v-if="value!='buy'"
      name="bubbing">
      <section
        v-if="value"
        class="dankal-sku_content"
        style="max-height: 95vh;">
        <div
          class="content-top">
          <div class="header-item">
            <img
              :preview="activeIndex"
              :src="productinfo.img_src | imgMapper"
              alt="">
            <div>
              <p>
                <span>$ {{ productinfo.price }}</span>
                <!-- <del>${{ productinfo.original_price }}</del> -->
              </p>
              <span>Stock {{ productinfo.stock }}</span>
            </div>
          </div>
          <img
            class="close-item"
            src="@/assets/images/ic_close.png"
            alt=""
            @click="handlerSelectClose">
          <div
            class="classify-list">
            <div>
              <img
                class="largeIcon"
                v-if="value=='buy'"
                src="@/assets/images/sign/sign_pic_sign_success.png">
            </div>
            <div
              class="classify-item stepper"
              v-if="value=='buy'">
              <span>Number</span>
              <dankal-stepper
                style="margin-left:4rem"
                v-model="buyNumber"
                :max="selectedItem.stock"
                v-if="value=='buy'"/>
              <span v-else>1</span>
            </div>
          </div>
          <div
            v-if="value!='buy'"
            class="oclassify-list">
            <div>
              <img
                v-if="value!='buy'"
                class="olargeIcon"
                src="@/assets/images/sign/osign_pic_sign_success.jpg">
            </div>
            <div
              class="classify-item stepper"
              v-if="value=='buy'">
              <span>Number</span>
              <dankal-stepper
                style="margin-left:4rem"
                v-model="buyNumber"
                :max="selectedItem.stock"
                v-if="value=='buy'"/>
              <span v-else>1</span>
            </div>
          </div>
        </div>
        <div
          class="btn-primary"
          @click="onBuyClicked">CONFIRM</div>
      </section>
    </transition>
  </section>
</template>

<script>
import DankalStepper from './dankal-stepper';

export default {
  head() {
    return {
      link: { href: 'https://cdn.quilljs.com/1.3.6/quill.core.js' },
    }
  },
  data() {
    return {
      buyNumber: 1,
      activeIndex: 0,
    };
  },
  computed: {
    selectedItem() {
      return this.specification[this.activeIndex]
    },
  },
  props: {
    specification: {
      type: Array,
      default: () => [],
    },
    productinfo: {
      type: Object,
      default: () => {},
    },
    value: {
      type: String,
      default: '',
    },
  },

  components: {
    DankalStepper,
  },

  methods: {
    onBuyClicked() {
      this.$emit('buy-clicked', {
        buyNumber: this.buyNumber,
        selectedItem: this.selectedItem,
      })
      this.$emit('input', '');
    },
    handlerSelectClose() {
      localStorage.setItem('uii', '');
      this.$emit('input', '');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixins.scss';

.dankal-sku {

  .dankal-sku_background {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #000;
    opacity: 0.6;
  }

  .dankal-sku_content {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 99;
    width: 100%;
    max-height: 70vh;
    background-color: #ffffff;
    .content-top{
      padding: 0rem 0.35rem 0rem;
    }

    .header-item {
      @include flex-container;
      justify-content: flex-start;

      height: 1.86rem;
      padding-bottom: 0.33rem;
      /*margin-bottom: 0.2rem;*/
      border-bottom: 1px solid rgba(225,225,225,1);

      img {
        width: 2rem;
        height: 2rem;
        border: 0.16rem solid #FFFFFF;
        transform: translateY(-0.45rem);
        object-fit: cover;
      }

      div {
        margin-left: 0.28rem;
        height: 1.55rem;
        padding: 0.36rem 0;

        p {
          margin-bottom: 0.1rem;

          span {
            font-size: 0.36rem;
            color: $primary-color;
          }

          del {
            margin-left: 0.1rem;

            color: #999999;
            font-size: 0.24rem;
          }
        }

        span {
          font-size: 0.24rem;
        }
      }
    }
    .largeIcon{
      width: 2rem;
      height: 2rem;
    }
    .olargeIcon{
      width: 42vh;
      height: 66vh;
    }
    .close-item {
      position: absolute;
      width: 0.3rem;
      height: 0.3rem;

      top: 0.3rem;
      right: 0.3rem;
    }
    .oclassify-list{
      text-align:center;
      overflow:auto;
    }
    .classify-list {
      max-height: calc(70vh - 3rem);
      overflow-y: auto;

      .classify-item {
        .type  {
          display: inline-block;

          font-weight: bold;
          font-size: 0.24rem;
          margin: 0.2rem 0 0.35rem;
        }

        & + & {
          margin-top: 0.4rem;
        }

        &.stepper {
          @include flex-container;
          margin: 0.3rem 0;

          span {
            margin-bottom: 0rem;
          }
        }
        .classify-list {
          display: flex;
          flex-wrap: wrap;
          span {
            display: inline-block;

            width:2.1rem;
            height:0.80rem;
            border:1px solid rgba(102,102,102,1);
            font-size: 0.24rem;
            padding: 0rem 0.3rem;
            display: flex;
            justify-content: center;
            align-items: center;

            margin-bottom: 0.2rem;
            margin-right: 0.25rem;

            transition: all 0.3s ease-in-out;
            &:nth-child(3n){
              margin-right: 0;
            }
          }

          .active {
            background-color: $primary-color;
            border-color: $primary-color;
            color: #ffffff;
          }
        }
      }
    }
    //不同
    .classify-list {
      max-height: calc(95vh - 3rem);
      overflow-y: auto;

      .classify-item {
        .type  {
          display: inline-block;

          font-weight: bold;
          font-size: 0.24rem;
          margin: 0.2rem 0 0.35rem;
        }

        & + & {
          margin-top: 0.4rem;
        }

        &.stepper {
          @include flex-container;
          margin: 0.3rem 0;

          span {
            margin-bottom: 0rem;
          }
        }
        .classify-list {
          display: flex;
          flex-wrap: wrap;
          span {
            display: inline-block;

            width:2.1rem;
            height:0.80rem;
            border:1px solid rgba(102,102,102,1);
            font-size: 0.24rem;
            padding: 0rem 0.3rem;
            display: flex;
            justify-content: center;
            align-items: center;

            margin-bottom: 0.2rem;
            margin-right: 0.25rem;

            transition: all 0.3s ease-in-out;
            &:nth-child(3n){
              margin-right: 0;
            }
          }

          .active {
            background-color: $primary-color;
            border-color: $primary-color;
            color: #ffffff;
          }
        }
      }
    }
  }
  // 不同
  // .odankal-sku_content {
  //   position: fixed;
  //   left: 0;
  //   bottom: 0;
  //   z-index: 99;
  //   width: 100%;
  //   max-height: 95vh;
  //   background-color: #ffffff;
  //   .content-top{
  //     padding: 0rem 0.35rem 0rem;
  //   }

  //   .header-item {
  //     @include flex-container;
  //     justify-content: flex-start;

  //     height: 1.86rem;
  //     padding-bottom: 0.33rem;
  //     /*margin-bottom: 0.2rem;*/
  //     border-bottom: 1px solid rgba(225,225,225,1);

  //     img {
  //       width: 2rem;
  //       height: 2rem;
  //       border: 0.16rem solid #FFFFFF;
  //       transform: translateY(-0.45rem);
  //       object-fit: cover;
  //     }

  //     div {
  //       margin-left: 0.28rem;
  //       height: 1.55rem;
  //       padding: 0.36rem 0;

  //       p {
  //         margin-bottom: 0.1rem;

  //         span {
  //           font-size: 0.36rem;
  //           color: $primary-color;
  //         }

  //         del {
  //           margin-left: 0.1rem;

  //           color: #999999;
  //           font-size: 0.24rem;
  //         }
  //       }

  //       span {
  //         font-size: 0.24rem;
  //       }
  //     }
  //   }
  //   .largeIcon{
  //     width: 2rem;
  //     height: 2rem;
  //   }
  //   .close-item {
  //     position: absolute;
  //     width: 0.3rem;
  //     height: 0.3rem;

  //     top: 0.3rem;
  //     right: 0.3rem;
  //   }

  //   .classify-list {
  //     max-height: calc(70vh - 3rem);
  //     overflow-y: auto;

  //     .classify-item {
  //       .type  {
  //         display: inline-block;

  //         font-weight: bold;
  //         font-size: 0.24rem;
  //         margin: 0.2rem 0 0.35rem;
  //       }

  //       & + & {
  //         margin-top: 0.4rem;
  //       }

  //       &.stepper {
  //         @include flex-container;
  //         margin: 0.3rem 0;

  //         span {
  //           margin-bottom: 0rem;
  //         }
  //       }
  //       .classify-list {
  //         display: flex;
  //         flex-wrap: wrap;
  //         span {
  //           display: inline-block;

  //           width:2.1rem;
  //           height:0.80rem;
  //           border:1px solid rgba(102,102,102,1);
  //           font-size: 0.24rem;
  //           padding: 0rem 0.3rem;
  //           display: flex;
  //           justify-content: center;
  //           align-items: center;

  //           margin-bottom: 0.2rem;
  //           margin-right: 0.25rem;

  //           transition: all 0.3s ease-in-out;
  //           &:nth-child(3n){
  //             margin-right: 0;
  //           }
  //         }

  //         .active {
  //           background-color: $primary-color;
  //           border-color: $primary-color;
  //           color: #ffffff;
  //         }
  //       }
  //     }
  //   }
  // }
  .shopping-btns{
    display: flex;
    width: 100%;
    span {
      flex:1;
      display: inline-block;
      height: 1.1rem;

      font-size: 0.34rem;
      color: #ffffff;
      text-align: center;
      line-height: 1.1rem;
    }

    span:nth-of-type(1) {
      background-color: $secondary-color;
    }

    span:nth-of-type(2) {
      background-color: $primary-color;
    }
  }
}
.fide-enter-active,
.fide-leave-active {
  transition: opacity 0.3s !important;
}
.fide-enter,
.fide-leave-to {
  opacity: 0 !important;
}

.bubbing-enter-active,
.bubbing-leave-active {
  transition: transform 0.3s, opacity 0.3s !important;
}
.bubbing-enter,
.bubbing-leave-to {
  opacity: 0 !important;
  transform: translateY(100%) !important;
}
</style>
