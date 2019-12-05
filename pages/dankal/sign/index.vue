<template>
  <div class="content">
    <div class="header">
      <div class="til">
        <img
          class="ic"
          src="@/assets/images/sign/sign_icon_hook.png">
        <span>再连续签到3天有额外奖励哦</span>
        <img
          class="explain"
          @click="navigateTo('./sign/explain')"
          src="@/assets/images/sign/sign_icon_about.png">
        <div
          class="bt"
          @click="navigateTo('./sign/history')">
          签到明细
        </div>
      </div>
      <div class="data">
        <img
          @click="getDateGroupInd('last')"
          v-if="dateGroupInd > 0"
          class="ic"
          src="https://cdn.dankal.cn/wxapp-jianbu/img/ic_left.png">
        <div
          class="ul clear"
          v-for="(item,index) in dateGroup"
          :key="index"
          v-if="dateGroupInd==index">
          <div
            class="li"
            :class="{'on':itemN===1,'current':itemN===dateCurrent}"
            v-for="(itemN,indexN) in item"
            :key="indexN">{{ itemN }}</div>
        </div>
        <img
          @click="getDateGroupInd('next')"
          v-if="dateGroupInd < dateGroup.length - 1"
          class="ic right"
          src="https://cdn.dankal.cn/wxapp-jianbu/img/ic_right.png">
      </div>
    </div>
    <div class="list">
      <div class="box num">
        <img
          class="ic"
          src="https://cdn.dankal.cn/wxapp-jianbu/img/ic_sign_myreward.png">
        <span class="tex">我的积分</span>
        <span>840</span>
        <span class="fr">已累计签到2天</span>
      </div>
      <img
        class="til"
        src="@/assets/images/sign/sign_icon_reward.png">
      <div class="box li clear">
        <div class="tex fl">
          <div class="day">5 DAY</div>
          <div class="reward">连续签到15天+0.20个积分</div>
        </div>
        <div class="fr">未解锁</div>
      </div>
      <div class="box li clear unlock">
        <div class="tex fl">
          <div class="day">5 DAY</div>
          <div class="reward">连续签到15天+0.20个积分</div>
        </div>
        <div class="fr">已解锁</div>
      </div>
    </div>
    <dankalModal
      v-model="isShowModalSignIn"
      :corner-close-able="true"
      :button-close-able="true"
      border-radius="0.1rem">
      <template>
        <div
          class="dialog-box dialog-signIn">
          <div class="til">已连续签到3天</div>
          <img
            class="ic"
            src="https://cdn.dankal.cn/wxapp-jianbu/img/pic_tanchuang_sign.png">
          <div >距离获得额外奖励还剩 <span class="day">1</span> 天</div>
          <div
            class="bt"
            @click="isShowModalSignIn=false">知道了</div>
        </div>
      </template>
    </dankalModal>
    <dankalModal
      v-model="isShowModalAward"
      :corner-close-able="true"
      :button-close-able="true"
      border-radius="0.1rem">
      <template>
        <div class="dialog-box dialog-award">
          <div>恭喜你，连续签到2天</div>
          <div class="tex">获得0.1个积分</div>
          <img
            class="ic"
            src="https://cdn.dankal.cn/wxapp-jianbu/img/pic_tanchuang_reward.png">
          <div class="bt">领取</div>
        </div>
      </template>
    </dankalModal>
  </div>
</template>

<script>
import dankalModal from '@/components/dankal/dankal-modal';

