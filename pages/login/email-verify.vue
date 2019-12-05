<template>
  <div class="container">
    <headerView/>
    <div class="form">
      <div class="li">
        <div class="attr">Account </div>
        <div class="main">
          <input
            class="inp"
            type="text"
            placeholder="Your Email "
            v-model="email">
          <div
            v-if="!time"
            class="code oBtn"
            style="height: 0.5rem"
            @click="getCode">Send code</div>
          <div
            v-if="time"
            class="code">{{ time }}S</div>
        </div>
      </div>
      <div class="li">
        <div class="attr">Captcha  </div>
        <div class="main">
          <input
            class="inp"
            type="text"
            placeholder="Verification Code"
            v-model="code">
        </div>
      </div>
    </div>
    <div
      class="submit"
      @click="validateCode()">SUBMIT</div>
  </div>
</template>

<script>
import { getCode, validateCode } from '@/api/login'
import headerView from '@/components/header'

export default {
  head() {
    return {
      title: this.$route.query.type === 'register' ? 'Sign up' : 'Forgot My Password',
    };
  },
  data() {
    return {
      type: this.$route.query.type,
      email: '',
      code: '',
      time: 0,
    };
  },
  components: { headerView },
  watch: {
    time(val) {
      if (!val) return
      setTimeout(e => {
        this.time = val - 1
      }, 1000)
    },
  },
  mounted() {
    console.log(this.type)
    // this.$createToast({
    //   txt: 'Plain txt',
    //   type: 'txt',
    //   time: 1000,
    // }).show()
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    getCode() {
      if (!this.email) {
        this.$createToast({
          txt: 'Please enter the email address',
          type: 'txt',
          time: 1000,
        }).show()
        return
      }
      this.network().getCode()
    },
    validateCode() {
      if (!this.email) {
        this.$createToast({
          txt: 'Please enter the email address',
          type: 'txt',
          time: 1000,
        }).show()
        return
      }
      if (!this.code) {
        this.$createToast({
          txt: 'Please enter the verification code',
          type: 'txt',
          time: 1000,
        }).show()
        return
      }
      this.network().validateCode()
    },
    network() {
      return {
        getCode: async () => {
          const { data } = await getCode({ email: this.email, sms_type: this.type })
          console.log(`获取验证 sms_type:${this.type}`, data);
          this.time = 60
        },
        validateCode: async () => {
          const { data } = await validateCode({
            email: this.email, sms_type: this.type, code: this.code,
          })
          console.log(`验证验证码 sms_type:${this.type}`, data);
          this.time = 0
          this.navigateTo(`./email-password?type=${this.type}&email=${this.email}&code=${this.code}`)
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
    @import './template.scss';
    .oBtn{
    background: #75ccb6;
    border-radius: 0.2rem;
    color: #fff;
    }
</style>
