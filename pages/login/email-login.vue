<template>
  <div class="container">
    <login-logo/>
    <div class="form">
      <div class="li">
        <div class="attr">Account</div>
        <div class="main">
          <input
            class="inp"
            type="text"
            placeholder="Please enter your Email "
            v-model="param.email">
        </div>
      </div>
      <div class="li">
        <div class="attr">Password </div>
        <div class="main">
          <input
            class="inp"
            type="password"
            placeholder="Please enter your password "
            v-model="param.password">
        </div>
      </div>
    </div>
    <div
      class="submit"
      @click="login">LOGIN</div>
    <div
      class="link"
      @click="navigateTo('./email-verify?type=register')">Sign up </div>
    <div
      class="link"
      @click="navigateTo('./email-verify?type=pass')">Forgot My Password </div>
    <div
      class="agreement"
      @click="navigateTo('./email-agreement')"> agree to the《trubrush Privacy Policy》 </div>
  </div>
</template>

<script>
import { login } from '@/api/login'
import utils from '@/jslibs/dk-utils';
import loginLogo from '@/components/login-logo'

export default {
  head() {
    return {
      title: 'Login',
    };
  },
  data() {
    return {
      param: {
        email: '',
        password: '',
      },
    };
  },
  components: { loginLogo },
  mounted() {
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
    login() {
      const { email, password } = this.param
      if (!email || !password) {
        this.$createToast({
          txt: 'Please enter the login information',
          type: 'txt',
          time: 1000,
        }).show()
        return
      }
      this.network().login()
    },
    network() {
      return {
        login: async () => {
          const { data } = await login(this.param)
          console.log('登录', data);
          utils.setCookie('X-Access-Token', data.token.access_token)
          // alert(utils.getCookie('X-Access-Token'))
          // this.navigateTo('../')
          // this.$router.go(-2)
          // window.history.go(-2)
          this.navigateTo('../')
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
  .agreement{
    font-size: 0.24rem;
    color: #9B9B9B;
    text-align: center;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0.24rem;
  }
</style>