export default {
  head() {
    return {
      title: '签到',
    };
  },
  data() {
    return {
      dateGroup: [],
      dateGroupInd: 0,
      dateCurrent: 0,
      isShowModalSignIn: false,
      isShowModalAward: true,
    };
  },
  components: { dankalModal },
  mounted() {
    this.handle().getDateGroup()
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path)
    },
    getDateGroupInd(type) {
      switch (type) {
        case 'last':
          this.dateGroupInd -= 1
          break
        case 'next':
          this.dateGroupInd += 1
          break
        default:
          break
      }
    },
    network() {
      return {
        example: async () => {
          console.log('network');
        },
      };
    },
    handle() {
      return {
        getDateGroup: () => {
          const date = new Date();
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const daycount = new Date(year, month, 0).getDate();
          const dateGroup = [];
          const len = Math.ceil(daycount / 7);
          for (let i = 0; i < len; i += 1) {
            dateGroup.push(new Array(0))
            for (let j = 0; j < 7; j += 1) {
              const dayNo = (j + 1) + (i * 7);
              if (dayNo <= daycount) {
                dateGroup[i].push(dayNo)
              }
            }
          }
          this.dateGroup = dateGroup;
          this.dateGroupInd = Math.ceil(day / 7) - 1
          this.dateCurrent = day;
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '~@/assets/styles/mixins.scss';
  @import '~@/assets/styles/variables.scss';
  .content{
    height: 100vh;
    background: #F6F8FA;
    .header {
      padding: 0.4rem 0.3rem 0.15rem;
      background: #FFFFFF;
      .til {
        line-height: 0.6rem;
        color: #738AA4;
        margin-bottom: 0.4rem;
        .ic {
          width: 0.3rem;
          margin-right: 0.2rem;
        }
        .explain{
          width: 0.4rem;
          margin-left: 0.2rem;
        }
        .bt {
          @include button(1.52rem,0.56rem,0.08rem,$secondary-color,$secondary-color,#fff);
          float: right;
        }
      }
      .data{
        position: relative;
        .ic {
          width: 0.3rem;
          height: 0.3rem;
          position: absolute;
          top: 0.05rem;
          left: -0.05rem;
          &.right {
            left: auto;
            right: -0.05rem;
          }
        }
        .ul {
          width: 6.3rem;
          margin: 0 auto;
          .li {
            width: 0.9rem;
            text-align: center;
            color: #8B8D8C;
            line-height: 0.4rem;
            float: left;
            &:after {
              content: '';
              display: block;
              width: 0.44rem;
              height: 0.44rem;
              margin: 0.08rem auto 0;
              background-size: 100% 100% !important;
              background: url("~assets/images/sign/sign_icon_unselected.png")
            }
            &.on {
              &:after {
                background: url("~assets/images/sign/sign_icon_selected.png")
              }
            }
            &.current{
              color: #4dba93;
            }
          }
        }
      }
    }
    .list {
      padding: 0.48rem 0.3rem 0;
      .box {
        width: 100%;
        background: #ffffff;
        border-radius: 0.1rem;
        -webkit-box-shadow: 0px 0.02rem 0.20rem rgba(0, 0, 0, 0.12);
        box-shadow:0px 0.02rem 0.20rem rgba(0, 0, 0, 0.12);
      }
      .num {
        line-height: 1.1rem;
        padding: 0 0.4rem 0 0.35rem;
        .ic {
          width: 0.5rem;
          height: 0.5rem;
          margin-right: 0.25rem;
        }
        .tex {
          margin-right: 0.30rem;
        }
      }
      .til {
        width: 3.26rem;
        display: block;
        margin: 0.55rem auto 0.30rem;
      }
      .li {
        color: #9B9B9B;
        line-height: 1.10rem;
        padding: 0 0.50rem 0 0.25rem;
        margin-bottom: 0.20rem;
        &:before {
          content: '';
          display: block;
          width: 0.62rem;
          height: 0.62rem;
          float: left;
          margin-top: 0.24rem;
          background-size: 100% 100% !important;
          background: url("https://cdn.dankal.cn/wxapp-jianbu/img/ic_sign_gift_light.png")
        }
        .tex {
          line-height: 1.5;
          margin-top: 0.16rem;
          margin-left: 0.24rem;
          .day{color: #B28C6C}
          .reward{font-size: 0.24rem}
        }
        &.unlock{
          .day{color: #9B9B9B}
          &:before {
            background: url("https://cdn.dankal.cn/wxapp-jianbu/img/ic_sign_gift_dark.png")
          }
        }
      }
    }
  }

  .dialog-box {
    width: 5.46rem;
    height: 5.60rem;
    text-align: center;
    line-height: 1.2;
    padding-top: 0.68rem;
  }

  .dialog-signIn{
    .til{
      color: #B28C6C;
    }
    .ic {
      width: 3rem;
      height: 2.13rem;
      margin-top: 0.15rem;
      margin-bottom: 0.10rem;
    }
    .day{
      font-size: 0.48rem;
      color: #B28C6C;
    }
    .bt {
      @include btn-primary();
      height: 0.8rem;
      width: 2.80rem;
      margin-top: 0.28rem;
    }
  }

  .dialog-award{
    .tex {
      margin-top: 0.10rem;
      font-size: 0.32rem;
      color: #B28C6C;
    }
    .ic {
      width: 3rem;
      height: 2.13rem;
      margin-top: 0.30rem;
      margin-bottom: 0;
    }
    .bt {
      @include btn-primary();
      height: 0.8rem;
      width: 2.80rem;
      margin-top: 0.28rem;
    }
  }

</style>
