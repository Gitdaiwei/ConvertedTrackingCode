<template>
  <div class="container">
    <headerView/>
    <div class="form">
      <div class="li">
        <div class="attr">PayPal Account </div>
        <div class="main">
          <input
            class="inp"
            type="text"
            placeholder="Please enter email address"
            v-model="info.paypal_account">
        </div>
      </div>
      <div class="li">
        <div class="attr">$  </div>
        <div class="main">
          <input
            class="inp"
            type="text"
            placeholder="Please enter the withdraw cash"
            v-model="info.money">
        </div>
      </div>
    </div>
    <div
      class="submit"
      @click="applyWithdrawal">APPLY</div>
    <div class="tips">
      <div class="til">Notices：</div>
      <div>
        • Online withdrawals can be made only throught a palpay account,
        not through a debit card or credit card. <br>
        • The palpay account will receive the withdrawls within three working days.
        Sorry if there is any delay.
      </div>
    </div>
  </div>
</template>

<script>
import { applyWithdrawal } from '@/api/wallent'
import headerView from '@/components/header'

export default {
  head() {
    return {
      title: 'Cash Withdrawal',
    };
  },
  data() {
    return {
      info: {
        paypal_account: '',
        money: '',
      },
    };
  },
  components: { headerView },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    applyWithdrawal() {
      if (!this.info.paypal_account || !this.info.money) return
      this.network().applyWithdrawal()
    },
    network() {
      return {
        applyWithdrawal: async () => {
          const { data } = await applyWithdrawal(this.info)
          console.log('提现', data)
          this.$createToast({
            txt: 'Request has been submitted Request has been submitted ',
            type: 'corrent',
            time: 1000,
          }).show();
          setTimeout(e => {
            this.$router.go(-1)
          }, 1000)
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
    @import '../../login/template.scss';
  .container{

    padding: 0.8rem 0.45rem;
    .submit{
      margin-bottom: 1.7rem;
    }
    .tips{
      color:rgba(155,155,155,1);
      line-height: 0.4rem;
      font-size: 0.24rem;
      .til{
        font-weight: 500;
      }
    }
  }
</style>
